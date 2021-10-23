const contract = require("@truffle/contract");

export const state = () => ({
  conection: false,
  provider: '',
  account: {},
  tasksContract: {},
  tasks: [],
  error: {}
})

export const mutations = {
  addProvider(provider) {
    state.provider = provider
  },
  addAccount(account) {
    state.account = account
    state.conection = true
  },
  addtasksContract(tasksContract) {
    state.tasksContract = tasksContract
  },
  addtasks(tasks) {
    state.tasks = tasks
  },
  errorMessage(error) {
    state.error = error
  }
}

export const actions = {
  async loadAccount ({commit}) {
    try {
       // Privider Ethereum
      commit('addProvider', window.ethereum)
      // Address Metamask
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      commit('addAccount', accounts[0])

    } catch (error) {
      commit('errorMessage', error)
    }
  },
  async loadContract ({commit}) {
    try {
      // Data Contract Task JSON
      const res = await fetch("/contracts/Tasks.json");
      const tasksContractJSON = await res.json();

      // Construction Contract Task
      const MyContract = contract(tasksContractJSON)
      MyContract.setProvider(window.ethereum)
      const tasks = await MyContract.deployed()
      commit('tasksContract', tasks)

    } catch (error) {
      commit('errorMessage', error)
    }
  },
  async createTask ({state},task) {
    try {
      await state.tasksContract.createTask(task.title, task.description, {
        from: state.account
      })

    } catch (error) {
      commit('errorMessage', error)
    }
  },
  async getTasks ({state}) {
    try {
      const tasks = await state.tasksContract.tasks
      commit('addtasks', tasks)

    } catch (error) {
      commit('errorMessage', error)
    }
  }
}
