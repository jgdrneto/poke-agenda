<main>
	<div class='PokemonName'>
    <h2>PokéAgenda-Svelte </h2>
    <!--<Searcher :failure="failure" @close="close" @search="search"/>-->
    <Searcher {failure} on:close={onClose} on:search={onSearch}/>
    <div class="carousel">
      <Button id="prev" color='primary' size ='lg'>  &#60; </Button>
    	<Pokemon/>
    	<Button id="next" color='primary' size='lg'> > </Button>
      
      <!--
      <b-button id = 'prev' @click="prev" :disabled="disabled_prev" size='lg'> &#60; </b-button>
      <Pokemon  :poke_id="id" :max_poke="max_poke" @modify="desalock" @request="responseRequest"/>
      <b-button id = 'next' @click="next" :disabled="disabled_next" size='lg'> > </b-button>
    	-->
    </div>
  </div> 
</main>

<script>
	import { onMount } from 'svelte'


	import Searcher from './Searcher.svelte';
	import Pokemon from './Pokemon.svelte';
	
	import { Button } from 'sveltestrap';

	let id = 1;
	let failure = true;
	let disabled_prev = true;
	let disabled_next = false;
	let max_poke = 151;
 
	function onSearch(event) {
      id = event.detail.toLowerCase();
      disabled_prev = true;
      disabled_next = true;
  }

  function onClose(){
    failure = false;
  }

</script>

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