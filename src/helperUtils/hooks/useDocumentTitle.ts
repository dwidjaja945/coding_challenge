import React from 'react';

type Symbol = {
    description: string;
};

let savedTitles: Symbol[] = [{description: document.title}];

export const useDocumentTitle = (title: string): void => {
    const titleRef = React.useRef({ description: title });

    const setTitle = (): void => {
        const title = savedTitles[savedTitles.length - 1];
        document.title = title.description;
    };

    const mountRef = React.useRef(false);
    React.useEffect( () => {
        if (mountRef.current) {
            const changedTitle = { description: title };
            savedTitles = savedTitles.map(title =>
                title === titleRef.current ?
                    changedTitle
                    : title);
        };
    } , [title]);

    React.useEffect( () => {
        mountRef.current = true;
        savedTitles.push(titleRef.current);
        setTitle();
        return () => {
            savedTitles.pop();
            setTitle();
        };
    } , [] );
};