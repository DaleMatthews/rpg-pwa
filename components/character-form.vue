<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12 sm6 md4>
        <v-text-field label="Legal first name" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field label="Legal last name" hint="example of persistent helper text"
          persistent-hint
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field label="Email" required></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field label="Password" type="password" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select
          label="Age"
          required
          :items="['0-17', '18-29', '30-54', '54+']"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select
          label="Interests"
          multiple
          autocomplete
          chips
          :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
        ></v-select>
      </v-flex>
    </v-layout>
    <small>*indicates required field</small>
  </v-container>
</template>
