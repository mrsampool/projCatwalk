import React from 'react';

// Style Sheet
import './ImgArrow.css';

export const ImgArrow = props => {

  const {type, index, change, length, className, offSet} = props;

  let offSetValue = offSet || 0;

  if (
    ( type === 'prev' && index + offSetValue > 0 )
    ||
    ( type === 'next' && index + offSetValue < length - 1 )
    ) {
      return(
        <button
          id={`${type}-img`}
          onClick={change}
          className={`img-arrow ${className || ''} `}
        >
          {type === 'next' ? '>' : '<'}
        </button>
      )
    }
  return null;
}