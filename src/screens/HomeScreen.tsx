import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Note } from '../types';
import { getAllNotes } from '../../services/noteService';
import NoteItem from '../components/NoteItem';
import AddNoteButton from '../components/AddNoteButton';

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
                // so AddNoteButton doesn't get in the way of the bottom-most note's buttons
                contentContainerStyle={styles.bottomFlatListPadding}
            />
            <AddNoteButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5b78b',
        padding: 16,
    },
    header: {
        fontSize: 34,
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
        color: 'black',
        fontWeight: 'bold',
    },
    bottomFlatListPadding: {
        paddingBottom: 80, 
    },
});
