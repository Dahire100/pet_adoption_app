import { View, Text, Image } from "react-native"
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
const Header = () => {
   const { user, isLoaded } = useUser();
   const [isReady, setIsReady] = useState(false)
   useEffect(() => {
      if (isLoaded && user) {
         setIsReady(true)
      }
   }, [isLoaded, user])
   if (!isReady) {
      return <Text>loading</Text>
   }

   return (
      <View
         style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
         }}>
         <View>
            <Text
               style={{
                  fontFamily: 'outfit',
                  fontSize: 25
               }}
            >Welcome,</Text>
            <Text
               style={{
                  fontFamily: 'outfit-medium',
                  fontSize: 30
               }}
            >{user?.fullName}</Text>
         </View>
         <Image source={{ uri: user?.imageUrl }}
            style={{
               height: 40,
               width: 40,
               borderRadius: 99
            }} />
      </View>
   )
}
export default Header;