import React, { useState } from 'react'
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'
import CompleteProfileCard from '../components/CompleteProfileCard'
import MenuItem from '../components/MenuItem'
import { COLORS, icons, images } from '../constants'

const Profile = ({
    navigation
}: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    /***
     * Render header
     */
    const renderHeader = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    Profile
                </Text>
            </View>
        )
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}
                    >
                        <View
                            style={{
                                height: 260,
                                width: 260,
                                justifyContent: 'center',
                                backgroundColor: COLORS.white,
                                borderRadius: 12,
                                padding: 16,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'bold',
                                    fontSize: 16,
                                    color: COLORS.black,
                                    textAlign: 'center',
                                }}
                            >
                                Help Center
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'regular',
                                    fontSize: 13,
                                    color: 'gray',
                                    textAlign: 'center',
                                }}
                            >
                                If there are problems with the application,
                                difficulty accessing the course or if you have
                                questions, you can contact Whatsapp
                            </Text>
                            <Button
                                title="WhatsApp"
                                filled
                                onPress={() => navigation.navigate('Home')}
                                style={{
                                    width: 200,
                                    height: 56,
                                    marginVertical: 22,
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    /**
     * Render content
     */
    const renderContent = () => {
        return (
            <View
                style={{
                    marginBottom: 52,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={images.avatar}
                        resizeMode="contain"
                        style={{
                            height: 90,
                            width: 90,
                            borderRadius: 9999,
                            marginVertical: 12,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: 'semiBold',
                            fontSize: 15,
                            color: COLORS.black,
                        }}
                    >
                        Fahmi Haecal
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'regular',
                            fontSize: 13,
                            color: 'gray',
                        }}
                    >
                        Haecal78@gmail.com
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('UpdateProfile')}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: 30,
                            // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
                            width: 85,
                            borderRadius: 4,
                            backgroundColor: COLORS.primary,
                            marginVertical: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'semiBold',
                                fontSize: 13,
                                color: COLORS.white,
                            }}
                        >
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>
                <CompleteProfileCard
                    onPress={() => navigation.navigate('CompletePersonal')}
                />

                <View
                    style={{
                        marginTop: 16,
                    }}
                >
                    <MenuItem
                        name="Certificate"
                        icon={icons.quality}
                        onPress={() => navigation.navigate('ListCertificate')}
                    />
                    <MenuItem
                        name="BarCodeScanner"
                        icon={icons.quality}
                        onPress={() => navigation.navigate('BarCodeScanner')}
                    />
                    <MenuItem
                        name="History Transaction"
                        icon={icons.document2}
                        onPress={() => navigation.navigate('ListHistory')}
                    />
                    <MenuItem
                        name="FAQ"
                        icon={icons.faq}
                        onPress={() => console.log('Faq')}
                    />
                    <MenuItem
                        name="Terms & Conditions"
                        icon={icons.document}
                        onPress={() =>
                            navigation.navigate('TermsAndConditions')
                        }
                    />
                    <MenuItem
                        name="Rating App or Give Input"
                        icon={icons.star}
                        onPress={() => console.log('Rating App or Give Input')}
                    />
                    <MenuItem
                        name="Help Center"
                        icon={icons.whatsapp}
                        onPress={() => setModalVisible(true)}
                    />
                </View>
                <View
                    style={{
                        borderTopColor: COLORS.gray,
                        borderWidth: 0.3,
                        width: '100%',
                        marginVertical: 8,
                    }}
                />
                <MenuItem
                    name="Logout"
                    icon={icons.exit}
                    onPress={() => console.log('Logout')}
                    iconStyle={{
                        tintColor: COLORS.red,
                    }}
                    nameStyle={{
                        color: COLORS.red,
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
            {renderModal()}
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
export default Profile
