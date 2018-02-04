<template>
  <v-app :dark="!lightSwitch">

    <v-navigation-drawer v-model="drawer" stateless fixed app disable-resize-watcher disable-route-watcher>
      <v-list>
        <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="lightSwitch = !lightSwitch">
        <v-icon>lightbulb_outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <nuxt/>
    </v-content>

    <v-footer app>
      © {{ new Date().getFullYear() }} Dale Matthews
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
        ],
        title: 'Vuetify.js',
        lightSwitch: true,
      };
    },
    beforeMount() {
      this.$store.dispatch('getCharacters');
    },
  };
</script>
