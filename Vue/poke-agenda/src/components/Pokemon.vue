<template>
  <div>
    <div class='item'>
      <img class='PokeImage' @load="$emit('modify')" :src="url_image" alt='Pokemon'/>
    </div>
    <div class='header item'>
      <h2 class='name'> {{this.id}} - {{this.name}}</h2>
      <div class='logosTypes'> <!--style={{gridTemplateColumns: 'repeat('+ divs_types.length + ', 1fr)'}}-->
        <!--{divs_types}-->
      </div>
    </div> 
    <div class='item itemAbility'>
      <h5> Abilities </h5>
      <div class='abilities'> <!--style={{gridTemplateColumns: 'repeat('+ this.state.abilities.length + ', 1fr)'}}-->
        <!--{abilities}-->
      </div>
    </div>
    <div class='item itemStats'>
      <h5> Stats </h5>
      <div class="stats">
        <h6> HP </h6>           <h6> {{this.stats[0].base_stat}}</h6> <div class="divProgressBar"> <b-progress variant="hp" :max="255" :value="this.stats[0].base_stat"></b-progress> </div>
        <h6> Attack </h6>       <h6> {{this.stats[1].base_stat}}</h6> <div class="divProgressBar"> <b-progress variant="atk" :max="255" :value="this.stats[1].base_stat"/> </div>
        <h6> Defense </h6>      <h6> {{this.stats[2].base_stat}}</h6> <div class="divProgressBar"> <b-progress variant="def" :max="255" :value="this.stats[2].base_stat"/> </div>
        <h6> SP. Attack </h6>   <h6> {{this.stats[3].base_stat}}</h6> <div class="divProgressBar"> <b-progress variant="spAtk" :max="255" :value="this.stats[3].base_stat"/> </div>
        <h6> SP. Defense </h6>  <h6> {{this.stats[4].base_stat}}</h6> <div class="divProgressBar"> <b-progress variant="spDef" :max="255" :value="this.stats[4].base_stat"/> </div>
        <h6> Speed </h6>        <h6> {{this.stats[5].base_stat}}</h6> <div class="divProgressBar"> <b-progress variant="speed" :max="255" :value="this.stats[5].base_stat"/> </div>
      </div>
    </div>  
  </div>  
</template>

<script>
  export default {
    props: {
      poke_id :{
        required: true
      },
      max_poke:{
        required: true
      } 
    },
    data: (props) => ({
      id : props.poke_id,
      name : '',
      sprites: {},
      url_image: '',
      stats : [{base_stat : 0},{base_stat : 0},{base_stat : 0}, {base_stat : 0},{base_stat: 0},{base_stat:0}],
      types: [],
      abilities: [] 
    }),
    watch: { 
      poke_id: function(newVal) { // watch it
        this.updatePokemon(newVal);
      }
    },
    created(){
      this.updatePokemon(this.poke_id);
    },
    beforeUpdate(){
      
    },
    updated(){
      
    },
    methods: {
      upperCase(word){
        return word[0].toUpperCase() + word.slice(1);
      },
      updatePokemon(id){
        fetch('https://pokeapi.co/api/v2/pokemon/'+id, {"method": "GET"})
        .then(response => response.json())
        .then(response => {

          if(response.id<=this.max_poke){

            let name = this.upperCase(response.name);

            this.id = response.id;
            this.name = name;
            this.url_image = response.sprites.other['official-artwork'].front_default;
            this.stats = response.stats;
            this.types = response.types;
            this.abilities= response.abilities

            this.$emit('request',false,response.id);
          }else{
            this.$emit('request',true,this.id);
          }
        })
        .catch(err => {
          
          this.$emit('request',true,this.id);

          console.log(err);
        });
      },
      getAbilities(abilities){
      
        return abilities;
      },
      getLogos(types){
        return types;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.bg-hp{
  background-color: red;
}

.bg-atk{
  background-color: orange;
}

.bg-def{
  background-color: yellow;
}

.bg-spAtk{
  background-color: blue;
}

.bg-spDef{
  background-color: green;
}

.bg-speed{
  background-color: pink;
}
</style>
