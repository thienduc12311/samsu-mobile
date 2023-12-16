import { AntDesign, Feather } from '@expo/vector-icons'
import { isString } from 'radash'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import SpeakerCourseItem from '../components/SpeakerCourseItem'
import { COLORS, images } from '../constants'

const GradeTicketDetail = ({
    navigation, route
}: any) => {
    /***
     * Render header
     */
    const { ticket } = route.params;
    const getStatusColor = (status: number) => {
        if (status === 2) return COLORS.red;
        if (status === 1) return COLORS.green;
        if (status === 4) return COLORS.red;
        if (status === 3) return COLORS.green;
        return COLORS.gray4;
    }
    const getStatusText = (status: number) => {
        if (status === 4) return 'Rejected'
        if (status === 3) return 'Approved'
        if (status === 2) return 'Guarantee Rejected';
        if (status === 1) return 'Guarantee Approved'
        return 'Pending';
    }
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
        const [isTopicOpen, setIsTopicOpen] = useState(false)

        return (
            <View
                style={{
                    marginBottom: 146,
                }}
            >
                <Text style={styles.title}>{ticket.title}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View style={styles.itemContainer}>
                        {ticket.accepter !== null && <Text style={styles.itemTitle}>Score: {ticket.score}</Text>}
                    </View>
                    <Text style={styles.itemTitle}>Status: </Text>
                    <View
                        style={{
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            backgroundColor: getStatusColor(ticket.status),
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontFamily: 'regular',
                                color: COLORS.white,
                            }}
                        >
                            {getStatusText(ticket.status)}
                        </Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>Description</Text>
                <Text style={styles.body}>
                    {ticket.content}
                </Text>
                {isString(ticket.guarantorEmail) !== null && <View><Text style={styles.subtitle}>Guarantor</Text><Text>{ticket.guarantorEmail}</Text></View>}
                <Text style={styles.subtitle}>Attachment</Text>
                <Image
                    source={{ uri: ticket.evidenceUrls }}
                    resizeMode="contain"
                    style={styles.cover}
                />
                {ticket.accepter !== null && <View><Text style={styles.subtitle}>Support</Text>
                    <SpeakerCourseItem
                        instructorName={ticket.accepter?.name}
                        courseTitle={ticket.accepter.rollnumber}
                        instructorAvatar={images.avatar2}
                    />
                    <Text style={styles.subtitle}>Feedback</Text>
                    <Text style={styles.body}>
                        {ticket.feedback}
                    </Text>
                </View>}


            </View>
        )
    }

    /***
     * Render Footer
     */

    const renderFooter = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 140,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: COLORS.white,
                    padding: 16,
                    alignItems: 'center',
                    borderColor: 'rgba(0,0,0,.1)',
                    borderWidth: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.70)',
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 1,
                }}
            >

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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontFamily: 'regular',
        color: COLORS.black,
        marginLeft: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    cover: {
        height: 218,
        width: '100%',
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 16
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'bold',
        color: COLORS.black,
        marginTop: 8,
    },
    body: {
        fontSize: 14,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    chapter: {
        fontSize: 13,
        fontFamily: 'semiBold',
        color: COLORS.black,
        marginTop: 8,
    },
})
export default GradeTicketDetail
