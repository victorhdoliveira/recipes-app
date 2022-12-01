// import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function DoneRecipes({ location }) {
//   const [pageTitle, setPageTitle] = useState('');
//   const { pathname } = location;

  //   const { isHeader, setHeader: setIsHeader } = useRenderHeader({
  //     renderProfileIcon,
  //     renderSearchIcon,
  //   });

  //   console.log(isHeader.profileIcon);

  //   useEffect(() => {
  //     setIsHeader({
  //       profileIcon: renderProfileIcon,
  //       searchIcon: renderSearchIcon,
  //     });
  //   }, []);

  //   useEffect(() => {
  //       setPageTitle(() => {
  //         const removeBar = pathname.replace('/', '');
  //         const formatFirstLetter = removeBar.charAt(0).toUpperCase() + removeBar.slice(1);
  //         return formatFirstLetter;
  //       });
  //   }, []);

  return (
    <Header
      renderProfileIcon
      renderSearchIcon={ false }
      location={ location }
    />
  );
}

DoneRecipes.propTypes = {}.isRequired;
