import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from './Modal.jsx'

const WorkoutList = (props) => {

  const [modal, setModal] = useState(false)
  const [chosenWorkout, setWorkout] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (event) => {
    setCurrentIndex(event.target.attributes.value.nodeValue)
    setWorkout(props.dbWorkouts[event.target.attributes.value.nodeValue])
    setModal(prev => !prev)
    //console.log(chosenWorkout)
  }

  if (props.dbWorkouts.length > 0 && !props.modal) {
    return (
      <div>
        <Title>Workout History</Title>
        <ListWrapper>

          {props.dbWorkouts.map((workout, index) =>
            <ListItem key={index} value={index}
              onClick={openModal}
            >
              {new Date(workout.date).toLocaleString("en-US")}
            </ListItem>)}
        </ListWrapper>
        <Modal
          modal={modal}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          dbWorkouts={props.dbWorkouts}
          setModal={setModal}
          chosenWorkout={chosenWorkout}
        />
      </div>
    )
  } else if (props.modal) {
    //place function that renders relevant info on modal
    return (
      <div>
        MODAL
      </div>
    )
  } else {
    return (
      <div>
        <Title>Workout History</Title>
        <br />
        <p>View workouts here after logging</p>
      </div>
    )
  }
}

const ListWrapper = styled.div`
  height: 200px;
  overflow: scroll;
  background: white;
`;

const Title = styled.h2`
text-align: center;
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

export default WorkoutList;
