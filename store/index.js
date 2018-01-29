// import localforage from 'localforage';

export const state = () => ({
  characters: [],
});

export const mutations = {
  addCharacter(state, { name, img }) {
    state.characters.push({ name, img });
  },
};
