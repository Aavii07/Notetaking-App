import { RouteProp } from '@react-navigation/native';

// whenever ReactNavigation anmespace referenced, include custom navigation paramatere types (allows for navigation)
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type Note = {
    id: string;
    body: string;
    title: string;
}

export type RootStackParamList = {
    Home: undefined;
    Note: { id?: string };
    ViewNote: { id: string }
};

export type NoteScreenRouteProps = RouteProp<RootStackParamList, "Note">

export type ViewNoteScreenRouteProps = RouteProp<RootStackParamList, "ViewNote">;