import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { AntDesign, Feather } from '@expo/vector-icons'

const TermsAndConditions = ({
    navigation
}: any) => {
    /**
     * Render header
     */
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
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    Terms And Conditions
                </Text>
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
        return (
            <View>
                <Text style={styles.body}>
                    Welcome to our mobile application. By downloading, accessing
                    or using our mobile application, you agree to be bound by
                    these Terms and Conditions of Use. If you do not agree with
                    any part of these terms, please do not download, access or
                    use our mobile application.
                </Text>
                <Text style={styles.body}>
                    1. Use of the Mobile Application Our mobile application is
                    intended for personal use only. You may not use the mobile
                    application for any commercial purposes.{' '}
                </Text>
                <Text style={styles.body}>
                    3. Disclaimer of Warranties The mobile application is
                    provided on an "as is" and "as available" basis, without any
                    warranties of any kind, either express or implied. We do not
                    warrant that the mobile application will be uninterrupted or
                    error-free, nor do we make any warranty as to the results
                    that may be obtained from use of the mobile application.
                </Text>
                <Text style={styles.body}>
                    4. Limitation of Liability In no event shall we or our
                    affiliates be liable for any direct, indirect, incidental,
                    special, or consequential damages arising out of or in any
                    way connected with the use of our mobile application.
                </Text>
                <Text style={styles.body}>
                    5. Changes to the Terms and Conditions We reserve the right
                    to modify or amend these Terms and Conditions at any time.
                    Your continued use of the mobile application following the
                    posting of changes to these terms will mean you accept those
                    changes.
                </Text>
                <Text style={styles.body}>
                    6. Governing Law These Terms and Conditions shall be
                    governed by and construed in accordance with the laws of the
                    United States, without giving effect to any principles of
                    conflicts of law.
                </Text>
                <Text style={styles.body}>
                    7. By using our mobile application, you agree to these Terms
                    and Conditions. If you do not agree to these Terms and
                    Conditions, please do not download or use our mobile
                    application.{' '}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
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
    body: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
})

export default TermsAndConditions
