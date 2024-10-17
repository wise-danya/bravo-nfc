import { StatusBar } from "expo-status-bar"
import { Text, TouchableOpacity, View } from "react-native"
import NfcManager, { NfcTech } from "react-native-nfc-manager"

// Pre-step, call this before any NFC operations
NfcManager.start()

export default function App() {
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef)
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag()
      console.warn("Tag found", tag)
    } catch (ex) {
      console.warn("Oops!", ex)
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest()
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableOpacity
        className={"border rounded-full mt-8 p-4"}
        onPress={readNdef}
      >
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}
