import { TOKEN, apiOneProd } from '../utils/constants';

export const getProductsByIds = (ids) => {
  // console.log(ids);
  const token = localStorage.getItem(TOKEN);
  return Promise.allSettled(
    ids.map((_id) =>
      fetch(`${apiOneProd}${_id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then((res) => res.json()),
    ),
  );
};
