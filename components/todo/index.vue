<template>
  <v-card flat outlined class="ma-5 pa-5">
    <v-card-title class="font-weight-bold text-h5">
      Todoアプリを作ろう！
    </v-card-title>
    <v-row>
      <v-col cols="8">
        <v-text-field
          v-model.trim.lazy="todo"
          placeholder="新規追加"
          dense
          :rules="[required, max30]"
          class="px-5"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn color="primary" width="100%" @click="createTodo()">
          <v-icon>mdi-plus-circle-outline</v-icon>add
        </v-btn>
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap">
      <v-card v-for="i in $store.getters.todos" :key="i" class="ma-5 pa-5">
        <v-card-title>{{ i }}</v-card-title>
        <v-text-field
          v-model.trim.lazy="newTodo"
          dense
          :rules="[max30]"
          append-icon="mdi-reload"
          append-outer-icon="mdi-trash-can-outline"
          @click:append="updateTodo(i, newTodo)"
          @click:append-outer="deleteTodo(i)"
        ></v-text-field>
      </v-card>
    </div>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    todo: '',
    todos: [],
    newTodo: '',
    required: (v) => !!v || '必須項目です',
    max30: (v) => (!v ? true : (v && v.length <= 30) || '30文字までです')
  }),
  created() {
    this.readTodo()
  },
  methods: {
    header() {
      return {
        headers: { 'X-MICROCMS-API-KEY': this.$config.MICROCMS_API_KEY }
      }
    },
    createTodo() {
      this.$store.commit('addTodo', this.todo)
      this.$axios
        .post(
          this.$config.MICROCMS_API_URL + '/todo',
          { todo: this.todo },
          this.header()
        )
        .then(() => {
          this.readTodo()
        })
        .catch((e) => {
          console.log('microCMS/createTodo/Error', e)
        })
    },
    updateTodo(oldTodo, newTodo) {
      this.$store.commit('updateTodo', { oldTodo, newTodo })
      const id = this.todos.filter((v) => v.todo === oldTodo)[0].id
      this.$axios
        .patch(
          this.$config.MICROCMS_API_URL + '/todo/' + id,
          { todo: newTodo },
          this.header()
        )
        .then(() => {
          this.readTodo()
        })
        .catch((e) => {
          console.log('microCMS/updateTodo/Error', e)
        })
    },
    readTodo() {
      this.$axios
        .get(this.$config.MICROCMS_API_URL + '/todo', this.header())
        .then((res) => {
          this.todos = res.data.contents
          this.$store.commit(
            'setTodos',
            res.data.contents.map((v) => v.todo)
          )
        })
        .catch((e) => {
          console.log('microCMS/readTodo/Error', e)
        })
    },
    deleteTodo(todo) {
      this.$store.commit('deleteTodo', todo)
      const id = this.todos.filter((v) => v.todo === todo)[0].id
      this.$axios
        .delete(this.$config.MICROCMS_API_URL + '/todo/' + id, this.header())
        .then(() => {
          this.readTodo()
        })
        .catch((e) => {
          console.log('microCMS/createTodo/Error', e)
        })
    }
  }
}
</script>
