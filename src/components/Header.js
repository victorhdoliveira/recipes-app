import React, { useEffect, useState } from 'react';
import { BiSearchAlt2, BiUser } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import useRenderHeader from '../hooks/useRenderHeader';
import LogoHeader from '../images/LogoHeader.png';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';

export default function Header({
  renderProfileIcon,
  renderSearchIcon,
  location: { pathname } }) {
  const [pageTitle, setPageTitle] = useState('');
  const history = useHistory();
  const [toggleSeach, setToggleSearch] = useState(false);

  // const [isHeader, setIsHeader] = useState(
  //   { profileIcon: false, searchIcon: false },
  // );

  const { isHeader, setHeader: setIsHeader } = useRenderHeader({
    renderProfileIcon,
    renderSearchIcon,
  });

  useEffect(() => {
    setIsHeader({
      profileIcon: renderProfileIcon,
      searchIcon: renderSearchIcon,
    });
  }, []);

  // useEffect(() => {
  //   setPageTitle(() => {
  //     const removeBar = pathname.replace('/', '');
  //     const formatFirstLetter = removeBar.charAt(0).toUpperCase() + removeBar.slice(1);
  //     return formatFirstLetter;
  //   });
  // }, [pathname]);

  useEffect(() => {
    setPageTitle(() => {
      if (pathname === '/done-recipes') {
        const removeBar = pathname.replace('/', '');
        let removeLine = removeBar.replace('-', ' ');
        removeLine = 'Done Recipes';
        return removeLine;
      }
      if (pathname === '/favorite-recipes') {
        const removeBar = pathname.replace('/', '');
        let removeLine = removeBar.replace('-', ' ');
        removeLine = 'Favorite Recipes';
        return removeLine;
      }
      const removeBar = pathname.replace('/', '');
      const formatedTitle = removeBar.charAt(0).toUpperCase()
       + removeBar.slice(1);
      return formatedTitle;
    });
  }, [pathname]);

  const goProfile = () => {
    history.push('/profile');
  };

  const toggleSearchBar = () => {
    if (toggleSeach === false) {
      setToggleSearch(true);
    } else {
      setToggleSearch(false);
    }
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/meals">
          <img src={ LogoHeader } alt="logo" className="logo" />
        </Link>
        {(isHeader.searchIcon ? (
          <button
            type="button"
            // src={ searchIcon }
            data-testid="search-top-btn"
            onClick={ () => toggleSearchBar() }
            className="header-btn"
          >
            {/* <img src={ searchIcon } alt="search Icon" /> */}
            <BiSearchAlt2 size={ 30 } />
          </button>
        ) : (<p />))}

        {(isHeader.profileIcon ? (
          <button
            type="button"
            // src={ profileIcon }
            data-testid="profile-top-btn"
            onClick={ () => goProfile() }
            className="header-btn"
          >
            {/* <img src={ profileIcon } alt="profile Icon" /> */}
            <BiUser size={ 30 } />
          </button>

        ) : (<p />))}
      </div>
      <h1 data-testid="page-title" className="page-title">{pageTitle}</h1>
      {(toggleSeach ? (
        <SearchBar />
      ) : (<p />))}
    </header>
  );
}

Header.propTypes = {}.isRequired;
