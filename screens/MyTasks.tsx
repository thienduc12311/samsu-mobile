import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import KeywordItem from '../components/KeywordItem'
import MyTaskCard from '../components/MyTaskCard'
import { COLORS, FONTS, icons } from '../constants'
import { hasTimestampPassed } from '../utils/date'
import { get } from '../utils/helpers/api-helper'
export const STATUS = [
    { id: '0', keyword: 'All', status: -1 },
    { id: '1', keyword: 'Accepted', status: 1 },
    { id: '2', keyword: 'Pending', status: 0 },
    { id: '3', keyword: 'Rejected', status: 2 },
    { id: '4', keyword: 'Completed', status: 3 },
    { id: '5', keyword: 'Finished', status: 4 },
    { id: '6', keyword: 'Did not finish', status: 5 },
    { id: '7', keyword: 'Expired', status: 6 },
]

const MyTasks = ({
    navigation
}: any) => {
    /***
     * Render header
    * Render header
     */
    const windowDimensions = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true); // Loading state
    const [myTasks, setMyTasks] = useState<any[]>([]);
    const [selectedKeywords, setSelectedKeywords] = useState<number[]>([-1]); // No default status
    const [filteredTasks, setFilteredTasks] = useState<any[]>(myTasks);

    const searchTasks = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        const tasksToFilter = myTasks;

        const filterByTitle = (task: any) => task.task.title.toLowerCase().includes(lowerCaseQuery);
        const filterByStatus = (task: any) => selectedKeywords.length === 0 || selectedKeywords.includes(task.status);

        const filtered = selectedKeywords[0] !== -1
            ? tasksToFilter.filter((task) => filterByTitle(task) && filterByStatus(task))
            : tasksToFilter.filter(filterByTitle);

        setFilteredTasks(filtered);
    };
    const getTaskStatus = (task: any) => {
        if (task.status === 0 && hasTimestampPassed(task.task.deadline || 1))
            return 6;
        return task.status;
    }
    const applyStatusFilter = (id: number) => {
        if (selectedKeywords.length === 1 && id === -1) {
            // "All" status selected, skip status filter
            const filtered = myTasks.filter((task) =>
                task.task.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredTasks(filtered);
        } else {
            // Apply both search and status filters
            const tasks = myTasks;
            const filtered = tasks.filter((task) =>
                task.task.title.toLowerCase().includes(search.toLowerCase()) && id === (getTaskStatus(task))
            );
            setFilteredTasks(filtered);
        }
    };
    const handleKeywordPress = (id: number) => {
        setSelectedKeywords([id]);
        applyStatusFilter(id);
    };

    const fetchData = async () => {
        try {
            const response = await get('/tasks/me');
            if (response.status === 200) {
                setMyTasks((response.data as any).content);
                setFilteredTasks((response.data as any).content);
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
                        Find a your task
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
                            searchTasks(text);
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
                    My Tasks
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
            </View>
        )
    }

    /**
     * Render content
     */

    const renderContent = () => {
        if (loading) {
            // Render a loading spinner
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }
        return (
            <View>
                <FlatList
                    data={filteredTasks} // Use filteredTasks only when search is not empty
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MyTaskCard
                            percentage={100}
                            title={item.task.title}
                            deadline={item.task.deadline}
                            duration={item.task.content}
                            status={item.status}
                            onPress={() =>
                                navigation.navigate('TaskDetails', { task: item })
                            }
                        />
                    )}
                    contentContainerStyle={{ marginBottom: 40 }} // Add some padding to the bottom
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
        marginBottom: 60
    },
})
export default MyTasks
