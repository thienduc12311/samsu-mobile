import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Linking, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Pdf from 'react-native-pdf'
import { SafeAreaView } from 'react-native-safe-area-context'
import ShareIcon from 'react-native-vector-icons/FontAwesome'; // Import Share icon
import { COLORS } from '../constants'

const MyCertificate = ({
    navigation, route
}: any) => { 
    const { pdfUrl } = route.params;

    const handleSharePDF = () => {
        Share.share({
            title: 'Certificate',
            message: 'Check out the link to this certificate',
            url: pdfUrl,
        });
    };

    // const pdfUrl =
    //     'https://samsu.sgp1.digitaloceanspaces.com/certificate_7afdd77c-f3a0-4773-9d86-1fe79d2e0f82.pdf?AWSAccessKeyId=DO007EXLNHLTLW7GNLD7&Expires=1703181179&Signature=Foszck7YRpFHy0l2Z1181nuWV5s%3D';
    const handleViewPDF = () => {
        Linking.openURL(pdfUrl);
    };
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
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
                    <Text>Certificate</Text>
                    <View>
                        {/* <TouchableOpacity onPress={handleViewPDF}>
                            <AntDesign
                                name="clouddownloado"
                                size={24}
                                color={COLORS.black}
                            />
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={handleSharePDF}>
                            <ShareIcon name="share" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>

                </View>
                <Pdf trustAllCerts={false}
                    source={{ uri: pdfUrl }} style={styles.pdf} onError={(error) => console.log(error)} />
                {/* <Image
                    source={images.certificate}
                    resizeMode="contain"
                    style={{
                        height: 200,
                        width: '100%',
                        marginVertical: 100,
                    }}
                /> */}
                <View style={styles.additionalContent}>
                    {/* <Text style={styles.additionalContentText}>This is additional content below the PDF.</Text> */}
                    {/* Add more components as needed */}
                </View>
                {/* Add a button to view the PDF */}


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
    button: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
    },
    pdf: {
        flex: 1,
        width: '100%',
    },
    additionalContent: {
        marginTop: 20,
    },
    additionalContentText: {
        fontSize: 18,
        color: COLORS.black,
    },
})
export default MyCertificate
