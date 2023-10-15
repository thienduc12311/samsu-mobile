import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import { AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import Button from '../components/Button'
import ToastItem from '../components/ToastItem'
import OTPTextInput from 'react-native-otp-textinput'

const Verification = ({
    navigation
}: any) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const otpInput = useRef(null)

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
                        description="Success code verification"
                        descriptionColor={COLORS.green}
                    />
                )}

                <View style={styles.headerContainer}>
                    <Text style={styles.title}>OTP Verification</Text>
                    <Text style={styles.subtitle}>
                        Enter your email code to Reset Password{' '}
                    </Text>
                </View>

                <View>
                    <OTPTextInput
                        textInputStyle={styles.OTPStyle}
                        inputCount={4}
                        tintColor={COLORS.primary}
                    />

                    <Button
                        title="Verification"
                        isLoading={isLoading}
                        filled
                        onPress={() => {
                            setIsSuccess(true)
                            navigation.navigate('ResetPassword')
                        }}
                        style={{ marginTop: 10, marginBottom: 2 }}
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
    OTPStyle: {
        backgroundColor: COLORS.gray,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 10,
        height: 58,
        width: 58,
        borderBottomWidth: 1,
    },
})

export default Verification
