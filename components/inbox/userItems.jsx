import { View, Text, Image, StyleSheet } from "react-native"
import Colors from "../../constants/Colors";
import { useState } from "react";
import { Link } from "expo-router";
const UserItem = ({ userInfo }) => {
   return <Link href={'/chats?id=' + userInfo.docId} style={styles.container}>

      <View style={{
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'center',
         gap: 10,
      }}>
         <Image style={styles.image} source={{ uri: userInfo?.imageUrl }}></Image>
         <Text style={styles.text}>{userInfo?.name}</Text>
      </View>

   </Link>
}
export default UserItem;
const styles = StyleSheet.create({
   image: {
      height: 40,
      width: 40,
      borderRadius: 100
   },
   container: {
      marginVertical: 10,

      borderBottomWidth: 1,
      borderColor: Colors.GRAY,
      paddingVertical: 10,
      width: '100%'
   },
   text: {
      fontSize: 18,
      fontFamily: 'outfit-medium'
   }
})