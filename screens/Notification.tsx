import { AntDesign, Feather } from '@expo/vector-icons'
import React from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import NotificationCard from '../components/NotificationCard'
import { COLORS } from '../constants'

const Notification = ({
    navigation, route
}: any) => {
    /**
     * Render header
     */
    const { myTasks } = route.params;
    console.log(myTasks);
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
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    Notification
                </Text>
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
        return (
            <View style={{
                marginVertical: 4
            }}>
                <Text style={styles.subtitle}>This Week</Text>
                <FlatList
                    data={myTasks}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <NotificationCard
                                percentage={100}
                                title={item.task.title}
                                deadline={item.task.deadline}
                                duration={item.task.content}
                                creator={item.task.creator.name}
                                onPress={() =>
                                    navigation.navigate('TaskDetails', { task: item })
                                }
                            />
                        )
                    }}
                />
                {myTasks.length === 0 ? <Text>There is no notification</Text> : null}
                {/* <Text style={styles.subtitle}>This Week</Text>
                <FlatList
                    data={notifications}
                    // @ts-expect-error TS(2769): No overload matches this call.
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <NotificationCard
                                percentage={item.percentage}
                                title={item.title}
                                duration={item.duration}
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                        )
                    }}
                /> */}
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
export default Notification
