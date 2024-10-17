export * from "./config"

import {
  createNavigationContainerRef,
  DefaultTheme,
  InitialState,
  NavigationState,
  StackActions,
} from "@react-navigation/native"
import { createEvent, createStore } from "effector"
import { NavigationParamList, routeNames } from "./config"

const $state = createStore<InitialState | null>({
  index: 0,
  routes: [{ name: routeNames.home }],
})

const onStateChange = createEvent<NavigationState | undefined>()

const ref = createNavigationContainerRef<NavigationParamList>()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
}

const onReady = createEvent()

const $ready = createStore(ref.isReady()).on(onReady, () => true)

export const navigation = {
  $ready,
  $state,
  onReady,
  onStateChange,
  ref,
  theme,
  replace: <RouteName extends keyof NavigationParamList>(
    route: RouteName,
    params: NavigationParamList[RouteName]
  ) => {
    ref.dispatch(StackActions.replace(route, params))
  },
  push: <RouteName extends keyof NavigationParamList>(
    route: RouteName,
    params: NavigationParamList[RouteName]
  ) => {
    ref.dispatch(StackActions.push(route, params))
  },
  ...ref,
}
