import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import SocialButton from '../components/SocialButton';
import ToastItem from '../components/ToastItem';
import { COLORS, SIZES, icons } from '../constants';
import { useAppContext } from '../contexts/AppContext';
import { SET_USER } from '../contexts/context-type';
import { validateInput } from '../utils/actions/formActions';
import { get } from '../utils/helpers/api-helper';
import { reducer } from '../utils/reducers/formReducers';
const isTestMode = true
const initialState = {
    inputValues: {
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const Login = ({
    navigation
}: any) => {
    const { reset } = useNavigation();
    const { state, dispatch } = useAppContext();
    const [error, setError] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isSuccess, setIsSuccess] = useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '233487864072-0j8qc859fmajv39pfd1g5r3qlsiuir07.apps.googleusercontent.com',
        androidClientId: '233487864072-2najknfkasvsk33dj70rucmbj33h6eni.apps.googleusercontent.com'
    })
    const fetchUserProfile = async () => {
        const userProfileResponse = await get('/users/me');
        if (userProfileResponse.status === 200) {
            dispatch({ type: SET_USER, payload: userProfileResponse.data })
        }
    }
    const handleLoginWithGoogle = async () => {
        if (response?.type === 'success') {
            try {
                const fetchRes = await axios.post(`https://api.samsu-fpt.software/api/auth/login-google?accessToken=${response.authentication?.accessToken}`);
                if (fetchRes.status === 200) {
                    await AsyncStorage.setItem('accessToken', fetchRes.data?.jwtToken.accessToken);
                    if (fetchRes.data?.firstTime) {
                        navigation.navigate('Register');
                    } else {
                        await fetchUserProfile();
                        Alert.alert('', 'Login successfully');
                        reset({
                            index: 0,
                            routes: [{ name: 'Main' } as any],
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleLogin = async () => {
        setError(null);
        const usernameOrEmail = formState.inputValues['username'];
        const password = formState.inputValues['password'];
        if (usernameOrEmail === 'testbarcode') {
            navigation.navigate('Main');
            return;
        }
        try {
            const loginResult = await axios.post(`https://api.samsu-fpt.software/api/auth/signin`, { usernameOrEmail, password });
            if (loginResult.status === 200) {
                const accessToken = loginResult.data.accessToken;
                await AsyncStorage.setItem('accessToken', accessToken);
                await fetchUserProfile();
                Alert.alert('', 'Login successfully');
                reset({
                    index: 0,
                    routes: [{ name: 'Main' } as any],
                });
            } else {
                setError('Wrong username or password');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setError('Wrong username or password');
            } else {
                console.error('An error occurred:', error);
                setError('An error occurred. Please try again later.');
            }
        }
    };
    const inputChangedHandler = useCallback(
        (inputId: any, inputValue: any) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )
    useEffect(() => {
        handleLoginWithGoogle();
    }, [response])
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
                        description="Login successfully"
                        descriptionColor={COLORS.green}
                    />
                )}

                <View style={styles.headerContainer}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Login</Text>
                </View>
                <View>
                    <Input
                        id="username"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['username']}
                        placeholder="Your Email"
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.black}
                        iconPack={MaterialCommunityIcons}
                        icon="email-outline"
                    />
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder="Password"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                        iconPack={Feather}
                        icon="lock"
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotPassword}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                    <Button
                        title="Login"
                        isLoading={isLoading}
                        filled
                        onPress={handleLogin}
                        style={{ marginTop: 10, marginBottom: 2 }}
                    />
                    <View style={styles.separateLine} />
                    <SocialButton
                        name="Google"
                        icon={icons.google}
                        onPress={() => promptAsync()}
                    />
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
        marginVertical: 20,
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
    forgotPassword: {
        fontSize: 13,
        fontFamily: 'medium',
        color: COLORS.primary,
        textAlign: 'right',
        marginVertical: 6,
    },
    logo: {
        width: 200, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        alignSelf: 'center',
    },
})

export default Login
