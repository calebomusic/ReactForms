import React, { Component } from 'react';
import './App.css';

import Form from './Form';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Form pages={[Page1, Page2, Page3, Page4]}/>
      </div>
    );
  }
}

export default App;

/**
 * 
 * Components:
 *  FormPage, Questions, SubQuestions
 *  
 * 
 * Individual Components:
 *  App: previousStep(), nextStep(), saveAnswers(), pages
 *  FormPage: questions,
 * 
 * Questions: type, text, answers, id
 * 
 * 
 * Nest Questions under topics? Topics may have descriptions that have different headers.
 */

/**
 * 1: Name, address, age, dependents
 * 2: (if dependents) What is the age, address, education of the oldest dependent?
 * 3: Financial questions
 */

const Page1 = {
  id: 0,
  title: "Personal Information",
  description: `Please enter your Name, Email, Age, and Dependents information.`,
  questions: [
    {
      id: 0,
      text: "Name",
      type: "input",
    },
    {
      id: 1,
      text: "Email",
      type: "input"
    },
    {
      id: 2,
      text: "Age",
      type: "drop",
    },
    {
      id: 3,
      text: "Do you have any dependents?",
      type: "y/n",
      subQuestions: {
        1: [
          {
            id: 4,
            type: "list",
            text: ["Name", "Age"],
            subTypes: ["input", "drop"]
          }
        ],
        0: []
      }
    },
  ],
  nextPageId (answers) {
    if (answers[3] === 1) {
      return 1;
    } else {
      return 2;
    }
  }
}

const Page2 = {
  id: 1,
  title: "Dependent Information",
  description: "Please enter the information about your oldest dependent.",
  questions: [
    {
      id: 5,
      text: "What is the name of your oldest dependent?",
      type: "input"
    },
    {
      id: 6,
      text: "What is the age of your oldest dependent?",
      type: "drop",
    },

    {
      id: 8,
      text: "Are they happy?",
      type: "drop",
      answers: [
        "Yes",
        "No",
        "Maybe"
      ]
    }
  ],
  nextPageId() {
    return 2;
  }
}

const Page3 = {
  id: 2,
  title: "Financial Information",
  description: "Are you willing to share your financial information so that we can provide a vague service to you and your dependents?",
  questions: [
    {
      id: 9,
      text: "Please select yes or no.",
      type: "y/n",
      subQuestions: {
        1: [
            {
              id: 10,
              type: "input",
              text: "What was you total income last year?"
            },
            {
              id: 11,
              type: "input",
              text: "What was you total income this year?"
            },
            {
              id: 10,
              type: "input",
              text: "What will your income be three years from now?"
            },
          ],
        0: []
      }
    },
  ],
  nextPageId() {
    return 3;
  }
}

const Page4 = {
  id: 3,
  title: "Thanks for your time!",
  description: "",
  questions: [

  ],
  final: true

}

  //  {
  //     id: 7,
  //     text: "What school did they go to?",
  //     type: "multi",
  //     answers: [
  //       "UC Berkeley",
  //       "UT Austin",
  //       "CU Boulder",
  //       "NYU",
  //       "Other"
  //     ]
  //   },