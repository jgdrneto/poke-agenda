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

//import 'bootstrap/dist/css/bootstrap.min.css';

import '../icons/icons.css'
import './Type.css';


class Type extends React.Component{
 
  constructor(props) {
  	super(props);
    this.state = {
      id : this.props.type_id,
      name : '',
      logo : null,
      types :[{name : '', damage: ' ', url: ''}]	
  	}
  }	

  upperCase(word){
  	if(word.length>1){
  		return word[0].toUpperCase() + word.slice(1);
  	}else{
  		return '';
  	}
  }

  lowercase(word){
  	return word.toLowerCase();
  }

  componentDidMount() {
		this.updateType(this.props.type_id);
	}

	componentDidUpdate(prevProps){
		if(prevProps.type_id !== this.props.type_id){
			this.updateType(this.props.type_id);
		}
	}

	updateType(id){
		fetch('https://pokeapi.co/api/v2/type/'+id, {"method": "GET"})
		.then(response => response.json())
		.then(response => {

			let name = this.upperCase(response.name);
			let logo = this.getLogo(response.name);

			let types = this.getTypes(response.damage_relations.double_damage_to, response.damage_relations.half_damage_to, response.damage_relations.no_damage_to);

			this.setState({
			  	id : response.id,
		  		name: name,
		  		logo: logo,
		      types: types
		  });
		  this.props.onRequest(false,response.id, name);
		})
		.catch(err => {
			
			this.props.onRequest(true,this.state.id, this.state.name);

			console.log(err);
		});
	}

	getTypes(double_damage, half_damage, no_damage){

		let types =[{name : 'bug', damage: '', url: ''}, 
      					{name : 'dark', damage: '', url: ''},
	      				{name : 'dragon', damage: '', url: ''},
	      				{name : 'electric', damage: '', url: ''},
	      				{name : 'fairy', damage: '', url: ''},
	      				{name : 'fighting', damage: '', url: ''},
	      				{name : 'fire', damage: '', url: ''},
	      				{name : 'flying', damage: '', url: ''},
	      				{name : 'ghost', damage: '', url: ''},
	      				{name : 'grass', damage: '', url: ''},
	      				{name : 'ground', damage: '', url: ''},
	      				{name : 'ice', damage: '', url: ''},
	      				{name : 'normal', damage: '', url: ''},
	      				{name : 'poison', damage: '', url: ''},
	      				{name : 'psychic', damage: '', url: ''},
	      				{name : 'rock', damage: '', url: ''},
	      				{name : 'steel', damage: '', url: ''},
	      				{name : 'water', damage: '', url: ''}]	
		
		for (let t_index = 0; t_index < types.length; t_index++) {
			
			types[t_index].url = 'https://pokeapi.co/api/v2/type/'+types[t_index].name;
			types[t_index].damage = 'normal_damage';

			for (let nd_index = 0; nd_index < no_damage.length; nd_index++) {

				if(no_damage[nd_index].name === types[t_index].name){
					console.log('entrou');
					types[t_index].damage = 'no_damage'; 
				}
			}

			for (let hd_index = 0; hd_index < half_damage.length; hd_index++) {
				if(half_damage[hd_index].name === types[t_index].name){
					types[t_index].damage = 'half_damage';  
				}
			}

			for (let dd_index = 0; dd_index < double_damage.length; dd_index++) {
				if(double_damage[dd_index].name === types[t_index].name){
					types[t_index].damage = 'double_damage';  
				}
			}

		}
		return types;
	}

	getLogo(logo_name){
		
		let logo = null;
		switch(logo_name){
			case 'bug':
				logo = BugLogo;						
			break;
			case 'dark':
	      logo = DarkLogo;						
			break;
			case 'dragon':
				logo = DragonLogo;						
	    break;
			case 'electric':
	      logo = ElectricLogo;							
			break;
			case 'fairy':
				logo = FairyLogo;						
	    break;
			case 'fighting':
				logo = FightingLogo;						
	    break;
			case 'fire':
				logo = FireLogo;						
	    break;
			case 'flying':
				logo = FlyingLogo;						
	    break;
			case 'ghost':
			  logo = GhostLogo;						
	    break;
			case 'grass':
				logo = GrassLogo;						
	    break;
			case 'ground':
				logo = GroundLogo;						
	    break;
			case 'ice':
			  logo = IceLogo;						
	    break;
			case 'normal':
			  logo = NormalLogo;						
	    break;
			case 'poison':
				logo = PoisonLogo;						
	    break;
			case 'psychic':
				logo = PsychicLogo;						
	    break;
			case 'rock':
			  logo = RockLogo;						
	    break;
			case 'steel':
				logo = SteelLogo;						
	    break;
			case 'water':
				logo = WaterLogo;						
	    break;
				default :
				logo = NormalLogo;
		}
		return logo;
	}


	getLogos(){
		let logos = [];
		let class_name='';
		let logo = null;
		let alt_name = '';

		for (let index = 0; index < this.state.types.length; index++) {

			class_name='icon ' + this.state.types[index].damage;
			logo = this.getLogo(this.state.types[index].name);
			alt_name = this.upperCase(this.state.types[index].name) + ' type';
		
			let logo_type = 	<div className={class_name} key={index}>
	      									<img src={logo} className='iconSvg' alt={alt_name} />
	      								</div>;

	    logos.push(logo_type);
		}

		return logos;
	}

  render(){

  	let page={};

  	let divs_types = this.getLogos();

  	page = 	<div>
  						<div className='header item'>
	  						<div className='logosTypes'>
									<div className={'typeImage ' + this.lowercase(this.state.name)}>
										<img className='iconSvg' onLoad={event => this.props.onModify(event)} src={this.state.logo} alt='Type'/>
									</div>
								</div>
							</div>
							<div className='item'>
								<h2 className='name'> {this.state.id} - {this.state.name}</h2>
							</div>	
							<div className='item'>
								<div className='header item'>
									<div className='logosTypes' style={{gridTemplateColumns: 'repeat('+ (divs_types.length/3) + ', 1fr)'}}>
										{divs_types}
									</div>
								</div>
							</div>	
				    </div>

		return page;
  }
}

export default Type;
