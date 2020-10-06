<main>
	<div class="searchBar">
		<!--
    <b-form-group  class="searchBar">
      <b-form-input ref="search" v-model="text" @keyup.enter.native="searchID" type="text" placeholder="Search..." />
    </b-form-group>
    -->
    <FormGroup>
    	<Input id="searchID" bind:this={ref} readonly={false} type="search" placeholder="Search..." on:keyup={searchID}/>
  	</FormGroup>
    <Alert color="danger" isOpen={failure} toggle={closeDialog}>
  		Pokemon not found!!!
		</Alert>
    <!--
    <b-alert :show="failure" variant="danger" @dismissed="closeDialog" dismissible>
      Pokemon not found!!!
    </b-alert>
  	-->
  </div>  
</main>

<script>
	import { createEventDispatcher, onMount } from 'svelte'
	import { Alert, Input, Form, FormGroup } from 'sveltestrap';

	const dispatcher = createEventDispatcher();

  export let failure;
  
  let ref;

  onMount(()=>{
  	ref = document.getElementById("searchID");
  	ref.focus();
  });

  function closeDialog(){
  	dispatcher('close');
  	ref.focus();
  }

  function searchID(event){
  	if (event.code == 'Enter') {
  		dispatcher('search', event.target.value);
  		ref.focus();
  	}
  }

</script>

<style>
	.searchBar{
    margin-right: 20%;
    margin-left: 20%;
  }
</style>