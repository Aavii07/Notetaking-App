import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Note } from '../types';
import { getAllNotes } from '../../services/noteService';
import NoteItem from '../components/NoteItem';

export default function HomeScreen() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const allNotes = await getAllNotes();
                setNotes(allNotes);
            } catch (error) {
                console.error('Failed to fetch notes', error);
            }
        };
        fetchNotes();
    });

    return ( 
        <View style={styles.container}>
            <Text style={styles.header}>Your Notes</Text>
            <FlatList 
                data={notes}
                keyExtractor={note => note.id}
                renderItem={({ item }) => <NoteItem id={item.id} body={item.body} title={item.title} />}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>New notes will appear here</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
    },
});
