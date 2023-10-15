import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather } from '@expo/vector-icons'
import { COLORS } from '../constants'
import Button from '../components/Button'

const BuyMethod = ({
    navigation
}: any) => {
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
                    Payment Method
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

    /**
     * Render content
     */

    const renderContent = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 12,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 88,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                            backgroundColor: COLORS.primary,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: 'medium',
                                color: COLORS.white,
                            }}
                        >
                            Automatic
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Manual')
                        }}
                        style={{
                            width: 88,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                            backgroundColor: COLORS.white,
                            borderColor: COLORS.primary,
                            borderWidth: 1,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: 'medium',
                                color: COLORS.primary,
                            }}
                        >
                            Manual
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: 'semiBold',
                            color: COLORS.black,
                            marginTop: 16,
                        }}
                    >
                        Payment Details
                    </Text>

                    <View style={styles.viewContainer}>
                        <Text style={styles.viewLeft}>Price Course</Text>
                        <Text style={styles.viewRight}>$243</Text>
                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.viewLeft}>Discount</Text>
                        <Text style={styles.viewRight}>-</Text>
                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.viewLeft}>
                            Service fee for student
                        </Text>
                        <Text style={styles.viewRight}>$1</Text>
                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.viewLeft}>Total Price</Text>
                        <Text style={styles.viewRight}>$244</Text>
                    </View>

                    <Button
                        title="Buy Course by Midtrans"
                        filled
                        onPress={() => navigation.navigate('BuyMethodMidtrans')}
                        style={{
                            width: '100%',
                            marginTop: 16,
                        }}
                    />
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                {renderContent()}
            </View>
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
    viewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewLeft: {
        fontSize: 13,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    viewRight: {
        fontSize: 13,
        fontFamily: 'medium',
        color: COLORS.black,
    },
})

export default BuyMethod
