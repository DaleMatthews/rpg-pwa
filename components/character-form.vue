<template>
  <v-form v-model="valid" ref="form" lazy-validation>

    <input v-if="!editable.img" type="file" @change="handleFiles" accept="image/*">
    <v-layout v-if="editable.img">
      <v-flex xs6>
        <v-card flat>
          <v-card-media :src="editable.img" height="170px">
            <v-layout column align-end>
              <v-flex>
                <v-btn flat icon color="white" @click.prevent="editable.img = ''"><v-icon>cancel</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>

    <v-text-field class="mt-2" label="Name" v-model="editable.name" :rules="nameRules" :counter="15" required></v-text-field>

    <v-btn color="primary" @click="submit" :disabled="!editable.name || !editable.img">{{ character ? 'save' : 'submit' }}</v-btn>
    <v-btn @click="cancel">cancel</v-btn>

    <v-dialog v-if="character" v-model="showDeleteForm" max-width="290">
      <v-btn color="error" slot="activator">delete</v-btn>
      <v-card>
        <v-card-title class="headline">Delete Character?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="showDeleteForm = false">Cancel</v-btn>
          <v-btn color="error" flat @click.native="deleteCharacter">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
  let CHARACTER_TEMPLATE = { name: '', img: '' };

  export default {
    props: {
      character: Object,
    },
    data: () => ({
      editable: { ...CHARACTER_TEMPLATE },
      valid: false,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 15) || 'Name must be less than 15 characters',
      ],
      showDeleteForm: false,
    }),
    watch: {
      character() {
        this.editable = this.character ? { ...this.character } : { ...CHARACTER_TEMPLATE };
      },
    },
    methods: {
      handleFiles({ target }) {
        if (target.files && target.files[0]) {
          const reader = new FileReader();

          reader.onload = (e) => {
            this.editable.img = e.target.result;
            target.value = '';
          };

          reader.readAsDataURL(target.files[0]);
        }
      },
      submit () {
        if (this.$refs.form.validate() && this.editable.img) {
          if (this.character) {
            this.$store.dispatch('updateCharacter', {
              character: this.character,
              update: { name: this.editable.name, img: this.editable.img },
            });
          } else {
            this.$store.dispatch('addCharacter', this.editable);
          }

          this.cancel();
        }
      },
      cancel () {
        this.editable = { ...CHARACTER_TEMPLATE };
        this.$refs.form.reset();
        this.$emit('cancel');
      },
      deleteCharacter() {
        this.showDeleteForm = false;
        this.$store.dispatch('deleteCharacter', this.character);
        this.cancel();
      },
    },
  };
</script>
