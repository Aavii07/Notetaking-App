import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { NotesScreenRouteProps } from "../types";

import { getNoteById } from '../../services/noteService';
import SaveNoteButton from "../components/SaveNoteButton";


export default function NotesScreen() {

    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');

    const route = useRoute<NotesScreenRouteProps>();
    const navigation = useNavigation();
    const id = route.params.id;

    useEffect(() => {
        if (id) {
            async function fetchNote() {
                const note = await getNoteById(id!);
                if (note) {
                    setBody(note.body);
                    setTitle(note.title);
                }
            }
            fetchNote();
        }
    }, [id]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <SaveNoteButton
                id = {id ?? ''} 
                body = {body}
                title={title}> 
            </SaveNoteButton>
        })
    }, [id, navigation, body, title])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
                placeholderTextColor="#888"
                maxLength={50}
            />
            <TextInput
                style={styles.textInput}
                autoFocus
                multiline
                value={body}
                onChangeText={setBody}
                placeholder="Type your notes here..."
                placeholderTextColor="#888"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#e5cbba',
        justifyContent: 'center',
    },
    titleInput: {
        borderColor: '#000000',
        borderWidth: 5,
        borderRadius: 8,
        padding: 15,
        fontSize: 20,
        color: '#000',
        backgroundColor: '#f6eee3',
        marginBottom: 10,
    },
    textInput: {
        flex: 1,
        textAlignVertical: 'top',
        borderColor: '#000000',
        borderWidth: 5,
        borderRadius: 8,
        padding: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#f6eee3',
    },
});