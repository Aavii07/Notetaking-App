import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
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
        <FlatList 
            data={notes}
            keyExtractor={note => note.id}
            renderItem={({item}) => <NoteItem id={item.id} body={item.body} title={item.title}/>}
            ListEmptyComponent={() => (
                <View>
                    <Text>
                        New notes will come here.
                    </Text>
                </View>
            )}
        />
    );
}