import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { COLORS, SIZES, images } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import ChapterSectionItem from '../components/ChapterSectionItem'
import ChapterSectionItemPowerpoint from '../components/ChapterSectionItemPowerpoint'

const AccessChapter = ({
    navigation
}: any) => {
    /**
     * Render Header
     */
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrowleft"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather
                        name="more-horizontal"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Render content
     */

    const renderContent = () => {
        const [isSaved, setIsSaved] = useState(false)

        return (
            <View
                style={{
                    marginBottom: 46,
                }}
            >
                <Image
                    source={images.courseCover}
                    resizeMode="contain"
                    style={styles.cover}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={styles.title}>Front End HTML, CSS</Text>
                    <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
                        <FontAwesome
                            name={isSaved ? 'bookmark' : 'bookmark-o'}
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>Chapter 1 - Basic HTML</Text>

                {/* Render the section item from an api fetching */}
                <ChapterSectionItem
                    percentage="0"
                    title="Topic 1 - Part 1 - Introduction HTML"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
                <ChapterSectionItem
                    percentage="9"
                    title="Topic 2 - Part 1 - Introduction HTML"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
                <ChapterSectionItemPowerpoint
                    percentage="9"
                    title="Topic 2 - Part 1 - Introduction CSS"
                    duration="8:12"
                    link="https://example.com/path-to-your-pptx-file.pptx"
                />
                <ChapterSectionItem
                    percentage="3"
                    title="Topic 2 - Part 2 - Introduction CSS"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
                <ChapterSectionItem
                    percentage="3"
                    title="Topic 2 - Part 3 - Introduction CSS"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
            </View>
        )
    }

    /**
     * Render Footer
     */

    const renderFooter = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: SIZES.width,
                    backgroundColor: COLORS.white,
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 118,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: COLORS.primary,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'medium',
                            color: COLORS.white,
                        }}
                    >
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccessChapterContent')}
                    style={{
                        width: 118,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: COLORS.white,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'medium',
                            color: COLORS.primary,
                        }}
                    >
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
            {renderFooter()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontFamily: 'regular',
        color: COLORS.black,
        marginLeft: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    cover: {
        height: 218,
        width: '100%',
        borderRadius: 8,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'bold',
        color: COLORS.black,
        marginTop: 8,
    },
    body: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    chapter: {
        fontSize: 13,
        fontFamily: 'semiBold',
        color: COLORS.black,
        marginTop: 8,
    },
})

export default AccessChapter
