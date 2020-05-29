<!--Page for user login
    contains text-fields with user/email and password
    sends authentication request and registers auth token-->

<template>
  <div v-resize="onResize">
    <v-app-bar :color="dashColor" app dark />

    <v-content>
      <!--Vertical Display-->

      <!--Horizontal Display-->
      <template>
        <v-row align="center">
          <v-col cols="12" align="center">
            <v-row justify="end"></v-row>
            <v-row justify="center" class="mr-6">
              <h2
                :style="
                  windowSize.x > 500
                    ? 'color:#3D67B0;'
                    : 'color:#3D67B0;font-size:18px;'
                "
              >
                Bem vindo.
              </h2>
            </v-row>
            <v-row justify="center" class>
              <p
                :style="
                  windowSize.x > 500
                    ? 'max-width:350px;font-size:15px;text-align:justify;'
                    : 'max-width:260px;font-size:14px;text-align:justify;'
                "
              >
                Para consultar suas dividas em aperto comece, digitando o seu
                nome de usuário e a sua senha.
              </p>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row justify="center">
              <v-card max-width="500" max-lenght="400" shaped>
                <v-card-title class="headline">Login</v-card-title>

                <v-card-text class="mt-3">
                  <v-form @submit.prevent="loginBtn()" id="submit-form">
                    <v-text-field
                      v-model="user.account"
                      :error="errorAlert"
                      label="Usuário"
                      autocomplete="username"
                      prepend-icon="fas fa-user"
                      outlined
                      required
                      @input="errorAlert = false"
                    />

                    <v-text-field
                      v-model="user.password"
                      :append-icon="
                        passwordView.show ? 'fas fa-eye' : 'fas fa-eye-slash'
                      "
                      :type="passwordView.show ? 'text' : 'password'"
                      :error="errorAlert"
                      label="Senha"
                      autocomplete="current-password"
                      prepend-icon="fas fa-lock"
                      outlined
                      required
                      @input="errorAlert = false"
                      @click:append="passwordView.show = !passwordView.show"
                    />
                  </v-form>

                  <v-row align="center" justify="center">
                    <h4 style="color:red" v-show="errorAlert">
                      Usuário/Email ou senha inválidos!
                    </h4>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    :loading="loading"
                    :color="dashColor"
                    block
                    rounded
                    large
                    dark
                    type="submit"
                    form="submit-form"
                    >Entrar</v-btn
                  >
                </v-card-actions>
                <v-row justify="center">
                  <router-link to="cadastro">
                    <p>Criar usuario</p>
                  </router-link>
                </v-row>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-content>
    <v-footer fixed padless absolute>
      <v-col class="text-center" cols="12">
        <h5>
          Desenvolvido por -
          <font color="#1976d2">Gabriel Scalfi</font>
          ©
          {{ new Date().getFullYear() }}
        </h5>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import sha256 from "js-sha256";
import axios from "axios";

export default {
  name: "Login",

  data: () => ({
    user: {
      account: null,
      password: null
    },
    passwordView: {
      show: false
    },
    windowSize: {
      x: null,
      y: null
    },
    errorAlert: false,

    loading: false,

    nextPath: null
  }),

  computed: {
    dashColor() {
      return this.$store.state.dashColor;
    }
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    loginBtn() {
      this.loading = true;

      if (!this.user.account || !this.user.password) {
        this.errorAlert = true;
        this.loading = false;
      } else {
        //sends auth request
        axios
          .post("/api/loginusuario", {
            usuario: this.user.account,
            //encripts password with sha256
            senha: sha256(this.user.password)
          })
          .then(res => {
            //saves login info and auth token using vuex
            this.$store.commit("SET_USER", res.data);
            // apiService.setHeaders()

            this.$router.push("/usuario");
          })
          .catch(err => {
            console.log(err);

            this.errorAlert = true;
            this.loading = false;
          });
      }
    }
  }
};
</script>
