import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import MyLearningCard from '../components/MyLearningCard'
import { COLORS } from '../constants'
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

    const { user } = state;
    useEffect(() => {
        let upcomingEvents: any[] = [];
        let pastEvents: any[] = [];

        // Simulate fetching questions from an API 
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

        fetchData();
    }, [isFocused]); 
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
                    Public Event
                </Text>
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
                <Text style={styles.subtitle}>Events:</Text>
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
                    onPress={() => navigation.navigate('MyLearningCourse')}
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
                <ScrollView showsVerticalScrollIndicator={false}>
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
