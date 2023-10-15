import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import MyLearningCard from '../components/MyLearningCard'
import { MyLearningBootcamps, MyLearningCourses } from '../data/utils'

const MyLearning = ({
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
                    My Learning
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
                <Text style={styles.subtitle}>Course</Text>
                <FlatList
                    data={MyLearningCourses.slice(0, 3)} // Render only the first three elements
                    // @ts-expect-error TS(2769): No overload matches this call.
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MyLearningCard
                            image={item.image}
                            type={item.type}
                            chapter={item.chapter}
                            name={item.name}
                            description={item.description}
                            onPress={() => navigation.navigate('Detail')}
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
                <Text style={styles.subtitle}>Bootcamp</Text>
                <FlatList
                    data={MyLearningBootcamps.slice(0, 3)}
                    // @ts-expect-error TS(2769): No overload matches this call.
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MyLearningCard
                            image={item.image}
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
