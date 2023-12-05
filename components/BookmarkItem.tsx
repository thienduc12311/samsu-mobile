import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES, icons } from '../constants'

const BookmarkItem = ({
    title,
    subtitle,
    onPress,
    status = 0
}: any) => {
    const [isOpen, setIsOpen] = useState(false)
    const getStatusColor = (status: number) => {
        if (status === 2) return COLORS.red;
        if (status === 1) return COLORS.green;
        return COLORS.gray4;
    }
    const getStatusText = (status: number) => {
        if (status === 2) return 'Rejected';
        if (status === 1) return 'Approved'
        return 'Pending';
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'semiBold',
                        fontSize: 13,
                        color: COLORS.black,
                    }}
                >
                    {title}
                </Text>
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
                <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                    <Image
                        source={isOpen ? icons.arrowDown : icons.arrowUp}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                        }}
                    />
                </TouchableOpacity>
            </View>
            {isOpen && (
                <Text
                    style={{
                        fontFamily: 'regular',
                        fontSize: 12,
                        color: 'gray',
                    }}
                >
                    {subtitle}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        marginVertical: 4,
    },
})

export default BookmarkItem
