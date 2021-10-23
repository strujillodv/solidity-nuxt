<template>
    <section>
        <div>App Nuxt 3</div>
        <a-date-picker :locale="locale" />
    </section>
</template>
<script>
  import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
  export default {
    data() {
      return {
        locale,
      };
    },
  };
</script>
