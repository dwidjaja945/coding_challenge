import React from 'react';
import { TextField, Button, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { useRepositoryContext } from '../../providers/RepositoriesProvider';
import BodyContainer from '../../components/BodyContainer';
import { getLanguageColor } from '../../helperUtils/languageColorUtil';
import { useDocumentTitle } from '../../helperUtils/hooks/useDocumentTitle';
import StarIcon from "@material-ui/icons/Star";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import NoteIcon from '@material-ui/icons/Note';

import styles from './Repositories.module.scss';

const Repositories = (): JSX.Element => {
    const [searchText, setSearchText] = React.useState('');
    const [typeAnchorEl, setTypeAnchorEl] = React.useState(null);
    const [typeSearch, setTypeSearch] = React.useState(null);

    const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
    const [languageSearch, setLanguageSearch] = React.useState(null);

    const { data: repositoryData } = useRepositoryContext();

    const [data, setData] = React.useState(repositoryData);

    useDocumentTitle('Repositories - Github');

    React.useEffect( () => {
        setData(repositoryData);
    } , [repositoryData]); 

    const filterData = (search: string): void => {
        if (!search) {
            setTypeSearch(null);
            setLanguageSearch(null);
            return setData(repositoryData);
        };
        let dataToFilter = repositoryData;
        if (typeSearch || languageSearch) {
            dataToFilter = data;
        }
        const lowerCaseSearch = search.toLowerCase();
        const filteredData = dataToFilter.filter(item => {
            const includesName = item.name.toLowerCase().includes(lowerCaseSearch);
            const includesDescription = item.description?.toLowerCase().includes(lowerCaseSearch);
            return includesName || includesDescription;
        });
        setData(filteredData);
    };

    React.useEffect( () => {
        if (typeSearch || languageSearch) {
            const filteredData = repositoryData.filter(item => {
                const isPrivate = item.private;
                const typeLowerCased = typeSearch?.toLowerCase();
                let returnLanguage = false;
                let returnType = false;
                if (item.language === languageSearch || !languageSearch) {
                    returnLanguage = true;
                };
                if (!typeLowerCased) {
                    returnType = true;
                } else {
                    switch (typeLowerCased) {
                        case 'private':
                            if (isPrivate) {
                                returnType = true
                            }
                            break;
                        case 'public':
                            if (!isPrivate) {
                                returnType = true;
                            };
                            break;
                        default:
                            break;
                    };
                }
                return returnLanguage && returnType;
            });
            setData(filteredData);
        } else {
            filterData(searchText);
        }
    } , [typeSearch, languageSearch]);
    
    const handleSearchChange = (e): void => {
        setSearchText(e.target.value);
        filterData(e.target.value);
    };
    
    const setTypeSearchClick = (type: string): void => {
        setTypeSearch(type);
        setTypeAnchorEl(null);
    }

    const setLanguageSearchClick = (language: string): void => {
        setLanguageSearch(language);
        setLanguageAnchorEl(null);
    }

    const getCurrentLanguages = (): JSX.Element[] => {
        const seen={};
        const languages=[
            <MenuItem
                key="languages-all"
                onClick={() => setLanguageSearchClick(null)}
            >
                All
            </MenuItem>
        ];
        repositoryData.forEach(item => {
            if (item.language&&!seen[item.language]) {
                languages.push(
                    <MenuItem
                        key={item.language}
                        onClick={() => setLanguageSearchClick(item.language)}
                    >
                        {item.language}
                    </MenuItem>
                );
                seen[item.language]=true;
            }
        });
        return languages;
    };

    const renderSearchBar = (): JSX.Element => (
        <div className={styles.searchBarContainer}>
            <TextField
                variant="outlined"
                label="Find a Repository"
                value={searchText}
                classes={{
                    root: styles.textFieldRoot
                }}
                onChange={handleSearchChange} />
            <div className={styles.buttons}>
                <Button
                    variant="outlined"
                    onClick={e => setTypeAnchorEl(e.currentTarget)}
                >
                    {typeSearch || 'Type'}
                    <ArrowDropDown />
                </Button>
                <Menu
                    anchorEl={typeAnchorEl}
                    open={Boolean(typeAnchorEl)}
                    onClose={() => setTypeAnchorEl(null)}
                >
                    <MenuItem
                        onClick={() => setTypeSearchClick(null)}
                    >
                        All
                    </MenuItem>
                    <MenuItem
                        onClick={() => setTypeSearchClick('Public')}
                    >
                        Public
                    </MenuItem>
                    <MenuItem
                        onClick={() => setTypeSearchClick('Private')}
                    >
                        Private
                    </MenuItem>
                </Menu>
                <Button
                    variant="outlined"
                    onClick={e => setLanguageAnchorEl(e.currentTarget)}
                >
                    {languageSearch || 'Language'}
                    <ArrowDropDown />
                </Button>
                <Menu
                    anchorEl={languageAnchorEl}
                    open={Boolean(languageAnchorEl)}
                    onClose={() => setLanguageAnchorEl(null)}
                >
                    {getCurrentLanguages()}
                </Menu>
            </div>
        </div>
    );

    const getLastUpdatedTime = time => {
        const date = new Date(time);
        const dateString = date.toLocaleDateString(undefined, {
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        });
        return dateString;
    };
    
    const renderRepos = (): JSX.Element[] => {
        // sort by latest updated
        const sortedData = data.sort((a, b) => {
            const aDate: any = new Date(a.updated_at);
            const bDate: any = new Date(b.updated_at);
            return bDate - aDate;
        });
        
        return sortedData.map((item, index) => (
            <div key={`${item.id}-${index}`} className={styles.repoContainer}>
                <div className={styles.mainInfo}>
                    <a className={styles.repoName}>
                        <div>
                            {item.name}
                        </div>
                    </a>
                    <div className={styles.description}>
                        {item.description}
                    </div>
                    <div className={styles.logistics}>
                        {item.language ? (
                            <div className={styles.language}>
                                <div
                                    className={styles.languageIcon}
                                    style={{ backgroundColor: getLanguageColor(item.language) }}
                                />
                                {item.language}
                            </div>
                        ): null}
                        <div className={styles.logisticInfo}>
                            <StarIcon className={styles.icon} />
                            {item.stargazers_count}
                        </div>
                        <div className={styles.logisticInfo}>
                            <CallSplitIcon className={styles.icon} />
                            {item.forks_count}
                        </div>
                        {item.license ? (
                            <div className={styles.logisticInfo}>
                                <NoteIcon className={styles.icon} />
                                {item.license.name}
                            </div>
                        ) : null}
                        <div className={styles.logisticInfo}>
                            Updated on {getLastUpdatedTime(item.updated_at)}
                        </div>
                    </div>
                </div>
                <div className={styles.subInfo}>
                    <Button
                        variant="contained"
                    >
                        <StarIcon />
                        Star
                    </Button>
                    <div className={styles.activityLine} />
                </div>
            </div>
        ));
    };

    return (
        <BodyContainer className={styles.container} >
            {renderSearchBar()}
            <div className={styles.divider} />
            <div className={styles.repos}>
                {renderRepos()} 
            </div>
        </BodyContainer>
    );
};

export default Repositories;