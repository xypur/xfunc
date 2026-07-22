import path from 'node:path'
import fs from 'fs-extra'
import pc from 'picocolors'
import { execa } from 'execa'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'docs/.vitepress/dist')
const tempDir = path.resolve(rootDir, '.gh-pages-tmp')

const { values: args } = parseArgs({
  options: {
    dry: { type: 'boolean' },
    skipBuild: { type: 'boolean' }
  }
})

const isDryRun = args.dry ?? false
const skipBuild = args.skipBuild ?? false

const step = (msg: string) => console.log(pc.cyan(msg))
const run = async(bin: string, binArgs: readonly string[], opts: Record<string, unknown> = {}) => {
  if (isDryRun) {
    console.log(pc.blue(`[dryrun] ${bin} ${binArgs.join(' ')}`))
    return
  }
  await execa(bin, binArgs, { stdio: 'inherit', ...opts })
}

async function main() {
  step('Deploying docs to GitHub Pages (gh-pages branch)...\n')

  // 1. Build docs
  if (!skipBuild) {
    step('Building docs...')
    await run('pnpm', ['docs:build'])
  } else {
    step('Skipping build (using existing dist)')
  }

  if (!fs.existsSync(distDir)) {
    throw new Error(`Docs dist not found: ${distDir}\nRun \`pnpm docs:build\` first.`)
  }

  // 2. Get remote URL
  const remoteUrl = (await execa('git', ['remote', 'get-url', 'origin'])).stdout.trim()
  const hasGhPages = await checkBranchExists(remoteUrl, 'gh-pages')

  // 3. Prepare temp directory
  step('\nPreparing gh-pages branch...')

  if (fs.existsSync(tempDir)) {
    await fs.remove(tempDir)
  }

  if (hasGhPages) {
    await run('git', ['clone', '--branch', 'gh-pages', '--single-branch', remoteUrl, tempDir])
  } else {
    console.log(pc.yellow('gh-pages branch does not exist, creating...'))
    await run('git', ['clone', '--single-branch', '--depth', '1', remoteUrl, tempDir])

    // Create orphan gh-pages branch
    if (!isDryRun) {
      await execa('git', ['checkout', '--orphan', 'gh-pages'], { cwd: tempDir })
      await execa('git', ['rm', '-rf', '.'], { cwd: tempDir })
    } else {
      console.log(pc.blue('[dryrun] git checkout --orphan gh-pages'))
      console.log(pc.blue('[dryrun] git rm -rf .'))
    }
  }

  // 4. Clean temp directory (keep .git) and copy build output
  step('\nCopying build output...')

  if (!isDryRun) {
    // Remove all files except .git
    const entries = await fs.readdir(tempDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === '.git') continue
      await fs.remove(path.join(tempDir, entry.name))
    }

    // Copy build output
    await fs.copy(distDir, tempDir)

    // Add .nojekyll to disable Jekyll processing
    await fs.writeFile(path.join(tempDir, '.nojekyll'), '')
  } else {
    console.log(pc.blue(`[dryrun] Clean ${tempDir} (keep .git) and copy ${distDir}`))
  }

  // 5. Commit and push
  step('\nCommitting and pushing...')
  await run('git', ['add', '-A'], { cwd: tempDir })

  // bail if nothing changed
  if (!isDryRun) {
    const { stdout: status } = await execa('git', ['status', '--porcelain'], { cwd: tempDir })
    if (!status.trim()) {
      console.log(pc.green('No changes to deploy.'))
      await fs.remove(tempDir)
      return
    }
  }

  const timestamp = new Date().toISOString()
  await run('git', ['commit', '-m', `docs: deploy docs site ${timestamp}`], { cwd: tempDir })
  await run('git', ['push', 'origin', 'gh-pages'], { cwd: tempDir })

  // 6. Cleanup
  step('\nCleaning up...')
  if (!isDryRun) {
    await fs.remove(tempDir)
  }

  console.log(pc.green('\n✓ Docs deployed to gh-pages branch!'))
  console.log(pc.dim('GitHub Pages should be set to: Deploy from a branch → gh-pages → / (root)'))
}

async function checkBranchExists(remoteUrl: string, branch: string): Promise<boolean> {
  try {
    const { stdout } = await execa('git', ['ls-remote', '--heads', remoteUrl, branch])
    return stdout.trim().length > 0
  } catch {
    return false
  }
}

main().catch((err) => {
  console.error(pc.red('✗ Deploy failed: ') + (err.message || err))
  if (fs.existsSync(tempDir)) {
    fs.removeSync(tempDir)
  }
  process.exit(1)
})