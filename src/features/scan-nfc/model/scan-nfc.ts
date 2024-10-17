import { createEffect, createEvent, createStore, sample } from "effector"
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager"
import { captureErrorFx } from "shared/lib"

const scanNfc = createEvent()

const $ndefRecordPayloadStr = createStore<string>("")

$ndefRecordPayloadStr.watch((s) => console.log("$ndefRecordPayloadStr", s))

const readNdefFx = createEffect(async () => {
  NfcManager.start()

  await NfcManager.requestTechnology(NfcTech.Ndef)
  const tag = await NfcManager.getTag()

  let payload
  if (tag && tag.ndefMessage) {
    const ndefRecords = tag.ndefMessage.map((record) => {
      // Check if this is a URI record
      if (
        record.tnf === Ndef.TNF_WELL_KNOWN &&
        record.type[0] === Ndef.RTD_URI[0]
      ) {
        // Decode the URI from the payload
        payload = Ndef.uri.decodePayload(new Uint8Array(record.payload)).trim() // Trim any trailing newline or spaces
      } else {
        // Fallback to decoding as text (if it's not a URI)
        payload = Ndef.text.decodePayload(new Uint8Array(record.payload)).trim() // Also trim for text decoding
      }

      return {
        id: record.id,
        payload: payload,
        tnf: record.tnf,
        type: record.type,
      }
    })

    console.log("Parsed NDEF Records:", ndefRecords)
  }

  NfcManager.cancelTechnologyRequest()
  return payload ?? ""
})

// read NDEF on scan NFC

sample({
  clock: scanNfc,
  target: readNdefFx,
})

sample({
  clock: readNdefFx.doneData,
  filter: Boolean,
  fn: (payload) => `https:\/\/${payload.toLocaleLowerCase()}`, // temporary fix, because something is wrong with decoding `http://` from the payload
  target: $ndefRecordPayloadStr,
})

const cancelTechnologyRequestFx = createEffect(() => {
  NfcManager.cancelTechnologyRequest()
})

// cancel technology request after reading NDEF

sample({
  clock: readNdefFx.finally,
  target: cancelTechnologyRequestFx,
})

// capture errors

sample({
  clock: [
    readNdefFx.failData,
    cancelTechnologyRequestFx.failData,
    readNdefFx.failData,
  ],
  target: captureErrorFx,
})

export { $ndefRecordPayloadStr, scanNfc }
