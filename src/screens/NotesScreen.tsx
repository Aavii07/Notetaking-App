import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { NotesScreenRouteProps } from "../types";
import { getNoteById } from '../../services/noteService';
import SaveNoteButton from "../components/SaveNoteButton";
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotesScreen() {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [history, setHistory] = useState<{ body: string, title: string }[]>([]); // for undo
    const [redoStack, setRedoStack] = useState<{ body: string, title: string }[]>([]); // for redo
    const [initialState, setInitialState] = useState<{ body: string, title: string } | null>(null); // to track initial state

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
                    setHistory([{ body: note.body, title: note.title }]);
                    const initial = { body: note.body, title: note.title };
                    setHistory([initial]);
                    setInitialState(initial); // store initial state
                }
            }
            fetchNote();
        }
    }, [id]);

    const getCurrentTextWords = (text: string) => text.trim().split(/\s+/); // array of words

    const handleBodyChange = (text: string) => {
        const newWords = getCurrentTextWords(text);
        const previousWords = getCurrentTextWords(body);
    
        if ((previousWords.length !== newWords.length) || newWords.length === 1){
            setHistory(prev => [...prev, { body: text, title }]);
            setBody(text);
            setRedoStack([]);
        } else {
            setBody(text);
        }
    };

    const handleTitleChange = (text: string) => {
        const newWords = getCurrentTextWords(text);
        const previousWords = getCurrentTextWords(title);
        
        if (previousWords.length !== newWords.length || newWords.length === 1) {
            setHistory(prev => [...prev, { body, title: text }]);
            setTitle(text);
            setRedoStack([]);
        } else {
            setTitle(text);
        }
    };

    const undo = () => {
        if (history.length > 1) {
            const previousState = history[history.length - 2];
            setRedoStack(prev => [{ body, title }, ...prev]);
            setBody(previousState.body);
            setTitle(previousState.title);
            setHistory(history.slice(0, -1));
        } else if (history.length === 1) {
            setRedoStack(prev => [{ body, title }, ...prev]);
            setBody(initialState ? initialState.body : '');
            setTitle(initialState ? initialState.title : '');
            setHistory(initialState ? [initialState] : []);
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack[0];
            setHistory(prev => [...prev, nextState]);
            setBody(nextState.body);
            setTitle(nextState.title);
            setRedoStack(redoStack.slice(1));
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={undo}>
                        <Icon name="arrow-undo" size={24} color="lightgrey" style={styles.headerButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={redo}>
                        <Icon name="arrow-redo" size={24} color="lightgrey" style={styles.headerButton} />
                    </TouchableOpacity>
                    <SaveNoteButton
                        id={id ?? ''}
                        body={body}
                        title={title}
                    />
                </View>
            ),
        });
    }, [navigation, body, title, undo, redo]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={handleTitleChange}
                placeholder="Title"
                placeholderTextColor="#888"
                maxLength={100}
            />
            <TextInput
                style={styles.textInput}
                autoFocus
                multiline
                value={body}
                onChangeText={handleBodyChange}
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
        borderWidth: 2,
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
        borderWidth: 2,
        borderRadius: 8,
        padding: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#f6eee3',
    },
    headerButton: {
        marginRight: 15, 
        marginTop: 15,
    },
});
