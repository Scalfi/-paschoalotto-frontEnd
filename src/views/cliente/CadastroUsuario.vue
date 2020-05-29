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
          <v-col cols="12">
            <v-row justify="center">
              <v-card max-width="800" max-lenght="400" shaped>
                <v-card-title aling="center" class="headline"
                  >Cadastro</v-card-title
                >

                <v-card-text>
                  <v-form @submit.prevent="createBtn()" id="submit-form">
                    <v-row align="center">
                      <v-col cols="12" md="6" sm="12">
                        <v-text-field
                          v-model="user.nome"
                          :error="errorAlert"
                          label="Nome"
                          autocomplete="nome"
                          prepend-icon="fas fa-sort-alpha-down-alt"
                          outlined
                          required
                          rounded
                          @input="errorAlert = false"
                        />
                      </v-col>
                      <v-col cols="12" md="6" sm="12">
                        <v-text-field
                          v-model="user.documento"
                          :error="errorAlert"
                          label="Documento"
                          autocomplete="documento"
                          prepend-icon="fas fa-sort-numeric-down"
                          outlined
                          required
                          rounded
                          @input="errorAlert = false"
                        />
                      </v-col>
                      <v-col cols="12" md="6" sm="12">
                        <v-text-field
                          v-model="user.usuario"
                          :error="errorAlert"
                          label="Usuário"
                          autocomplete="username"
                          prepend-icon="fas fa-user"
                          outlined
                          required
                          rounded
                          @input="errorAlert = false"
                        />
                      </v-col>
                      <v-col cols="12" md="6" sm="12">
                        <v-text-field
                          v-model="user.senha"
                          :append-icon="
                            passwordView.show
                              ? 'fas fa-eye'
                              : 'fas fa-eye-slash'
                          "
                          :type="passwordView.show ? 'text' : 'password'"
                          :error="errorAlert"
                          label="Senha"
                          autocomplete="current-password"
                          prepend-icon="fas fa-lock"
                          outlined
                          required
                          rounded
                          @input="errorAlert = false"
                          @click:append="passwordView.show = !passwordView.show"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user.email"
                          type="email"
                          :error="errorAlert"
                          label="Email"
                          autocomplete="email"
                          prepend-icon="fas fa-envelope-square"
                          outlined
                          required
                          rounded
                          @input="errorAlert = false"
                        />
                      </v-col>
                    </v-row>
                  </v-form>

                  <v-row align="center" justify="center">
                    <h4 style="color:red" v-show="errorAlert">
                      Verifique se preencheu todos os campos
                    </h4>
                  </v-row>
                  <v-row align="center" justify="center">
                    <h4 style="color:red" v-show="errorResponse">
                      Usuario já cadastrado!
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
                  <router-link to="login">
                    <p>Voltar para login</p>
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
import axios from "axios";
import swal from "sweetalert2";
import VueMask from "v-mask";

export default {
  name: "CadastroUsuario",

  data: () => ({
    user: {
      usuario: "",
      senha: "",
      email: "",
      documento: "",
      nome: ""
    },
    passwordView: {
      show: false
    },
    windowSize: {
      x: null,
      y: null
    },
    errorAlert: false,
    errorResponse: false,
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
    createBtn() {
      this.loading = true;

      if (
        this.user.usuario.trim().length == 0 ||
        this.user.senha.trim().length == 0 ||
        this.user.documento.trim().length == 0 ||
        !this.validEmail(this.user.email) ||
        this.user.nome.trim().length == 0
      ) {
        this.errorAlert = true;
        this.loading = false;
      } else {
        //sends auth request
        axios
          .post("/api/usuario", {
            usuario: this.user.usuario,
            senha: this.user.senha,
            documento: this.user.documento,
            nome: this.user.nome,
            email: this.user.email
          })
          .then(res => {
            swal
              .fire({
                title: "Sucesso",
                text: "Usúarios criado!",
                icon: "success"
              })
              .then(response => {
                console.log(response);
                this.$router.push("/login");
              });
          })
          .catch(err => {
            console.log(err);

            this.errorResponse = true;
            this.loading = false;
          });
      }
    },
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>
