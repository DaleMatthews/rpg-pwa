export const getActionCategory = (action) => {
  switch (action.casting_time.slice(0, 8)) {
    case '1 action':
      return 'Actions';
    case '1 bonus ':
      return 'Bonus Actions';
    case '1 reacti':
      return 'Reactions';
    default:
      return 'Others';
  }
};
