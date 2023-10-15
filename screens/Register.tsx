import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native'
import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import {
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Feather,
} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Input from '../components/Input'
import Button from '../components/Button'
import SocialButton from '../components/SocialButton'
import ToastItem from '../components/ToastItem'

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
    },
    formIsValid: false,
}

const Register = ({
    navigation
}: any) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isSuccess, setIsSuccess] = useState(false)

    const inputChangedHandler = useCallback(
        (inputId: any, inputValue: any) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

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
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>
                        You must first create an account to be able to access
                        the LearnConnect platform and be able to enjoy the
                        various available learning features.
                    </Text>
                </View>

                <View>
                    <Input
                        id="fullName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['fullName']}
                        placeholder="Full Name"
                        placeholderTextColor={COLORS.black}
                        iconPack={FontAwesome5}
                        icon="user"
                    />
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder="Your Email"
                        placeholderTextColor={COLORS.black}
                        keyboardType="email-address"
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
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['passwordConfirm']}
                        autoCapitalize="none"
                        id="passwordConfirm"
                        placeholder="Confirm Password"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                        iconPack={Feather}
                        icon="lock"
                    />
                    <Button
                        title="Create Account"
                        isLoading={isLoading}
                        filled
                        onPress={() => {
                            setIsSuccess(true)
                            navigation.navigate('Login')
                        }}
                        style={{ marginVertical: 10 }}
                    />
                    <Text style={styles.policy}>
                        By registering, it means that you agree to the Terms and
                        Conditions that apply.
                    </Text>
                    <View style={styles.separateLine} />
                    <SocialButton
                        name="Google"
                        icon={icons.google}
                        onPress={() => console.log('Login with google')}
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
