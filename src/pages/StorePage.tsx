
import React from 'react';
import GameStore from '../components/store/GameStore';
import StoreTheme from '../components/store/StoreTheme';

const StorePage = () => {
  return (
    <StoreTheme>
      <GameStore />
    </StoreTheme>
  );
};

export default StorePage;
