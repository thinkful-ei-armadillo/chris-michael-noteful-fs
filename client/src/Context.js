import React from 'react';

const Context = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    addNote: () => {},
    deleteFolder: () => {},
    deleteNote: () => {},
    editFolder: () => {},
    editNote: () => {},
    getFolder: () => {},
    getNote: () => {}
});

export default Context;