import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { AntDesign } from '@expo/vector-icons'

const CompleteProfileCard = ({
    onPress
}: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '100%',
                height: 70,
                borderRadius: 8,
                borderWidth: 0.6,
                borderColor: COLORS.primary,
                padding: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    height: 50,
                    width: 50,
                    borderRadius: 44,
                    marginRight: 12,
                    borderColor: 'gray',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: 'semiBold',
                        color: COLORS.primary,
                    }}
                >
                    20%
                </Text>
            </View>

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
                    Complete your personal information
                </Text>
                <Text
                    style={{
                        fontSize: 11,
                        fontFamily: 'regular',
                        color: 'gray',
                    }}
                >
                    Complete your personal information to make it easier for us
                    to record your course purposes
                </Text>
            </View>

            <View>
                <AntDesign name="arrowright" size={24} color="black" />
            </View>
        </TouchableOpacity>
    )
}

export default CompleteProfileCard
