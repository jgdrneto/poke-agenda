<template>
  <div class='PokemonName'>
    <h1>PokéAgenda-Vue</h1>
    <Searcher :failure="failure" @search="search"/>
    <Pokemon/>
    <div>
      <b-button id = 'prev' size='sm'> &#60; </b-button>
      <b-button id = 'next' size='sm'> > </b-button>
    </div>
  </div>  
</template>

<script>

import Pokemon from './Pokemon'
import Searcher from './Searcher'

export default {
  components: { Searcher, Pokemon },
  data: () => ({
    id : 1,
    copy_id: 1,
    poke_name: 'bulbasaur',
    mode: 'pokemon',
    disabled: false ,
    failure: false
  }),
  methods: {
    search(value) {
      console.log(value);
    }  
  }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .PokemonName{
    margin: 0 auto;
    width: 50%;
    padding: 5px;
    text-align: center;
  }

  .carousel{
    margin: auto auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-content: center;
    align-items: center;
  }
</style>
