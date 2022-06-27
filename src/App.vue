<template>
  <v-app>
    <v-main>
      <Header></Header>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Header from "@/components/Header";
export default {
  name: 'App',
  components: {Header},
}
</script>
<style>
.v-messages , .v-text-field__details{
  display: none;
  height: 0 !important;
  min-height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
.v-text-field.v-text-field--solo .v-input__control{
  min-height: 0 !important;
}
.v-input{
  align-items: center !important;
 }
</style>