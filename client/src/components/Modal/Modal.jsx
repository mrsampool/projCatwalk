//React
import React, {useContext} from 'react';

// Context
import { ModalContext } from '../../contexts/modal-context';

//Stylesheet
import './Modal.css'

export const Modal = (props) =>{

  const { modalComponent, setModalComponent } = useContext( ModalContext);

  function clickHandler(e){
    if (e.target.id === 'ModalWrap') {
      setModalComponent(null);
    }
  }

  if ( modalComponent ) {
    return(
      <div id='ModalWrap' onClick={clickHandler}>
        { modalComponent }
      </div>
    )
  } else {
    return null;
  }
};