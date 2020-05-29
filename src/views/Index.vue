<template>
  <div id="index">
    <router-view />
    <v-app>
      <v-app-bar app color="#3D67B0" dark>
        <div class="d-flex align-center">
          <h2>Bem Vindo</h2>
        </div>

        <v-spacer />

        <router-link to="/login">
          <v-btn outlined>
            <span class="mr-2">Conectar</span>
            <v-icon>fas fa-external-link-alt</v-icon>
          </v-btn>
        </router-link>
      </v-app-bar>

      <v-content />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Index",

  components: {},

  data: () => ({
    //
  }),

  created() {
    this.$router.push("/login");
  }
};
</script>
