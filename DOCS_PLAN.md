# Docs Audit Fix Plan

> Based on comprehensive docs audit · 22 issues found · 4 Critical / 8 Major / 10 Minor

## Phase 1: Critical (Cleanup + Phantom Functions)

- [x] **C1**: Replace 10 "Unfunt" → "xfunc" references in 5 files
- [x] **C2**: Replace `isArray` → `Array.isArray` in 18+ code examples (5 files)
- [x] **C3**: Translate `docs/zh/docs/index.md` (229 lines) to Chinese
- [x] **C4**: Remove 5 phantom functions (remain, toFinite, toInteger, toLength, trim)

## Phase 2: Major (Accuracy + Completeness)

- [x] **M1**: Fix EN `typed.md` Complete List (remove 4 phantoms, add 4 missing)
- [x] **M2**: Fix ZH `typed.md` Complete List (remove 4 phantoms)
- [x] **M3**: Add `merge` documentation to 5 locations
- [x] **M4**: Fix ZH overview counts (32→52 methods, 6→7 categories)
- [x] **M5**: Fix EN overview typed count (17→21)
- [x] **M6**: Add missing object functions to EN/ZH overview
- [x] **M7**: Replace `trim` with actual string functions in EN/ZH overview
- [x] **M8**: Add detailed docs for 9 missing typed functions in EN typed.md

## Phase 3: Minor (Consistency + Polish)

- [x] **MIN1**: Add `merge` to README object section
- [x] **MIN2**: Fix README typed count (22→21) + remove phantom function names
- [x] **MIN3**: Fix README code example (import isEmpty)
- [x] **MIN4**: Fix EN/ZH number section (add randomInt, remove phantoms)
- [x] **MIN5**: Add Chinese feature prose to ZH overview
- [x] **MIN6**: Fix ZH typed.md title + Usage headings to Chinese
- [x] **MIN7**: Deferred (guides are different content, not a bug)
- [x] **MIN8**: Fix misleading "best practices" link to "CI/CD integration guide"
- [x] **MIN9**: Add detailed EN typed.md docs for 5 missing functions
- [x] **MIN10**: All function counts consolidated across overview/README
