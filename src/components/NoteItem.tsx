import React from "react";
import { Note } from "../types";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteNote } from "../../services/noteService";
import Icon from 'react-native-vector-icons/Ionicons';

export default function NoteItem({id, title}: Note) {

    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate('Notes', { id });
    };

    const handleDelete = () => {
        deleteNote(id);
    };

    return (
        <TouchableOpacity onPress={handleNavigate} style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.noteText}>{title}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Icon name="trash" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 10,
    },
    cardContent: {
        padding: 16,
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ff4d4d',
        padding: 8,
        borderRadius: 4,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    noteText: {
        flexWrap: 'wrap',
        marginRight: 80,
        fontSize: 16,
        color: '#333',
    },
});
