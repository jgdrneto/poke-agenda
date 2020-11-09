import React from 'react';

import Button from 'react-bootstrap/Button';

import Pokemon from '../pokemon/Pokemon'
import Searcher from '../searcher/Searcher'

import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css'

class Page extends React.Component{

	constructor(props) {
  	super(props);

    this.state = {
      id : 1,
      disabled_prev: true,
      disabled_next: false,
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
        disabled_prev: true,
        disabled_next: true
      }));
  	}
  }

  next(){

  	if(this.state.id<this.props.max){

      this.setState((state,props)=>({
  			id : state.id+1,
        disabled_prev: true,
        disabled_next: true
  		}));
  	}
    
  }

  search(event){
    if(event.keyCode === 13){
      this.setState({
        id : event.target.value.toLowerCase()
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
      if(this.state.id === this.props.max){
        d_next = true;
      }
    }

    this.setState({    
      disabled_prev: d_prev,
      disabled_next: d_next
    });
  }

  render(){
  	let item = {};

    switch(this.props.mode){
      case "item":
        item = {};
      break;
      case "type":
        item = {};
      break;
      default:
        item = <Pokemon poke_id={this.state.id} onModify={this.desalock} onRequest={this.responseRequest}/>;  
    }

  	let page = {};
    
  	page =	<div className='Page'>
              <h1>PokéAgenda-React </h1>
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