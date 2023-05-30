import React, { useState } from 'react';
import style from './menu.module.css';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { sortingArray } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeSorting } from '../../redux/slices/filterSlices';

export const Menu = ({ handleOpenModal }) => {
  const sortArray = sortingArray;
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortingValue, setSortingValue] = useState(() => {
    const sort = searchParams.get('sort');

    return sort ? sort : '';
  });

  const buttonCh = (event) => {
    const value = event.target.innerText;

    const textResp = (text) => {
      if (text.toLowerCase() === 'все') {
        return 'SORTING_ALL';
      } else if (text.toLowerCase() === 'дорогие') {
        return 'SORTING_PRICE_HIGH';
      } else if (text.toLowerCase() === 'дешевые') {
        return 'SORTING_PRICE_LOW';
      } else if (text.toLowerCase() === 'по скидке') {
        return 'SORTING_SALE';
      } else if (text.toLowerCase() === 'по кол-ву лайков') {
        return 'SORTING_RATING';
      }
    };

    dispatch(changeSorting(textResp(value)));

    setSortingValue(textResp(value));

    setSearchParams((prev) => {
      prev.set('sort', textResp(value));
      return prev;
    });

    if (value === 'ВСЕ')
      return setSearchParams((prev) => {
        prev.delete('sort');
        return prev;
      });
  };

  return (
    <div className={style.body}>
      <Stack spacing={4} direction="row" value={sortingValue}>
        {sortArray.map((el) => {
          return (
            <Button
              color="primary"
              key={el}
              onClick={(event) => buttonCh(event)}
              variant="contained">
              {el}
            </Button>
          );
        })}
      </Stack>
      <Fab
        style={{ margin: '10px' }}
        color="primary"
        aria-label="add"
        onClick={() => handleOpenModal()}>
        <AddIcon />
      </Fab>
    </div>
  );
};
