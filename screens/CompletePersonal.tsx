import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants'
import {
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Feather,
} from '@expo/vector-icons'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Input from '../components/Input'
import Button from '../components/Button'
import Checkbox from 'expo-checkbox'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import DatePicker from 'react-native-modern-datepicker'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { getFormatedDate } from 'react-native-modern-datepicker'

const isTestMode = true

const initialState = {
    inputValues: {
        shortName: isTestMode ? 'Joe' : '',
        fullName: isTestMode ? 'John Doe' : '',
        phoneNumber: isTestMode ? '++62 878 26938755' : '',
        university: isTestMode ? '' : '',
    },
    inputValidities: {
        shortName: false,
        fullName: false,
        phoneNumber: false,
        university: false,
    },
    formIsValid: false,
}

const CompletePersonal = ({
    navigation
}: any) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isMaleChecked, setMaleChecked] = useState(false)
    const [isFemaleChecked, setFemaleChecked] = useState(false)
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
    const today = new Date()
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        'YYYY/MM/DD'
    )
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [startedDate, setStartedDate] = useState('12/12/2023')

    function handleChangeStartDate(propDate: any) {
        setStartedDate(propDate)
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker)
    }

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
    /**
     * Render header
     */
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrowleft"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    Personal Information
                </Text>
                <TouchableOpacity>
                    <Feather
                        name="more-horizontal"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView>
                    <Text style={styles.subtitle}>Short Name</Text>
                    <Input
                        id="shortName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['shortName']}
                        placeholder="Short Name"
                        placeholderTextColor={COLORS.black}
                        iconPack={FontAwesome5}
                        icon="user"
                    />
                    <Text style={styles.subtitle}>Full Name</Text>
                    <Input
                        id="fullName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['fullName']}
                        placeholder="Full Name"
                        placeholderTextColor={COLORS.black}
                        iconPack={FontAwesome5}
                        icon="user"
                    />
                    <Text style={styles.subtitle}>Phone Number</Text>
                    <Input
                        id="phoneNumber"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['phoneNumber']}
                        placeholder="Your Phone Number"
                        placeholderTextColor={COLORS.black}
                        keyboardType="numeric"
                        iconPack={MaterialCommunityIcons}
                        icon="phone-outline"
                    />

                    <Text style={styles.subtitle}>Gender</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 16,
                            }}
                        >
                            <Checkbox
                                style={styles.checkbox}
                                value={isMaleChecked}
                                onValueChange={setMaleChecked}
                                color={
                                    isMaleChecked ? COLORS.primary : undefined
                                }
                            />
                            <Text style={styles.paragraph}>Male</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Checkbox
                                style={styles.checkbox}
                                value={isFemaleChecked}
                                onValueChange={setFemaleChecked}
                                color={
                                    isFemaleChecked ? COLORS.primary : undefined
                                }
                            />
                            <Text style={styles.paragraph}>Female</Text>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Birthday</Text>
                    <View>
                        <TouchableOpacity
                            style={styles.inputBtn}
                            onPress={handleOnPressStartDate}
                        >
                            <Text>{selectedStartDate}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.subtitle}>School or University</Text>

                    <Input
                        id="university"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['university']}
                        placeholder="Name Your School"
                        placeholderTextColor={COLORS.black}
                        iconPack={MaterialCommunityIcons}
                        icon="home-outline"
                    />
                    <Button
                        title="Save"
                        isLoading={isLoading}
                        filled
                        onPress={() => {
                            setIsSuccess(true)
                            navigation.navigate('Login')
                        }}
                        style={{ marginVertical: 10 }}
                    />
                </ScrollView>
                {/* Create modal for date picker */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openStartDatePicker}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                                mode="calendar"
                                minimumDate={startDate}
                                selected={startedDate}
                                onDateChanged={handleChangeStartDate}
                                onSelectedChange={(date: any) => setSelectedStartDate(date)
                                }
                                options={{
                                    backgroundColor: '#185DCF',
                                    textHeaderColor: '#469ab6',
                                    textDefaultColor: '#FFFFFF',
                                    selectedTextColor: '#FFF',
                                    mainColor: '#469ab6',
                                    textSecondaryColor: '#FFFFFF',
                                    borderColor: 'rgba(122, 146, 165, 0.1)',
                                }}
                            />

                            <TouchableOpacity onPress={handleOnPressStartDate}>
                                <Text style={{ color: 'white' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
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
    subtitle: {
        fontSize: 16,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
        color: COLORS.black,
    },
    checkbox: {
        margin: 8,
        height: 14,
        width: 14,
    },
    inputBtn: {
        width: '100%',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
        borderRadius: 12,
        borderWidth: 1,
        marginVertical: 5,
        flexDirection: 'row',
        borderColor: COLORS.gray4,
        height: 52,
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 35,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default CompletePersonal
