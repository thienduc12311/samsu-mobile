import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, icons, images } from '../constants'
import KeywordItem from '../components/KeywordItem'
import { bootcamps, courses, keywordsData } from '../data/utils'
import BannerItem from '../components/BannerItem'
import CourseCard from '../components/CourseCard'
import { ScrollView } from 'react-native-virtualized-view'
import BootcampCard from '../components/BootcampCard'

const Home = ({
    navigation
}: any) => {
    /**
     * Render Home header
     */

    const renderHeader = () => {
        return (
            <View>
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={images.avatar2}
                                resizeMode="contain"
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    marginRight: 12,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'semiBold',
                                    color: COLORS.black,
                                }}
                            >
                                Hallo, Fahmi Haecal
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}
                    >
                        <Image
                            source={icons.bell}
                            resizeMode="contain"
                            style={{
                                height: 24,
                                width: 24,
                                tintColor: COLORS.black,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /**
     * Render search bar
     */

    const renderSearchBar = () => {
        const [search, setSearch] = useState('')

        return (
            <View>
                <View
                    style={{
                        marginVertical: 12,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                        }}
                    >
                        Find a course you
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                        }}
                    >
                        want to learn.
                    </Text>
                </View>
                <View
                    style={{
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        // @ts-expect-error TS(2339): Property 'tertiary' does not exist on type '{ prim... Remove this comment to see the full error message
                        backgroundColor: COLORS.tertiary,
                        flexDirection: 'row',
                        borderRadius: 8,
                        marginBottom: 16,
                        borderColor: COLORS.gray6,
                        borderWidth: 1,
                        // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
                        borderRadius: 8,
                        shadowColor: 'rgba(255, 255, 255, 0.1)',
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                        elevation: 1, // This is for Android shadow
                    }}
                >
                    <TextInput
                        placeholder="Search course here..."
                        // @ts-expect-error TS(2339): Property 'secondary' does not exist on type '{ pri... Remove this comment to see the full error message
                        placeholderTextColor={COLORS.secondary}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        style={{
                            fontSize: 14,
                            paddingHorizontal: 12,
                            flex: 1,
                        }}
                    />
                    <TouchableOpacity onPress={() => console.log('Search')}>
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                height: 24,
                                // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
                                height: 24,
                                // @ts-expect-error TS(2339): Property 'secondary' does not exist on type '{ pri... Remove this comment to see the full error message
                                tintColor: COLORS.secondary,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /***
     * Renderkeywords
     */

    const renderKeywords = () => {
        const [selectedKeywords, setSelectedKeywords] = useState([])
        const handleKeywordPress = (id: any) => {
            // @ts-expect-error TS(2345): Argument of type '(prevSelectedKeywords: never[]) ... Remove this comment to see the full error message
            setSelectedKeywords((prevSelectedKeywords) => {
                // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                if (prevSelectedKeywords.includes(id)) {
                    // Remove keyword from the selection if already selected
                    return prevSelectedKeywords.filter(
                        (keywordId) => keywordId !== id
                    )
                } else {
                    // Add keyword to the selection if not already selected
                    return [...prevSelectedKeywords, id]
                }
            })
        }
        return (
            <View style={{ marginVertical: 12 }}>
                <FlatList
                    data={keywordsData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <KeywordItem
                            item={item}
                            onPress={handleKeywordPress}
                            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                            selected={selectedKeywords.includes(item.id)}
                        />
                    )}
                />
            </View>
        )
    }

    /***
     * Render Banner
     */

    const renderBanners = () => {
        return (
            <View>
                <BannerItem />
            </View>
        )
    }

    /***
     * Render Courses
     */

    const renderCourses = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'semiBold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}
                    >
                        Courses
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: 'medium',
                                fontSize: 14,
                                color: COLORS.gray5,
                            }}
                        >
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CourseCard
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            numStudents={item.numStudents}
                            onPress={() => navigation.navigate('Detail')}
                        />
                    )}
                />
            </View>
        )
    }

    /**
     * Render Bootcamp
     */

    const renderBootcamps = () => {
        return (
            <View
                style={{
                    marginBottom: 60,
                    marginTop: 12,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'semiBold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}
                    >
                        Bootcamp
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: 'medium',
                                fontSize: 14,
                                color: COLORS.gray5,
                            }}
                        >
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={bootcamps}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <BootcampCard
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            numStudents={item.numStudents}
                            onPress={() => navigation.navigate('Detail')}
                        />
                    )}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderSearchBar()}
                    {renderBanners()}
                    {renderKeywords()}
                    {renderCourses()}
                    {renderBootcamps()}
                </ScrollView>
            </View>
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
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default Home
