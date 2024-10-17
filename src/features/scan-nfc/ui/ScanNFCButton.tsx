import { reflect } from "@effector/reflect"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { scanNfcModel } from "../model"

interface Props {
  onPress: () => void
}

function ScanNFCButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      className={"border rounded-full mt-8 p-4"}
      onPress={onPress}
    >
      <Text>Scan a Tag</Text>
    </TouchableOpacity>
  )
}

export default reflect({
  view: ScanNFCButton,
  bind: {
    onPress: scanNfcModel.scanNfc,
  },
})
