import React from 'react';

import FormPage from './FormPage'

class Form extends React.Component {
    constructor (props) {
        super(props);

        this.state = { 
            page: this.props.pages[0].id,
            answers: {}
        };
    }

    nextPage = (pageId) => {
        this.setState({page: pageId});
    }

    saveAnswers = (newAnswers) => {
        this.setState({
            answers: Object.assign({}, this.state.answers, newAnswers)
        });
    }

    render () {
        const page = this.props.pages[this.state.page];

        return <FormPage 
                    questions={page.questions}
                    title={page.title}
                    description={page.description}
                    final={page.final}
                    id={page.id}
                    nextPage={this.nextPage}
                    nextPageId={page.nextPageId}
                    saveAnswers={this.saveAnswers}
                />
    }
}

export default Form;
