import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, icons } from '../constants'
import * as FileSystem from 'expo-file-system'

/** link sample 'https://example.com/path-to-your-pptx-file.pptx'
 * @param {*} param0
 * @returns
 */

const ChapterSectionItemPowerpoint = ({
    percentage,
    title,
    duration,
    link
}: any) => {
    const [isSectionOpen, setIsSectionOpen] = useState(false)

    const downloadPowerPoint = async () => {
        try {
            const fileUri = link // Replace with your file URL
            const fileInfo = await FileSystem.downloadAsync(
                fileUri,
                FileSystem.documentDirectory + 'your-presentation.pptx'
            )
            if (fileInfo.status === 200) {
                // File downloaded successfully
                Alert.alert(
                    'Downloaded',
                    'The PowerPoint file has been downloaded.'
                )
            } else {
                Alert.alert(
                    'Download Failed',
                    'Failed to download the PowerPoint file.'
                )
            }
        } catch (error) {
            console.error('Error downloading file:', error)
            Alert.alert(
                'Error',
                'An error occurred while downloading the file.'
            )
        }
    }

    return (
        <View style={styles.viewContainer}>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                    }}
                >
                    <View style={styles.percentageContainer}>
                        <Text style={styles.percentage}>{percentage}%</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.duration}>video {duration}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => setIsSectionOpen(!isSectionOpen)}
                >
                    <Image
                        source={isSectionOpen ? icons.arrowUp : icons.arrowDown}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                        }}
                    />
                </TouchableOpacity>
            </View>
            {isSectionOpen && (
                <View>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={icons.powerpoint}
                            resizeMode="contain"
                            style={{
                                height: 90,
                                width: 90,
                                marginTop: 12,
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={downloadPowerPoint}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: 'medium',
                                color: COLORS.primary,
                                textAlign: 'right',
                            }}
                        >
                            Download
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
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
})

export default ChapterSectionItemPowerpoint
