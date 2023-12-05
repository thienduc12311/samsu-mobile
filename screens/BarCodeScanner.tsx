import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
import { get, post } from '../utils/helpers/api-helper';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const dubUrl = 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png';

export default function SnyBarCodeScanner(props: any) {
    const { onScan, onClose, children, navigation, route } = props;
    const { eventId } = route.params
    const [screen, setScreen] = useState('scan');
    const [scanned, setScanned] = useState(false);
    const [sizeQrCode, setSizeQrCode] = useState({ width: 0, height: 0 });
    const lineAnim = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [checkInStudentId, setCheckInStudentId] = useState(null)
    const onLineLayout = (event: any) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setSizeQrCode({ width: width, height: height });
    };


    useEffect(() => {
        handleAnimationLine();
    }, []);

    const handleAnimationLine = () => {
        lineAnim.setValue(0);
        Animated.timing(lineAnim, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: false,
        }).start(() => handleAnimationLine());
    };

    const transformLine = lineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, sizeQrCode?.height],
    });
    const handleCheckIn = async () => {
        try {
            const response = await post(`events/event/${eventId}/checkin/${checkInStudentId}`);
            if (response.status === 200) {
                const data = response.data;
                if ((data as any).success) {
                    Alert.alert('Success', `Successfully checked in for this studentId: ${checkInStudentId}!`, [
                        {
                            text: 'Ok',
                            onPress: () => {
                                // This function will be called when the user presses the 'OK' button in the alert
                                setScanned(false);
                                setModalVisible(false); // Show modal after scanning

                            },
                        },
                    ])
                } else {
                    Alert.alert('Fail', `${(response.data as any).message} studentId: ${checkInStudentId}!`, [
                        {
                            text: 'Ok',
                            onPress: () => {
                                // This function will be called when the user presses the 'OK' button in the alert
                                setScanned(false);
                                setModalVisible(false)
                            },
                        },
                    ])
                }
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', `Student already checked in: ${checkInStudentId}!`, [
                {
                    text: 'Retry',
                    onPress: () => {
                        // This function will be called when the user presses the 'OK' button in the alert
                        setScanned(false);
                        setModalVisible(false)
                    },
                },
            ])
        }
    }
    const handleBarCodeScanned = async ({
        type,
        data
    }: any) => {
        onScan && onScan(data);
        setScanned(true);
        setCheckInStudentId(data);
        try {
            const userProfile = await get(`users/event/${eventId}/profile/${data}`)
            if (userProfile.status === 200) {
                console.log(userProfile.data);
                setModalVisible(true); // Show modal after scanning
                setUserData(userProfile.data);
            } else {
                Alert.alert('Error', 'StudentId not found!');
            }
        } catch (error) {
            Alert.alert('Error', `StudentId: ${data} not found!`, [
                {
                    text: 'Retry',
                    onPress: () => {
                        // This function will be called when the user presses the 'OK' button in the alert
                        setScanned(false);
                    },
                },
            ])
        }

    };


    return (
        <View style={styles.main}>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />

            {(screen === 'scan' && (
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[styles.container]}>
                    <View style={styles.layerTop}></View>
                    <View style={styles.layerCenter}>
                        <View style={styles.layerLeft} />
                        <View style={styles.focused} onLayout={onLineLayout}>
                            <EdgeQRCode position="topRight" />
                            <EdgeQRCode position="topLeft" />
                            <Animated.View
                                style={[
                                    {
                                        transform: [{ translateY: transformLine }],
                                    },
                                    styles.lineAnim,
                                ]}
                            />
                            <EdgeQRCode position="bottomRight" />
                            <EdgeQRCode position="bottomLeft" />
                        </View>
                        <View style={styles.layerRight} />
                    </View>
                    <View style={styles.layerBottom} />
                </BarCodeScanner>
            )) ||
                (screen === 'data' && <View style={{ backgroundColor: 'white' }}>{children}</View>)}
            {/* Actions */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.close}>
                <View style={{ backgroundColor: 'rgba(0,0,0,.6)', width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 13 }}>
                    <Ionicons name="ios-close" size={20} color="#fff" />
                </View>
            </TouchableOpacity>
            {/* Modal for displaying user profile data */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    setScanned(false);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginBottom: 20 }}>Student Profile</Text>
                        {userData && (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: userData.avt ?? dubUrl }} style={{ width: 150, height: 150, marginBottom: 20 }} />
                                <Text>Name: {userData.name}</Text>
                                <Text>Roll Number: {userData.rollnumber}</Text>
                            </View>
                        )}
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false);
                                setScanned(false);
                            }} style={styles.cancelButton}>
                                <Text style={{ color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCheckIn} style={styles.checkInButton}>
                                <Text style={{ color: 'white' }}>Check In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.bottomAction}>
                <TouchableOpacity onPress={() => setScanned(false)}>
                    <View style={styles.bottomButtonAction}>
                        <Text style={styles.bottomTextAction}>Reset</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setScreen('scan')}>
                    <View style={styles.bottomButtonAction}>
                        <Text style={styles.bottomTextAction}>Scan</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setScreen('data')}>
                    <View style={styles.bottomButtonAction}>
                        <Text style={styles.bottomTextAction}>Data</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}
const EdgeQRCode = ({
    position
}: any) => {
    const edgeWidth = 20;
    const edgeHeight = 20;
    const edgeColor = '#FFF';
    const edgeBorderWidth = 4;
    const edgeRadius = 0;

    const defaultStyle = {
        width: edgeWidth,
        height: edgeHeight,
        borderColor: edgeColor,
    };
    const edgeBorderStyle = {
        topRight: {
            borderRightWidth: edgeBorderWidth,
            borderTopWidth: edgeBorderWidth,
            borderTopRightRadius: edgeRadius,
            top: edgeRadius,
            right: edgeRadius,
        },
        topLeft: {
            borderLeftWidth: edgeBorderWidth,
            borderTopWidth: edgeBorderWidth,
            borderTopLeftRadius: edgeRadius,
            top: edgeRadius,
            left: edgeRadius,
        },
        bottomRight: {
            borderRightWidth: edgeBorderWidth,
            borderBottomWidth: edgeBorderWidth,
            borderBottomRightRadius: edgeRadius,
            bottom: edgeRadius,
            right: edgeRadius,
        },
        bottomLeft: {
            borderLeftWidth: edgeBorderWidth,
            borderBottomWidth: edgeBorderWidth,
            borderBottomLeftRadius: edgeRadius,
            bottom: edgeRadius,
            left: edgeRadius,
        },
    };
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return <View style={[defaultStyle, styles[position + 'Edge'], edgeBorderStyle[position]]} />;
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    // action
    close: { position: 'absolute', top: Constants.statusBarHeight + 20, left: 20, width: 40, height: 40 },
    bottomAction: {
        backgroundColor: 'rgba(0,0,0,.6)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 90,
        position: 'absolute',
        width: deviceWidth,
        bottom: 0,
        left: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    bottomButtonAction: { alignItems: 'center', width: deviceWidth / 2 },
    bottomTextAction: { color: 'white', fontSize: 13, lineHeight: 22, fontFamily: 'Roboto_500Medium', marginTop: 4 },

    // layout
    main: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    container: {
        flex: 1,
        flexDirection: 'column',
        width: deviceHeight,
        height: deviceHeight / 2,
    },

    layerTop: {
        flex: 1,
        backgroundColor: opacity,
    },

    layerCenter: {
        flex: 1,
        flexDirection: 'row',
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity,
    },
    focused: {
        flex: 1,
        position: 'relative',
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 4,
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity,
    },

    layerBottom: {
        flex: 1,
        backgroundColor: opacity,
    }, checkInButton: {
        flex: 1,
        backgroundColor: COLORS.primary, // Green color for check-in
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: COLORS.backTransparent, // Red color for cancel
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    }
    ,
    // edge
    topLeftEdge: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    topRightEdge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftEdge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomRightEdge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    lineAnim: { height: 2, backgroundColor: '#fff' },
});
