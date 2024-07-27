import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { NotesScreenRouteProps } from "../types";

import { getNoteById } from '../../services/noteService';
import SaveNoteButton from "../components/SaveNoteButton";


export default function NotesScreen() {

    const [text, setText] = useState(''); // prevText has a value if you are editing the note

    const route = useRoute<NotesScreenRouteProps>();
    const navigation = useNavigation();
    const id = route.params.id;

    useEffect(() => {
        if (id) {
            async function fetchNote() {
                const note = await getNoteById(id!);
                if (note) {
                    setText(note.text);
                }
            }
            fetchNote();
        }
    }, [id]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <SaveNoteButton
                id = {id ?? ''} 
                text = {text}> 
            </SaveNoteButton>
        })
    }, [id, navigation, text])

    return ( 
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                autoFocus 
                multiline 
                value={text} 
                onChangeText={setText}
                placeholder="Type your notes here..."
                placeholderTextColor="#888"/>
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