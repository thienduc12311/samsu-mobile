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
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import MyLearningCard from '../components/MyLearningCard'
import { COLORS, FONTS, icons } from '../constants'
import { useAppContext } from '../contexts/AppContext'
import { get } from '../utils/helpers/api-helper'
import { isParticipated } from '../utils/helpers/event-helper'

const MyLearning = ({
    navigation
}: any) => {
    /***
     * Render header
     */
    const [loading, setLoading] = useState(true); // Loading state
    const [search, setSearch] = useState('');
    const { state } = useAppContext();
    const [events, setEvents] = useState<any[]>([]);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);

    const { user } = state;
    useEffect(() => {
        let upcomingEvents: any[] = [];
        let pastEvents: any[] = [];
        fetchData();
    }, []);
    const onRefresh = async () => {
        setRefreshing(true);

        // Fetch new data or update existing data
        await fetchData();

        setRefreshing(false);
    };
    const fetchData = async () => {
        try {
            const response = await get('/events/public');
            if (response.status === 200) {
                const events = (response.data as any).content;
                setEvents(events);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once the data is fetched or an error occurs
        }
    };
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
                    Events
                </Text>
            </View>
        )
    }
    const renderSearchBar = () => {

        return (
            <View>
                <View
                    style={{
                        marginVertical: 3,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.black,
                        }}
                    >
                        Find a your event
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
                        placeholder="Search event here..."
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

    /**
     * Render content
     */

    const renderContent = () => {
        return (
            <View
                style={{
                    marginBottom: 64,
                }}
            >
                <FlatList
                    data={events} // Render only the first three elements
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MyLearningCard
                            image={(item as any).bannerUrl}
                            type={isParticipated(user?.rollnumber as string, item)}
                            numberOfParticipants={item.participants.length}
                            name={(item as any).title}
                            description={item.content}
                            eventStartTimestamp={item.startTime}
                            onPress={() => navigation.navigate('EventDetail', { event: item })}
                        />
                    )}
                />
                <TouchableOpacity
                    onPress={() => console.log('haha')}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'medium',
                            color: COLORS.black,
                            textAlign: 'center',
                        }}
                    >
                        See more
                    </Text>
                </TouchableOpacity>
                {/* <Text style={styles.subtitle}>Bootcamp</Text>
                <FlatList
                    data={MyLearningBootcamps.slice(0, 3)}
                    // @ts-expect-error TS(2769): No overload matches this call.
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MyLearningCard
                            // image={item.image}
                            type={item.type}
                            chapter={item.chapter}
                            name={item.name}
                            description={item.description}
                            onPress={() => navigation.navigate('Detail')}
                        />
                    )}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('MyLearningBootcamp')}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'medium',
                            color: COLORS.black,
                            textAlign: 'center',
                        }}
                    >
                        See all
                    </Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                {renderSearchBar()}
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}>
                    {loading ? (
                        // Render a loading spinner while fetching data
                        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
                    ) : renderContent()}
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
        padding: 16,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.black,
    },
})
export default MyLearning
