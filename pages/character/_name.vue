<template>
  <v-container fill-height fluid pa-0>
    <v-layout col justify-left align-top>
      <v-flex d-flex xs3 pl-0 fill-height >
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
            <v-list-tile v-for="subItem in item.items" :key="subItem.name" @click="getAbility(subItem)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>remove</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-flex>
      <v-flex pa-4 xs9>
        <template v-if="action">
          <div class="display-1">{{ action.name }}</div>
          <v-layout py-4 wrap align-content-start>
            <v-flex pa-2 xs4 md3 v-for="a in actionData" :key="a.title">
              <div class="title">{{ a.title }}</div>
              <div class="body-1">{{ a.value }}</div>
            </v-flex>
            <v-flex pt-3 class="subheading" v-for="d in action.desc" :key="$index">{{ d }}</v-flex>
            <v-flex pt-3 class="subheading"><strong>At higher levels: </strong>{{ action.higher_level.join(' ') }}</v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { find } from 'lodash';

  export default {
    data() {
      return {
        action: null,
        categories: [
          {
            title: 'Standard Actions',
            items: [
              {
                name: 'Asdf',
                path: 'spells',
                index: 1,
              },
            ],
          },
          {
            title: 'Actions',
            items: [
              {
                name: 'Asdf',
                path: 'features',
                index: 27,
              },
            ],
          },
          {
            title: 'Bonus Actions',
            items: [
              {
                name: 'Asdf',
                path: 'spells',
                index: 8,
              },
            ],
          },
          {
            title: 'Reactions',
            items: [
              {
                name: 'Asdf',
                path: 'features',
                index: 29,
              },
            ],
          },
        ],
      };
    },
    computed: {
      character() {
        return find(this.$store.state.characters, { name: this.$route.params.name }) || {};
      },
      actionData() {
        return [
          { title: 'Level', value: this.action.level },
          { title: 'Casting Time', value: this.action.casting_time },
          { title: 'Range', value: this.action.range },
          { title: 'Components', value: this.action.components.join(', ') },
          { title: 'Duration', value: this.action.duration },
          { title: 'School', value: this.action.school.name },
        ];
      },
    },
    methods: {
      getAbility({ path, index }) {
        axios.get(`http://www.dnd5eapi.co/api/${path}/${index}`)
          .then(({ data }) => {
            console.log(data);
            this.action = data;
          });
      },
    },
  };
</script>
