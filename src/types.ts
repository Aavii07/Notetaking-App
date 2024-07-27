import { RouteProp } from '@react-navigation/native';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type Note = {
    id: string;
    text: string;
}

export type RootStackParamList = {
    Home: undefined;
    Notes: { id?: string };
};

export type NotesScreenRouteProps = RouteProp<RootStackParamList, "Notes">