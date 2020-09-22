import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Pokemon from './pokemon/Pokemon'
import Searcher from './searcher/Searcher'

import 'bootstrap/dist/css/bootstrap.min.css';
import './poke_agenda.css'

class PokeAgenda extends React.Component{

	max_poke = 151;

	constructor(props) {
  	super(props);
    this.state = {
      id : 1,
      copy_id: 1,
      poke_name: 'bulbasaur',
      mode: 'pokemon',
      disabled: false,
      search_failure: false 
  	}

    this.desalock = this.desalock.bind(this);
    this.search = this.search.bind(this);
    this.search2 = this.search2.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.failure = this.failure.bind(this);
  }	

  prev(){
  	if(this.state.id>1){
  		this.setState((state,props)=>({
        id : state.id-1,
        copy_id : state.id-1,
        disabled: true
      }));

  	}
  }


  next(){
  	if(this.state.id<this.max_poke){
  		this.setState((state,props)=>({
  			id : state.id+1,
  			copy_id : state.id+1,
        disabled: true
  		}));
  	}
  }

  search2(event){
    if(event.keyCode === 13){
      console.log(event.target.value);
      
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
    }else{
      this.setState({
        search_failure : false
      });
    }
  }

  closeAlert(event){
      this.setState({
        search_failure : false
      });
  }

  search(event){
    //console.log(this.state.id);
    //console.log(this.state.copy_id);

    if(event.keyCode === 13){
      
      let value;

      if(!isNaN(event.target.value)){
        value = Number(event.target.value);
        
        if(value !== this.state.id){
          this.setState({
            id : value,
            disabled : true
          });
        } 
      }else{
        value = event.target.value.toLowerCase();
        
        if(value !== this.state.poke_name.toLowerCase()){
          this.setState({
            id : value,
            disabled : true
          });
        }
      }
      event.target.value = '';
    }
  }

  failure(event,newID){
    this.setState({
      id: newID,
      disabled: false
    });
  }

  desalock(event,newID,pokeName){
    this.setState({    
      id : newID,
      poke_name : pokeName.toLowerCase(),
      disabled: false,
    });
  }

  render(){
  	
  	let page = {};
  	switch(this.state.mode){
  		case 'pokemon' :
  			page =	<div className='PokemonName'>
                  <Searcher search_failure={this.state.search_failure} onKeyUp={this.search2} onCloseAlert={this.closeAlert}/>
  								<Pokemon poke_id={this.state.id} onModify={this.desalock} onFailure={this.failure}/>
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