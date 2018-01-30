<template>
  <v-form v-model="valid" ref="form" lazy-validation>

    <input v-if="!imgSource" type="file" @change="handleFiles" accept="image/*">
    <img v-if="imgSource" :src="imgSource" height="150px" width="150px" />

    <v-text-field label="Name" v-model="name" :rules="nameRules" :counter="15" required></v-text-field>

    <v-btn @click="submit" :disabled="!valid">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>

  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 15) || 'Name must be less than 15 characters',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      imgSource: '',
    }),
    methods: {
      handleFiles({ target }) {
        if (target.files && target.files[0]) {
          const reader = new FileReader();

          reader.onload = (e) => {
            this.imgSource = e.target.result;
            target.value = '';
          };

          reader.readAsDataURL(target.files[0]);
        }
      },
      submit () {
        if (this.$refs.form.validate() && this.imgSource) {
          this.$store.dispatch('addCharacter', { name: this.name, img: this.imgSource });
          this.$emit('close');
        }
      },
      clear () {
        this.$refs.form.reset();
        this.imgSource = '';
      },
    },
  };
</script>
