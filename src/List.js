import React from 'react';

import "./Question.css";

class List extends React.Component {
    constructor (props) {
        super(props);

        this.state = { 
            answers: this.props.selectedAnswer || {},
            subQuestions: []
        };
    }

    componentDidMount() {
        this.setState({
            subQuestions: [ this.renderListItem(0) ]
        });
    }

    componentDidUpdate() {

    }

    onChange = (subQuestionId) => {
        // Doesn't support checkbox
        return (event) => {
            this.setState({
                answers: Object.assign(
                    {}, this.state.answers, { [subQuestionId]: event.target.value}
                )
            });
            this.props.selectAnswer({
                [subQuestionId]: event.target.value
            });
        }
    }

    addListItem = () => {
        const newSubQuestions = this.state.subQuestions.slice();

        let newListItem = this.renderListItem(newSubQuestions.length)
        
        newSubQuestions.push(newListItem);

        this.setState({
            subQuestions: newSubQuestions
        });
    }

    removeListItem = () => {
        const newSubQuestions = this.state.subQuestions.slice();

        if (newSubQuestions.length === 1) return;
        
        newSubQuestions.pop();

        this.setState({
            subQuestions: newSubQuestions
        });
    }

    render () {
        return (
            <div>
                <br/>
                <br/>
                <div className="container">
                    <div>
                        {this.renderListItems(this.props.question)}
                    </div>
                    <div className="row">
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        )
    }

    renderButtons() {
        return (
            <div className="row right">
                <a 
                    className="btn-floating btn-small waves-effect waves-light red"
                    onClick={this.removeListItem}>
                    <i className="material-icons">remove</i>
                </a>
                <a 
                    className="btn-floating btn-small waves-effect waves-light red"
                    onClick={this.addListItem}>
                    <i className="material-icons">add</i>
                </a>
            </div>
        )
    }
    renderListItem = (j) => {
        const questions = [];
                
        this.props.text.forEach((text, i) => {
            let subQuestionId = `${this.props.id}-${j}-${i}`;

            if (this.props.subTypes[i] === "input") {
                questions.push(
                    <div>
                        <div className="input-field col s6">
                            <input 
                                className="validate" 
                                onChange={this.onChange(subQuestionId)}
                                type="text"
                                value={this.state.answers[subQuestionId]}
                            />
                            <label
                                className="active">
                                {text}
                            </label>
                        </div>
                    </div>
                );
            } else {
                const options = [
                        <option     
                            key={-1}>
                        </option>
                    ];

                for( let k = 3; k < 19; k++) {
                    options.push(
                        <option 
                            key={k}
                            value={k}>{k}</option>
                    )
                }

                questions.push(
                    <div>
                        <form className="">
                            <p className="grey-text">{text}</p>
                            <select 
                                onChange={this.onChange(subQuestionId)}
                                value={this.state.answers[subQuestionId]}>
                                {options}
                            </select>
                        </form>
                        <br/>
                    </div>
                );
            };
        });

        return questions;
    }

    renderListItems = (question) => {
        const listItems = [];
        
        this.state.subQuestions.forEach((s, i) => {
            listItems.push(this.renderListItem(i));
        });

        return listItems;
    }

}

export default List;
