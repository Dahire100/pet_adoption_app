import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native"
import { query, collection, getDocs, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PetListItem from './../../components/Home/PetListItem'
import Colors from "../../constants/Colors";
import { Alert } from "react-native";
const UserPost = () => {
   const navigation = useNavigation()
   const { user } = useUser()
   const [loader, setLoader] = useState(false)
   const [userPostList, setUserPostList] = useState([])
   useEffect(() => {
      user && getPosts()
      navigation.setOptions({
         headerTitle: 'User Post'
      })
   }, [user])
   const getPosts = async () => {
      setLoader(true)
      setUserPostList([])
      try {
         const q = query(collection(db, 'PetList'), where('Email', '==', user?.primaryEmailAddress?.emailAddress))
         const querySnapshop = await getDocs(q)


         querySnapshop.forEach(doc => {
            setUserPostList(prev => [...prev, doc.data()])

            setLoader(false)

         })
      }
      catch (error) {
         console.log(error);

      }
   }
   const onDeletePost = async (docId) => {
      Alert.alert('Do You want to Delete?', 'Do you want to delete this post', [
         {
            text: 'Cancel',
            onPress: () => {
               console.log("cancel click");
            },
            style: 'cancel'
         },
         {
            text: 'Delete',
            onPress: () => {
               deletePost(docId)
               getPosts()
            }
         }
      ])
   }
   const deletePost = async (docID) => {
      try {
         await deleteDoc(doc(db, 'PetList', docID))

      }
      catch (error) {
         console.log(error);

      }
   }
   return <View style={styles.container}>
      <FlatList
         refreshing={loader}
         data={userPostList}
         onRefresh={getPosts}
         numColumns={2}
         renderItem={({ index, item }) => (
            <View style={styles.itemContainer}>
               <PetListItem key={index} item={item} callingFrom={"myPosts"}></PetListItem>
               <Pressable onPress={() => { onDeletePost(item?.id) }} style={styles.btn} >
                  <Text style={styles.text}>Delete</Text>
               </Pressable>
            </View>
         )}
      >
      </FlatList>
      {userPostList?.length == 0 &&
         <Text>No Post Found</Text>
      }
   </View>
}
export default UserPost;
const styles = StyleSheet.create({
   container: {
      padding: 10
   },
   itemContainer: {
      display: 'flex',
      alignItems: 'center',
      marginVertical: 10,
      marginHorizontal: 4,
      gap: 0,
      width: '49%'
   },
   btn: {
      backgroundColor: Colors.LIGHT_PRIMARY,
      width: '100%',
      paddingVertical: 5,
      borderRadius: 9
   },
   text: {
      fontFamily: 'outfit-medium',
      textAlign: 'center'
   }
})