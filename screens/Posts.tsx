import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants";

// Post.tsx
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import PostCard from "../components/PostCard";
import { get } from "../utils/helpers/api-helper";

interface PostData {
    id: string;
    content: string;
    banner: string;
    likes: number;
}


const renderHeader = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'semiBold',
                    color: COLORS.black,
                }}
            >
                Posts
            </Text>
        </View>
    )
}

const Posts: React.FC = ({
    navigation, route
}: any) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await get('/posts');
            if (response.status === 200) {
                const data = (response.data as any).content;
                console.log(data)
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once the data is fetched or an error occurs
        }
    };
    const navigateToPostDetail = (postId: any) => {
        navigation.navigate('PostDetails', { postId });
    };
    const onRefresh = async () => {
        setRefreshing(true);

        // Fetch new data or update existing data
        await fetchData();

        setRefreshing(false);
    };
    const renderContent = () => {
        return (<FlatList
            data={posts}
            keyExtractor={(item: any) => item.id}
            renderItem={(item: any) => <PostCard
                post={{ id: item.item.id, content: item.item.title, likes: item.item.kudos, banner: item.item.image_urls, createdAt: item.item.createdAt }}
                onPress={() => navigateToPostDetail(item.item.id)}
            />}
        />);
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}>
                    {loading ? (
                        // Render a loading spinner while fetching data
                        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
                    ) : renderContent()}
                </ScrollView>
            </View>
        </SafeAreaView>

    );
};

export default Posts;

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
        marginBottom: 30,
        marginTop: 16
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.black,
    },
})