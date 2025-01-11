# WalletPage Component Refactoring Documentation

## Problem Statement
The original WalletPage component had several issues:
- Mixed concerns (types, logic, UI)
- Poor type safety
- Performance inefficiencies
- Unclear code organization
- Hard-to-maintain code structure

## Refactored Code

`WalletPage` component
```typescript
// ...Import statements

export const WalletPage: React.FC<BoxProps> = ({ children, ...remainingProps }) => {
  const balances = useWalletBalances();

  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances
      .filter(isValidBalance)
      .sort(sortByBlockchainPriority);
  }, [balances]);

  return (
    <div {...remainingProps}>
      <BalanceRows balances={sortedBalances} />
    </div>
  );
}
```

`BalanceRows` component
```typescript
// ...Import statements

export interface BalanceRowsProps {
  balances: WalletBalance[];
};

export const BalanceRows: FC<BalanceRowsProps> = ({ balances }) => {
  const formattedBalances = formatBalances(balances);

  const prices = usePrices();

  return formattedBalances.map((balance) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

    const uniqueKey = `${balance.blockchain}-${balance.currency}-${balance.amount}`;

    return (
      <WalletRow
        className={classes.row}
        key={uniqueKey}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });
};
```

## Refactoring Steps

### 1. Extract Type Definitions
**What:** Moved all interfaces to a dedicated types.ts file

**Why:** 
- Centralize type definitions
- Make types reusable across components
- Improve type maintenance

**Changes:**
- Added missing `blockchain` property in `WalletBalance` interface
- Extend `FormattedWalletBalance` interface instead of repeat property (single source of truth)
```typescript
// BEFORE
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
// AFTER
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```
- Created Price and BoxProps interfaces
- Simplified component props by directly using `BoxProps` interface, following YAGNI principles
- Added Function Return Types to enhance type-safety as TS Best Practices.

### 2. Create Constants File
**What:** Extracted magic values into constants.ts

**Why:**
- Remove hard-coded values
- Make priorities maintainable
- Prevent typos and errors

**Changes:**
- Created `BLOCKCHAIN_PRIORITY` enum
- Defined `BLOCKCHAIN_PRIORITY_FALLBACK`
- Replaced switch statement with enum usage
```typescript
// BEFORE
const getPriority = (blockchain: WalletBalance['blockchain']): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
        // ...long and messy switch case with no type-safe
// AFTER
enum BLOCKCHAIN_PRIORITY {
    Osmosis = 100,
    Ethereum = 50,
    // ...clear enum values
}
```

### 3. Implement Utility Functions
**What:** Created utils.ts for pure functions

**Why:**
- Separate business logic
- Avoiding re-creating during renders
- Make functions testable
- Improve code reuse

**Changes:**
- Extracted `getBlockchainPriority` function
- Extracted `isValidBalance` with more proper validation applied.
- Extract balance sorting logic into `sortByBlockchainPriority` function
- Simplified `sortedBalances` sort function
- Created `formatBalances` helper
- Enhanced type-safe by replacing generic `any` types

### 4. Component Separation
**What:** Split WalletPage into smaller components

**Why:**
- Single responsibility principle
- Improve code readability
- Better component reuse

**Changes:**
- Created `BalanceRows` component
- Moved row rendering logic into `BalanceRows` component.
- Improved props typing

### 5. Performance Optimization
**What:** Added proper memoization and key handling

**Why:**
- Prevent unnecessary re-renders
- Improve list rendering
- Better React reconciliation

**Changes:**
- Removed unused `prices` dependency from useMemo of `sortedBalances` function.
- Added unique key generation logic.
- Optimized balance filtering and sorting.
- Optimize `getPriority` call times in `sortedBalances` filter function.

### 6. Code Quality Improvements
**What:** Enhanced code style and patterns

**Why:**
- Better maintainability
- Easier to understand
- Reduced bugs

**Changes:**
- Consistent naming conventions
- Improve naming of some unclear variables
- Clear function purposes and keep function only do one thing a time.
- Proper type usage with Return Type specified on functions.

### 7. Logic Enhancements
- `sortedBalances` filter logic seems inverted (returns true for zero/negative balances)
- Switch to render rows from `formattedBalances` instead of `sortedBalances`

## What we have after refactoring

### Type Safety Improvements
- 100% TypeScript coverage
- Eliminated all 'any' types
- Proper interface inheritance
- Function return types
- Enum-based type safety

### Performance Optimizations
- Reduced unnecessary renders
- Optimized function calls
- Better key generation
- Proper dependency management
- Efficient data transformation

### Code Quality
- Clear component hierarchy
- Separated concerns
- Pure functions
- Better naming
- Strategic code organization

### Maintainability
- Single source of truth
- DRY principle application
- YAGNI principle adherence
- Clear file structure
- Better error handling

The code is now easier to understand, maintain, and extend, ensuring a better developer experience and a more reliable application for users. This refactoring journey highlights the importance of clean code practices and thoughtful design in software development. Happy coding!!!!
