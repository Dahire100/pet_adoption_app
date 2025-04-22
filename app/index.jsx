import { Text, View, ActivityIndicator } from "react-native";
import { Link, Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export default function Index() {
  const { user, isLoaded } = useUser();
  const [isReady, setIsReady] = useState(false)
  console.log(user ? "user exists" : "user does not exists");
  useEffect(() => {
    if (isLoaded) {
      setIsReady(true)
    }
  }, [isLoaded, user])
  if (!isReady) {
    return <Text style={{
      fontFamily: 'outfit',
      fontSize: 18
    }}>Please wait for a moment...</Text>
  }

  return (
    <View>
      {/* <Redirect href={'/(tabs)/home'} /> */}
      {user ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/login'} />}
    </View>
  );
}
