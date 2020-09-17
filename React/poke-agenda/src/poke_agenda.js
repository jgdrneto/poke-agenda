import React from 'react';

import Pokemon from './pokemon/Pokemon'

class PokeAgenda extends React.Component{

	max_poke = 151;

	constructor(props) {
  	super(props);
    this.state = {
      id : 1,
      mode: 'pokemon'
  	}	
  }	

  render(){
  	
  	let page = {};
  	switch(this.state.mode){
  		case 'pokemon' :
  			page =	<div>
  								<Pokemon poke_id={this.state.id}/>
  						 	</div>;				 	
  		break;
  		default:
  			page = <div></div>;
  	}

  	return page;

  }

}

export default PokeAgenda;