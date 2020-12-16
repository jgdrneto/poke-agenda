import React from 'react';

//import 'bootstrap/dist/css/bootstrap.min.css';

import '../icons/icons.css'
import './ability.css';


class Ability extends React.Component{
 
  constructor(props) {
  	super(props);
    this.state = {
      id : this.props.ability_id,
      name : '',
      effect: ''
      }
  }	

  upperCase(word){
  	return word[0].toUpperCase() + word.slice(1);
  }

  componentDidMount() {
		this.updateAbility(this.props.ability_id);
	}

	componentDidUpdate(prevProps){
		if(prevProps.ability_id !== this.props.ability_id){
			this.updateAbility(this.props.ability_id);
		}
	}

	updateAbility(id){
		fetch('https://pokeapi.co/api/v2/ability/'+id, {"method": "GET"})
		.then(response => response.json())
		.then(response => {

			let name = this.upperCase(response.name);
			let effect_text = this.getEffect(response.effect_entries);

			this.setState({
				  id : response.id,
			  	name: name,
			  	effect: effect_text
			});

			this.props.onRequest(false,response.id, name);
			this.props.onModify('carregou');
		})
		.catch(err => {
			
			this.props.onRequest(true,this.state.id, this.state.name);
			console.log(err);
			this.props.onModify('carregou');
		});
	}

	getEffect(effects){

		let effect_text = "";

		for (let index = 0; index < effects.length; index++) {
			if(effects[index].language.name === "en"){
				effect_text = effects[index].short_effect;
				break;
			}
		}
		return effect_text;
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

  render(){

  	let page={};

  	//let abilities = this.getAbilities(this.state.abilities);

  	page = 	<div>
							<div className='header item'>
								<h2 className='name'> {this.state.id} - {this.state.name}</h2>
							</div> 
							<div className='item'>
								<h5> Effect </h5>
								<div className='effect'> 
									<p> {this.state.effect} </p>
								</div>
							</div>
				    </div>

		return page;
  }
}

export default Ability;
