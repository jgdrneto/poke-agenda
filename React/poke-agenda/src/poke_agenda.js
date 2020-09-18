import React from 'react';

import Pokemon from './pokemon/Pokemon'
import './poke_agenda.css'

class PokeAgenda extends React.Component{

	max_poke = 151;

	constructor(props) {
  	super(props);
    this.state = {
      id : 1,
      mode: 'pokemon',
      disabled: false
  	}	
  }	

  prev(){
  	if(this.state.id>1){
  		this.setState({
  			id : this.state.id-1,
  			disabled: true
  		});
  	}
  }


  next(){
  	if(this.state.id<this.max_poke){
  		this.setState({
  			id : this.state.id+1,
  			disabled: true
  		});
  	}
  }

  desalock(){
  	this.setState({
  			disabled: false
  	});
  }

  render(){
  	
  	let page = {};
  	switch(this.state.mode){
  		case 'pokemon' :
  			page =	<div className='PokemonName'>
  								<Pokemon poke_id={this.state.id} onUpdate={event => this.desalock(event)}/>
  						 		<div>
  						 			<button id = 'prev' onClick={event => this.prev(event)} disabled={this.state.disabled}> &#60; </button>
  									<button id = 'next' onClick={event => this.next(event)} disabled={this.state.disabled}> > </button>
  						 		</div>
  						 	</div>;
  		break;
  		default:
  			page = <div></div>;
  	}

  	return page;

  }

}

export default PokeAgenda;