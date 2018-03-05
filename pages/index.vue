<template>
  <v-container grid-list-xl>
    <h1 class="display-1">Characters</h1>
    <v-layout row wrap justify-left align-center>

      <v-dialog v-model="showCharacterForm" persistent max-width="370px">
        <v-card>
          <v-card-title class="headline">{{ character ? 'Edit Character' : 'New Character' }}</v-card-title>
          <v-card-text>
            <CharacterForm :character="character" @cancel="cancelCharacterForm"></CharacterForm>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-flex @click.stop="newCharacter()" xs12 sm6 md4 lg3>
        <v-card hover class="d-flex" height="330px">
          <v-layout column justify-center>
            <v-card-text class="text-xs-center"><v-icon class="xxl">add</v-icon></v-card-text>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg3 v-for="c in $store.state.characters" :key="c.name">
        <v-card hover height="330px" router :to="'/character/' + c.name.toLowerCase()">
          <v-card-media :src="c.img" height="270px">
            <v-layout column align-end>
              <v-flex>
                <v-btn flat icon color="white" @click.prevent="editCharacter(c)"><v-icon>edit</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-card-media>
          <v-card-title class="headline">{{ c.name }}</v-card-title>
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
    data: () => ({
      character: null,
      showCharacterForm: false,
    }),
    methods: {
      newCharacter() {
        this.character = null;
        this.showCharacterForm = true;
      },
      editCharacter(c) {
        this.character = c;
        this.showCharacterForm = true;
      },
      cancelCharacterForm() {
        this.character = null;
        this.showCharacterForm = false;
      },
    },
  };
</script>
