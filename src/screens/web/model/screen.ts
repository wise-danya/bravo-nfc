import { createEvent, sample } from "effector"
import { scanNfcModel } from "features/scan-nfc/model"

const unmounted = createEvent()

sample({
  clock: unmounted,
  filter: Boolean,
  target: scanNfcModel.$ndefRecordPayloadStr.reinit,
})

export { unmounted }
