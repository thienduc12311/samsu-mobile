import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { AntDesign } from '@expo/vector-icons'

const CertificateCard = ({
    onPress,
    title,
    subtitle,
    image
}: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={image} resizeMode="contain" style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View>
                <AntDesign name="arrowright" size={24} color="black" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        borderRadius: 8,
        backgroundColor: '#F0F4FF',
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 999,
        marginRight: 16,
    },
    title: {
        fontSize: 13,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 11,
        fontFamily: 'regular',
        color: 'gray',
    },
})
export default CertificateCard
