import { compose } from "lodash/fp"
import { withNavigationContainer } from "./with-navigation-container"
import { withSafeArea } from "./with-safe-area"

export const withProviders = compose(withSafeArea, withNavigationContainer)
