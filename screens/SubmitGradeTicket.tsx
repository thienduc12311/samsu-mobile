import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useReducer, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import { COLORS } from '../constants';
import { useAppContext } from '../contexts/AppContext';
import { isValidEmail } from '../utils/ValidationConstraints';
import { validateInput } from '../utils/actions/formActions';
import { post } from '../utils/helpers/api-helper';
import { reducer } from '../utils/reducers/formReducers';
const preSignedUrlEndpoint = 'https://upload.samsu-fpt.software/presigned-url';


const initialState = {
    inputValues: {
        email: '',
        title: '',
        content: '',
    },
    inputValidities: {
        email: false,
        password: false,
        title: '',
        content: ''
    },
    formIsValid: false,
}
const data = [
    { label: 'Event 1', value: 'event1' },
    { label: 'Event 2', value: 'event2' },
    { label: 'Event 3', value: 'event3' },
    // Add your dropdown options here
];
const SubmitGradeTicket = () => {
    /***
     * Render header
     */
    const navigation = useNavigation();
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const { state, dispatch } = useAppContext();
    const { myEvents, semesters } = state;
    const data = myEvents.map((event: any) => {
        return { label: event.title, value: event.id }
    })
    const semestersData = semesters?.map((semester) => { return { label: semester.name, value: semester.name } })
    const [isEvent, setIsEvent] = useState(false);
    const [isOther, setIsOther] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [open, setOpen] = useState(false);
    const [isSemesterOpen, setSemesterOpen] = useState(false);

    const [selectedEventId, setEventId] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState('FA23');

    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const handleEventCheckboxChange = useCallback(() => {
        setIsEvent(!isEvent);
        setShowSearchDropdown(!showSearchDropdown); // Show the dropdown when the "Event" checkbox is selected
    }, [isEvent, showSearchDropdown]);

    const handleOtherCheckboxChange = useCallback(() => {
        setIsOther(!isOther);
        setShowSearchDropdown(false); // Hide the dropdown when the "Other" checkbox is selected
    }, [isOther]);


    const handleSubmit = async () => {
        // Add your logic to handle the submission
        const title = formState.inputValues['title'];
        const content = formState.inputValues['content'];
        const email = formState.inputValues['email'];
        const eventId = isEvent ? selectedEventId : null;
        console.log(eventId);
        if (title.length <= 0 || content.length <= 0 || imageUrl.length <= 0) {
            Alert.alert('Error', 'Title, Content and attachment must not be null!');
            return;
        }

        if (isOther && !isValidEmail(email)) {
            Alert.alert('Error', 'Email is not valid');
            return;
        }
        try {
            const response = await post('/gradeTicket', { title, content, evidenceUrls: imageUrl, eventId, guarantorEmail: email, semesterName: selectedSemester });
            if (response.status === 201) {
                Alert.alert('Success', 'Successfully created a ticket!');
                navigation.goBack()
            } else {
                Alert.alert('Failed', 'Failed to created a ticket!');
                navigation.goBack()
            }
        } catch (error: any) {
            console.log(error.response)
        }

    };
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');


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
    const takePhoto = useCallback(async () => {
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
    }, [handleImageUpload]);
    const pickImage = useCallback(async () => {
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
    }, [handleImageUpload]);
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
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>

        )
    }

    /**
     * Render content
     */
    const inputChangedHandler = useCallback(
        (inputId: any, inputValue: any) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )
    const renderContent = () => {

        return (
            <View style={{ marginBottom: 140, marginTop: 30 }}>
                <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Title</Text>
                    <Input
                        id="title"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['title']}
                        placeholder="Your title"
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.black}
                        iconPack={MaterialCommunityIcons}
                        icon="subtitles-outline"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Semester: </Text>
                    <DropDownPicker
                        open={isSemesterOpen}
                        value={selectedSemester}
                        items={semestersData as any}
                        setOpen={setSemesterOpen}
                        setValue={setSelectedSemester}
                        setItems={setItems}
                        searchable={true}
                    />
                </View>


                {/* Checkbox for "Event" */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                        status={isEvent ? 'checked' : 'unchecked'}
                        onPress={handleEventCheckboxChange}
                    />
                    <Text style={styles.subtitle}>Event</Text>
                </View>

                {/* Show the search dropdown only when the "Event" checkbox is selected */}
                {isEvent && (
                    <DropDownPicker
                        open={open}
                        value={selectedEventId}
                        items={data}
                        setOpen={setOpen}
                        setValue={setEventId}
                        setItems={setItems}
                        searchable={true}
                    />
                )}


                {/* Checkbox for "Other" */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                        status={isOther ? 'checked' : 'unchecked'}
                        onPress={handleOtherCheckboxChange}
                    />
                    <Text style={styles.subtitle}>Nguoi kiem chung</Text>

                </View>
                {isOther ? <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Email</Text>
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder="Your Email"
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.black}
                        iconPack={MaterialCommunityIcons}
                        icon="email-outline"
                    />
                </View> : null}
                <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Content</Text>
                    <Input
                        id="content"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['content']}
                        placeholder="Add content here..."
                        autoCapitalize="none"
                        multiline
                        numberOfLines={5}
                        placeholderTextColor={COLORS.black}
                        iconPack={MaterialCommunityIcons}
                        icon="file-document-edit-outline"
                    />
                </View>
                <Text style={styles.subtitle}>Attachment</Text>
                {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : <Text>Select or take image</Text>}
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                <Button title="Take a photo" onPress={takePhoto} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true}
                    keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </KeyboardAwareScrollView>

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