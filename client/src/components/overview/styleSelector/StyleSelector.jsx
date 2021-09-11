//Libraries
import React, {useEffect} from 'react';

//Stylesheet
import './styleSelector.css'

export const StyleSelector = (props) =>{

  const {styles, currentStyle, setCurrentStyle} = props;

  function setDefaultStyle(){
    let def = styles.find( style => {
      return !!style['default?'];
    })
    setCurrentStyle(def);
  }

  useEffect( ()=>{
    if (!currentStyle){ setDefaultStyle(); }
  },[]);

  return(
    <div
      id='StyleSelector'
      data-testid='select-style'
    >
      <span>STYLE > </span>
      <span>{currentStyle ? currentStyle.name : ''}</span>
      <div data-testid='styles-list'>
        {
          styles.map( style =>{
            return(
              <StyleOption
                style={style}
                changeStyle={setCurrentStyle}
                key={style.style_id}
                active={
                  currentStyle &&
                  currentStyle.style_id === style.style_id
                }
              />
            )
          })
        }
      </div>
    </div>
  )
};

export const StyleOption = props => {

  const {style_id, photos} = props.style;
  let thumbnail = photos[0].thumbnail_url;

  function handleClick() {
    props.changeStyle(props.style);
  }

  return(
    <span
      data-testid={`style-option-${style_id}`}
      onClick={handleClick}
    >
      {
        props.active ?
          <span id='active-check'
            data-testid='active-check'
          >
            checkmark
          </span>
          :
          ''
      }
      <img
        src={thumbnail}
        data-testid={thumbnail}
      />
    </span>
  )
}