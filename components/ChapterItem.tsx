import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'

const ChapterItem = ({
    percentage,
    title,
    duration,
    onPress
}: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                }}
            >
                <View style={styles.percentageContainer}>
                    <Text style={styles.percentage}>{percentage}%</Text>
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.duration}>{duration}</Text>
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
        marginBottom: 12,
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
        fontSize: 12,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
})

export default ChapterItem
