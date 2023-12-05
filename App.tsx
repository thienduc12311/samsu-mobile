import { BarCodeScanner } from 'expo-barcode-scanner'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback, useEffect } from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FONTS } from './constants/fonts'
import { AppContextProvider } from './contexts/AppContext'
import AppNavigation from './navigations/AppNavigation'
// async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS as Permission);
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//     }
// }
//Ignore all log notifications
LogBox.ignoreAllLogs()

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [fontsLoaded] = useFonts(FONTS)
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
        };
        // requestUserPermission();
        getBarCodeScannerPermissions();
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
