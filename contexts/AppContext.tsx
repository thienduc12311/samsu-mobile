import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import { SET_USER } from './context-type';

// Define the types for the context and state
export interface User {
    username: string;
    rollnumber: string;
    name: string;
    role: Role;
    status: string;
    dob?: string;
    department?: string;
    score?: number;
    attendedEvent?: number;
}
export enum RoleEnumNumber {
    ROLE_ADMIN = 0,
    ROLE_MANAGER = 1,
    ROLE_STAFF = 2,
    ROLE_STUDENT = 3,
}
export enum Role {
    ADMIN = 'ROLE_ADMIN',
    ROLE_MANAGER = 'ROLE_MANAGER',
    ROLE_STAFF = 'ROLE_STAFF',
    ROLE_STUDENT = 'ROLE_STUDENT',
}
type AppState = {
    user: null | User; // Replace 'any' with the actual type of your user data
    theme: 'light' | 'dark';
};

type AppAction = {
    type: string;
    payload?: any; // Replace 'any' with the actual type of your action payload
};

type AppContextType = {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial state for the context
const initialState: AppState = {
    user: null,
    theme: 'light',
};

// Reducer function to update the state
const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case 'TOGGLE_THEME':
            return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
        default:
            return state;
    }
};

// Create a context provider
type AppContextProviderProps = {
    children: ReactNode;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context in components
const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

export { AppContextProvider, useAppContext };