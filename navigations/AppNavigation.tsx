import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { SET_USER } from '../contexts/context-type'
import {
    AccessChapter,
    AccessChapterContent,
    BarCodeScannerScreen,
    BuyMethod,
    BuyMethodMidtrans,
    CompletePersonal,
    Detail,
    ForgotPassword,
    History,
    ListCertificate,
    ListHistory,
    Login,
    MyCertificate,
    MyLearning,
    MyLearningBootcamp,
    MyLearningCourse,
    Notification,
    Onboarding1,
    Onboarding2,
    Onboarding3,
    Profile,
    Register,
    ResetPassword,
    TermsAndConditions,
    UpdateProfile,
    Verification,
} from '../screens'
import EventDetail from '../screens/EventDetail'
import FeedbackAnswer from '../screens/FeedbackAnswer'
import GradeTicketDetail from '../screens/GradeTicketDetails'
import MyTasks from '../screens/MyTasks'
import SubmitGradeTicket from '../screens/SubmitGradeTicket'
import TaskDetails from '../screens/TaskDetails'
import { get } from '../utils/helpers/api-helper'
import BottomTabNavigation from './BottomTabNavigation'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { state, dispatch } = useAppContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfileResponse = await get('/users/me');
            if (userProfileResponse.status === 200) {
                dispatch({ type: SET_USER, payload: userProfileResponse.data })
                setIsLoggedIn(true);
            }
        }
        const checkIfLoggedIn = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched')
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true')
                    // @ts-expect-error TS(2345): Argument of type 'true' is not assignable to param... Remove this comment to see the full error message
                    setIsFirstLaunch(true)
                } else {
                    // @ts-expect-error TS(2345): Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
                    setIsFirstLaunch(false)
                }
            } catch (error) {
                // @ts-expect-error TS(2345): Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
                setIsFirstLaunch(false)
            }
            setIsLoading(false) // Set loading state to false once the check is complete
        }
        fetchUserProfile();
        checkIfLoggedIn()
    }, [])

    if (isLoading) {
        return null // Render a loader or any other loading state component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isLoggedIn ? 'Main' : 'Login'}
            >
                <Stack.Screen
                    name="Onboarding1"
                    component={Onboarding1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding2"
                    component={Onboarding2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding3"
                    component={Onboarding3}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={BottomTabNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AccessChapter"
                    component={AccessChapter}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BuyMethod"
                    component={BuyMethod}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BuyMethodMidtrans"
                    component={BuyMethodMidtrans}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CompletePersonal"
                    component={CompletePersonal}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyTasks"
                    component={MyTasks}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GradeTicketDetail"
                    component={GradeTicketDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SubmitGradeTicket"
                    component={SubmitGradeTicket}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="History"
                    component={History}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ListCertificate"
                    component={ListCertificate}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BarCodeScanner"
                    component={BarCodeScannerScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Feedback"
                    component={FeedbackAnswer}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ListHistory"
                    component={ListHistory}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EventDetail"
                    component={EventDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TaskDetails"
                    component={TaskDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyCertificate"
                    component={MyCertificate}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyLearning"
                    component={MyLearning}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyLearningBootcamp"
                    component={MyLearningBootcamp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateProfile"
                    component={UpdateProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AccessChapterContent"
                    component={AccessChapterContent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyLearningCourse"
                    component={MyLearningCourse}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
