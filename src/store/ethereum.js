import {truffle} from "../services/truffle"

export const state = () => ({
  conection: false,
  account: "0x0000000000000000000000000000000000000000",
  tasks: []
})

export const mutations = {
  addProvider(state, provider) {
    state.provider = provider
  },
  addAccount(state, account) {
    state.account = account
    state.conection = true
  },
  addtasks(state, task) {
    state.tasks.push(task)
  },
  toogleTask(state, id) {
    state.tasks[id-1].done = !state.tasks[id-1].done
  }
}
