import axios from 'axios';
import localforage from 'localforage';

const getActionCategory = (action) => { // TODO separate into resource file
  switch (action.casting_time) {
    case '1 action':
      return 'Actions';
    case '1 bonus action':
      return 'Bonus Actions';
    case '1 reaction':
      return 'Reactions';
    default:
      return 'Others';
  }
};

export const state = () => ({
  characters: [],
});

export const mutations = {
  addCharacter(state, character) {
    state.characters.push(character);
  },
  setCharacters(state, characters) {
    state.characters = [...characters];
  },
  addActionToCharacter(state, { character, action }) {
    const { name } = character;
    const { path, index, category } = action;
    let i = state.characters.findIndex(c => c.name === name);
    let char = { ...state.characters[i] };

    char.actions = char.actions.filter(s => s.path !== path || s.index !== index).concat([{ name: action.name, path, index, category }]);

    state.characters.splice(i, 1, char);
  },
};

export const actions = {
  addCharacter({ state, commit }, { name, img }) {
    const newChar = { name, img, actions: [] };
    commit('addCharacter', newChar);

    return localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));
  },
  getCharacters({ commit }) {
    return localforage.getItem('characters').then(values => {
      if (values) commit('setCharacters', values);
      return values || [];
    });
  },
  addActionToCharacter({ commit, state }, { actionUrl, character }) {
    return axios.get(actionUrl)
      .then(({ data }) => {
        const action = { name: data.name, path: 'spells', index: data.index, category: getActionCategory(data) };

        commit('addActionToCharacter', { character, action });

        localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));

        return action;
      }).catch((err) => {
        console.log(err); // TODO add error notification
      });
  },
};
