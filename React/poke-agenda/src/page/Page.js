import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Pokemon from '../pokemon/Pokemon'
import Type from '../type/Type'
import Ability from '../ability/Ability'

import Searcher from '../searcher/Searcher'


import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css'

class Page extends React.Component{

	constructor(props) {
  	super(props);

    let mode = this.props.match.params.mode;
    let id = this.props.match.params.id;

    if(mode===undefined || id === undefined){
      mode = 'pokemons';
      id = 1;
    }



    let max;

    switch(mode){
      case "abilities":
        max = 268;
      break;
      case "types":
        max = 18;
      break; 
      default:
        mode= "pokemons";
        max = 151;  
    }

    this.state = {
      id : id,
      mode: mode,
      max: max,
      disabled_prev: false,
      disabled_next: false,
      search_failure: false 
  	}

    this.desalock = this.desalock.bind(this);
    this.search = this.search.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.responseRequest = this.responseRequest.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeAbility = this.changeAbility.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }	

  prev(){
  	if(this.state.id>1){

      this.setState((state,props)=>({
        id : state.id-1,
        disabled_prev: true,
        disabled_next: true
      }));
  	}
  }

  next(){

  	if(this.state.id<this.state.max){

      this.setState((state,props)=>({
  			id : state.id+1,
        disabled_prev: true,
        disabled_next: true
  		}));
  	}
    
  }

  search(event){
    if(event.keyCode === 13){

      if(event.target.value === ""){
        console.log("VALIDATION: Empty field is not allowed");
      }else{
        this.setState({
          id : event.target.value.toLowerCase()
        });
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

  responseRequest(failure,newID){
    let f=false;

    if(this.state.search_failure || failure){
      f = true;
    }

    this.setState((state,props) => ({
      id: newID,
      search_failure: f
    })); 
  }

  desalock(event){

    let d_next = false;
    let d_prev = false;

    if(this.state.id===1){
      d_prev = true;
    }else{
      if(this.state.id === this.state.max){
        d_next = true;
      }
    }

    this.props.history.push('/'+ this.state.mode+'/'+ this.state.id);

    this.setState({    
      disabled_prev: d_prev,
      disabled_next: d_next
    });
  }

  changeType(name){
    this.props.history.push('/types/'+ name);
    this.props.history.go();
  }  

  changeAbility(name){
    console.log(name);
    this.props.history.push('/abilities/'+ name);
    this.props.history.go();
  } 

  updatePage(path){
    this.props.history.push(path);
    this.props.history.go();
  }

  render(){
  	let item = {};

    switch(this.state.mode){
      case "abilities":
        item = <Ability ability_id={this.state.id} onModify={this.desalock} onRequest={this.responseRequest}/>;
      break;
      case "types":
        item = <Type type_id={this.state.id} onModify={this.desalock} onRequest={this.responseRequest} onChangeType={this.changeType}/>;
      break;
      default:
        item = <Pokemon poke_id={this.state.id} onModify={this.desalock} onRequest={this.responseRequest} onChangeType={this.changeType} onChangeAbility={this.changeAbility}/>;  
    }

  	let page = {};
    
  	page =	<div className='Page'>
              <h1>PokéAgenda-React </h1>
              <div className="menu">
                <ButtonGroup aria-label="Basic example">
                  <Button size="sm" onClick={event => this.updatePage('/pokemons/1')}> Pokemons </Button>
                  <Button size="sm" onClick={event => this.updatePage('/types/1')}> Types </Button>
                  <Button size="sm" onClick={event => this.updatePage('/abilities/1')}> Abilities </Button>
                </ButtonGroup>
              </div>
              <Searcher search_failure={this.state.search_failure} onKeyUp={this.search} onCloseAlert={this.closeAlert}/>
  						<div className='carousel'>
                <Button  id = 'prev' onClick={event => this.prev(event)} disabled={this.state.disabled_prev} size='lg'  > &#60; </Button>
                {item}
                <Button id = 'next' onClick={event => this.next(event)} disabled={this.state.disabled_next} size='lg'> > </Button>  						 			
  						</div>
            </div>; 

    return page;

  }

}

export default Page;