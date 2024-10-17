import { reflect } from "@effector/reflect"
import { scanNfcModel } from "features/scan-nfc/model"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import WebView from "react-native-webview"
import { webScreenModel } from "../model"

interface Props {
  uri: string
}

function WebScreen({ uri }: Props) {
  return (
    <SafeAreaView className="flex-1">
      <WebView source={{ uri }} className="flex-1" />
    </SafeAreaView>
  )
}

export default reflect({
  view: WebScreen,
  bind: {
    uri: scanNfcModel.$ndefRecordPayloadStr,
  },
  hooks: {
    unmounted: webScreenModel.unmounted,
  },
})
