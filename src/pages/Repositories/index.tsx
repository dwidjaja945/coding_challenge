import React from 'react';
import { TextField, Button, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { useRepositoryContext } from '../../providers/RepositoriesProvider';
import BodyContainer from '../../components/BodyContainer';
import { getLanguageColor } from '../../helperUtils/languageColorUtil';
import StarIcon from "@material-ui/icons/Star";
import CallSplitIcon from "@material-ui/icons/CallSplit";

import styles from './Repositories.module.scss';

const Repositories=(): JSX.Element => {
    const [searchText, setSearchText]=React.useState('');
    const [typeAnchorEl, setTypeAnchorEl]=React.useState(null);
    const [typeSearch, setTypeSearch]=React.useState('All');

    const [languageAnchorEl, setLanguageAnchorEl]=React.useState(null);
    const [languageSearch, setLanguageSearch]=React.useState('All');

    const { data } = useRepositoryContext();

    const setTypeSearchClick = (type): void => {
        setTypeSearch(type);
        setTypeAnchorEl(null);
    }

    const setLanguageSearchClick = (language): void => {
        setLanguageSearch(language);
        setLanguageAnchorEl(null);
    }

    const getCurrentLanguages = (): JSX.Element[] => {
        const seen={};
        const languages=[
            <MenuItem
                onClick={() => setLanguageSearchClick('All')}
            >
                All
            </MenuItem>
        ];
        data.forEach(item => {
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
                onChange={e => setSearchText(e.target.value)} />
            <div className={styles.buttons}>
                <Button
                    variant="outlined"
                    onClick={e => setTypeAnchorEl(e.currentTarget)}
                >
                    {typeSearch==='All'? 'Type':typeSearch}
                    <ArrowDropDown />
                </Button>
                <Menu
                    anchorEl={typeAnchorEl}
                    open={Boolean(typeAnchorEl)}
                    onClose={() => setTypeAnchorEl(null)}
                >
                    <MenuItem
                        onClick={() => setTypeSearchClick('All')}
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
                    {languageSearch==='All'? 'Language':languageSearch}
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

    const renderRepos = (): JSX.Element[] => {
        const sortedData = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        return sortedData.map(item => (
            <div className={styles.repoContainer}>
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
                        <div className={styles.stars}>
                            <StarIcon className={styles.icon} />
                            {item.stargazers_count}
                        </div>
                        <div className={styles.stars}>
                            <CallSplitIcon className={styles.icon} />
                            {item.forks_count}
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
        <BodyContainer>
            {renderSearchBar()}
            <div className={styles.divider} />
            {renderRepos()}
        </BodyContainer>
    );
};

export default Repositories;