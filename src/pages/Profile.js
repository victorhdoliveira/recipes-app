// import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
// import useRenderHeader from '../hooks/useRenderHeader';

export default function Profile({ location }) {
  return (
    <Header
      renderProfileIcon
      renderSearchIcon={ false }
      location={ location }
    />
  );
}

Profile.propTypes = {}.isRequired;
