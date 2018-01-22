<template>
  <h1 class="display-1">{{ $route.params.name }}</h1>
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
        actions: [],
        reactions: [],
        bonusActions: [],
        other: [],
      };
    },
  };
</script>
