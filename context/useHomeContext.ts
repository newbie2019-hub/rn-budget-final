import { TransactionContext } from "@/types";
import { createContext, useContext } from "react";

export const HomeContext = createContext<TransactionContext | undefined>(
  undefined,
)

export function useHomeContext() {
  const user = useContext(HomeContext);

  if (user === undefined) throw new Error('useHomeContext must be used within a Home')

  return user
}