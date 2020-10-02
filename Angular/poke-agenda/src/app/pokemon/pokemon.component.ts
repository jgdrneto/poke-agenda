import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

	@Input() poke_id : number;

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

  ngOnInit(): void {
  }

}
