import React from "react";
import { Tabs } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors'
const TabsLayout = () => {
   return (<Tabs
      screenOptions={{
         tabBarActiveTintColor: Colors.PRIMARY
      }}
   >
      <Tabs.Screen name="home"
         options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
         }}
      />
      <Tabs.Screen name="favorite"
         options={{
            title: 'Favorite',
            tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />
         }}
      />
      <Tabs.Screen name="inbox"
         options={{
            title: "Inbox",
            tabBarIcon: ({ color }) => <Ionicons name="chatbox" size={24} color={color} />
         }}
      />
      <Tabs.Screen name="profile"
         options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />
         }}
      />
   </Tabs>)
}
export default TabsLayout;