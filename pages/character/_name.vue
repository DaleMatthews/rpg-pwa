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
            <v-list-tile v-for="subItem in item.items" :key="subItem.name" @click="getAction(subItem)" v-ripple>
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
  import { find } from 'lodash';
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
        action: null,
        showAddActionForm: false,
        newSpell: '',
        gettingAction: false,
      };
    },
    computed: {
      categories() {
        const allActions = this.character.actions;
        if (!allActions) return [];

        const actions = allActions.filter(a => a.type === 'Action');
        const bonusActions = allActions.filter(a => a.type === 'Bonus Action');
        const reactions = allActions.filter(a => a.type === 'Reaction');
        const others = allActions.filter(a => a.type === 'Other');

        return [
          { title: 'Standard Actions', icon: 'fa-book', items: [] }, // TODO create these
          { title: 'Actions', icon: 'fa-crosshairs', items: actions },
          { title: 'Bonus Actions', icon: 'exposure_plus_1', items: bonusActions },
          { title: 'Reactions', icon: 'refresh', items: reactions },
          { title: 'Others', icon: 'timer', items: others },
        ];
      },
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
      getAction({ url, path, index }) {
        // TODO set category.active
        axios.get(url || `http://www.dnd5eapi.co/api/${path}/${index}`)
          .then(({ data }) => {
            this.action = data;
          });
      },
      addNewAction(actionUrl) {
        this.gettingAction = true;
        this.$store.dispatch('addActionToCharacter', { actionUrl, character: this.character })
          .then(() => {
            this.gettingAction = false;
            this.newSpell = '';
            this.showAddActionForm = false;
            this.getAction({ url: actionUrl });
          });
      },
    },
  };
</script>
