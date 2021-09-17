//React
import React, {useContext} from 'react';

//Stylesheet
import './Modal.css'

export const Modal = (props) =>{

  const { component, setComponent } = props;

  function clickHandler(e){
    if (e.target.id === 'ModalWrap') {
      setComponent(null);
    }
  }

  if ( component ) {
    return(
      <div id='ModalWrap' onClick={clickHandler}>
        { component }
      </div>
    )
  } else {
    return null;
  }
};