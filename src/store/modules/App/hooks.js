export const useGetCurrentPakeep = (pakeepId, getState) => {
  const {
    app: { pakeeps }
  } = getState();
  const currentPakeep = find(pakeeps, ({ id }) => pakeepId === id);
  return currentPakeep;
};