import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import { COLORS, SIZES, icons } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { AntDesign, Feather } from '@expo/vector-icons'
import PaymentCard from '../components/PaymentCard'
import SuccessModal from '../components/SuccessModal'
import RBSheet from 'react-native-raw-bottom-sheet'
import QRCode from 'react-native-qrcode-svg'
import Button from '../components/Button'

const BuyMethodMidtrans = ({
    navigation
}: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    const refRBSheet = useRef()
    const refRBBankSheet = useRef()
    // Replace with the data you want in the QR code
    const qrValue = 'Your QR Code Data Here'
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
                    Payment Method by Midtrans
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
                <Text style={styles.subtitle}>Total Price</Text>
                <Text style={styles.price}>$244</Text>
                <View style={styles.separateLine} />
                <Text style={styles.subtitle}>Your order</Text>
                <View style={styles.space}>
                    <Text
                        style={{
                            fontSize: 11,
                            color: COLORS.secondaryBlack,
                            fontFamily: 'regular',
                        }}
                    >
                        1 Front End HTML, CSS
                    </Text>
                    <Text
                        style={{
                            fontSize: 11,
                            color: COLORS.black,
                            fontFamily: 'regular',
                        }}
                    >
                        $ 244
                    </Text>
                </View>
                <View style={styles.separateLine} />
                <View style={styles.space}>
                    <Text style={styles.subtitle}>Total</Text>
                    <Text style={styles.subtitle}>$244</Text>
                </View>
                <View style={styles.separateLine} />
                <Text style={styles.subtitle}>Customer Details</Text>
                <Text
                    style={{
                        fontSize: 11,
                        color: COLORS.secondaryBlack,
                        fontFamily: 'regular',
                    }}
                >
                    Fahmi Haecal
                </Text>
                <View style={styles.separateLine} />
                <Text style={styles.subtitle}>Select Method</Text>
                <Text style={styles.subtitle2}>E-wallet</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <PaymentCard
                            icon={icons.card1}
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBSheet.current.open()}
                        />
                        <PaymentCard
                            icon={icons.card2}
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBSheet.current.open()}
                        />
                        <PaymentCard
                            icon={icons.card3}
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBSheet.current.open()}
                        />
                        <PaymentCard
                            icon={icons.card4}
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBSheet.current.open()}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={icons.arrowRight3}
                            resizeMode="contain"
                            style={{
                                height: 24,
                                width: 24,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle2}>Bank</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <PaymentCard
                            icon={icons.card5}
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBBankSheet.current.open()}
                        />
                        <PaymentCard
                            icon={icons.card6}
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBBankSheet.current.open()}
                        />
                        <PaymentCard
                            icon={icons.card7}
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            onPress={() => refRBBankSheet.current.open()}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={icons.arrowRight3}
                            resizeMode="contain"
                            style={{
                                height: 24,
                                width: 24,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.separateLine} />
                <Text style={styles.body}>
                    Midtrans is an online payment solution provider company
                    based in Indonesia. This company provides online payment
                    services that are integrated with various banks and
                    financial service providers in Indonesia, making it easier
                    for users to make transactions safely and easily.
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView>{renderContent()}</ScrollView>
            </View>
            <SuccessModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <RBSheet
                // @ts-expect-error TS(2769): No overload matches this call.
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.2)',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopRightRadius: 18,
                        borderTopLeftRadius: 18,
                    },
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'semiBold',
                            color: COLORS.black,
                        }}
                    >
                        Scan{' '}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'regular',
                            color: COLORS.black,
                        }}
                    >
                        the bar code on your e-wallet
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 22,
                    }}
                >
                    {/* use this to generate the qr code */}
                    {/* <QRCode value={qrValue} size={150} /> */}
                    <Image
                      source={icons.qr}
                      style={{
                        height: 150,
                        width: 150
                      }}
                    />
                </View>
            </RBSheet>
            <RBSheet
                // @ts-expect-error TS(2769): No overload matches this call.
                ref={refRBBankSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.2)',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopRightRadius: 18,
                        borderTopLeftRadius: 18,
                        height: 240,
                    },
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'regular',
                            color: COLORS.black,
                            textAlign: 'center',
                            marginHorizontal: 32,
                            marginTop: 16,
                        }}
                    >
                        Complete payment from BRI bank to the virtual account
                        number below.
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 22,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'regular',
                            color: COLORS.black,
                            textAlign: 'center',
                        }}
                    >
                        Virtual account number{' '}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'bold',
                            color: COLORS.black,
                            textAlign: 'center',
                        }}
                    >
                        85785776557868291
                    </Text>

                    <Button
                        title="Confirm By Whatsapp"
                        filled
                        onPress={() => navigation.navigate('Home')}
                        style={{
                            width: SIZES.width - 32,
                            marginVertical: 16,
                        }}
                    />
                </View>
            </RBSheet>
        </View>
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
    subtitle: {
        fontSize: 16,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    price: {
        fontSize: 28,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    separateLine: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.black,
        marginVertical: 6,
    },
    space: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    subtitle2: {
        fontSize: 13,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    body: {
        fontSize: 11,
        fontFamily: 'regular',
        color: COLORS.gray5,
    },
})

export default BuyMethodMidtrans
