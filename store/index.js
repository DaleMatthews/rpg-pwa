import localforage from 'localforage';
import EXAMPLE_CHARACTER from '~/assets/exampleCharacter';
import spells from '~/assets/spells';

export const state = () => ({
  characters: [], // TODO need unique id on characters, will probably do with firebase db
  errorText: '',
  error: false,
  spells,
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
  updateCharacter(state, { character, update }) {
    let target = state.characters.find(c => c.name === character.name);
    Object.assign(target, update);
  },
  addActionToCharacter(state, { actionIndex, character }) {
    let char = state.characters.find(c => c.name === character.name);

    if (!char.actions.includes(actionIndex)) char.actions.push(actionIndex);
  },
  deleteActionFromCharacter(state, { actionIndex, character }) {
    let char = state.characters.find(c => c.name === character.name);

    if (char.actions.includes(actionIndex)) char.actions = char.actions.filter(a => a !== actionIndex);
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
  addCharacter({ state, commit }, { name, img, actions }) {
    const newChar = { name, img, actions: actions || [] };
    commit('addCharacter', newChar);

    return localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));
  },
  getCharacters({ commit, dispatch }) {
    localforage.clear(); // TODO remove this to persist data

    return localforage.getItem('characters').then(values => {
      if (values && values.length) commit('setCharacters', values);
      else return dispatch('addCharacter', EXAMPLE_CHARACTER);
    });
  },
  deleteCharacter({ state, commit }, character) {
    commit('deleteCharacter', character);

    return localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));
  },
  updateCharacter({ state, commit }, { character, update }) {
    commit('updateCharacter', { character, update });

    return localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));
  },
  addActionToCharacter({ commit, state }, { actionIndex, character }) {
    commit('addActionToCharacter', { character, actionIndex });

    return localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));
  },
  deleteActionFromCharacter({ commit, state }, { actionIndex, character }) {
    commit('deleteActionFromCharacter', { actionIndex, character });

    return localforage.setItem('characters', JSON.parse(JSON.stringify(state.characters)));
  },
};
