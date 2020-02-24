import React from 'react';
import { useFetch } from '../helperUtils/hooks/useFetch';

const RepositoryContext=React.createContext(null);

const RepositoriesProvider = props => {
    const { data, loading, error }=useFetch("https://api.github.com/users/octocat/repos");
    return (
        <RepositoryContext.Provider value={{ data, loading, error }} >
            {props.children}
        </RepositoryContext.Provider>
    );
};

const useRepositoryContext=() => {
    const context=React.useContext(RepositoryContext);

    if (!context) {
        throw new Error(`useRepositoryContext must be used within a provider`);
    }
    return context;
}

export { RepositoriesProvider, useRepositoryContext };
