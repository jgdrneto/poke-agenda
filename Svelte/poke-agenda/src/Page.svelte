<main>
	<div class='Page'>
    <h1>PokéAgenda-Svelte </h1>
    <Searcher {failure} on:close={close} on:search={search}/>
    <div class="carousel">
      <Button id="prev" on:click={prev} color='primary' disabled={disabled_prev} size ='lg'>  &#60; </Button>
    	{#if item === 'pokemon'}      
        <Pokemon {id} max_poke={max} on:modify={desalock} on:request={responseRequest}/>
    	{/if}
      <Button id="next" on:click={next} color='primary' disabled={disabled_next} size='lg'> > </Button>
    </div>
  </div> 
</main>

<script>
	import { onMount } from 'svelte'


	import Searcher from './Searcher.svelte';
	import Pokemon from './Pokemon.svelte';
	
	import { Button } from 'sveltestrap';

  export let item;
  export let max;
	
  let id = 1;
	let failure = false;
	let disabled_prev = true;
	let disabled_next = false;
	
  function prev(){
    if(id>1){
      id -= 1;
      disabled_prev = true;
      disabled_next = true;
    }
  }
  function next(){
    if(id<max){
      id +=1;
      disabled_prev = true;
      disabled_next = true;
    }
  }

	function search(event) {
      id = event.detail.toLowerCase();
      disabled_prev = true;
      disabled_next = true;
  }

  function close(){
    failure = false;
  }

  function desalock(){

  	let d_next = false;
    let d_prev = false;

    if(id===1){
    	d_prev = true;
    }else{
    	if(id === max){
      	d_next = true;
      }
    }

    disabled_prev = d_prev;
    disabled_next = d_next;
 	}

 	function responseRequest(event){
    let newFailure = event.detail.failure;
    let newID = event.detail.newID; 
    
    let f=false;

    if(failure || newFailure){
        f = true;
    }

    failure = f;
    id = newID;

    if(failure){
      desalock();
    }
  } 

</script>

<style>
	.Page{
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