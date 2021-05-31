import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const Modal = (props) => {

  const rightClick = () => {
    var currentIndex = props.currentIndex
    //console.log('CURRENTINDEX: ', props.currentIndex)
    if (props.dbWorkouts[currentIndex + 1] === undefined) {
      props.setCurrentIndex(0)
    } else {
      props.setCurrentIndex(currentIndex + 1)
    }
  }

  const leftClick = () => {
    var currentIndex = props.currentIndex
    console.log('CURRENTINDEX: ', props.dbWorkouts.length)
    if (currentIndex === 0) {
      props.setCurrentIndex(props.dbWorkouts.length - 1)
    } else {
      props.setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <>
      {props.modal ? (

        <div>
          <ModalWrapper>
            <div>
              <Title>Workout</Title>
              <ListStyle>Workout: {props.dbWorkouts[props.currentIndex].workout}</ListStyle>
              <ListStyle>Weight: {`${props.dbWorkouts[props.currentIndex].weight} `} lbs</ListStyle>
              <ListStyle>Sets: {props.dbWorkouts[props.currentIndex].sets}</ListStyle>
              <ListStyle>Reps per Set: {props.dbWorkouts[props.currentIndex].repsPerSet}</ListStyle>
            </div>
            <CloseModalButton
              aria-label='Close modal'
              onClick={() => props.setModal(prev => !prev)}
            />
            <RightButton
              onClick={rightClick}
            />
            <LeftButton
              onClick={leftClick}
            />
          </ModalWrapper>
        </div>

      ) : null}
    </>
  )
}

const ListStyle = styled.li`
height: 40px;
width: 300px;
margin: 20px;
margin-left: 200px;
display: block;
font-size: 20px;
list-style-type: none;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  position: relative;
  bottom:500px;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 700px;
  height: 600px;
  right: 200px;
  bottom: 700px;
  box-shadow: 0 0px 75px rgb(0 0 0 / 90%);
  background: #fff;
  color: #000;
  position: relative;
  justify-content: center;
  z-index: 10;
  border-radius: 10px;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const RightButton = styled(AiOutlineArrowRight)`
  cursor: pointer;
  position: absolute;
  top: 550px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const LeftButton = styled(AiOutlineArrowLeft)`
  cursor: pointer;
  position: absolute;
  top: 550px;
  right: 650px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Title = styled.h2`
  text-align: center;
  margin: 10px;
  padding: 10px;
`;
export default Modal;