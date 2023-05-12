import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import style from './search.module.css';
import { useDebounce } from '../../hooks/useDebounce';
import { changeSearchValue } from '../../redux/slices/filterSlices';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setsearchValue] = useState(() => {
    const firstSearch = searchParams.get('search');
    return firstSearch ? firstSearch : '';
  });
  const dispatch = useDispatch();

  const debounceValue = useDebounce(searchValue);
  useEffect(() => {
    dispatch(changeSearchValue(debounceValue));
  }, [debounceValue, dispatch]);

  const handleChange = (event) => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setsearchValue(event.target.value);

    if (event.target.value) {
      return setSearchParams({
        ...params,
        search: event.target.value,
      });
    }

    delete params.search;

    return setSearchParams(params);

    // if (event.target.value)
    //   return navigate({
    //     pathname: '/products',
    //     search: `search=${event.target.value}`,
    //   });
    // navigate('/products');
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
