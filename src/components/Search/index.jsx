import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import style from './search.module.css';
import { useDebounce } from '../../hooks/useDebounce';
import { changeSearchValue } from '../../redux/slices/filterSlices';

export const Search = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => {
    const firstSearch = searchParams.get('search');
    return firstSearch ? firstSearch : '';
  });

  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(changeSearchValue(debounceValue));
  }, [debounceValue, dispatch]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value) {
      return setSearchParams((prev) => {
        prev.set('search', value);
        return prev;
      });
    }

    return setSearchParams((prev) => {
      prev.delete('search');
      return prev;
    });
  };

  return (
    <div>
      <input
        value={searchValue}
        className={style.input}
        onChange={handleChange}
        placeholder="Search"
      />
    </div>
  );
};
