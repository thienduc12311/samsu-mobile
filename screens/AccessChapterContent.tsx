import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { AntDesign, Feather } from '@expo/vector-icons'

const AccessChapterContent = ({
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
                        fontFamily: 'medium',
                        color: COLORS.black,
                    }}
                >
                    Topic 1 - Part 1 - Introduction HTML
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
                    {' '}
                    HTML (HyperText Markup Language) is a markup language used
                    to create web pages. HTML functions to regulate the
                    structure and content of a web page, such as text, images,
                    audio, video, tables, forms, and other elements. HTML uses
                    tags placed in HTML documents to provide instructions to the
                    browser on how to display the contents of a web page. With
                    HTML, we can create links to other web pages, format text,
                    create lists, and much more. HTML is a basic technology that
                    must be understood by anyone who wants to create web pages.{' '}
                </Text>
                <Text style={styles.body}>
                    {' '}
                    The main function of HTML (HyperText Markup Language) is to
                    provide structure and content to a web page. Here are some
                    of the main functions of HTML:
                </Text>
                <Text style={styles.body}>
                    Create a web page structure with HTML tags, such as
                    &lt;html&gt;, &lt;head&gt;, and &lt;body&gt;.
                </Text>
                <Text style={styles.body}>
                    1. Add content to web pages, such as text, images, audio,
                    video, and other elements.
                </Text>
                <Text style={styles.body}>
                    2. Formats text with tags such as &lt;h1&gt; to &lt;h6&gt;,
                    &lt;p&gt;, and &lt;strong&gt;.
                </Text>
                <Text style={styles.body}>
                    3. Creates a link to another web page with the &lt;a&gt;
                    tag.
                </Text>
                <Text style={styles.body}>
                    4. Create a list with &lt;ul&gt; and &lt;ol&gt; tags.
                </Text>
                <Text style={styles.body}>
                    5. Creates a table with &lt;table&gt;, &lt;tr&gt;,
                    &lt;th&gt;, and &lt;td&gt; tags.
                </Text>
                <Text style={styles.body}>
                    6. Creates a form with &lt;form&gt;, &lt;input&gt;, and
                    &lt;select&gt; tags.
                </Text>
                <Text style={styles.body}>
                    7. Create responsive web pages that can be accessed by
                    various types of devices, such as computers, tablets, or
                    smartphones.
                </Text>
                <Text style={styles.body}>
                    8. Incorporate scripts or code from other programming
                    languages such as JavaScript and CSS to add more complex
                    functionality and appearance.
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView>{renderContent()}</ScrollView>
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

export default AccessChapterContent
