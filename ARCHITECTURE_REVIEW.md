## Summary

- Performance (polling-based updates)
- Scalability (monolithic structure)
- SSR Compatibility (window dependencies)
- Maintainability (mixed concerns, low test coverage)

**Priority:** High - Address before production use

---

## Critical Issues

### 1. Performance: Polling Anti-Pattern

**Location:** `src/components/dialog/n-dialog.tsx:42`

```typescript
// Polling every 50ms = 20 checks per second
this.watchInterval = window.setInterval(() => {
  // Expensive comparison on every interval
}, 50);
```

**Impact:**

- Constant CPU usage
- Battery drain on mobile
- Scales poorly with multiple dialogs

**Fix:** Event-driven architecture with observer pattern

---

### 2. State Management: Non-Reactive Stores

**Locations:**

- `src/components/dialog/store.ts`
- `src/components/toast/store.ts`
- `src/locale/index.ts`

**Problem:** Module-level mutable state without reactivity

```typescript
//  Mutations don't trigger component updates
let dialogs: DialogProps[] = [];
dialogs.push(...); // Components won't know this changed
```

**Fix:** Implement proper reactive store:

```typescript
// Recommended approach
import { createStore } from '@stencil/store';

const { state, onChange } = createStore({ dialogs: [] });
onChange('dialogs', newDialogs => {
  // Notify subscribers
});
```

---

### 3. Global Namespace Pollution

**Location:** `src/components/dialog/store.ts:95`

```typescript
// Breaks SSR, no encapsulation
(window as any).nwbDialogStore = api;
```

**Issues:**

- Server-side rendering crashes
- Can be overwritten by other code
- No TypeScript safety
- Memory leaks

**Fix:** Use CustomEvents or proper DI

---

### 4. Non-Reactive Composables

**Location:** `src/composables/useToggle.ts`

```typescript
//  Doesn't integrate with Stencil's reactivity
export function useToggle(initialValue = false) {
  let active = initialValue; // Closure doesn't trigger re-renders
  return [active, toggle];
}
```

**Fix:** Use `@State` directly in components or proper Stencil patterns

---

### 5. SSR Incompatibility

**Multiple Locations:**

- `src/composables/useLocationHash.ts:3` - Direct `window.location` access
- `src/components/bottom-sheet/n-bottom-sheet.tsx:99` - No window check
- All store files exposing to window

**Fix:** Add guards:

```typescript
if (typeof window !== 'undefined') {
  // browser-only code
}
```

---

### 6. Testing Gap

**Current State:** Only 1 test file (`src/utils/utils.spec.ts`)

**Missing:**

- Component unit tests
- E2E tests
- Integration tests
- Visual regression tests
- Accessibility tests

**Target:** 80%+ code coverage

---

## Structural Issues

### Monolithic Architecture

**Current:** Single package with all components
**Problem:**

- Can't install individual components
- No independent versioning
- Longer build times
- Unclear ownership

**Recommended:** Package-based monorepo structure

```
packages/
├── core/           # Pure utilities, no dependencies
├── theme/          # Design tokens & Tailwind config
├── state/          # Reactive state management
├── components/     # UI components
├── locale/         # i18n
└── docs/          # Storybook & documentation
```

---

## Code Quality Issues

### 1. Direct Mutations

Throughout stores: `dialogs.push()`, `toasts.length = 0`

- Hard to track changes
- Breaks immutability principle
- Makes debugging difficult

### 2. Magic Numbers

- `setTimeout(..., 100)` - Why 100ms?
- `setInterval(..., 50)` - Why 50ms?
- Z-index offsets with no explanation

### 3. Error Handling

```typescript
// Errors logged but not surfaced to user
console.error('Error initializing dialog position:', error);
// Dialog appears broken to user
```

### 4. Type Safety

- Multiple `any` types throughout codebase
- Missing strict TypeScript flags
- No strict null checks

## Improvement Roadmap

### Phase 1: Critical Fixes

**Priority: P0 - Production Blockers**

- [ ] Replace polling with event-driven updates
- [ ] Add SSR guards to all window/document access
- [ ] Remove window namespace pollution
- [ ] Fix non-reactive stores

### Phase 2: Architecture

**Priority: P1 - Scalability**

- [ ] Setup monorepo structure (pnpm + Nx)
- [ ] Extract packages: core, theme, state, components
- [ ] Implement clean architecture layers
- [ ] Add path aliases for clean imports

### Phase 3: Testing

**Priority: P1 - Quality**

- [ ] Add unit tests for all components
- [ ] Add E2E tests for critical flows
- [ ] Setup visual regression testing
- [ ] Add accessibility testing

### Phase 4: DevEx

**Priority: P2 - Developer Experience**

- [ ] Add comprehensive documentation
- [ ] Setup CI/CD pipeline
- [ ] Add pre-commit hooks (lint, format, test)
- [ ] Create migration guide for breaking changes

---

## Recommended Tools & Libraries

### State Management

- **@stencil/store** - Official reactive store
- **RxJS** - For complex event streams (if needed)

### Monorepo

- **pnpm** - Fast, efficient package manager
- **Nx** - Build orchestration and monorepo tooling
- **Changesets** - Version management

### Testing

- **@stencil/core/testing** - Built-in testing utilities
- **Puppeteer** - E2E testing (already installed)
- **@axe-core/playwright** - Accessibility testing

---

## Learning Resources

1. **Stencil Best Practices:**
   - https://stenciljs.com/docs/reactive-data
   - https://stenciljs.com/docs/stencil-store

2. **Monorepo Architecture:**
   - https://nx.dev/getting-started/intro
   - https://pnpm.io/workspaces

3. **Web Components:**
   - https://web.dev/web-components/
   - https://open-wc.org/guides/

---

## Next Actions

### Immediate (This Week)

1. Review all `// ❌`, `// TODO`, `// FIX` comments added to source files
2. Prioritize critical fixes that block production use
3. Create GitHub issues for each major refactoring item
4. Setup tracking board for architecture improvements

### Short Term (This Month)

1. Fix performance issues (polling → events)
2. Add SSR compatibility
3. Write tests for critical components
4. Document current architecture

### Long Term (This Quarter)

1. Migrate to monorepo structure
2. Establish CI/CD pipeline
3. Achieve 80%+ test coverage
4. Publish to npm with proper versioning

---
