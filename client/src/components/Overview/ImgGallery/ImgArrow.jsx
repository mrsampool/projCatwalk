import React from 'react';

// Style Sheet
import './ImgArrow.css';

export const ImgArrow = props => {

  const {type, index, change, length} = props;

  if (
    ( type === 'prev' && index > 0 )
    ||
    ( type === 'next' && index < length - 1 )
    ) {
      return(
        <button
          id={`${type}-img`}
          className='img-arrow'
          onClick={change}
        >
          {type === 'next' ? '>' : '<'}
        </button>
      )
    }
  return null;
}