import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, illustrations } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { AntDesign, Feather } from '@expo/vector-icons'
import Button from '../components/Button'
import { certificates } from '../data/utils'
import CertificateCard from '../components/CertificateCard'

const ListCertificate = ({
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
                    My Certificate
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
     * render certificate
     */

    const renderCertificate = () => {
        return (
            <FlatList
                data={certificates}
                // @ts-expect-error TS(2769): No overload matches this call.
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CertificateCard
                        title={item.title}
                        subtitle={item.subtitle}
                        image={item.image}
                        onPress={() => navigation.navigate('MyCertificate')}
                    />
                )}
            />
        )
    }

    /**
     * Render content
     */
    const renderContent = () => {
        return (
            <View style={{ alignItems: 'center', marginVertical: 22 }}>
                <Image
                    source={illustrations.illustration4}
                    resizeMode="contain"
                    style={styles.illustration}
                />
                <Text style={styles.title}>No certificate</Text>
                <Text style={styles.subtitle}>
                    Your course hasn't finished yet, please continue your course
                    first
                </Text>

                <Button
                    title="Next Learning"
                    filled
                    onPress={() => {
                        navigation.navigate('Detail')
                    }}
                    style={{
                        marginVertical: 22,
                        width: '100%',
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
                    {/* {renderCertificate()} */}
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
    title: {
        fontSize: 16,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 13,
        fontFamily: 'regular',
        color: 'gray',
        textAlign: 'center',
    },
    illustration: {
        height: 250,
        width: 250,
        marginVertical: 22,
    },
})

export default ListCertificate
