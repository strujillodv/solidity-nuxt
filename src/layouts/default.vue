<template lang="pug">
a-layout
  a-layout-header
    a-page-header(
      title="Task Dapp"
    )
      template( slot="extra")
        h2( v-if="connect" type="primary")
          | Connetion Ok
        a-button( v-else type="primary"  @click="login")
          | Login

  a-layout-content
    Nuxt
  a-layout-footer

  a-modal(
    v-model="visible"
    title="No puede conectarse"
  )
    template( slot="footer")
      a-button( key="back" @click="handleOk")
        | Ok
    | No se ha podido encontrar Metamask en el navegador si deseas intalarlo has click en el siguiente
    a(
      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
      target="_blank"
    ) &nbsp;enlace

</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    metaMaskClientCheck() {
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask)
    },
    ...mapState({
      'connect': state => state.ethereum.conection
    })
  },
  data: () => ({
    visible: false,
  }),
  methods: {
    async connectWallet() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      this.$store.commit('ethereum/addAccount', accounts[0])
    },
    login() {
      if(!this.metaMaskClientCheck) {
        this.visible = true;
      } else {
        this.connectWallet()
      }
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  }
}
</script>
<style>
.ant-layout-header {
  background: transparent !important;;
}
</style>
