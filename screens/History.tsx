import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather } from '@expo/vector-icons'
import { COLORS, images } from '../constants'
import Button from '../components/Button'

const History = ({
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
                    Transaction
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
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                >
                    <Image
                        source={images.learnconnect}
                        resizeMode="contain"
                        style={{
                            height: 60,
                            width: 200,
                        }}
                    />
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
                        <Text style={styles.viewLeft}>Payment Method</Text>
                        <Text style={styles.viewRight}>Paypal</Text>
                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.viewLeft}>Transaction ID</Text>
                        <Text style={styles.viewRight}>20232303</Text>
                    </View>
                    <View style={styles.viewContainer}>
                        <Text style={styles.viewLeft}>Date</Text>
                        <Text style={styles.viewRight}>
                            23 Mar 2023 | 06.34
                        </Text>
                    </View>

                    <Button
                        title="Share"
                        filled
                        onPress={() => navigation.navigate('ListHistory')}
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

export default History
