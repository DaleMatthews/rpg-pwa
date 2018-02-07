<template>
  <v-container grid-list-xl>
    <h1 class="display-1">Characters</h1>
    <v-layout row wrap justify-left align-center>

      <v-dialog v-model="showCharacterForm" max-width="500px">
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
          <v-card-media :src="c.img" height="270px">
            <v-layout column align-end>
              <v-flex>

                <v-dialog v-model="showDeleteForm" max-width="290">
                  <v-btn flat icon color="white" slot="activator" @click.prevent=""><v-icon>cancel</v-icon></v-btn>
                  <v-card>
                    <v-card-title class="headline">Delete Character?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat @click.native="showDeleteForm = false">Cancel</v-btn>
                      <v-btn color="error" flat @click.native="deleteCharacter(c)">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

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
    data() {
      return {
        showCharacterForm: false,
        showDeleteForm: false,
      };
    },
    methods: {
      deleteCharacter(c) {
        this.showDeleteForm = false;
        this.$store.dispatch('deleteCharacter', c);
      },
    },
  };
</script>

<style>
.icon.xxl {
  font-size: 16em;
}
</style>
