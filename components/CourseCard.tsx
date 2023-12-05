import { DateTime } from 'luxon'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, icons } from '../constants'


const CourseCard = ({
    image,
    name,
    startDate = 1,
    numStudents,
    onPress
}: any) => {
    const date = DateTime.fromMillis(startDate).setZone('Asia/Bangkok');

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={{ uri: image }} resizeMode="cover" style={styles.image} />
            <View>
                <Text style={styles.name}>{name.slice(0, 20)}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={icons.people}
                            resizeMode="contain"
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.primary,
                                marginRight: 6,
                            }}
                        />
                        <Text style={styles.numStudents}>{numStudents}</Text>
                    </View>
                    <Text style={styles.startDate}>{date.toFormat('HH:mm dd/MM/yyyy')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        with: 172,
        height: 168,
        borderRadius: 8,
        backgroundColor: COLORS.white,
        borderColor: 'rgba(0,0,0,.1)',
        marginBottom: 12,
        shadowColor: '#000',
        paddingHorizontal: 12,
        marginRight: 12,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        padding: 2,
        borderWidth: 0.2,
    },
    image: {
        width: 172,
        height: 95,
        borderRadius: 8,
    },
    name: {
        fontSize: 14,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    numStudents: {
        fontSize: 12,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
    startDate: {
        fontSize: 12,
        fontFamily: 'semiBold',
        color: COLORS.black,
    },
})

export default CourseCard
