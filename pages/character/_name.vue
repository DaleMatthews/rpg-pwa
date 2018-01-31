<template>
  <v-container fluid grid-list-xl>
    <v-layout col fill-height justify-left align-center>
      <v-flex xs3>
        <v-list>
          <v-list-group v-for="item in categories" :value="item.active" :key="item.title">
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" v-bind:key="subItem" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>remove</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-spacer></v-spacer>
        </v-list>
      </v-flex>
      <v-flex xs9>
        <div>{{ character.name }}</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { find } from 'lodash';

  export default {
    data() {
      return {
        categories: [
          {
            title: 'Standard Actions',
            items: ['Test1', 'Test2'],
          },
          {
            title: 'Actions',
            items: ['Test3', 'Test4', 'AND MORREEE', 'tehe'],
          },
          {
            title: 'Bonus Actions',
            items: ['Test5', 'Test6'],
          },
          {
            title: 'Reactions',
            items: ['Test7', 'Test8'],
          },
        ],
      };
    },
    computed: {
      character() {
        return find(this.$store.state.characters, { name: this.$route.params.name }) || {};
      },
    },
  };
</script>
