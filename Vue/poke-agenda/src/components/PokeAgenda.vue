<template>
  <div class='PokemonName'>
    <h1>PokéAgenda-Vue </h1>
    <Searcher :key="failure" :failure="failure" @close="close" @search="search"/>
    <div class="carousel">
      <b-button id = 'prev' @click="prev" :disabled="disabled_prev" size='lg'> &#60; </b-button>
      <Pokemon/>
      <b-button id = 'next' @click="next" :disabled="disabled_next" size='lg'> > </b-button>
    </div>
  </div>  
</template>

<script>

import Pokemon from './Pokemon'
import Searcher from './Searcher'

export default {
  components: { Searcher, Pokemon },
  data: () => ({
    max_poke: 151,
    id: 1,
    mode: 'pokemon',
    disabled_prev: true,
    disabled_next: false,
    failure: false
  }),
  methods: {
    search(value) {
      console.log(value);
      this.failure = !this.failure;
    },
    close(){
      this.failure = false;
    },
    prev(){
      if(this.id>1){
        this.id -= 1;
        this.disabled_prev = true;
        this.disabled_next = true;
      }
    },
    next(){
      console.log(this.failure);

      if(this.id<this.max_poke){
        this.id +=1;
        this.disabled_prev = true;
        this.disabled_next = true;
        console.log('next');
      }
    }   
  },
  computed:{
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
