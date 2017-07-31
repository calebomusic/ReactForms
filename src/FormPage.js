import React from 'react';
import Question from './Question';

class FormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            answers: {},
            history: []
        };
    }

    nextPage = () => {
        let newHistory = this.state.history.slice();
        newHistory.push(this.props.id);

        this.setState({
            history: newHistory
        });

        this.props.nextPage(this.props.nextPageId(this.state.answers));
    }

    previousPage = () => {
        this.props.nextPage(this.state.history.pop());
    }

    selectAnswer = (questionId) => {
        return (answerId) => {
            let newAnswer;

            if (typeof this.state.answers[questionId] === "object") {
                newAnswer = { [questionId]: Object.assign({}, this.state.answers[questionId], answerId) };
            } else {
                newAnswer = { [questionId]: answerId };
            }

            this.setState({
                answers: Object.assign({}, this.state.answers, newAnswer )
            });
        }
    }

    render() {
        if (this.props.final) {
            console.log(this.state.answers);
        }

        return (
            <div className="card blue-greay darken-1">
                <div className="card-content">
                    <h3 className="card-title">{this.props.title}</h3>
                    <p>{this.props.description}</p>
                    <div className="card-content">
                        {this.renderQuestions()}
                    </div>
                    <br/>
                    <div className="card-action row">
                        {this.renderButtons()}
                    </div>
                </div>
            </div> 
        );
    }

    renderButtons = () => {
        let next, previous;

        if (!this.props.final) {
            next = <a 
                    className="waves-effect waves-light btn"
                    onClick={this.nextPage}>
                    <i className="material-icons right">navigate_next</i>Next</a>;
        }

        if (this.state.history.length > 0) {
            previous = <a 
                    className="waves-effect waves-light btn"
                    onClick={this.previousPage}>
                    <i className="material-icons left">navigate_before</i>Previous</a>;
        }
        
        return (
            <div className="row center">
                {previous}
                {next}
            </div>
        );
    }

    renderQuestions = () => {
        const questions = [];

        this.props.questions.forEach((question) => {
            questions.push(
                <Question 
                    answers={question.answers}
                    selectedAnswer={this.state.answers[question.id]}
                    id={question.id}
                    key={question.id}
                    selectAnswer={this.selectAnswer(question.id)}
                    text={question.text}
                    type={question.type}
                />
            )

            // Check if there are subQuestions and if an answer that shows subquestions has been given
            if (question.subQuestions && question.subQuestions[this.state.answers[question.id]]) {
                
                const subQuestions = question.subQuestions[this.state.answers[question.id]];
                
                subQuestions.forEach(subQuestion => {
                    questions.push(
                        <Question
                            answers={subQuestion.answers}
                            id={subQuestion.id}
                            key={subQuestion.id}
                            selectAnswer={this.selectAnswer(subQuestion.id)}
                            selectedAnswer={this.state.answers}
                            subTypes={subQuestion.subTypes}
                            text={subQuestion.text}
                            type={subQuestion.type}
                        />
                    );
                });
            }
        });

        return questions;
    }
}

export default FormPage;