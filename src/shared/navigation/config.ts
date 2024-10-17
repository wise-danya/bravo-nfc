export const routeNames = {
  home: "home",
  web: "web",
} as const

export type StackParamList = {
  [routeNames.home]: undefined
  [routeNames.web]: undefined
}

export type NavigationParamList = StackParamList
