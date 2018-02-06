<template>
  <div v-if="action && action.desc">
    <div class="display-1">{{ action.name }}</div>
    <v-layout py-4 wrap align-content-start>

      <v-flex pa-2 xs4 md3 v-for="a in actionData" :key="a.title">
        <div class="title">{{ a.title }}</div>
        <div class="body-1">{{ a.value }}</div>
      </v-flex>

      <v-flex pt-3 class="subheading" v-for="d in action.desc">{{ d }}</v-flex>

      <v-flex pt-3 class="subheading" v-if="action.higher_level">
        <strong>At higher levels: </strong>{{ action.higher_level.join(' ') }}
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
  export default {
    props: {
      action: {
        type: Object,
        required: true,
      },
    },
    computed: {
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
  };
</script>
