import { View, Text } from 'react-native'
import React from 'react'

const Contact = () => {
  return (
    <View style={Styles.mainContainer}>
        <Text style={Styles.title}>Contact</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        paddingHorizontal: "5"
    }
})

export default Contact