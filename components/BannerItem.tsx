import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, images } from '../constants'

const BannerItem = () => {
    return (
        <LinearGradient
            colors={['rgba(150,150,150,1)', 'rgba(217,217,217,1)']}
            style={{
                height: 144,
                width: '100%',
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    marginLeft: 12,
                    marginTop: 22,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        color: COLORS.white,
                        fontFamily: 'medium',
                    }}
                >
                    50% Off
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: COLORS.white,
                        fontFamily: 'medium',
                    }}
                >
                    Take any course
                </Text>

                <TouchableOpacity
                    style={{
                        width: 90,
                        height: 26,
                        borderRadius: 6,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 22,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            color: 'rgba(150,150,150,1)',
                            fontFamily: 'medium',
                        }}
                    >
                        Join Now
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Image
                    source={images.banner2}
                    resizeMode="contain"
                    style={{
                        width: 216,
                        height: 193,
                        bottom: 49,
                    }}
                />
            </View>
            <View></View>
        </LinearGradient>
    )
}

export default BannerItem
