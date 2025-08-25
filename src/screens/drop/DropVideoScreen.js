import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddSoundModal from './component/AddSoundModal'
import Style from '../../style/Style'

const DropVideoScreen = () => {
 
  return (
    <View style ={[Style.container]}>
      {/* <Text>DropVideo</Text> */}
      <AddSoundModal/>
    </View>
  )
}

export default DropVideoScreen

const styles = StyleSheet.create({})