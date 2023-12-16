import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HTML from 'react-native-render-html';
import { COLORS } from "../constants";

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { getFormatedDateFromTimestamp } from "../utils/date";
import { get } from "../utils/helpers/api-helper";

const PostDetails = ({ navigation, route }: any) => {
    const { postId } = route.params;
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<any>();
    console.log(postId)
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await get(`/posts/${postId}`);
            if (response.status === 200) {
                const data = (response.data as any);
                console.log(data)
                setPost(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once the data is fetched or an error occurs
        }
    };
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
    const renderContent = () => {
        if (loading) {
            // Render a loading spinner
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }
        return (
            <View
                style={{
                    marginBottom: 146,
                }}
            >
                <Text style={styles.title}>{post?.title}</Text>
                <Image
                    source={{ uri: post?.image_urls }}
                    resizeMode="contain"
                    style={styles.cover}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >

                    <View style={styles.itemContainer}>
                        <Ionicons
                            name="time"
                            size={20}
                            color={COLORS.black}
                        />
                        <Text style={styles.itemTitle}>Created at: {getFormatedDateFromTimestamp(post?.createdAt)}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Ionicons name="heart" size={20} color={COLORS.red} />
                        <Text style={styles.itemTitle}>Likes: {post?.kudos}</Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>Content</Text>
                <View>
                    <HTML source={{ html: post?.body }} />
                </View>
                {/* Button to go to event details */}
                <TouchableOpacity
                    style={styles.eventDetailsButton}
                    onPress={() => navigation.navigate('EventDetail', { event: post.event })}
                >
                    <Text style={styles.eventDetailsButtonText}>View Event Details</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (<SafeAreaView style={styles.area}>
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderContent()}
            </ScrollView>
        </View>
    </SafeAreaView>);
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
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'bold',
        color: COLORS.black,
        marginTop: 8,
    },
    body: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    chapter: {
        fontSize: 13,
        fontFamily: 'semiBold',
        color: COLORS.black,
        marginTop: 8,
    },
    eventDetailsButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
    },
    eventDetailsButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
})
export default PostDetails;