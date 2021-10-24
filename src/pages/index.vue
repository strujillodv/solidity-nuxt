<template lang="pug">
a-row(
  type="flex"
  justify="center"
  align="top"
  :gutter="[16,16]"
)
  a-col(
    :span="20"
    :md="{span: 7}"
  )
    a-space(
      style="width: 100%"
      direction="vertical"
    )
      a-card
        a-card-meta(
          title="Dapp"
          description="Desentralize Task App"
        )
          a-avatar(
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          )
        p(style="margin-top: 16px;") 💳 Wallet
        p(
          style="font-size: 10px; overflow: hidden;"
        ) # {{account}}
      a-card
        a-form( @submit.prevent="addTask" )
          a-form-item
            a-input(
              v-model="title"
              placeholder="Name Task"
            )
          a-form-item
            a-input(
              v-model="description"
              placeholder="Description Task"
            )
          a-form-item
            a-button(
              type="primary"
              html-type="submit"
            ) Add Task
  a-col(
    :span="20"
    :md="{span: 12}"
  )
    a-table(
      :columns="columns"
      :data-source="tasks"
    )
      template( slot="done" slot-scope="text, record")
        a-checkbox( :checked="text" @click="toogleTask(record.key)" )
</template>
<script>
const contract = require("@truffle/contract");
import { mapState } from 'vuex'
const columns = [
  {
    title: 'Title',
    scopedSlots: { customRender: 'title' },
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Description',
    scopedSlots: { customRender: 'description' },
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Done',
    scopedSlots: { customRender: 'done' },
    dataIndex: 'done',
    key: 'done',
  },
];
export default {
  async asyncData({ store }) {
    const provider = await window.ethereum
    let contractDeployed = {}
    // Data Contract Task JSON
    const res = await fetch("/contracts/Tasks.json")
    const contractJSON = await res.json();
    // Construction Contract Task
    const MyContract = contract(contractJSON)
    MyContract.setProvider(provider)
    contractDeployed = await MyContract.deployed()

    const counter = await contractDeployed.counterTask()

    const taskCounter = counter.toNumber();

    if(taskCounter > store.state.ethereum.tasks.length) {
      for (let i = 1; i <= taskCounter; i++) {
        let task = {}
        const taskList = await contractDeployed.tasks(i);

        task.key = taskList[0].toNumber();
        task.title = taskList[1];
        task.description = taskList[2];
        task.done = taskList[3];

        store.commit('ethereum/addtasks', task);
      }
    }

    return {
      contractDeployed,
      taskCounter
    }
  },
  computed: {
    ...mapState({
      'account': state => state.ethereum.account,
      'tasks': state => state.ethereum.tasks
    })
  },
  data() {
    return {
      columns,
      title: '',
      description: ""
    };
  },
  methods: {
    async addTask() {
      await this.contractDeployed.createTask(this.title, this.description, {
        from: this.account
      }).then((res) =>{
        const resTask = res.logs[0].args

        let task = {}
        task.key = this.taskCounter + 1;
        task.title = resTask.title;
        task.description = resTask.description;
        task.done = resTask.done;

        this.$store.commit('ethereum/addtasks', task);
      })
      this.title = ""
      this.description = ""
    },
    async toogleTask(key) {
      await this.contractDeployed.toogleTask(key, {
        from: this.account
      }).then(() => {

        this.$store.commit('ethereum/toogleTask', key);

      })
    }
  }
};
</script>
