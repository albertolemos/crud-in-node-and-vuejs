<template>
  <v-app>
    <Header />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="name"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Alunos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Novo Aluno
              </v-btn>
            </template>

            <v-card>
              <v-card-title style="justify-content: center">
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="120">
                      <v-text-field
                        v-model="item.name"
                        min-length="10"
                        label="Nome"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="80">
                      <v-text-field
                        v-model="item.email"
                        label="E-mail"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="120">
                      <v-text-field
                        v-model="item.ra"
                        label="Registro Acadêmico"
                        :rules="raRules"
                        :disabled="formTitle == 'Editar Aluno'"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="80">
                      <v-text-field
                        v-mask="'###.###.###-##'"
                        v-model="item.cpf"
                        label="CPF"
                        :rules="cpfRules"
                        :disabled="formTitle == 'Editar Aluno'"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" dark class="mb-2" @click="close">
                  Cancelar
                </v-btn>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  dark
                  class="mb-2"
                  @click="saveOnClick"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded>
            {{ snackbar.message }}
            <template v-slot:action="{ attrs }">
              <v-btn icon v-bind="attrs" @click="snackbar.show = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>

          <v-dialog v-model="dialogDelete" max-width="500px" persistent>
            <v-card>
              <v-card-title class="text-h6" style="justify-content: center">
                Tem certeza que quer excluir esse Aluno?
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" dark class="mb-2" @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="deleteItemConfirm"
                  >Excluir</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <template>
          <v-text-field
            v-model="search"
            label="Digite sua busca"
            class="mx-4"
            append-icon="mdi-magnify"
          ></v-text-field>
        </template>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <Footer style="margin-top: auto" />
  </v-app>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    snackbar: {
      message: "",
      color: "",
      show: false,
    },
    headers: [
      { text: "Registro Acadêmico", value: "ra" },
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    desserts: [],
    // item: {
    //   name: "",
    //   email: "",
    // },
    itemIndex: -1,
    item: {
      name: "",
      email: "",
      ra: "",
      cpf: "",
    },
    valid: true,
    name: "",
    nameRules: [
      (value) => !!value || "Obrigatório.",
      (value) => (value || "").length >= 5 || "Mínimo de 5 caracteres.",
    ],
    email: "",
    emailRules: [
      (value) => /.+@.+/.test(value) || "Endereço de e-mail inválido",
    ],
    ra: "",
    raRules: [
      (value) => !!value || "Obrigatório.",
      (value) => (value || "").length >= 1 || "Mínimo de 1 caractere(s).",
    ],
    cpf: "",
    cpfRules: [
      (value) => !!value || "Obrigatório.",
      (value) => (value || "").length == 14 || "O CPF deve ter 11 dígitos.",
    ],
  }),

  computed: {
    formTitle() {
      return this.itemIndex === -1 ? "Novo Aluno" : "Editar Aluno";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.loadDataSource();
  },

  methods: {
    async loadDataSource() {
      await this.$api
        .get("/users")
        .then((response) => (this.desserts = response.data));
    },

    editItem(item) {
      this.itemIndex = this.desserts.indexOf(item);
      this.item = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.itemIndex = this.desserts.indexOf(item);
      this.item = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteStudent(this.item);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.item = Object.assign({}, this.defaultItem);
        this.itemIndex = -1;
        this.$refs.form.resetValidation();
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.item = Object.assign({}, this.defaultItem);
        this.itemIndex = -1;
      });
    },

    saveOnClick() {
      if (this.$refs.form.validate()) {
        if (this.itemIndex > -1) {
          this.updateStudent(this.item);
        } else {
          this.saveStudent(this.item);
        }
      } else {
      }
    },

    async saveStudent(student) {
      await this.$api
        .post("user", {
          name: student.name,
          email: student.email,
          ra: student.ra,
          cpf: student.cpf,
        })
        .then(() => {
          this.close();
          this.snackbar = {
            message: "Aluno adicionado com sucesso!",
            color: "success",
            show: true,
          };
          this.loadDataSource();
        })
        .catch(() => {
          this.close();
          this.snackbar = {
            message: "Dados inválidos. Verifique e tente novamente!",
            color: "error",
            show: true,
          };
        });
    },

    async updateStudent(student) {
      await this.$api
        .put(`user/${student.ra}`, {
          name: student.name,
          email: student.email,
        })
        .then(() => {
          this.close();
          this.snackbar = {
            message: "Aluno atualizado com sucesso!",
            color: "success",
            show: true,
          };
          this.loadDataSource();
        })
        .catch(() => {
          this.close();
          this.snackbar = {
            message: "Dados inválidos. Verifique e tente novamente!",
            color: "error",
            show: true,
          };
        });
    },

    async deleteStudent(student) {
      await this.$api
        .delete(`user/${student.ra}`)
        .then(() => {
          this.close();
          this.snackbar = {
            message: "Aluno excluído com sucesso!",
            color: "success",
            show: true,
          };
          this.loadDataSource();
        })
        .catch(() => {
          this.close();
          this.snackbar = {
            message: "Falha ao tentar excluir. Tente novamente!",
            color: "error",
            show: true,
          };
        });
    },
  },
};
</script>