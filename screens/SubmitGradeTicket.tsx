import { AntDesign, Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import React, { useCallback, useState } from 'react'
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS } from '../constants'
import { post } from '../utils/helpers/api-helper'
const preSignedUrlEndpoint = 'https://upload.samsu-fpt.software/presigned-url';
const initialState = {
    inputValues: {
        email: '',
        password: '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}
const SubmitGradeTicket = ({
    navigation
}: any) => {
    /***
     * Render header
     */
    const handleSubmit = async () => {
        // Add your logic to handle the submission
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('Image URL:', imageUrl);
        if (title.length <= 0 || content.length <= 0 || imageUrl.length <= 0) {
            Alert.alert('Error', 'Title, Content and attachment must not be null!');
            return;
        }
        const response = await post('/gradeTicket', { title, content, evidenceUrls: imageUrl });
        if (response.status === 201) {
            Alert.alert('Success', 'Successfully created a ticket!');
            navigation.navigate('Bookmark')
        } else {
            Alert.alert('Failed', 'Failed to created a ticket!');
            navigation.navigate('Bookmark')
        }
    };
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    // const [title, setTitle] = useState('')
    // const [content, setContent] = useState('')
    // const [formState, dispatchFormState] = useReducer(reducer, initialState)

    // const inputChangedHandler = useCallback(
    //     (inputId: any, inputValue: any) => {
    //         const result = validateInput(inputId, inputValue)
    //         dispatchFormState({ inputId, validationResult: result, inputValue })
    //     },
    //     [dispatchFormState]
    // )
    let title = ''; // Remove the useState
    let content = ''; // Remove the useState

    const handleTitleChange = useCallback((text: string) => {
        title = text; // Directly update the variable
    }, []);

    const handleContentChange = useCallback((text: string) => {
        content = text; // Directly update the variable
    }, []);
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (result.canceled) {
            // If the user cancels, do nothing
            return;
        }

        setImage((result as any).uri);
        handleImageUpload(result.assets[0]?.uri);
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage((result.assets[0] as any).uri);
            handleImageUpload((result.assets[0] as any).uri);
        }
    };

    const handleImageUpload = async (imageUri: any) => {
        try {
            // Convert the image URI to a Blob object
            const token = await AsyncStorage.getItem('accessToken');

            const file = await fetch(imageUri);
            const blob = await file.blob();
            const urlWithQuery = `${preSignedUrlEndpoint}?filename=${encodeURIComponent((blob as any)._data.name)}`;

            // Fetch pre-signed POST data from the server
            const response = await fetch(urlWithQuery, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const preSignedPostData = await response.json();
                // Create a FormData object and append the image file
                const formData = new FormData();

                // Append the pre-signed POST fields to the FormData
                for (const field in preSignedPostData.fields) {
                    formData.append(field, preSignedPostData.fields[field]);
                }

                // Append the file to the FormData
                formData.append('file', {
                    uri: imageUri,
                    name: encodeURIComponent((blob as any)._data.name),
                    type: 'image/jpeg', // Adjust the content type based on the file type
                });


                // Use axios to send the POST request to the pre-signed URL
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                await axios.post(preSignedPostData.url, formData, axiosConfig).catch((error) => {
                    console.error('Error in axios.post:', error);
                });
                const downloadUrl = `${preSignedPostData.url}/${preSignedPostData.fields['key']}`;
                setImageUrl(downloadUrl);
            } else {
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
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
        const [isTopicOpen, setIsTopicOpen] = useState(false);

        return (
            <View
                style={{
                    marginBottom: 140,
                    marginTop: 30
                }}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Title</Text>
                    <TextInput
                        placeholder="Add title here..."
                        placeholderTextColor={COLORS.black}
                        onChangeText={handleTitleChange}
                        style={[styles.inputField, { height: 30 }]}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Content</Text>
                    <TextInput
                        placeholder="Add content here..."
                        placeholderTextColor={COLORS.black}
                        multiline
                        numberOfLines={5}
                        onChangeText={handleContentChange}
                        style={[styles.inputField, { height: 120 }]}
                    />
                </View>
                <Text style={styles.subtitle}>Attachment</Text>
                {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : <Text>Select or take image</Text>}
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                <Button title="Take a photo" onPress={takePhoto} />
            </View>
        );
    };

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
                    padding: 16,
                    alignItems: 'center',
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                    }}
                    onPress={handleSubmit}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: 16,
                            fontFamily: 'semiBold',
                        }}
                    >
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                    <View>
                        {/* {/* <Input
                            id="username"
                            onInputChanged={inputChangedHandler}
                            placeholder="Your Email"
                            autoCapitalize="none"
                            placeholderTextColor={COLORS.black}
                            icon="email-outline"
                        /> */}
                        {/* <Input
                            onInputChanged={inputChangedHandler}
                            autoCapitalize="none"
                            id="password"
                            placeholder="Password"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={true}
                            iconPack={Feather}
                            icon="lock"
                        /> */}
                    </View>
                </ScrollView>
                {renderFooter()}
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
    }, inputContainer: {
        marginBottom: 8,
    },

    inputField: {
        fontSize: 15,
        paddingHorizontal: 12,
        flex: 1,
        borderColor: COLORS.gray6,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
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
const MemoizedSubmitGradeTicket = React.memo(SubmitGradeTicket);
export default MemoizedSubmitGradeTicket;