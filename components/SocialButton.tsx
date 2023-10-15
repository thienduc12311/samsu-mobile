import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
const SocialButton = ({
    icon,
    name,
    onPress
}: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={icon} resizeMode="contain" style={styles.icon} />
            <Text style={{ ...FONTS.h3 }}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        height: 56,
        borderWidth: 2,
        borderRadius: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        flexDirection: 'row',
        borderColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 1, // This is for Android shadow
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 8,
    },
})

export default SocialButton
