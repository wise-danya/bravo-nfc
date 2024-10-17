import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

export const withSafeArea = (node: () => React.ReactNode) => () => {
  return <SafeAreaProvider>{node()}</SafeAreaProvider>
}
