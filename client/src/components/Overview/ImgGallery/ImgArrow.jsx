import React from 'react';

// Sub-Components
import { Icon } from '../../Icon/Icon.jsx';

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
          id={props.buttonId}
          onClick={change}
          className={`img-arrow ${type || ''} ${className || ''} `}
          data-testid={props.testId}
          aria-label={props.altLabel}
        >
          <Icon
            type={
              type === 'next'
              ? 'arrowRightCircle'
              : 'arrowLeftCircle'
            }
            size={
              className === 'up'
              || className === 'down'
              ? '2rem'
              : '4rem'
            }
            className='arrow-icon'
          />
        </button>
      )
    }
  return null;
}