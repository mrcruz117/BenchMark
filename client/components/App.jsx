import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

import requests from '../../axiosPrefilter.js';
import LogForm from './LogForm.jsx';
import WorkoutList from './WorkoutList.jsx';
import Modal from './Modal.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      workouts: [],
      suggestions: [],
      workoutInput: '',
      workout: '',
      weight: 0,
      sets: 0,
      repsPerSet: 0,
      dbWorkouts: [],
      modal: false
    };
    //bind functions here
    this.getWorkouts = this.getWorkouts.bind(this);
    this.workoutSuggestHandler = this.workoutSuggestHandler.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.suggestionSelect = this.suggestionSelect.bind(this);
    this.logInputHandler = this.logInputHandler.bind(this);
    this.logWorkoutClick = this.logWorkoutClick.bind(this);
    this.getFromDatabase = this.getFromDatabase.bind(this);
  }
  //functions/handler section

  workoutSuggestHandler(event) {
    const value = event.target.value;
    console.log('VALUE: ', value)
    let suggestions = [];


    if (value.length > 0) {
      var workouts = this.state.workoutNames;
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = workouts.filter(v => regex.test(v))

    }
    this.setState({
      workoutInput: value,
      workout: value,
      suggestions: suggestions
    }, () => console.log(suggestions))
  }

  suggestionSelect(value) {
    this.setState({
      workoutInput: value,
      workout: value,
      suggestions: []
    })
  }

  logInputHandler(event) {
    var value = event.target.value

    if (event.target.id !== 'workout') {
      value = Number(value)
    }

    this.setState({
      [event.target.id]: value,
    }, () => { console.log(this.state) });
  }

  renderSuggestions() {
    if (this.state.suggestions.length === 0) {
      return null
    }

    return (
      <StyledWorkoutNames>
        {this.state.suggestions.map((workout, index) =>
          <ListItem key={index} value={workout}
            onClick={() => this.suggestionSelect(workout)}>
            {workout}
          </ListItem>)}
      </StyledWorkoutNames>
    )
  }

  //START FROM HERE TOMORROW FINISH POST REQUEST
  logWorkoutClick(event) {
    event.preventDefault();
    var workout = {
      workout: this.state.workout,
      weight: this.state.weight,
      sets: this.state.sets,
      repsPerSet: this.state.repsPerSet,
    }
    axios({
      method: 'post',
      url: '/workouts',
      data: workout
    })
      .then(data => {
        console.log('logged workout: ', data)
        //PULL ALL WORKOUTS FROM DB HERE
        this.getFromDatabase()
      })
      .catch(err => {
        console.error('POST ERROR: ', err)
      })

    console.log('clicked! ', workout)
  }
  //Write function that pulls logged workouts from db
  getFromDatabase() {
    axios.get('/workouts')
      .then(workouts => {
        console.log('Workouts pulled from db: ', workouts)
        this.setState({
          dbWorkouts: workouts.data,
        }, () => {
          console.log('STATE: ', this.state)
        })
      })
      .catch(err => {
        console.error('DB GET ERROR: ', err)
      })
  }

  //pulls from API
  getWorkouts() {
    this.getFromDatabase()
    axios.get(requests.pullWorkouts)
      .then(workouts => {
        var workoutNames = workouts.data.results.map(workout => {
          return workout.name;
        })

        this.setState({
          workouts: workouts.data.results,
          workoutNames: workoutNames
        }, () => {
          console.log('STATE: ', this.state)
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount() {
    this.getWorkouts();
  }

  render() {

    return (
      <Background>
        <Title>BENCHMARK</Title>
        <ComponentWrap>
          <div>
            <LogForm
              workouts={this.state.workouts}
              suggestions={this.state.suggestions}
              workoutInput={this.state.workoutInput}

              workoutSuggestHandler={this.workoutSuggestHandler}
              renderSuggestions={this.renderSuggestions}
              logInputHandler={this.logInputHandler}
              logWorkoutClick={this.logWorkoutClick}

              //to disable log button
              workout={this.state.workout}
              weight={this.state.weight}
              sets={this.state.sets}
              repsPerSet={this.state.repsPerSet}
            />
          </div>
          <WorkoutList
            dbWorkouts={this.state.dbWorkouts}
            modal={this.state.modal}
          />
        </ComponentWrap>
      </Background>
    )
  }
}

const AppContainer = styled.div`
font-family: Ariel, sans-serif;
font-size: 14;
`

const StyledWorkoutNames = styled.li`
width: 100%;
border: 1px solid grey;
list-style-type: none;
background: #f7f7f7;
`
const ListItem = styled.ul`
text-align: left;
margin: none;
padding: none;
&:hover {
  cursor: pointer;
  text-decoration: underline;
}
`
const Title = styled.h1`
  width: 30%;
  margin: auto;
  text-align: center;
  padding-top: 200px;
  padding: 10px;
  background: white;
  box-shadow: 0 0px 75px rgb(0 0 0 / 20%);
`;

const ComponentWrap = styled.div`
margin: 50px auto 0 auto;
width: 300px;
background: #98ddca;
border: 1px solid grey;
`
const Background = styled.div`
font-family: helvetica;
background: #f7f7f7;
color: black;
`

export default App;