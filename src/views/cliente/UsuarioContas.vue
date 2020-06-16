<!--Page for user login
    contains text-fields with user/email and password
    sends authentication request and registers auth token-->

<template>
  <div>
    <v-app-bar :color="dashColor" :loading="loading" app dark>
      <div class="d-flex align-center">
        <h4>Bem vindo: {{ this.$store.state.store.nome }}</h4>
      </div>

      <v-spacer />

      <v-btn v-on:click="btnLogout" outlined>
        <span class="mr-2">Logout</span>
        <v-icon>fas fa-external-link-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content v-if="show">
      <v-row v-for="contrato in contratos" :key="contrato.key">
        <v-col class="text-center" cols="12">
          <v-card>
            <v-card-subtitle>
              <b>Id Contrato:</b>
              {{ contrato.key }}
            </v-card-subtitle>

            <v-card-text>
              <v-row>
                <v-col cols="4" >
                  <b>Data vencimento do contrato:</b>
                  R$ {{ contrato.value.dataVencimentoContrato }}
                </v-col>
                <v-col cols="4">
                  <b>Dias de atraso contrato:</b>
                  {{ contrato.value.diasAtraso }}
                </v-col>
                <v-col cols="4">
                  <b>Valor inicial do contrato:</b>
                  R$ {{ contrato.value.valorOriginal }}
                </v-col>
                <v-col cols="4">
                  <b>Valor juros do contrato:</b>
                  R$ {{ contrato.value.valorJuros }}
                </v-col>
                <v-col cols="4">
                  <b>Valor Final do contrato:</b>
                  R$ {{ contrato.value.valorFinal }}
                </v-col>
                <v-col cols="4">
                  <b>Data vencimento do contrato:</b>
                  R$ {{ contrato.value.dataVencimentoContrato }}
                </v-col>
              </v-row>
              <v-row >
                <v-col align="center" justify="center" cols="12" lg="4" md="4"  sm="6" xs="12" v-for="boleto in contrato.value.boletos" :key="boleto.idBoleto">
                  <v-card  max-width="300">
                    <v-card-subtitle>
                      <b>Número boleto:</b>
                      {{ boleto.idBoleto }}
                    </v-card-subtitle>
                    <v-card-text>
                      <ul>
                        <li>
                          <b>Parcela Atual</b>
                          {{ boleto.parcelaAtual }}
                        </li>
                        <li>
                          <b>Data vencimento</b>
                          {{ boleto.dataVencimento }}
                        </li>
                        <li>
                          <b>Valor Parcela</b>
                          R$ {{ boleto.valorParcela }}
                        </li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
    <v-footer fixed padless absolute>
      <v-row>
        <v-col class="text-center">
          <h5>
            Desenvolvido por -
            <font color="#1976d2">Gabriel Scalfi</font>
            ©
            {{ new Date().getFullYear() }}
          </h5>
        </v-col>
        <v-col  class="text-center">
          <h5>Telefone para contato: (xx) xxxxx-xxxx </h5>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserContas",

  data: () => ({
    loading: true,
    contratos: [],
    show: false
  }),

  computed: {
    dashColor() {
      return this.$store.state.dashColor;
    }
  },
  beforeMount() {
    this.PegaBoleto();
  },

  methods: {
    btnLogout() {
      this.$store.commit("REMOVE_USER", this.$store.state.store);
      // apiService.setHeaders()

      this.$router.push("/login");
    },
    PegaBoleto() {
      axios
        .get("/api/boleto?documento=" + this.$store.state.store.documento, {
          headers: { Authorization: `Bearer ${this.$store.state.store.token}` }
        })
        .then(res => {
          if (res.status == 200) {
            this.contratos = res.data;
            this.show = true;
            console.log(this.show);
          }
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.$router.push("/login");
          }
          this.errorAlert = true;
          this.loading = false;
        });
    }
  }
};
</script>
