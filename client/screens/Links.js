import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FooterTabs from '../components/nav/FooterTabs'

export default function Links() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Links</Text>
      <View style={styles.view}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
