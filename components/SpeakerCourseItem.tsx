import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'

const SpeakerCourseItem = ({
    instructorName,
    courseTitle,
    instructorAvatar
}: any) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.instructorName}>{instructorName}</Text>
                <Text style={styles.courseTitle}>{courseTitle}</Text>
            </View>
            <Image
                source={instructorAvatar}
                resizeMode="contain"
                style={styles.avatar}
            />
        </View>
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
        shadowColor: '#000',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginRight: 12,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 6,
    },
    instructorName: {
        fontSize: 13,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    courseTitle: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 999,
    },
})
export default SpeakerCourseItem
