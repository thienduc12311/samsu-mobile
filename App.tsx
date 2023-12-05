import messaging, { firebase } from '@react-native-firebase/messaging'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback, useEffect } from 'react'
import { Alert, LogBox, Permission, PermissionsAndroid } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FONTS } from './constants/fonts'
import { AppContextProvider } from './contexts/AppContext'
import AppNavigation from './navigations/AppNavigation'
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS as Permission);
async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}
const getToken = async () => {
    try {
        const token = await firebase.messaging().getToken();
        if (token) return token;
    } catch (error) {
        console.log(error);
    }
};

const getFCMToken = async () => {
    try {
        const authorized = await firebase.messaging().hasPermission();
        const fcmToken = await getToken();
        console.log(fcmToken);
        if (authorized) return fcmToken;

        await firebase.messaging().requestPermission();
        return fcmToken;
    } catch (error) {
        console.log(error);
    }
};
//Ignore all log notifications
LogBox.ignoreAllLogs()

SplashScreen.preventAutoHideAsync()
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

export default function App() {
    const [fontsLoaded] = useFonts(FONTS)
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
        };
        requestUserPermission();
        getBarCodeScannerPermissions(); 
        getFCMToken();
    }, []);
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert((remoteMessage.notification?.title as string), (remoteMessage.notification?.body));
        });

        return unsubscribe;
    }, []);
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <AppContextProvider>
            <SafeAreaProvider onLayout={onLayoutRootView}>
                <AppNavigation />
            </SafeAreaProvider>
        </AppContextProvider>
    )
}
