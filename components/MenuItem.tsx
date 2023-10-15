import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const MenuItem = ({
    icon,
    name,
    onPress,
    iconStyle,
    nameStyle
}: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 6,
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={[
                    {
                        height: 24,
                        width: 24,
                        tintColor: COLORS.black,
                        marginRight: 12,
                    },
                    iconStyle,
                ]}
            />
            <Text
                style={[
                    {
                        fontSize: 13,
                        fontFamily: 'medium',
                        color: COLORS.black,
                    },
                    nameStyle,
                ]}
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default MenuItem
