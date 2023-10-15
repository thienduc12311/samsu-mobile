import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, icons, images } from '../constants'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import SpeakerCourseItem from '../components/SpeakerCourseItem'
import ChapterItem from '../components/ChapterItem'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'

const Detail = ({
    navigation
}: any) => {
    /***
     * Render header
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
        const [isTopicOpen, setIsTopicOpen] = useState(false)

        return (
            <View
                style={{
                    marginBottom: 146,
                }}
            >
                <Image
                    source={images.courseCover}
                    resizeMode="contain"
                    style={styles.cover}
                />
                <Text style={styles.title}>Front End HTML, CSS</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View style={styles.itemContainer}>
                        <AntDesign name="staro" size={20} color="#FDBD31" />
                        <Text style={styles.itemTitle}>4.7</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Ionicons
                            name="ios-people-outline"
                            size={20}
                            color="#9747FF"
                        />
                        <Text style={styles.itemTitle}>235</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={20}
                            color="#185DCF"
                        />
                        <Text style={styles.itemTitle}>Group discussion</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Feather name="bookmark" size={20} color="black" />
                        <Text style={styles.itemTitle}>Saved</Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>Description</Text>
                <Text style={styles.body}>
                    HTML and CSS are the two basic technologies in website
                    creation. HTML (HyperText Markup Language) is used to create
                    the structure and content of the website, while CSS
                    (Cascading Style Sheets) is used to set the appearance and
                    layout of the website. With HTML and CSS, we can create cool
                    and visually appealing websites that are easily accessible
                    to users.
                </Text>
                <Text style={styles.subtitle}>Speaker Course</Text>

                <SpeakerCourseItem
                    instructorName="Fahmi Haecal"
                    courseTitle="Front End Web Developer, Tokopedia"
                    instructorAvatar={images.avatar2}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.subtitle}>Course</Text>
                    <View
                        style={{
                            paddingHorizontal: 6,
                            paddingVertical: 3,
                            borderRadius: 4,
                            backgroundColor: COLORS.green,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.white,
                            }}
                        >
                            Free
                        </Text>
                    </View>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.chapter}>
                            FE HTML CSS - Chapter 1 - Basic HTML
                        </Text>

                        <TouchableOpacity
                            onPress={() => setIsTopicOpen(!isTopicOpen)}
                        >
                            <Image
                                source={
                                    isTopicOpen
                                        ? icons.arrowUp
                                        : icons.arrowDown
                                }
                                resizeMode="contain"
                                style={{
                                    height: 18,
                                    width: 18,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    {isTopicOpen && (
                        <View>
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 1 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 2 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 3 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 4 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                        </View>
                    )}
                </View>
            </View>
        )
    }

    /***
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
                    height: 140,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: COLORS.white,
                    padding: 16,
                    alignItems: 'center',
                    borderColor: 'rgba(0,0,0,.1)',
                    borderWidth: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.70)',
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 1,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: 'medium',
                        color: COLORS.black,
                        paddingHorizontal: 32,
                        textAlign: 'center',
                        marginBottom: 12,
                    }}
                >
                    Subscribe to PREMIUM for access to all materials.
                </Text>
                <Button
                    title="Buy Course"
                    filled
                    onPress={() => navigation.navigate('BuyMethod')}
                    style={{
                        height: 46,
                        width: '100%',
                    }}
                />
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
export default Detail
