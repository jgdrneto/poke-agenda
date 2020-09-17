import React from 'react';

import BugLogo from '../icons/bug.svg';
import DarkLogo from '../icons/dark.svg';
import DragonLogo from '../icons/dragon.svg';
import ElectricLogo from '../icons/electric.svg';
import FairyLogo from '../icons/fairy.svg';
import FightingLogo from '../icons/fighting.svg';
import FireLogo from '../icons/fire.svg';
import FlyingLogo from '../icons/flying.svg';
import GhostLogo from '../icons/ghost.svg';
import GrassLogo from '../icons/grass.svg';
import GroundLogo from '../icons/ground.svg';
import IceLogo from '../icons/ice.svg';
import NormalLogo from '../icons/normal.svg';
import PoisonLogo from '../icons/poison.svg';
import PsychicLogo from '../icons/psychic.svg';
import RockLogo from '../icons/rock.svg';
import SteelLogo from '../icons/steel.svg';
import WaterLogo from '../icons/water.svg';

import '../index.css';

class Pokemon extends React.Component{
 
  constructor(props) {
  	super(props);
    this.state = {
      id : 1,
      name : '',
      sprites: {},
      stats : {},
      types: [],
      habilities: []
  	}
  }	

  upperCase(word){
  	return word[0].toUpperCase() + word.slice(1);
  }

  componentDidMount() {
		this.updatePokemon(this.props.poke_id);
	}

	updatePokemon(id){
		fetch('https://pokeapi.co/api/v2/pokemon/'+id, {"method": "GET"})
		.then(response => response.json())
		.then(response => {
			this.setState({
				id : response.id,
		  	name: this.upperCase(response.name),
		  	sprites : response.sprites,
		  	stats: response.stats,
		  	types: response.types,
		  	habilities: response.habilities
		  });
		})
		.catch(err => {console.log(err);});
	}

	getLogos(types){
		let logos = [];
		let class_name='';
		let logo = null;
		let alt_name = '';
		
		for (let index = 0; index < types.length; index++) {
			
			class_name='';
			logo = null;
			alt_name = '';
		
			switch(types[index].type.name){
				case 'bug':
					class_name = 'icon bug';
	      	logo = BugLogo;						
	      	alt_name = 'Bug type';
				break;
				case 'dark':
					class_name = 'icon dark';
	      	logo = DarkLogo;						
	      	alt_name = 'Dark type';
				break;
				case 'dragon':
					class_name = 'icon dragon';
	      	logo = DragonLogo;						
	      	alt_name = 'Dragon type';	
				break;
				case 'electric':
					class_name = 'icon electric';
	      	logo = ElectricLogo;						
	      	alt_name = 'Electric type';	
				break;
				case 'fairy':
					class_name = 'icon fairy';
	      	logo = FairyLogo;						
	      	alt_name = 'Fairy type';	
				break;
				case 'fighting':
					class_name = 'icon fighting';
	      	logo = FightingLogo;						
	      	alt_name = 'Fighting type';	
				break;
				case 'fire':
					class_name = 'icon fire';
	      	logo = FireLogo;						
	      	alt_name = 'Fire type';	
				break;
				case 'flying':
					class_name = 'icon flying';
	      	logo = FlyingLogo;						
	      	alt_name = 'Flying type';	
				break;
				case 'ghost':
					class_name = 'icon ghost';
	      	logo = GhostLogo;						
	      	alt_name = 'Ghost type';	
				break;
				case 'grass':
					class_name = 'icon grass';
	      	logo = GrassLogo;						
	      	alt_name = 'Grass type';
				break;
				case 'ground':
					class_name = 'icon ground';
	      	logo = GroundLogo;						
	      	alt_name = 'Ground type';	
				break;
				case 'ice':
					class_name = 'icon ice';
	      	logo = IceLogo;						
	      	alt_name = 'Ice type';	
				break;
				case 'normal':
					class_name = 'icon normal';
	      	logo = NormalLogo;						
	      	alt_name = 'Normal type';	
				break;
				case 'poison':
					class_name = 'icon poison';
	      	logo = PoisonLogo;						
	      	alt_name = 'Poison type';	
				break;
				case 'psychic':
					class_name = 'icon psychic';
	      	logo = PsychicLogo;						
	      	alt_name = 'Psychic type';	
				break;
				case 'rock':
					class_name = 'icon rock';
	      	logo = RockLogo;						
	      	alt_name = 'Rock type';	
				break;
				case 'steel':
					class_name = 'icon steel';
	      	logo = SteelLogo;						
	      	alt_name = 'Steel type';	
				break;
				case 'water':
					class_name = 'icon water';
	      	logo = WaterLogo;						
	      	alt_name = 'Water type';	
				break;
				default :
				
			}

			let logo_types = 	<div className={class_name} key={index}>
	      									<img src={logo} className='iconSvg' alt={alt_name}/>
	      								</div>;

	    logos.push(logo_types);
		}

		return logos;
	}

  render(){
  	let divs_types = this.getLogos(this.state.types);

		return (
	  	<div className='PokemonName'>
	  		<div className='header'>
					<h1 className='name'> {this.state.id} - {this.state.name}</h1>
					{divs_types}
				</div> 
	    </div>
	  );    	 
  }
}

export default Pokemon;
