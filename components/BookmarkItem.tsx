import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, icons } from '../constants'

const BookmarkItem = ({
    title,
    subtitle,
    onPress
}: any) => {
    const [isOpen, setIsOpen] = useState(false)

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
