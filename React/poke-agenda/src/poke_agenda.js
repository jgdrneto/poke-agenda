import React from 'react';

import Button from 'react-bootstrap/Button';

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
      mode: 'pokemon',
      disabled: false,
      search_failure: false 
  	}

    this.desalock = this.desalock.bind(this);
    this.search = this.search.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.responseRequest = this.responseRequest.bind(this);
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

  search(event){
    if(event.keyCode === 13){
      console.log(event.target.value);

      this.setState({
        id : event.target.value
      });
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

  responseRequest(failure,newID,pokeName){
    console.log(failure);

    let f=false;

    if(this.state.search_failure || failure){
      f = true;
    }

    this.setState((state,props) => ({
      id: newID,
      poke_name : pokeName.toLowerCase(),
      search_failure: f
    })); 
  }

  desalock(event){
    this.setState({    
      disabled: false,
    });
  }

  render(){
  	
  	let page = {};
  	switch(this.state.mode){
  		case 'pokemon' :
  			page =	<div className='PokemonName'>
                  <Searcher search_failure={this.state.search_failure} onKeyUp={this.search} onCloseAlert={this.closeAlert}/>
  								<Pokemon poke_id={this.state.id} onModify={this.desalock} onRequest={this.responseRequest}/>
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