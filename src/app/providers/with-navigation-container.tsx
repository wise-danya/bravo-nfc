import { reflect } from "@effector/reflect"
import {
  InitialState,
  NavigationContainer as RNNavigationContainer,
} from "@react-navigation/native"
import React from "react"
import { navigation } from "shared/navigation"

interface Props {
  initialState: InitialState | null
  node: () => React.ReactNode
}

function NavigationContainerView({ initialState, node }: Props) {
  if (!initialState) return null

  return (
    <RNNavigationContainer
      theme={navigation.theme}
      ref={navigation.ref}
      initialState={initialState}
      onStateChange={navigation.onStateChange}
      onReady={navigation.onReady}
    >
      {node()}
    </RNNavigationContainer>
  )
}

const NavigationContainer = reflect({
  view: NavigationContainerView,
  bind: {
    initialState: navigation.$state,
  },
})

export const withNavigationContainer = (node: () => React.ReactNode) => () => {
  return <NavigationContainer node={node} />
}
