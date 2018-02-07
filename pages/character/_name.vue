<template>
  <v-container fill-height fluid pa-0>

    <v-dialog persistent v-model="showAddActionForm" max-width="500px">
      <v-card>
        <v-card-title class="headline">New Action</v-card-title>
        <v-card-text>
          <v-select
              :items="allSpells" item-value="url" item-text="name"
              v-model="newSpell"
              label="Find Spell"
              autocomplete
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn :loading="gettingAction" @click="addNewAction(newSpell)">Save</v-btn>
          <v-btn @click="showAddActionForm = false; newSpell = ''">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout col justify-left align-top>

      <v-flex d-flex xs3 pl-0 fill-height>

        <v-list>
          <!-- TODO auto focus search input -->
          <v-list-tile class="light-blue" @click="showAddActionForm = true" v-ripple>
            <v-list-tile-action>
              <v-icon medium>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Add New Action</v-list-tile-content>
          </v-list-tile>

          <v-list-group v-for="item in categories" :value="item.active" :key="item.title">
            <v-list-tile slot="item" @click="" :disabled="!item.items.length">
              <v-list-tile-action>
                <v-icon medium>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.name" @click="getAction(subItem, item)" v-ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>

      </v-flex>

      <v-flex pa-4 xs9>
        <action-display :action="action"></action-display>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { find, groupBy, sortBy } from 'lodash';
  import ActionDisplay from '~/components/action-display';

  export default {
    components: { ActionDisplay },
    async asyncData() {
      // TODO get non-spells too
      const { data } = await axios.get('http://www.dnd5eapi.co/api/spells');

      return { allSpells: data.results || [] };
    },
    data() {
      return {
        action: {},
        showAddActionForm: false,
        newSpell: '',
        gettingAction: false,
      };
    },
    computed: {
      categories() {
        const c = groupBy(sortBy(this.character.actions, a => a.name), a => a.category);

        return [
          // TODO create standard actions
          { title: 'Standard Actions', active: true, icon: 'fa-book', items: [] },
          { title: 'Actions', active: false, icon: 'fa-crosshairs', items: c['Actions'] || [] },
          { title: 'Bonus Actions', active: false, icon: 'exposure_plus_1', items: c['Bonus Actions'] || [] },
          { title: 'Reactions', active: false, icon: 'refresh', items: c['Reactions'] || [] },
          { title: 'Others', active: false, icon: 'timer', items: c['Others'] || [] },
        ];
      },
      character() {
        return find(this.$store.state.characters, { name: this.$route.params.name }) || {};
      },
    },
    methods: {
      getAction(action, category) {
        if (category) category.active = true;
        if (action && action.desc) this.action = action;
        else {
          axios.get(`http://www.dnd5eapi.co/api/${action.path}/${action.index}`)
            .then(({ data }) => {
              if (data && data.desc) this.action = data;
            });
        }
      },
      addNewAction(actionUrl) {
        this.gettingAction = true;
        this.$store.dispatch('addActionToCharacter', { actionUrl, character: this.character })
          .then((action) => {
            this.gettingAction = false;
            this.newSpell = '';
            this.showAddActionForm = false;
            if (action) this.getAction(action, this.categories.find(c => c.title === action.category));
          });
      },
      deleteAction() {
        // TODO implement deleteAction
      },
    },
  };
</script>
