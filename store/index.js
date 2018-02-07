import axios from 'axios';
import localforage from 'localforage';

const getActionCategory = (action) => {
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
  characters: [], // TODO need unique id on characters, will probably do with firebase db
  errorText: '',
  error: false,
});

export const mutations = {
  addCharacter(state, character) {
    state.characters.push(character);
  },
  setCharacters(state, characters) {
    state.characters = [...characters];
  },
  deleteCharacter(state, { name }) {
    state.characters = state.characters.filter(c => c.name !== name);
  },
  addActionToCharacter(state, { character, action }) {
    const { name } = character;
    const { path, index, category } = action;
    let i = state.characters.findIndex(c => c.name === name);
    let char = { ...state.characters[i] };

    char.actions = char.actions.filter(s => s.path !== path || s.index !== index).concat([{ name: action.name, path, index, category }]);

    state.characters.splice(i, 1, char);
  },
  addError(state, err) {
    state.errorText = err;
    state.error = true;
  },
  removeError(state) {
    state.errorText = '';
    state.error = false;
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
  deleteCharacter({ state, commit }, character) {
    commit('deleteCharacter', character);

    return localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));
  },
  addActionToCharacter({ commit, state, dispatch }, { actionUrl, character }) {
    return axios.get(actionUrl)
      .then(({ data }) => {
        const action = { name: data.name, path: 'spells', index: data.index, category: getActionCategory(data) };

        commit('addActionToCharacter', { character, action });

        localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));

        return action;
      }).catch(err => dispatch('addAxiosError', err));
  },
  addAxiosError({ commit }, err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    console.log(err.config);

    commit('addError', 'A network error occurred');
    setTimeout(() => commit('removeError'), 3000);
  },
};
