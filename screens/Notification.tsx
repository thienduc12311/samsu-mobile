import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather } from '@expo/vector-icons'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { notifications } from '../data/utils'
import NotificationCard from '../components/NotificationCard'

const Notification = ({
    navigation
}: any) => {
    /**
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
            <View>
                <Text style={styles.subtitle}>Yesterday</Text>
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
                />
                <Text style={styles.subtitle}>This Week</Text>
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
