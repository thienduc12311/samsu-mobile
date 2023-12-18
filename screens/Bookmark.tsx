import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import BookmarkItem from '../components/BookmarkItem'
import KeywordItem from '../components/KeywordItem'
import { COLORS, FONTS, icons } from '../constants'
import { get } from '../utils/helpers/api-helper'

export const STATUS = [
    { id: '0', keyword: 'All', status: -1 },
    { id: '1', keyword: 'Pending', status: 0 },
    { id: '2', keyword: 'Guarantee Approved', status: 1 },
    { id: '3', keyword: 'Guarantee Rejected', status: 2 },
    { id: '4', keyword: 'Approved', status: 3 },
    { id: '5', keyword: 'Rejected', status: 4 },
]

const Bookmark = ({
    navigation
}: any) => {
    /***
     * Render header
     */
    const windowDimensions = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true); // Loading state
    const [tickets, setTickets] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState<number[]>([-1]); // No default status
    const [filteredTickets, setFilteredTickets] = useState<any[]>(tickets);
    const searchTickets = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        const tasksToFilter = tickets;

        const filterByTitle = (task: any) => task.title.toLowerCase().includes(lowerCaseQuery);
        const filterByStatus = (task: any) => selectedKeywords.length === 0 || selectedKeywords.includes(task.status);

        const filtered = selectedKeywords[0] !== -1
            ? tasksToFilter.filter((task) => filterByTitle(task) && filterByStatus(task))
            : tasksToFilter.filter(filterByTitle);

        setFilteredTickets(filtered);
    };
    const applyStatusFilter = (id: number) => {
        if (selectedKeywords.length === 1 && id === -1) {
            // "All" status selected, skip status filter
            const filtered = tickets.filter((task: any) =>
                task.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredTickets(filtered);
        } else {
            // Apply both search and status filters
            const tasks = tickets;
            const filtered = tasks.filter((task: any) =>
                task.title.toLowerCase().includes(search.toLowerCase()) && (id === task.status)
            );
            setFilteredTickets(filtered);
        }
    };
    const handleKeywordPress = (id: number) => {
        setSelectedKeywords([id]);
        applyStatusFilter(id);
    };
    const fetchData = async () => {
        try {
            const response = await get('/gradeTicket');
            if (response.status === 200) {
                setTickets((response.data as any).content);
                setFilteredTickets((response.data as any).content);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once the data is fetched or an error occurs
        }
    };
    const onRefresh = async () => {
        setRefreshing(true);

        // Fetch new data or update existing data
        await fetchData();

        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, [isFocused]);
    const [search, setSearch] = useState('')

    const [image, setImage] = useState(null);
    const getBlob = async (fileUri: any) => {
        const resp = await fetch(fileUri);
        const imageBody = await resp.blob();
        return imageBody;
    };

    const renderSearchBar = () => {

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
                        Find a your ticket
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                        }}
                    >

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
                        placeholder="Search ticket here..."
                        // @ts-expect-error TS(2339): Property 'secondary' does not exist on type '{ pri... Remove this comment to see the full error message
                        placeholderTextColor={COLORS.secondary}
                        value={search}
                        onChangeText={(text) => {
                            setSearch(text);
                            searchTickets(text);
                        }}
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
                    Grade ticket
                </Text>
            </View>
        )
    }

    /***
     * Renderkeywords
     */

    const renderKeywords = () => {

        return (
            <View style={{ marginVertical: 12 }}>
                <FlatList
                    data={STATUS}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <KeywordItem
                            item={item}
                            onPress={() => handleKeywordPress(item.status)}
                            selected={selectedKeywords.includes((item as any).status)}
                        />
                    )}
                />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        )
    }

    /**
     * Render content
     */

    const renderContent = () => {
        if (loading) {
            return (
                <View >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }
        return (
            <View>
                <FlatList
                    data={filteredTickets}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => (item as any).id}
                    renderItem={({ item }) => (
                        <BookmarkItem
                            title={(item as any).title}
                            subtitle={(item as any).content}
                            status={(item as any).status}
                            onPress={() => navigation.navigate('GradeTicketDetail', { ticket: item })}
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
                {renderSearchBar()}
                {renderKeywords()}
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>{renderContent()}</ScrollView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        padding: 10,
                    }}
                    onPress={() => navigation.navigate('SubmitGradeTicket')}
                >
                    <Ionicons
                        name="add-circle"
                        size={24}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
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
