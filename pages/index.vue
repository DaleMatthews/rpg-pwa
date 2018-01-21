<template>
  <v-container grid-list-md>
    <h1 class="display-1">Characters</h1>
    <v-layout row wrap justify-left align-center>
      <v-flex xs12 sm6 md4 lg2 v-for="c in characters">
        <v-card router :to="'/character/' + c.name">
          <v-card-media :src="c.img" height="200px"></v-card-media>
          <v-card-title class="headline">{{c.name}}</v-card-title>
          <v-card-text class="subheading">{{c.description}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import axios from 'axios';

  export default {
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
      };
    },
    created() {
      // console.log(this.cards[0]);
    },
  };
</script>
