import React from 'react'

class Results extends React.Component {
    render() {
        let answers = [];

        for (let index = 0; index < this.props.questions.length; index++) {
            let strong_question = React.createElement('strong',{key : 'question_name'}, 'Questão ' + (index+1));
            let br_break = React.createElement('br', {key : 'br'});
            let span_response = React.createElement('span',{key : 'question_response'}, this.props.questions[index].statement);
            let strong_response = React.createElement('strong', {key : 'question_response_text'},' ' + this.props.questions[index].options[this.props.answers[index]])
            let p = React.createElement('p',{key : index},[strong_question,br_break,span_response,strong_response]);

            answers.push(p);  
        }

        let h2_escolhas = React.createElement('h2', {key : 'escolhas', className : 'm5'}, 'Escolhas' );
        let div_result = React.createElement('div',{key : 'result'},[h2_escolhas, answers]);
        return div_result;
    }
}

export default Results;
