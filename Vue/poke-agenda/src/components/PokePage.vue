<template>
  <Page :mode="mode" :max="max"/>  
</template>

<script>

import Page from './Page'

export default {
  components: { Page },
  data: () => ({
    mode: 'pokemon',
    max: 151
  }),
  methods: {
      
  },
  computed:{

  }   
}
</script>

<style>

</style>
