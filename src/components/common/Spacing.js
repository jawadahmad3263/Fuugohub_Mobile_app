import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacing = ({ type, val = 5 }) => {
    return <View style={type === 'h' ? { width: val } : { height: val }} />
}

export default Spacing

const styles = StyleSheet.create({})