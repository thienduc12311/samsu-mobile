import { View, Text, Image } from 'react-native'
import React from 'react'
import { SIZES } from '../constants'

const ToastItem = ({
    toastBackground,
    icon,
    iconColor,
    description,
    descriptionColor
}: any) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: SIZES.width - 32,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: toastBackground,
                borderRadius: 8,
            }}
        >
            <Image
                source={icon}
                style={{
                    height: 19,
                    width: 19,
                    tintColor: iconColor,
                    marginRight: 12,
                }}
            />
            <Text
                style={{
                    fontSize: 12,
                    fontFamily: 'regular',
                    color: descriptionColor,
                }}
            >
                {description}
            </Text>
        </View>
    )
}

export default ToastItem
