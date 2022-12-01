import React, { useState, useEffect } from 'react';
import useRenderHeader from '../hooks/useRenderHeader';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({
  renderProfileIcon,
  renderSearchIcon,
  location: { pathname } }) {
  const [pageTitle, setPageTitle] = useState('');
  // const [isHeader, setIsHeader] = useState(
  //   { profileIcon: false, searchIcon: false },
  // );

  const { isHeader, setHeader: setIsHeader } = useRenderHeader({
    renderProfileIcon,
    renderSearchIcon,
  });

  console.log(isHeader.searchIcon);

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

  return (
    <div>
      {(isHeader.profileIcon ? (
        <>
          <div className="header-conteiner">
            <h1 data-testid="page-title">{pageTitle}</h1>
          </div>

          <button
            type="button"
            src={ profileIcon }
            data-testid="profile-top-btn"
          >
            <img src={ profileIcon } alt="profile Icon" />
          </button>
        </>

      ) : (<p />))}

      {(isHeader.searchIcon ? (
        <button
          type="button"
          src={ searchIcon }
          data-testid="search-top-btn"
        >
          <img src={ searchIcon } alt="search Icon" />
        </button>
      ) : (<p />))}

    </div>
  );
}

Header.propTypes = {}.isRequired;
