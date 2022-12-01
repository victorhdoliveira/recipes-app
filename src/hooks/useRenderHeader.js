import { useState } from 'react';

function useRenderHeader({ renderProfileIcon, renderSearchIcon }) {
  const [isHeader, setIsHeader] = useState({});

  function setHeader() {
    setIsHeader({
      profileIcon: renderProfileIcon,
      searchIcon: renderSearchIcon,
    });
  }

  return {
    isHeader,
    setHeader,
  };
}

export default useRenderHeader;
