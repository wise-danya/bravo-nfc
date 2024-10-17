import { createEffect, createEvent, sample } from "effector"
import { delay } from "patronum"
import { captureErrorFx } from "shared/lib"
import { navigation, routeNames } from "shared/navigation"
import { isValidUrl } from "../lib"
import { $ndefRecordPayloadStr } from "./scan-nfc"

const navigateToWebScreenFx = createEffect(() => {
  navigation.navigate(routeNames.web)
})

const readyToNavigate = createEvent()

// delay navigate to web screen (temporary solution to wait for scanner to hide)

delay({
  source: readyToNavigate,
  timeout: 2500,
  target: navigateToWebScreenFx,
})

// navigate to web screen on valid url

sample({
  clock: $ndefRecordPayloadStr,
  filter: (payload) => isValidUrl(payload),
  target: readyToNavigate,
})

// capture error on navigate to web screen

sample({
  clock: navigateToWebScreenFx.failData,
  target: captureErrorFx,
})
