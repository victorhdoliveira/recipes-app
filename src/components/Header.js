import React, { useState, useEffect } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ isHeader, setIsHeader, location: { pathname } }) {
  const [pageTitle, setPageTitle] = useState('');
  console.log(isHeader);

  useEffect(() => {
    setIsHeader({ profileIcon: true, searchIcon: true });
  }, []);

  useEffect(() => {
    setPageTitle(() => {
      const removeBar = pathname.replace('/', '');
      const formatFirstLetter = removeBar.charAt(0).toUpperCase() + removeBar.slice(1);
      return formatFirstLetter;
    });
  }, [pathname]);

  return (
    <div>
      {(isHeader.profileIcon ? (
        <>
          <div className="header-conteiner">
            <h1>{pageTitle}</h1>
          </div>

          <button type="button">
            <img src={ profileIcon } alt="profile Icon" />
          </button>
        </>

      ) : (<p>...</p>))}

      {(isHeader.searchIcon ? (
        <button type="button">
          <img src={ searchIcon } alt="search Icon" />
        </button>
      ) : (<p>...</p>))}

    </div>
  );
}

Header.propTypes = {}.isRequired;
