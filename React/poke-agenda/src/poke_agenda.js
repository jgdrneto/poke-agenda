import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Pokemon from './pokemon/Pokemon'

import 'bootstrap/dist/css/bootstrap.min.css';
import './poke_agenda.css'

class PokeAgenda extends React.Component{

	max_poke = 151;

	constructor(props) {
  	super(props);
    this.state = {
      id : 1,
      copy_id: 1,
      poke_name: '',
      mode: 'pokemon',
      disabled: false 
  	}

    this.desalock = this.desalock.bind(this);
    this.search = this.search.bind(this);
  }	

  prev(){
  	if(this.state.id>1){
  		this.setState({
  			id : this.state.id-1,
        copy_id : this.state.id-1,
  			disabled: true
  		});
  	}
  }


  next(){

    console.log(this.state.id);

  	if(this.state.id<this.max_poke){
  		this.setState({
  			id : this.state.id+1,
  			copy_id : this.state.id+1,
        disabled: true
  		});
  	}
  }

  search(event){

    if(event.keyCode === 13){
      
      let value;

      if(!isNaN(event.target.value)){
        value = Number(event.target.value);
        
        if(value !== this.state.id){
          this.setState({
            id : value
          });
        } 
      }else{
        value = event.target.value.toLowerCase();
        
        if(value !== this.state.poke_name.toLowerCase()){
          this.setState({
            id : value
          });
        }
      }
      event.target.value = '';
    }
  }

  desalock(event,newID,failure,pokeName){

    if(failure){
      newID = this.state.copy_id;
    } 
  	
    this.setState({
      id : newID,
      poke_name : pokeName,  			
      disabled: false
  	});
  }

  render(){
  	
  	let page = {};
  	switch(this.state.mode){
  		case 'pokemon' :
  			page =	<div className='PokemonName'>
                  <div>
                  <Form.Group className='searchBar'>
                    <Form.Control type="text" placeholder="Search..." onKeyUp={this.search}/>
                    </Form.Group>
                  </div>
  								<Pokemon poke_id={this.state.id} onModify={this.desalock}/>
  						 		<div>
  						 			<Button id = 'prev' onClick={event => this.prev(event)} disabled={this.state.disabled} size='sm'	> &#60; </Button>
  									<Button id = 'next' onClick={event => this.next(event)} disabled={this.state.disabled} size='sm'> > </Button>
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