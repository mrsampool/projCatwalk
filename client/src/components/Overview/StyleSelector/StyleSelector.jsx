//Libraries
import React, {useEffect, useContext} from 'react';



//Stylesheet
import './StyleSelector.css'
import { Icon } from '../../Icon/Icon.jsx';
import {QueryContext} from "../../../contexts/QueryContext";

export const StyleSelector = (props) =>{

  const {styles, currentStyle, setCurrentStyle} = props;
  let queryparams = useContext(QueryContext);

  function setDefaultStyle(){

    let def = styles.find( style => {
      return !!style['default?'];
    }) || styles[0];
    setCurrentStyle(def);

    if (queryparams && queryparams.styleId){
      let queryId = Number(queryparams.styleId)
      let queryStyle = styles.find( style => {
        return style.style_id === queryId;
      })
      if (queryStyle) {
        setCurrentStyle(queryStyle);
      }
    }
  }

  useEffect( ()=>{
    if (!currentStyle && styles && styles.length){
      setDefaultStyle();
    }
  },[]);

  useEffect( ()=>{
    if (styles && styles.length){ setDefaultStyle(); }
  },[styles]);

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
            styles.map( (style, index) =>{
              return(
                <StyleOption
                  style={style}
                  changeStyle={setCurrentStyle}
                  key={style.style_id || index}
                  active={
                    currentStyle &&
                    currentStyle.style_id &&
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

  const {style_id, photos, name } = props.style;
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
          alt={`${name || ''} Style Photo`}
          />
      </div>

    </div>
  )
}