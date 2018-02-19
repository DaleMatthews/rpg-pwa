<template functional>
  <div v-if="props.action && props.action.description">
    <slot name="header">
      <div class="display-1">{{ props.action.name }}</div>
    </slot>
    <v-layout py-4 wrap align-content-start>

      <!-- spell properties -->
      <v-flex pa-2 xs4 md3>
        <div class="title">Level</div>
        <div class="body-1">{{ props.action.level }}</div>
      </v-flex>
      <v-flex pa-2 xs4 md3>
        <div class="title">Casting Time</div>
        <div class="body-1">{{ props.action.casting_time }}</div>
      </v-flex>
      <v-flex pa-2 xs4 md3>
        <div class="title">Range</div>
        <div class="body-1">{{ props.action.range }}</div>
      </v-flex>
      <v-flex pa-2 xs4 md3>
        <div class="title">Components</div>
        <div class="body-1">{{ props.action.components.raw }}</div>
      </v-flex>
      <v-flex pa-2 xs4 md3>
        <div class="title">Duration</div>
        <div class="body-1">{{ props.action.duration }}</div>
      </v-flex>
      <v-flex pa-2 xs4 md3>
        <div class="title">School</div>
        <div class="body-1">{{ props.action.school }}</div>
      </v-flex>

      <!-- description and higher level effects -->
      <v-flex pt-3 class="subheading">{{ props.action.description }}</v-flex>
      <v-flex pt-3 class="subheading" v-if="props.action.higher_levels">
        <strong>At higher levels: </strong>{{ props.action.higher_levels }}
      </v-flex>

    </v-layout>
  </div>
</template>
