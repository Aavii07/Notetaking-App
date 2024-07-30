import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ViewNoteScreenRouteProps } from '../types';
import { getNoteById } from '../../services/noteService';

export default function ViewNoteScreen() {
    const [note, setNote] = useState<{ body: string; title: string } | null>(null);
    const route = useRoute<ViewNoteScreenRouteProps>();
    const id = route.params.id;

    useEffect(() => {
        async function fetchNote() {
            if (id) {
                const fetchedNote = await getNoteById(id);
                setNote(fetchedNote);
            }
        }
        fetchNote();
    }, [id]);

    return (
        <View style={styles.container}>
            {note ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>{note.title}</Text>
                    <Text style={styles.body}>{note.body}</Text>
                </ScrollView>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#e5cbba',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    body: {
        fontSize: 16,
        color: '#000',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});
