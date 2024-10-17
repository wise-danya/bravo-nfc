import { reflect } from "@effector/reflect"
import { ScanNFCButton } from "features/scan-nfc"
import React from "react"
import { SafeAreaView, Text, View } from "react-native"

interface Props {}

function HomeScreen({}: Props) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center bg-white justify-center">
        <Text>React Native NFC Demo App for Bravo!</Text>
        <ScanNFCButton />
      </View>
    </SafeAreaView>
  )
}

export default reflect({
  view: HomeScreen,
  bind: {},
})
