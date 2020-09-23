<template>
  <div>
    <b-form-group  class="searchBar">
      <b-form-input ref="search" v-model="text" @keyup.enter.native="searchID" type="text" placeholder="Search..." />
    </b-form-group>
    <b-alert v-model="search_failure" variant="danger" @dismissed="closeDialog('teste')" dismissible>
      Pokemon not found!!!
    </b-alert>
  </div>  
</template>

<script>
  export default {
    props: ['failure'],
    data: (props) => ({
      search_failure: props.failure,
      text: ''
    }),
    mounted() {
      this.$refs.search.focus();
    },
    methods: {
      closeDialog() {
        this.$refs.search.focus();
      },
      searchID(){
        this.$emit('search',this.text);
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
