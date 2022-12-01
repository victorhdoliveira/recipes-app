import React, { useState, useEffect } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ location: { pathname } }) {
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    setPageTitle(() => {
      const removeBar = pathname.replace('/', '');
      const formatFirstLetter = removeBar.charAt(0).toUpperCase() + removeBar.slice(1);
      return formatFirstLetter;
    });
  }, [pathname]);

  console.log(location);

  return (
    <div>
      { (pathname === '') ? (
        <div className="header-conteiner">
          <h1>{pageTitle}</h1>

          <button type="button">
            <img src={ profileIcon } alt="profile Icon" />
          </button>

          <button type="button">
            <img src={ searchIcon } alt="search Icon" />
          </button>

        </div>
      ) : (<p>...</p>)}

    </div>
  );
}

Header.propTypes = {}.isRequired;
