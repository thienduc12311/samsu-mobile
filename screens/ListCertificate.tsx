import { AntDesign, Feather } from '@expo/vector-icons'
import { isArray } from 'radash'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'
import CertificateCard from '../components/CertificateCard'
import { COLORS, illustrations, images } from '../constants'
import { useAppContext } from '../contexts/AppContext'
import { get } from '../utils/helpers/api-helper'

const ListCertificate = ({
    navigation
}: any) => {
    /**
     * Render header
     */
    const { state, dispatch } = useAppContext();
    const { myEvents, semesters, user } = state;
    const semestersData = semesters?.map((semester) => { return { label: semester.name, value: semester.name } })
    const [selectedSemester, setSelectedSemester] = useState('FA23');
    const [isSemesterOpen, setSemesterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [achievement, setAchievement] = useState<any>()
    useEffect(() => {
        const fetchCurrentPoint = async () => {
            setLoading(true); // Set loading to true before making the API call
            try {
                const achievementResponse = await get(`/achievements/semester/${selectedSemester}/me`);
                if (achievementResponse.status === 200) {
                    const achievement = (achievementResponse.data as any).content as any[];
                    setAchievement(achievement)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after API call completes
            }
        };

        fetchCurrentPoint();
    }, [selectedSemester])
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
        if (loading) {
            return (
                <View>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }
        if (!isArray(achievement) || achievement?.length === 0) return renderContent();
        return (
            <FlatList
                data={achievement}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CertificateCard
                        title={item.title}
                        subtitle={item.content}
                        image={images.certificate}
                        onPress={() => navigation.navigate('MyCertificate', { pdfUrl: item.url })}
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
                    You don't have any certificate yet
                </Text>

                <Button
                    title="Join Event"
                    filled
                    onPress={() => {
                        navigation.navigate('MyLearning')
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
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.subtitle}>Semester: </Text>
                    <DropDownPicker
                        open={isSemesterOpen}
                        value={selectedSemester}
                        items={semestersData as any}
                        setOpen={setSemesterOpen}
                        setValue={setSelectedSemester}
                        searchable={true}
                    />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* {renderContent()} */}
                    {renderCertificate()}
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
