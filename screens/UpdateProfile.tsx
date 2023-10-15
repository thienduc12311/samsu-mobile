import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {
    useState,
    useReducer,
    useCallback,
    useEffect,
    useRef,
} from 'react'
import { ScrollView } from 'react-native-virtualized-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons, images } from '../constants'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Input from '../components/Input'
import Button from '../components/Button'
import {
    FontAwesome5,
    MaterialCommunityIcons,
    Feather,
} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import RBSheet from 'react-native-raw-bottom-sheet'
import MenuItem from '../components/MenuItem'
import { launchImagePicker } from '../utils/ImagePickerHelper'

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'Muhammad Fahmi Haecal' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : '',
        phoneNumber: isTestMode ? '+62 878 26938755' : '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
        phoneNumber: false,
    },
    formIsValid: false,
}

const UpdateProfile = () => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isSuccess, setIsSuccess] = useState(false)
    const [image, setImage] = useState(null)
    const refRBSheet = useRef()
    const refRBSuccessSheet = useRef()

    const inputChangedHandler = useCallback(
        (inputId: any, inputValue: any) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    useEffect(() => {
        if (error) {
            // @ts-expect-error TS(2304): Cannot find name 'Alert'.
            Alert.alert('An error occured', error)
        }
    }, [error])

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker()

            if (!tempUri) return

            // set the image
            // @ts-expect-error TS(2345): Argument of type '{ uri: any; }' is not assignable... Remove this comment to see the full error message
            setImage({ uri: tempUri })
        } catch (error) {}
    }

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar hidden />
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'semiBold',
                            color: COLORS.black,
                        }}
                    >
                        Update Profile
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            marginBottom: 52,
                        }}
                    >
                        <TouchableOpacity
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBSheet.current.open()}
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={image === null ? images.avatar : image}
                                resizeMode="contain"
                                style={{
                                    height: 90,
                                    width: 90,
                                    borderRadius: 9999,
                                    marginVertical: 12,
                                }}
                            />
                        </TouchableOpacity>

                        {/* update forms */}
                        <View>
                            <Input
                                id="fullName"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['fullName']
                                }
                                placeholder="Muhammad Fahmi Haecal"
                                placeholderTextColor={COLORS.black}
                                iconPack={FontAwesome5}
                                icon="user"
                            />
                            <Input
                                id="email"
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['email']}
                                placeholder="example@example.com"
                                placeholderTextColor={COLORS.black}
                                keyboardType="email-address"
                                iconPack={MaterialCommunityIcons}
                                icon="email-outline"
                            />
                            <Input
                                id="phoneNumber"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['phoneNumber']
                                }
                                placeholder="+62 878 26938755"
                                placeholderTextColor={COLORS.black}
                                keyboardType="numeric"
                                iconPack={MaterialCommunityIcons}
                                icon="phone-outline"
                            />
                            <Input
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['password']
                                }
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
                                errorText={
                                    formState.inputValidities['passwordConfirm']
                                }
                                autoCapitalize="none"
                                id="passwordConfirm"
                                placeholder="Confirm Password"
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={true}
                                iconPack={Feather}
                                icon="lock"
                            />
                            <Button
                                title="Save"
                                isLoading={isLoading}
                                filled
                                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                                onPress={() => refRBSuccessSheet.current.open()}
                                style={{
                                    marginTop: 10,
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <RBSheet
                // @ts-expect-error TS(2769): No overload matches this call.
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        height: 130,
                    },
                }}
            >
                <View
                    style={{
                        padding: 12,
                    }}
                >
                    <MenuItem
                        icon={icons.addFriend}
                        name="New profile picture"
                        onPress={pickImage}
                    />
                    <MenuItem
                        icon={icons.delete1}
                        name="Remove current picture"
                        iconStyle={{
                            tintColor: COLORS.red,
                        }}
                        nameStyle={{
                            color: COLORS.red,
                        }}
                        onPress={() => {
                            setImage(null)
                        }}
                    />
                </View>
            </RBSheet>
            <RBSheet
                // @ts-expect-error TS(2769): No overload matches this call.
                ref={refRBSuccessSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        height: 130,
                    },
                }}
            >
                <View
                    style={{
                        padding: 12,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={images.success1}
                        resizeMode="contain"
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLORS.black,
                            fontFamily: 'medium',
                        }}
                    >
                        Your data has been successfully Update
                    </Text>
                </View>
            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
})
export default UpdateProfile
