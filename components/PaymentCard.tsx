import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const PaymentCard = ({
    icon,
    onPress
}: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 60,
                height: 40,
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(0,0,0,.1)',
                shadowColor: 'rgba(0, 0, 0, 0.10)',
                paddingHorizontal: 12,
                marginRight: 12,
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 1,
                backgroundColor: COLORS.white,
                paddingVertical: 6,
                borderWidth: 1,
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 50,
                    height: 28,
                }}
            />
        </TouchableOpacity>
    )
}

export default PaymentCard
