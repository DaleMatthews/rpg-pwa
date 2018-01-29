<template>
  <v-container grid-list-xl>
    <h1 class="display-1">Characters</h1>
    <v-layout row wrap justify-left align-center>

      <v-dialog v-model="showCharacterForm" persistent max-width="500px">
        <v-card>
          <v-card-title class="headline">New Character</v-card-title>
          <v-card-text>
            <CharacterForm @close="showCharacterForm = false"></CharacterForm>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-flex @click.stop="showCharacterForm = true" xs12 sm6 md4 lg3>
        <v-card hover class="d-flex" height="330px">
          <v-layout column justify-center>
            <v-card-text class="text-xs-center"><v-icon class="xxl">add</v-icon></v-card-text>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg3 v-for="c in $store.state.characters" :key="c.name">
        <v-card hover height="330px" router :to="'/character/' + c.name">
          <v-card-media :src="c.img" height="270px"></v-card-media>
          <v-card-title class="headline">{{c.name}}</v-card-title>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  // import axios from 'axios';
  // import localforage from 'localforage';
  import CharacterForm from '~/components/character-form';

  // localforage.removeItem('rand').then(console.log);

  export default {
    components: {
      CharacterForm,
    },
    // async asyncData() {
    //   let { data } = await axios.get('https://api.magicthegathering.io/v1/cards');
    //   return { cards: data.cards };
    // },
    data() {
      return {
        characters: [
          { img: '/beauregard.jpg', name: 'Beauregard', description: 'Human Monk' },
          { img: '/caleb.jpg', name: 'Caleb', description: 'Human Wizard' },
          { img: '/fjord.jpg', name: 'Fjord', description: 'Half-Orc Warlock' },
          { img: '/jester.jpg', name: 'Jester', description: 'Tiefling Cleric' },
          { img: '/mollymauk.jpg', name: 'Mollymauk', description: 'Tiefling Blood Hunter' },
          { img: '/nott.jpg', name: 'Nott', description: 'Goblin Rogue' },
          { img: '/yasha.jpg', name: 'Yasha', description: 'Aasimar Barbarian' },
          { img: '/zink.png', name: 'Zink', description: 'Gnome Warlock' },
        ],
        showCharacterForm: false,
      };
    },
  };
</script>

<style>
.icon.xxl {
  font-size: 16em;
}
</style>
