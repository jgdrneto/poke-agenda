<svelte:options accessors={true}/>

<main>
	<div>
    <div class='item'>
      <img class='PokeImage' on:load={loadImage} src={url_image} alt='Pokemon'/>
    </div>
    <div class='header item'>
      <h2 class='name'> {poke_id} - {name}</h2>
      
      <div class='logosTypes' style={setGridColumns(types.length)} >
      	{#each types as value}
      		<div class={"icon " + value.type.name}>
      			<img src={getLogo(value.type.name)} class="iconSvg" alt={value.type.name + ' type'} />
      		</div>
      	{/each}
      </div>

    </div> 
    <div class='item itemAbility'>
      <h5> Abilities </h5>
      <div class='abilities' style={setGridColumns(abilities.length)}>
       	{#each abilities as value}
       		<div>
       			{#if value.is_hidden}
          	<div class="star"> &#9733; </div>
          	{/if}
          	<p class="pAbility"> {value.ability.name} </p>
      		</div>
      	{/each}
      </div>
    	
    </div>
    <div class='item itemStats'>
      <h5> Stats </h5>
      <div class="stats">
        <h6> HP </h6>           <h6> {stats[0].base_stat}</h6> <div class="divProgressBar"> <Progress color="hp" max={255} value={stats[0].base_stat}/></div>
        <h6> Attack </h6>       <h6> {stats[1].base_stat}</h6> <div class="divProgressBar"> <Progress color="atk" max={255} value={stats[1].base_stat}/> </div>
        <h6> Defense </h6>      <h6> {stats[2].base_stat}</h6> <div class="divProgressBar"> <Progress color="def" max={255} value={stats[2].base_stat}/> </div>
        <h6> SP. Attack </h6>   <h6> {stats[3].base_stat}</h6> <div class="divProgressBar"> <Progress color="spAtk" max={255} value={stats[3].base_stat}/> </div>
        <h6> SP. Defense </h6>  <h6> {stats[4].base_stat}</h6> <div class="divProgressBar"> <Progress color="spDef" max={255} value={stats[4].base_stat}/> </div>
        <h6> Speed </h6>        <h6> {stats[5].base_stat}</h6> <div class="divProgressBar"> <Progress color="speed" max={255} value={stats[5].base_stat}/> </div>
      </div>
    </div>  
  </div>
</main>

<script>
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte'
	import { Progress } from 'sveltestrap';

	const dispatcher = createEventDispatcher();

	export let id;
	export let max_poke;
	
	let poke_id = id;
	let url_image= "";
	let name="";
	let stats = [{base_stat : 0},{base_stat : 0},{base_stat : 0}, {base_stat : 0},{base_stat: 0},{base_stat:0}];
	let types = [];
	let abilities = [];

	onMount(()=>{
  	updatePokemon(id);
  });

	afterUpdate(() => {
		if(poke_id !== id){
			updatePokemon(id);
			changeColor();
		}
	});

	function changeColor(){

	}

	function loadImage(){
		dispatcher('modify');
	}

	function upperCase(word){
    return word[0].toUpperCase() + word.slice(1);
  };
  
  function updatePokemon(newID){
    fetch('https://pokeapi.co/api/v2/pokemon/'+newID, {"method": "GET"})
    .then(response => response.json())
    .then(response => {

	    if(response.id<=max_poke){

	      let newName = upperCase(response.name);

	      poke_id = response.id;
	      name = newName;
	      url_image = response.sprites.other['official-artwork'].front_default;
	      stats = response.stats;
	      types = response.types;
	      abilities= response.abilities
				
				dispatcher('request',{failure: false, newID: response.id});
	    }else{
	      dispatcher('request',{failure: true, newID: poke_id});
	    }
    })
    .catch(err => {
      dispatcher('request',{failure: true, newID: poke_id});
			console.log(err);
    });
  }

  function setGridColumns(length){
    return "grid-template-columns: repeat(" + length+ ", 1fr)";
  }

  function getLogo(name){
  	return "../assets/icons/"+name+".svg";
  }

</script>

<style>

	.PokeImage{
	  width: 30%;
	}

	.header{
	  display: inline-flex;
	}

	.item{
	  margin-top: 5px;
	  margin-bottom: 5px;
	}

	.itemAbility{
	  margin-right: 2%;
	  margin-left: 2%;
	}

	.itemStats{
	  margin-right: 5%;
	  margin-left: 5%;
	}

	.name{
	  display: inline;
	  margin-right: 10px;
	  margin-bottom: 0px;
	}

	.logosTypes{
	  margin: auto auto;
	  display: grid;
	  align-content: center;
	  align-items: center;
	}

	.icon {
	    border-radius: 50%;
	    height: 30px;
	    width: 30px;
	    display: inline;
	    margin-right: 5px;
	}

	.divAbilities{
	  display: inline-flex;
	}

	.abilities{
	  margin: auto auto;
	  display: grid;
	  align-content: center;
	  align-items: center;
	}

	.pAbility{
	  margin-bottom: 0px;
	  display: inline;
	}

	.star{
	  color: yellow;
	  display: inline;
	}

	.stats{
	  width: 100%;
	  margin: auto auto;
	  display: grid;
	  grid-template-columns: 100px 40px 1fr;
	  align-content: center;
	  align-items: center;
	}

	.divProgressBar{
	  margin-bottom: 8px;
	}

	div :global(.bg-hp){
		background-color: red;
	}

	div :global(.bg-atk){
	  background-color: orange;
	}

	div :global(.bg-def){
	  background-color: yellow;
	}

	div :global(.bg-spAtk){
	  background-color: blue;
	}

	div :global(.bg-spDef){
	  background-color: green;
	}

	div :global(.bg-speed){
	  background-color: pink;
	}
</style>