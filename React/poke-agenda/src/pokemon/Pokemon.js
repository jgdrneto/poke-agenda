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

import ProgressBar from 'react-bootstrap/ProgressBar';

//import 'bootstrap/dist/css/bootstrap.min.css';

import '../icons/icons.css'
import './pokemon.css';


class Pokemon extends React.Component{
 
  constructor(props) {
  	super(props);
    this.state = {
      id : this.props.poke_id,
      name : '',
      sprites: {},
      stats : [{base_stat : 0},{base_stat : 0},{base_stat : 0}, {base_stat : 0},{base_stat: 0},{base_stat:0}],
      types: [],
      abilities: []
  	}
  }	

  upperCase(word){
  	return word[0].toUpperCase() + word.slice(1);
  }

  componentDidMount() {
		this.updatePokemon(this.props.poke_id);
	}

	componentDidUpdate(prevProps){
		if(prevProps.poke_id !== this.props.poke_id){
			this.updatePokemon(this.props.poke_id);
		}
	}

	updatePokemon(id){
		fetch('https://pokeapi.co/api/v2/pokemon/'+id, {"method": "GET"})
		.then(response => response.json())
		.then(response => {

			let name = this.upperCase(response.name);

			this.setState({
			  	id : response.id,
		  		name: name,
		  		url_image : response.sprites.other['official-artwork'].front_default,
		  		stats: response.stats,
		  	  types: response.types,
		  	  abilities: response.abilities
		  });
		  this.props.onRequest(false,response.id, name);
		})
		.catch(err => {
			
			this.props.onRequest(true,this.state.id, this.state.name);

			console.log(err);
		});
	}

	getAbilities(abilities){
		
		let abs = [];
		
		for (let index = 0; index < abilities.length; index++) {

			let star = [];  
			if(abilities[index].is_hidden===true){
				star = <div className='star'> {'\u2605'} </div>;
			}
							
			let ab = 	<div key={index}>
									{star}
									<p className='pAbility'> {abilities[index].ability.name} </p>
								</div>
			abs.push(ab);
		}
		
		return abs;
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
	      									<img src={logo} className='iconSvg' alt={alt_name} />
	      								</div>;

	    logos.push(logo_types);
		}

		return logos;
	}

  render(){

  	let page={};

  	let divs_types = this.getLogos(this.state.types);

  	let abilities = this.getAbilities(this.state.abilities);

  	page = 	<div>
							<div className='item'>
								<img className='PokeImage' onLoad={event => this.props.onModify(event)} src={this.state.url_image} alt='Pokemon'/>
							</div>
							<div className='header item'>
								<h2 className='name'> {this.state.id} - {this.state.name}</h2>
								<div className='logosTypes' style={{gridTemplateColumns: 'repeat('+ divs_types.length + ', 1fr)'}}>
									{divs_types}
								</div>
							</div> 
							<div className='item itemAbility'>
								<h5> Abilities </h5>
								<div className='abilities' style={{gridTemplateColumns: 'repeat('+ this.state.abilities.length + ', 1fr)'}}>
									{abilities}
								</div>
							</div>
							<div className='item itemStats'>
								<h5> Stats </h5>
								<div className='stats'>
									<h6> HP </h6> 					<h6> {this.state.stats[0].base_stat}</h6> <div className='divProgressBar'> <ProgressBar variant='hp' max={255} now={this.state.stats[0].base_stat}/> </div>
									<h6> Attack </h6> 			<h6> {this.state.stats[1].base_stat}</h6> <div className='divProgressBar'> <ProgressBar variant='atk' max={255} now={this.state.stats[1].base_stat}/> </div>
									<h6> Defense </h6> 			<h6> {this.state.stats[2].base_stat}</h6> <div className='divProgressBar'> <ProgressBar variant='def' max={255} now={this.state.stats[2].base_stat}/> </div>
									<h6> SP. Attack </h6> 	<h6> {this.state.stats[3].base_stat}</h6> <div className='divProgressBar'> <ProgressBar variant='spAtk' max={255} now={this.state.stats[3].base_stat}/> </div>
									<h6> SP. Defense </h6> 	<h6> {this.state.stats[4].base_stat}</h6> <div className='divProgressBar'> <ProgressBar variant='spDef' max={255} now={this.state.stats[4].base_stat}/> </div>
									<h6> Speed </h6> 				<h6> {this.state.stats[5].base_stat}</h6> <div className='divProgressBar'> <ProgressBar variant='speed' max={255} now={this.state.stats[5].base_stat}/> </div>	
								</div>
							</div>	
				    </div>

		return page;
  }
}

export default Pokemon;
