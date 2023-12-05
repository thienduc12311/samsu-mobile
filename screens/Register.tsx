import {
    AntDesign,
    Feather,
    FontAwesome5
} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios, { AxiosError } from 'axios'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import Input from '../components/Input'
import ToastItem from '../components/ToastItem'
import { COLORS, SIZES, icons } from '../constants'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'

const isTestMode = true

const initialState = {
    inputValues: {
        userName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : '',
    },
    inputValidities: {
        userName: false,
        email: false,
        password: false,
        confirmPassword: false,
    },
    formIsValid: false,
}

const Register = ({
    navigation
}: any) => {
    const [error, setError] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isSuccess, setIsSuccess] = useState(false)
    const { reset } = useNavigation();

    const inputChangedHandler = useCallback(
        (inputId: any, inputValue: any, refInputValue?: any) => {
            const result = validateInput(inputId, inputValue, refInputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )
    const handleUpdateProfile = async () => {
        const username = formState.inputValues['userName'];
        const password = formState.inputValues['password'];
        setError(null);
        try {
            // Get the access token from AsyncStorage
            const accessToken = await AsyncStorage.getItem('accessToken');
            console.log(accessToken)
            // Check if the access token exists
            if (accessToken) {
                // Create a config object with the Bearer token
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                // Make a PUT request to update the user's profile
                const response = await axios.put(
                    'https://api.samsu-fpt.software/api/users/init', // Replace with your API endpoint
                    {
                        username,
                        password,
                    },
                    config
                );

                // If the request is successful, navigate to the main screen
                if (response.status === 201) {
                    setIsSuccess(true);
                    reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    });
                } else {
                    // Handle the error, e.g., show an error message

                }
            } else {
                // Handle the case where there's no access token in AsyncStorage
                // You might want to prompt the user to log in or take appropriate action.
            }
        } catch (error) {
            console.error('Update profile request failed:', (error as AxiosError).response?.data);
            const errorMessage = (error as AxiosError).response?.data;
            setError((errorMessage as any).message);
            // Handle errors related to AsyncStorage, Axios, or any other unexpected errors
        }
    };

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar hidden />
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                {isSuccess && (
                    <ToastItem
                        toastBackground="rgba(5, 156, 106, .2)"
                        icon={icons.success}
                        iconColor={COLORS.green}
                        description="Your account is successfully registered"
                        descriptionColor={COLORS.green}
                    />
                )}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Update Account Information</Text>
                    <Text style={styles.subtitle}>
                        You must first create an account to be able to access
                        the SamSu platform and be able to enjoy the
                        various available learning features.
                    </Text>
                </View>

                <View>
                    <Input
                        id="userName"
                        onInputChanged={inputChangedHandler}
                        autoCapitalize="none"
                        errorText={formState.inputValidities['userName']}
                        placeholder="UserName"
                        placeholderTextColor={COLORS.black}
                        iconPack={FontAwesome5}
                        icon="user"
                    />
                    <Input
                        onInputChanged={(inputId: any, inputValue: any) => {
                            inputChangedHandler(inputId, inputValue, formState.inputValues.confirmPassword);
                        }}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder="Password"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                        iconPack={Feather}
                        icon="lock"
                    />
                    <Input
                        onInputChanged={(inputId: any, inputValue: any) => {
                            inputChangedHandler(inputId, inputValue, formState.inputValues.password);
                        }}
                        errorText={formState.inputValidities['confirmPassword']}
                        autoCapitalize="none"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                        iconPack={Feather}
                        icon="lock"
                    />
                    <Button
                        title="Update Account"
                        isLoading={isLoading}
                        filled
                        onPress={handleUpdateProfile
                        }
                        style={{ marginVertical: 10 }}
                    />
                    <Text style={styles.policy}>
                        By registering, it means that you agree to the Terms and
                        Conditions that apply.
                    </Text>
                    <View style={styles.separateLine} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        bckgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
    headerContainer: {
        marginVertical: 22,
    },
    title: {
        fontSize: SIZES.h3,
        fontFamily: 'bold',
        textAlign: 'center',
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'regular',
        textAlign: 'center',
        color: COLORS.black,
    },
    policy: {
        fontSize: 12,
        fontFamily: 'regular',
        textAlign: 'center',
        color: COLORS.black,
    },
    separateLine: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 0.3,
        marginVertical: 16,
    },
})

export default Register
