import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS } from '../constants'
import { keywordsData } from '../data/utils'
import KeywordItem from '../components/KeywordItem'
import BookmarkItem from '../components/BookmarkItem'

const Bookmark = ({
    navigation
}: any) => {
    /***
     * Render header
     */

    const renderHeader = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    Bookmark
                </Text>
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

    /**
     * Render content
     */

    const renderContent = () => {
        return (
            <View>
                <BookmarkItem
                    title="FE HTML CSS - Chapter 1 - Basic HTML"
                    subtitle="Topic 1 - part 1 - Introducing HTML"
                    onPress={() => navigation.navigate('AccessChapter')}
                />
                <BookmarkItem
                    title="FE HTML CSS - Chapter 2 - Basic HTML"
                    subtitle="Topic 2 - part 2 - Introducing HTML"
                    onPress={() => navigation.navigate('AccessChapter')}
                />
                <BookmarkItem
                    title="FE HTML CSS - Chapter 3 - Basic HTML"
                    subtitle="Topic 3 - part 3 - Introducing HTML"
                    onPress={() => navigation.navigate('AccessChapter')}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                {renderKeywords()}
                <ScrollView>{renderContent()}</ScrollView>
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
        padding: 16,
    },
})
export default Bookmark
