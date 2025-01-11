# Improvement Log
This document tracks improvements and enhancements made to the codebase.

## Code Readability
- Enhanced code structure with strategic line breaks for better visual organization - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/3fd80c7b0a0512d2a1a5197d24300ce0da17ac9c)
- Simplified nesting if statements inside `sortedBalances` sort function - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/1740cd50ba8d7edf06fa7ecc9e170df9c6cff7f9)
- Separate utils function out of component for better readability code flow - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/245016e40ba17b07aa6cb02acbbc93ca44fd08b8) - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/f1ac9a69bd885c343614584c0b05bb5ea4c4acde)

## TypeScript Type Safety
- Added missing type definition for `blockchain` property in `WalletBalance` interface - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/bbb112da9f4bfd7dbe7e5a7e116d97616c338d06)
- Improved type inheritance by extending `FormattedWalletBalance` from `WalletBalance` interface - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/bbb112da9f4bfd7dbe7e5a7e116d97616c338d06)
- Simplified component props by directly using `BoxProps` interface, following YAGNI principles - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/bbb112da9f4bfd7dbe7e5a7e116d97616c338d06)
- Enhanced type safety by replacing generic `any` types with specific TypeScript types - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/bbb112da9f4bfd7dbe7e5a7e116d97616c338d06)
- Added Function Return Types to enhance type-safety as TS Best Practices - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/1e75f86576f186866b2a343672e58f40ec181f5d)
- Centralized type definitions at the root level to adhere to the single source of truth principle, reducing redundancy repeat across the codebase - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/1e75f86576f186866b2a343672e58f40ec181f5d)

## Clean Code Practices
- Improved code maintainability and type-safety by extracting magic numbers into a dedicated Priority enum in `getPriority` function - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/1707e1042dab7dacbf301842f35c4e051bb284a2)
- Remove unused `const` and simplify `sortedBalance` filter logic - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/1707e1042dab7dacbf301842f35c4e051bb284a2)
- Improved variable and function names for better clarity and future understanding - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/fd0f1de7fe349f94695cb5e2e8604e96663ec5fe)

## Logic Improvements
- `sortedBalances` filter logic seems inverted (returns true for zero/negative balances) - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/fd4f75cf46014ab6738ece0edf873e47b68cab06)
- Switch to render rows from `formattedBalances` instead of `sortedBalances` - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/1e75f86576f186866b2a343672e58f40ec181f5d)

## Performance Improvements
- Optimize `getPriority` call times in `sortedBalances` filter function - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/fd4f75cf46014ab6738ece0edf873e47b68cab06)
- Removed unused `prices` dependency from `sortedBalances` function to improve code clarity - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/1740cd50ba8d7edf06fa7ecc9e170df9c6cff7f9)
- Separate utils function out of component to avoiding re-creating during renders - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/245016e40ba17b07aa6cb02acbbc93ca44fd08b8) - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/f1ac9a69bd885c343614584c0b05bb5ea4c4acde)

## Others
- Generated unique id base on current data instead of rely on using `index` as React component key. It's risky because we have sorting logic, so I might make the UI display part going wrong with using `index` as `key` - [View Commit](https://github.com/lmint3010/99tech-code-challenge/commit/952654a413adfeaa7e8eb81daed1de2200c4fada)