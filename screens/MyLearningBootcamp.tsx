import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { AntDesign, Feather } from '@expo/vector-icons'
import { MyLearningBootcamps } from '../data/utils'
import MyLearningCard from '../components/MyLearningCard'

const MyLearningBootcamp = ({
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
                    marginBottom: 22,
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
                    My Learning Bootcamp
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
        const [search, setSearch] = useState('')
        const [filteredBootcamps, setFilteredBootcamps] =
            useState(MyLearningBootcamps)

        const handleSearch = (text: any) => {
            setSearch(text)
            const filteredData = MyLearningBootcamps.filter((bootcamp) =>
                bootcamp.name.toLowerCase().includes(text.toLowerCase())
            )
            setFilteredBootcamps(filteredData)
        }

        return (
            <View>
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
                        onChangeText={handleSearch}
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
                <FlatList
                    data={filteredBootcamps} // Render only the first three elements
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
})
export default MyLearningBootcamp
