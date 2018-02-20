<template>
  <v-container fill-height fluid pa-0>

    <v-dialog persistent v-model="showAddActionForm" max-width="500px">
      <v-card>
        <v-card-title class="headline">New Action</v-card-title>
        <v-card-text>
          <v-select
              :items="$store.state.spells" return-object item-text="name"
              v-model="newSpell"
              label="Find Spell"
              autocomplete
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="addNewAction(newSpell)">Save</v-btn>
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

          <v-list-group v-for="item in categories" :key="item.title" no-action :value="item.title === activeCategory">
            <v-list-tile slot="activator" @click="" :disabled="!item.items.length">
              <v-list-tile-action>
                <v-icon medium>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.name" @click="setAction(subItem, item)" v-ripple :value="subItem.name === action.name">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>

      </v-flex>

      <v-dialog v-model="showDeleteForm" max-width="290">
        <v-card>
          <v-card-title class="headline">Remove Action?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="showDeleteForm = false">Cancel</v-btn>
            <v-btn color="error" flat @click.native="deleteAction">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-flex pa-4 xs9>
        <action-display :action="action">
          <v-layout slot="header">
            <v-flex>
              <div class="display-1">{{ action.name }}</div>
            </v-flex>
            <v-layout column align-end>
              <v-flex>
                <v-btn v-if="action" @click.stop="showDeleteForm = true">remove</v-btn>
              </v-flex>
            </v-layout>
          </v-layout>>
        </action-display>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import { find, map, sortBy } from 'lodash';
  import { getActionCategory } from '~/assets/utils';
  import ActionDisplay from '~/components/action-display';

  export default {
    components: { ActionDisplay },
    data() {
      return {
        action: {},
        showAddActionForm: false,
        showDeleteForm: false,
        newSpell: '',
        categories: [
          // TODO create standard actions
          { title: 'Standard Actions', icon: 'fa-book', items: [] },
          { title: 'Actions', icon: 'fa-crosshairs', items: [] },
          { title: 'Bonus Actions', icon: 'exposure_plus_1', items: [] },
          { title: 'Reactions', icon: 'refresh', items: [] },
          { title: 'Others', icon: 'timer', items: [] },
        ],
      };
    },
    watch: {
      'character.actions': {
        handler(values) {
          if (!values) return;

          let actions = sortBy(map(values, a => this.$store.state.spells[a]), a => a.name);
          this.categories.forEach(c => {
            c.items = actions.filter(a => c.title === getActionCategory(a));
          });
        },
        immediate: true,
      },
    },
    computed: {
      activeCategory() {
        return getActionCategory(this.action);
      },
      character() {
        return find(this.$store.state.characters, { name: this.$route.params.name }) || {};
      },
    },
    methods: {
      setAction(action) {
        this.action = action;
      },
      addNewAction(action) {
        const actionIndex = this.$store.state.spells.findIndex(({ name }) => name === action.name);

        this.$store.dispatch('addActionToCharacter', { actionIndex, character: this.character })
          .then(() => {
            this.newSpell = '';
            this.showAddActionForm = false;
            this.setAction(action, this.categories.find(c => c.title === getActionCategory(action)));
          });
      },
      deleteAction() {
        const actionIndex = this.$store.state.spells.findIndex(({ name }) => name === this.action.name);

        this.$store.dispatch('deleteActionFromCharacter', { actionIndex, character: this.character })
          .then(() => {
            this.showDeleteForm = false;
            this.setAction({});
          });
      },
    },
  };
</script>
