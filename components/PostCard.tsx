// PostCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PostCardProps {
    post: {
        id: string;
        content: string;
        banner: string;
        likes: number;
        createdAt: number;
    };
    onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };
    const formattedDate = new Date(post.createdAt).toLocaleString();

    return (
        <TouchableOpacity onPress={onPress}>

            <View style={styles.card}>
                <Image source={{ uri: post.banner }} style={{ width: '100%', height: 200 }} />
                <Text style={{ marginTop: 10 }}>{post.content}</Text>
                <Text style={{ marginTop: 5, color: 'gray' }}>Posted on {formattedDate}</Text>
                <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Text>{likeCount} likes</Text>
                    <Ionicons
                        name={liked ? 'heart' : 'heart-outline'}
                        size={20}
                        color={liked ? 'red' : 'black'}
                        style={{ marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
export default PostCard;
