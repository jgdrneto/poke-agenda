import { Component, OnInit, DoCheck, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

	@Input() poke_id : number;
	@Input() MAX_POKE : number;
  
  //Events
	@Output() request = new EventEmitter();
	@Output() modify = new EventEmitter();

	id : number; 
	name : String;
	sprites: any;
	url_image: String;
	stats : Array<any>;
	types : Array<any>;
	abilities: Array<any>;

  constructor() { 
  	this.id = this.poke_id;
    this.name = '';
    this.sprites = {};
    this.url_image = '';
    this.stats = [{base_stat : 0},{base_stat : 0},{base_stat : 0}, {base_stat : 0},{base_stat: 0},{base_stat:0}];
    this.types = [];
    this.abilities = []; 
  }

  upperCase(word){
    return word[0].toUpperCase() + word.slice(1);
  }

  updatePokemon(id){
    fetch('https://pokeapi.co/api/v2/pokemon/'+id, {"method": "GET"})
      .then(response => response.json())
      .then(response => {

        if(response.id<=this.MAX_POKE){

          let name = this.upperCase(response.name);

          this.id = response.id;
          this.name = name;
          this.url_image = response.sprites.other['official-artwork'].front_default;
          this.stats = response.stats;
          this.types = response.types;
          this.abilities= response.abilities

          this.request.emit({failure : false, newID : response.id});
        }else{
          this.request.emit({failure : true, newID : this.id});
        }
      })
      .catch(err => {
        this.request.emit({failure : true, newID : this.id});
        console.log(err);
      });
 	}

 	setGridColumns(length){
    return { gridTemplateColumns: 'repeat(' + length +', 1fr)'};
  }

  ngOnInit(): void {
  	this.updatePokemon(this.poke_id);
  }

  ngDoCheck(){
  	if(this.poke_id !== this.id){
  		this.updatePokemon(this.poke_id);
  	}
  }

}
