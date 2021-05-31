import React from 'react';
import styled from 'styled-components';

const LogForm = (props) => {
  var workoutNames = props.workouts.map(workout => {
    return workout.name;
  })

  //console.log('NAMES: ', workoutNames)


  return (
    <div>
      <Title>Log a Workout</Title>
      <StyledLabel>Workout Name:
          <br />
        <StyleInput value={props.workoutInput} type="text" id="workout"
          onChange={props.workoutSuggestHandler}

        />
        {props.renderSuggestions()}
      </StyledLabel>
      <StyledLabel onChange={props.logInputHandler}>Weight in Lbs:
          <br />
        <StyleInput type="number" id="weight"

        />
      </StyledLabel>
      <StyledLabel onChange={props.logInputHandler}>Sets:
          <br />
        <StyleInput type="number" id="sets"

        />
      </StyledLabel>
      <StyledLabel onChange={props.logInputHandler}>Reps per Set:
          <br />
        <StyleInput type="number" id="repsPerSet"

        />
      </StyledLabel>
      <LogStyle onClick={props.logWorkoutClick}
        disabled={!props.workout || !props.weight || !props.sets || !props.repsPerSet}
      >Log Workout</LogStyle>
    </div>
  )
  // weight: Number,
  // sets: Number,
  // repsPerSet: Number,
}

const StyleInput = styled.input`
width: 90%;
height: 20px;
padding: 5px;
margin: 5px;
font-size: 14px;
border: 1px solid grey;
`
const StyledLabel = styled.label`
margin: 10px;
`
const LogStyle = styled.button`
height: 40px;
width: 100px;
margin:0 auto;
display:block;

&:hover {
  cursor: pointer;
  text-decoration: underline;
}
font-size: 14px;
`

const Title = styled.h3`
text-align: center;
`

export default LogForm;
