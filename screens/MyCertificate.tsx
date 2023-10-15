import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'

const MyCertificate = ({
    navigation
}: any) => {
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
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

                    <TouchableOpacity>
                        <AntDesign
                            name="clouddownloado"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>

                <Image
                    source={images.certificate}
                    resizeMode="contain"
                    style={{
                        height: 200,
                        width: '100%',
                        marginVertical: 100,
                    }}
                />
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
})
export default MyCertificate
