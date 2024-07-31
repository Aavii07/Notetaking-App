import React from 'react';
import { Note } from '../types';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteNote } from '../../services/noteService';
import { Modal } from 'react-native';

export default function NoteItem({ id, title }: Note) {
    const navigation = useNavigation();
    const date = new Date(parseInt(id, 10)); // revert id back into a date

    const handleNavigate = () => {
        navigation.navigate('ViewNote', { id });
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Note',
            `Are you sure you want to delete "${title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await deleteNote(id);
                        } catch (error) {
                            console.error('Failed to delete note', error);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const handleEdit = () => {
        navigation.navigate('Note', { id });
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={handleNavigate} style={styles.cardContent}>
                <Text style={styles.noteText} numberOfLines={2} ellipsizeMode='tail'>{title}</Text>
            </TouchableOpacity>
            <Text style={{marginTop: 10}}>
                {date.toString()}
            </Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Icon name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Icon name="trash" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#EADDCA',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 10,
        padding: 10,
        position: 'relative',
    },
    cardContent: {
        flex: 1,
        paddingRight: 125,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 10,
        alignSelf: 'flex-end',
    },
    editButton: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 10,
        marginRight: 10,
        alignSelf: 'flex-end',
    },
    noteText: {
        fontSize: 26,
        color: '#000',
        fontWeight: 'bold', 
    },
});
