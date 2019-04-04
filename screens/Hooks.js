import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import axios from 'axios'

const URL = 'https://leviatan.herokuapp.com/api/v1/accounts/3/redeemed/'

const headers = {
  Authorization: `Token 28e3db759f1a059bf63dd00037ce22d18b0c4efb`,
  'Content-Type': 'application/json'
};

const Hooks = ({ navigation }) => {

  const [points, setPoints] = useState(0)

  useEffect(() => {
    const uuid = navigation.getParam('uuid')
    if (uuid) getData(uuid)
  }, [])

  const getData = async (uuid) => {
    try {
      const { data } = await axios.post(URL, { uuid }, { headers })
      setPoints(data.points)
    } catch (error) {
      Alert.alert('Lo sentimos',' El código ya ha sido redimido')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{points} points</Text>
    </View>
  )
}

export default Hooks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgb(10, 142, 205)'
  }
})