import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { NoteScreenRouteProps } from "../types";
import { getNoteById } from '../../services/noteService';
import SaveNoteButton from "../components/SaveNoteButton";
import Icon from 'react-native-vector-icons/Ionicons';

export default function NoteScreen() {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [history, setHistory] = useState<{ body: string, title: string }[]>([]); // for undo
    const [redoStack, setRedoStack] = useState<{ body: string, title: string }[]>([]); // for redo
    const [initialState, setInitialState] = useState<{ body: string, title: string } | null>(null); // to not undo intial state

    const route = useRoute<NoteScreenRouteProps>();
    const navigation = useNavigation();
    const id = route.params.id;

    useEffect(() => {
        if (id) {
            async function fetchNote() {
                const note = await getNoteById(id!);
                if (note) {
                    setBody(note.body);
                    setTitle(note.title);
                    const initial = { body: note.body, title: note.title };
                    setHistory([initial]);
                    setInitialState(initial);
                }
            }
            fetchNote();
        }
    }, [id]);

    const handleBodyChange = (text: string) => {
        setBody(text);
        updateHistory({ body: text, title });
    };

    const handleTitleChange = (text: string) => {
        setTitle(text);
        updateHistory({ body, title: text });
    };

    const updateHistory = (currentState: { body: string, title: string }) => {
        setHistory(prev => [...prev, currentState]);
        setRedoStack([]); // clear redo stack when a new change made
    };

    const undo = () => {
        if (history.length > 1) {
            const previousState = history[history.length - 2];
            setRedoStack(prev => [history[history.length - 1], ...prev]);
            setHistory(prev => prev.slice(0, -1));
            setBody(previousState.body);
            setTitle(previousState.title);
        } else if (history.length === 1 && body != initialState?.body) {
            setRedoStack(prev => [history[0], ...prev]);
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

    const handleBackPress = () => {
        Alert.alert(
            "Discard changes?",
            "Are you sure you want to quit without saving?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Quit",
                    onPress: () => navigation.goBack()
                }
            ],
            { cancelable: true }
        );
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                handleBackPress();
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress); // swipe to go back

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navigation, body, title])
    );

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
            headerLeft: () => (
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="lightgrey" style={styles.headerButton} />
                </TouchableOpacity>
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
    backButton: {
        marginLeft: 15,
        marginTop: -16,
        color: '#FFFFFF',
    },
});
