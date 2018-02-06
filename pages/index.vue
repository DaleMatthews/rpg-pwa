<template>
  <v-container grid-list-xl>
    <h1 class="display-1">Characters</h1>
    <v-layout row wrap justify-left align-center>

      <!-- TODO implement cancel -->
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
  import CharacterForm from '~/components/character-form';

  export default {
    components: {
      CharacterForm,
    },
    data() {
      return {
        showCharacterForm: false,
      };
    },
    methods: {
      deleteCharacter() {
        // TODO implement deleteCharacter
      },
    },
  };
</script>

<style>
.icon.xxl {
  font-size: 16em;
}
</style>
