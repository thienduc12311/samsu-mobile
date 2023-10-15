import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const MyLearningCard = ({
    image,
    type,
    chapter,
    name,
    description,
    onPress
}: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Image
                source={image}
                resizeMode="contain"
                style={{
                    height: 110,
                    width: 110,
                }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            backgroundColor:
                                type === 'Free' ? COLORS.green : COLORS.primary,
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontFamily: 'regular',
                                color: COLORS.white,
                            }}
                        >
                            {type}
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            backgroundColor: '#F0F4FF',
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontFamily: 'regular',
                                color: COLORS.black,
                            }}
                        >
                            {chapter}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    {name}
                </Text>
                <Text
                    style={{
                        fontSize: 11,
                        fontFamily: 'regular',
                        color: 'gray',
                    }}
                >
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default MyLearningCard
