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
            <v-dialog v-model="showDeleteForm" max-width="290">
              <v-card>
                <v-card-title class="headline">Remove Action?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat @click.native="showDeleteForm = false">Cancel</v-btn>
                  <v-btn color="error" flat @click.native="">Remove</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-list-tile v-for="subItem in item.items" :key="subItem.name" @click="setAction(subItem, item)" v-ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>

      </v-flex>

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
  import { find, groupBy, sortBy } from 'lodash';
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
      };
    },
    computed: {
      categories() {
        if (!this.character || !this.character.actions) return [{ title: 'Standard Actions', active: true, icon: 'fa-book', items: [] }];

        const actions = this.character.actions.map(a => this.$store.state.spells[a]);
        const c = groupBy(sortBy(actions, a => a.name), a => getActionCategory(a));

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
      setAction(action, category) {
        if (category) category.active = true;
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
        // TODO implement deleteAction
      },
    },
  };
</script>
