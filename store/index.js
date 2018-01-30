import localforage from 'localforage';

export const state = () => ({
  characters: [],
});

export const mutations = {
  addCharacters(state, characters) {
    state.characters = state.characters.concat(characters);
  },
  setCharacters(state, characters) {
    state.characters = [...characters];
  },
};

export const actions = {
  addCharacter(context, { name, img }) {
    const newVal = context.state.characters.concat([{ name, img }]);
    localforage.setItem('characters', newVal).then(values => context.commit('addCharacters', [{ name, img }]));
  },
  getCharacters({ commit }) {
    return localforage.getItem('characters').then(values => {
      if (values) commit('setCharacters', values);
      return values || [];
    });
  },
};
