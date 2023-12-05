import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';

const BannerItem = ({
    navigation
}: any) => {
    return (
        <ImageBackground
            source={require('../assets/images/fptuni.jpeg')} // Replace 'images.bannerBackgroundImage' with your image source
            style={{
                height: 144,
                width: '100%',
                borderRadius: 20,                
                flexDirection: 'row',
                overflow: 'hidden',
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
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: COLORS.white,
                        fontFamily: 'medium',
                    }}
                >
                    Take event tour now!
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
                    onPress={() => navigation.navigate('MyLearning')}

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
            </View>
            <View></View>
        </ImageBackground>
    );
};

export default BannerItem;
