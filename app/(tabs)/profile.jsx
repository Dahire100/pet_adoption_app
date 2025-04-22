import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { useNavigation, useRouter } from "expo-router"
import Colors from "../../constants/Colors"
const menu = [
   {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet"
   },
   {
      id: 5,
      name: "My Post",
      icon: "bookmark",
      path: "/user-post"
   },
   {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite"
   },
   {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox"
   },
   {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout"
   },

]
const Profile = () => {
   const { user } = useUser()
   const navigate = useNavigation()
   const router = useRouter()
   const { signOut } = useAuth()
   const onPressMenu = async (menu) => {
      if (menu.name == "Logout") {
         await signOut();
         console.log("User signed out:", user);
         router.replace('/login');
         return;
      }
      router.push(menu.path)
   }

   return <View style={styles.container}>
      <View style={styles.userDetails}>
         <Image source={{ uri: user?.imageUrl }} style={styles.image}></Image>
         <Text style={styles.userName}>{user?.fullName}</Text>
         <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <FlatList
         data={menu}
         renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.listContainer} onPress={() => { onPressMenu(item) }}>
               <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} />
               </View>
               <Text style={styles.listText}>{item.name}</Text>
            </TouchableOpacity>
         )}
      >

      </FlatList>
   </View>
}
export default Profile;
const styles = StyleSheet.create({
   container: {
      padding: 20,
   },
   userDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 15
   },
   image: {
      height: 60,
      width: 60,
      borderRadius: 99
   },
   userName: {
      fontFamily: 'outfit-bold',
      fontSize: 18
   },
   userEmail: {
      fontFamily: 'outfit',
      fontSize: 14,
      color: Colors.GRAY
   },
   iconContainer: {
      padding: 8,
      backgroundColor: Colors.LIGHT_PRIMARY,
      borderRadius: 6
   },
   listContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: Colors.WHITE,
      borderRadius: 5,
      padding: 10,
      marginVertical: 8
   },
   listText: {
      fontSize: 16,
      fontFamily: 'outfit-medium'
   }
})