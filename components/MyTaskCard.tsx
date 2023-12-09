import { Ionicons } from '@expo/vector-icons'
import { DateTime } from 'luxon'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { isNumber } from 'validate.js'
import { COLORS, SIZES } from '../constants'

const MyTaskCard = ({
    percentage,
    title,
    duration,
    deadline,
    onPress,
    status
}: any) => {
    const timeDeadline = deadline ?? 1;
    const date = DateTime.fromMillis(timeDeadline).setZone('Asia/Bangkok');
    const getStatusColor = (status: number) => {
        switch (status) {
            case 1:
                return COLORS.green
            case 2:
                return COLORS.red
            case 3:
                return COLORS.green
            case 4:
                return COLORS.green
            case 5:
                return COLORS.orange
            default:
                return COLORS.gray4
        }
    }
    const getStatusText = (status: number) => {
        switch (status) {
            case 1:
                return 'Accepted'
            case 2:
                return 'Rejected'
            case 3:
                return 'Completed'
            case 4:
                return 'Finished'
            case 5:
                return 'Did not finish'
            default:
                return 'Pending'
        }
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.viewContainer}>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                    }}
                >
                    {percentage == 100 ? (
                        <>
                            <Ionicons
                                name="document-text"
                                size={24}
                                color={COLORS.black}
                            />
                        </>
                    ) : (
                        <View style={styles.percentageContainer}>
                            <Text style={styles.percentage}>{percentage}%</Text>
                        </View>
                    )}
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.duration}>{duration}</Text>
                        {isNumber(deadline) ? <Text style={styles.deadline}>Deadline: {date.toFormat('HH:mm dd/MM/yyyy')}</Text> : null}
                    </View>
                    <View>
                        <View
                            style={{
                                paddingVertical: 2,
                                paddingHorizontal: 6,
                                backgroundColor: getStatusColor(status),
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
                                {getStatusText(status)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        width: SIZES.width - 32,
        borderColor: 'rgba(0,0,0,.1)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginRight: 12,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 6,
    },
    percentageContainer: {
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: '#F0F4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    percentage: {
        fontSize: 12,
        fontFamily: 'medium',
        color: COLORS.primary,
    },
    title: {
        fontSize: 13,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    duration: {
        fontSize: 10,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    video: {
        height: 120,
        width: '100%',
    },
    viewContainer: {
        borderColor: 'rgba(0,0,0,.1)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 6,
    },
    deadline: {
        fontSize: 10,
        fontFamily: 'regular',
        color: COLORS.red, // Customize the color as needed
    },
})

export default MyTaskCard
