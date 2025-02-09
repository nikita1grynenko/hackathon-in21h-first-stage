import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../store/slices/searchSlice';
import { RootState } from '../../store/store';
import './search-bar.style.css';

const SearchBarComponent: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Пошук квізів..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBarComponent;
