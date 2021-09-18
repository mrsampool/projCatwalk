//Libraries
import React, {useEffect} from 'react';

//Stylesheet
import './StyleSelector.css'
import { Icon } from '../../Icon/Icon.jsx';

export const StyleSelector = (props) =>{

  const {styles, currentStyle, setCurrentStyle} = props;

  function setDefaultStyle(){
    let def = styles.find( style => {
      return !!style['default?'];
    })
    setCurrentStyle(def);
  }

  useEffect( ()=>{
    if (!currentStyle && styles && styles.length){ setDefaultStyle(); }
  },[]);

  return(
    <div
      id='StyleSelector'
      data-testid='select-style'
    >
      <span id='style-pointer'>STYLE > </span>
      <span id='current-style'>{currentStyle ? currentStyle.name : ''}</span>
      <div id='styles-list' data-testid='styles-list'>
        {
          styles && styles.length ?
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
          :null
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
    <div
      className='style-option'
      data-testid={`style-option-${style_id}`}
      onClick={handleClick}
    >
      {
        props.active ?
        <span id='active-check'
          data-testid='active-check'
        >
          <Icon type='check'/>
        </span>
        :
        ''
      }
      <div className='style-thumb-frame'>
        <img
          src={thumbnail}
          data-testid={thumbnail}
          />
      </div>

    </div>
  )
}