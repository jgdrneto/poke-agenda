import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import './searcher.css'

class Searcher extends React.Component{
 
  constructor(props) {
  	super(props);
    this.textInput = React.createRef();
    this.state = {
      failure : false
  	}
  }	

  componentDidMount() {
		 this.textInput.current.focus();
	}

	componentDidUpdate(prevProps){

    if(prevProps.search_failure !== this.props.search_failure){
      this.setState((state, props) => ({
        failure : props.search_failure
      }));
      this.textInput.current.focus();   
    }

	}

  render(){

  	let page={};

  	let alert = [];

  	if(this.state.failure){
  		alert = <Alert variant="danger" onClose={event => this.props.onCloseAlert(event)} dismissible>
  							<Alert.Heading>Pokemon not found!!!</Alert.Heading>
  						</Alert>
  	}

  	page = 	<div>
              <Form.Group className='searchBar'>
              	<Form.Control ref={this.textInput} type='text' placeholder='Search...' onKeyUp={ event => this.props.onKeyUp(event)}/>
              </Form.Group>
            	{alert}
            </div>

		return page;
  }
}

export default Searcher;
