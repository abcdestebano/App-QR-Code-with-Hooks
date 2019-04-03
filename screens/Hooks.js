import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Hooks = () => {
  return (
    <View style={styles.container}>
      <Text>Hooks</Text>
    </View>
  )
}

export default Hooks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})