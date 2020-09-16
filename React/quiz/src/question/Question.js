import React from 'react'

class Question extends React.Component {

	render() {
	    const h1_title = React.createElement('h1', { key : 'title'}, this.props.statement);
	    
	    //Criando vetor de botões
	    let buttons_options = [];
	    for (let index = 0; index < this.props.options.length; index++) {
	    	let option = this.props.options[index];
	    	
	    	let class_name = '';
	    	
	    	if(index === this.props.selection){
	    		class_name = 'm5 selected';
	    	}else{
	    		class_name = 'm5';
	    	}

	    	buttons_options.push(React.createElement('button',{ id : index, className : class_name , key : option , onClick : event => this.props.onSelect(index) }, option));
	    }

	    const div_question = React.createElement( 'div',{ key: 'question'}, [h1_title, buttons_options]);

	    return div_question;
  	}
}

export default Question;