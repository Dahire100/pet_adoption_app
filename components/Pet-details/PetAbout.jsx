import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/Colors";
const PetAbout = ({ pet }) => {
   const [readmore, setReadmore] = useState(false)
   return <View style={styles.container}>
      <Text style={styles.title}>About {pet.Name}</Text>
      <Text style={styles.about} numberOfLines={readmore ? 20 : 3}>{pet.About}</Text>
      <Pressable onPress={() => setReadmore(true)}>
         {!readmore && <Text style={styles.readmore}>Read More</Text>}
      </Pressable>
      <Pressable onPress={() => setReadmore(false)}>
         {readmore && <Text style={styles.readmore}>Read Less</Text>}
      </Pressable>
   </View>
}
export default PetAbout
const styles = StyleSheet.create({
   container: {
      padding: 20
   },
   title: {
      fontFamily: 'outfit-medium',
      fontSize: 20
   },
   readmore: {
      color: Colors.SECONDARY,
      fontFamily: 'outfit'
   },
   about: {
      fontFamily: 'outfit',
      fontSize: 13
   }
})