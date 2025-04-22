import { collection, getDocs, where, query } from "firebase/firestore";
import { View, Text, FlatList } from "react-native";
import { db } from "../../firebaseConfig"; // ✅ fixed path
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";
import UserItem from "../../components/inbox/userItems";

const Inbox = () => {
   const { user } = useUser();
   const navigate = useNavigation();
   const [userList, setUserList] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      if (user) {
         getUserList();
      }
   }, [user]);

   // Get user list based on current user's email
   const getUserList = async () => {
      setLoader(true);
      setUserList([]);
      try {
         const q = query(
            collection(db, 'Chats'),
            where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
         );
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
            setUserList((prev) => [...prev, doc.data()]);
         });
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
   };

   // Filter out the other user in each chat
   const mapOtherUserList = () => {
      const list = [];
      userList.forEach((record) => {
         const otherUser = record.users?.filter(
            (item) => item?.email !== user?.primaryEmailAddress?.emailAddress
         );
         const result = {
            docId: record.id,
            ...otherUser[0],
         };
         list.push(result);
      });
      return list;
   };

   return (
      <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
         <FlatList
            onRefresh={getUserList}
            refreshing={loader}
            data={mapOtherUserList()}
            renderItem={({ item, index }) => (
               <UserItem key={index} userInfo={item} />
            )}
         />
      </View>
   );
};

export default Inbox;
