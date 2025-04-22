import { Text, View, Image, Pressable, ScrollView } from "react-native"
import Colors from "./../../constants/Colors.ts"
import React from "react";
import * as WebBrowser from 'expo-web-browser'
import { Link, useNavigation } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
export const useWarmUpBrowser = () => {
   React.useEffect(() => {
      void WebBrowser.warmUpAsync()
      return () => {
         void WebBrowser.coolDownAsync()
      }
   }, [])
}
WebBrowser.maybeCompleteAuthSession()
const LoginScreen = () => {
   const navigation = useNavigation()
   useWarmUpBrowser()
   const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
   const onPress = React.useCallback(async () => {
      try {
         const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
            redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
         })

         if (createdSessionId) {
            await setActive({ session: createdSessionId });
            navigation.navigate('/(tabs)/home');
         } else {
            // Use signIn or signUp for next steps such as MFA
         }
      } catch (err) {
         console.error('OAuth error', err)
      }
   }, [navigation])

   return (
      <ScrollView
         style={{
            backgroundColor: Colors.WHITE,
            height: '100%',
         }}>
         <Image
            source={require('./../../assets/images/login.png')}
            style={{
               width: "100%",
               height: 500
            }}
         />
         <View
            style={{
               padding: 20
            }}>
            <Text
               style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 30,
                  textAlign: 'center'
               }}
            >Ready to make a new friend?</Text>
            <Text
               style={{
                  fontFamily: 'outfit',
                  fontSize: 18,
                  textAlign: 'center',
                  color: Colors.GRAY,
                  marginTop: 10
               }}>
               Let's adopt the pet which you like and make there life happy again
            </Text>
            <Pressable
               onPress={onPress}
               style={{
                  padding: 14,
                  marginTop: 10,
                  backgroundColor: Colors.PRIMARY,
                  width: '100%',
                  borderRadius: 14
               }}>
               <Text
                  style={{
                     textAlign: 'center',
                     fontSize: 20,
                     fontFamily: 'outfit-medium'
                  }}
               >Get Started</Text>
            </Pressable>
         </View>
      </ScrollView>
   )
}
export default LoginScreen;