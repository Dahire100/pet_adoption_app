import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  getDoc,
  doc,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // ✅ fixed import path
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

const Chats = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUserDetails();

    const messageQuery = query(
      collection(db, 'Chats', params?.id, 'Messages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data()
      }));
      setMessages(messageData);
    });

    return () => unsubscribe();
  }, []);

  const getUserDetails = async () => {
    try {
      const docRef = doc(db, 'Chats', params?.id);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      const otherUser = result?.users.filter(
        item => item.email !== user.primaryEmailAddress.emailAddress
      );

      if (otherUser?.length > 0) {
        navigation.setOptions({
          headerTitle: otherUser[0].name
        });
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const onSend = async (newMessages = []) => {
    const newMessage = {
      ...newMessages[0],
      createdAt: moment().valueOf()
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );

    try {
      await addDoc(collection(db, 'Chats', params.id, 'Messages'), newMessage);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl
      }}
    />
  );
};

export default Chats;
