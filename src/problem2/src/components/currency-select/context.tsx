import type { CurrencySelectProps } from "@/components/currency-select/currency-select";

import { createContext } from "react";

type CurrencySelectContextValue = CurrencySelectProps;

export const CurrencySelectContext = createContext<CurrencySelectContextValue>({
  value: '',
  omitCoinIds: [],
  onChange: () => { },
});
