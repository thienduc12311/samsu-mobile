import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export const launchImagePicker = async () => {
    await checkMediaPermissions()

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    })

    if (!result.canceled) {
        // @ts-expect-error TS(2339): Property 'uri' does not exist on type 'ImagePicker... Remove this comment to see the full error message
        return result.uri
    }
}

const checkMediaPermissions = async () => {
    if (Platform.OS !== 'web') {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
        if (permissionResult === false) {
            return Promise.reject('We need permission to access your photos')
        }
    }

    return Promise.resolve()
}
