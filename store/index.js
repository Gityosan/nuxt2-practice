export const state = () => ({
  todos: ['item1', 'item2', 'item3']
})

export const mutations = {
  setTodos(state, todos = state.todos) {
    state.todos = todos
  },
  addTodo(state, todo = null) {
    if (todo) {
      state.todos.push(todo)
    }
  },
  updateTodo(state, { oldTodo = null, newTodo = null }) {
    if (oldTodo) {
      const index = state.todos.indexOf(oldTodo)
      if (index !== -1) {
        state.todos.splice(index, 1, newTodo)
      }
    }
  },
  deleteTodo(state, todo = null) {
    if (todo) {
      const index = state.todos.indexOf(todo)
      if (index !== -1) {
        state.todos.splice(index, 1)
      }
    }
  }
}

export const actions = {
  sampleFunction({ commit }, { input = '' }) {
    commit('setTodo', input)
    console.log('Sample Function!!')
    alert('Sample Function!!')
  }
}
export const getters = {
  todos: (state) => state.todos
}
