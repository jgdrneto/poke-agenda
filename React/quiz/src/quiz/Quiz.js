import React from 'react'
import Question from '../question/Question'
import Results from '../results/Results'

class Quiz extends React.Component {

	questions = [
	    {
	    	statement: 'Qual das ferramentas a seguir foi criada pelo Facebook?',
	      	options: ['React', 'Vue', 'Angular', 'Svelte']
	    },
	    {
	      	statement: 'Qual das ferramentas a seguir não é nem framework nem biblioteca, mas um compilador?',
	      	options: ['React', 'Vue', 'Angular', 'Svelte']
	    },
	    {
	      	statement: 'Qual das ferramentas a seguir é apoiada pelo Google?',
	      	options: ['React', 'Vue', 'Angular', 'Svelte']
	    },
	    {
	      	statement: 'Qual das ferramentas a seguir é usada no framework Nuxt.js?',
	      	options: ['React', 'Vue', 'Angular', 'Svelte']
	    }
  	];	

	constructor(props) {
    	super(props);
    	this.state = {
      		current: 0,
      		answers: [],
      		mode: 'questions'
    	}
 	}	

	select(option_index){
		let newAnswers = this.state.answers;
		newAnswers[this.state.current] = option_index;
		this.setState(newAnswers);
	}

 	next() {
		if (this.state.current  < this.questions.length - 1) {
	    	this.setState({ current: this.state.current + 1});
	    }else{
	    	this.setState({ mode: 'results'});
	    }
  	}

  	prev() {
		if (this.state.current  > 0) {
	    	this.setState({ current: this.state.current - 1});
	    }
  	}

  	reset() {
    	this.setState({
      		current: 0,
      		answers: [],
      		mode: 'questions'
    	});
  	}

	render() {

		let div_panel, button_action;

		if(this.state.mode === 'questions'){
			
			const p_name = 'Questão ' + (this.state.current + 1) + ' de ' + this.questions.length;

			let p_question = React.createElement('p',{key: 'p', className : 'm5'}, p_name );

	  		//Question
	  		const q_statement = this.questions[this.state.current].statement;
	  		const q_options = this.questions[this.state.current].options;
	  		const q_selection = this.state.answers[this.state.current];

	    	let question_q1 = React.createElement(Question, { key : 'q', statement : q_statement, options : q_options, selection : q_selection, onSelect : event => this.select(event)});
	    	
	    	div_panel = React.createElement('div', {key : 'panel', className : 'qustionPanel'}, [p_question, question_q1]);

	    	button_action = React.createElement('button', {key : 'next', className : 'submitBtn', onClick : event => this.next()}, 'Confirma resposta');

		}else{

			let results_r1 = React.createElement(Results,{key : 'results', questions : this.questions, answers : this.state.answers});

			div_panel = React.createElement('div', {key : 'panel', className : 'resultPanel'}, results_r1);

			button_action = React.createElement('button', {key : 'reset', className : 'submitBtn', onClick : event => this.reset()}, 'Reinicia');

		}

    	//Quiz
    	let div_quiz = React.createElement( 'div', { key : 'quiz' }, [div_panel,button_action]);

    	return div_quiz;
  	}
}

export default Quiz;