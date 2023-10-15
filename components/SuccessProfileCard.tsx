import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, images } from '../constants'

const SuccessProfileCard = () => {
    return (
        <View
            style={{
                width: '100%',
                height: 70,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: 'black',
                padding: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Image
                source={images.success1}
                resizeMode="contain"
                style={{
                    height: 50,
                    width: 50,
                    borderRadius: 44,
                    marginRight: 12,
                }}
            />
            <View
                style={{
                    flex: 1,
                }}
            >
                <Text
                    style={{
                        fontSize: 13,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    Your personal information is complete
                </Text>
                <Text
                    style={{
                        fontSize: 11,
                        fontFamily: 'regular',
                        color: 'gray',
                    }}
                >
                    Thank you for filling in your personal information for
                    course administration purposes.
                </Text>
            </View>
        </View>
    )
}

export default SuccessProfileCard
