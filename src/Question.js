import React from 'react';

import List from './List';

import './Question.css';

class Question extends React.Component {
    constructor (props) {
        super(props);

        this.state = { value: this.props.selectedAnswer || "" };
    }

    onChange = (event) => {
        // debugger
        if (event.target.type === "checkbox" || event.target.type === "radio") {
            let value = event.target.checked ? 1 : 0;

            this.setState({value});
            this.props.selectAnswer(value);    
        } else {
            this.setState({value: event.target.value});
            this.props.selectAnswer(event.target.value);
        }
    }
    
    render () {
        switch (this.props.type) {
            case "drop":
                return this.renderDrop();
            case "input":
                return this.renderInput();
            case "list":
                return this.renderList();                
            case "multi": 
                return this.renderMulti();
            case "y/n":
                return this.renderYN();
            default:
                // TOOD: DEV
                return <div>...Invalid Question Type...</div>;
        }
    }

    renderDrop = () => {
        const options = [
            <option 
                key={-1}>
            </option>
        ];

        if (this.props.answers) {
            this.props.answers.forEach((answer, i) => {
                options.push(
                    <option 
                        key={i}
                        value={i}>{answer}</option>
                )
            });
        } else {
            for( let i = 3; i < 19; i++) {
                options.push(
                    <option 
                        key={i}
                        value={i}>{i}</option>
                )
            }
        }

        return (
            <div>
                <form className="">
                    <p className="grey-text">{this.props.text}</p>
                        <select 
                            onChange={this.onChange}
                            value={this.state.value}>
                            {options}
                        </select>
                </form>
            <br/>
            </div>
        );
    }
    
    renderInput = () => {
        return (
            <div className="input-field col s6">
                <input 
                    className="validate" 
                    onChange={this.onChange}
                    type="text"
                    value={this.state.value}
                />
                <label
                    className={"active"}
                >{this.props.text}</label>
            </div>
        )
    }

    renderList = () => {
        return <List 
                    answers={this.props.answers}
                    id={this.props.id}
                    text={this.props.text}
                    selectedAnswer={this.props.selectedAnswer[this.props.id]}
                    selectAnswer={this.props.selectAnswer}
                    subTypes={this.props.subTypes}
                />;
    }

    renderMulti = () => {
        const radio = [];
        
        this.props.answers.forEach((answer, i) => {
            radio.push(
                <p key={i}>
                    <input 
                        checked={this.state.value === i}
                        id={i}
                        onChange={this.onChange} 
                        type="radio" />
                    <label 
                        className="center">
                        {answer}
                    </label>
                </p>
            )
        });

        return (
            <form onChange={this.onChange}>
                {radio}
            </form>
        )
    }

    renderYN = () => {
        return (
            <div>
                <div className="switch left">
                    <p className="grey-text">{this.props.text}</p>
                    <label className="left">
                        No
                        <input 
                            checked={this.state.value === 1 ? "on" : ""}
                            type="checkbox" 
                            onChange={this.onChange}/>
                        <span className="lever"></span>
                        Yes
                    </label>
                </div>
                <br/><br/><br/><br/>
            </div>
        );
    }

}

export default Question;