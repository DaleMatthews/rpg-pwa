<template>
  <v-app :dark="!lightSwitch">

    <v-navigation-drawer v-model="drawer" mini-variant fixed app>
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
      <v-toolbar-title>D&D Combat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="lightSwitch = !lightSwitch">
        <v-icon>lightbulb_outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-alert type="error" :value="$store.state.error" transition="scale-transition">
        <span class="subheading">{{ $store.state.errorText }}</span>
      </v-alert>
      <nuxt/>
    </v-content>

    <v-footer app>
      <span class="pl-2">© {{ new Date().getFullYear() }} Dale Matthews</span>
      <v-spacer></v-spacer>
      <a href="https://github.com/DaleMatthews/rpg-pwa">
        <v-icon medium class="px-3" color="blue darken-2">fa-github</v-icon>
      </a>
      <a href="http://recurse.me">
        <v-icon medium class="px-3" color="deep-orange darken-1">fa-rss</v-icon>
      </a>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        items: [
          { icon: 'people', title: 'Characters', to: '/' },
          { icon: 'info', title: 'About', to: '/about' },
        ],
        lightSwitch: false,
      };
    },
    beforeMount() {
      this.$store.dispatch('getCharacters');
    },
  };
</script>

<style>
.icon.xxl {
  font-size: 16em;
}
</style>
