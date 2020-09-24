<template>
  <div>
    <b-form-group  class="searchBar">
      <b-form-input ref="search" v-model="text" @keyup.enter.native="searchID" type="text" placeholder="Search..." />
    </b-form-group>
    <b-alert :show="failure" variant="danger" @dismissed="closeDialog" dismissible>
      Pokemon not found!!!
    </b-alert>
  </div>  
</template>

<script>
  export default {
    props: ['failure'],
    data: () => ({
      text: ''
    }),
    mounted() {
      this.$refs.search.focus();
    },
    updated(){
      this.$nextTick(() => {

      });
    },
    methods: {
      searchID(){
        this.$emit('search',this.text);
        this.$refs.search.focus();
      },
      closeDialog(){
        this.$emit('close');
        this.$refs.search.focus();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
  .searchBar{
    margin-right: 20%;
    margin-left: 20%;
  }

</style>
