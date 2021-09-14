import React from 'react';

export function AnalyticWrapper(props){

  let events = [];

  function processClick(event, component){
    let recorded = new analyticEvent(event, component);
    if (props.exportEvent){
      props.exportEvent(recorded);
    }
    events.push(recorded);
  }

  return props.children.length ?
    props.children.map( (child, index) =>{
      return(
        <WrappedComponent
          component={child}
          handler={processClick}
          key={`analytic-wrap-${child.type.name}-${index}`}
        />
      )
    })
    :
    <WrappedComponent
      component={props.children}
      handler={processClick}
    />
}

function WrappedComponent(props){

  const {component, handler} = props;

  function handleClick(e){
    handler(e, component);
  }

  return(
    <span
      id={`analytic-wrapper-${component.type.name}`}
      className='analytic-wrapper'
      onClick={ handleClick }
    >
      {component}
    </span>
  )
}

class analyticEvent{
  constructor(event, component){
    this.element = event.target;
    this.module = component.type.name;
    this.time = new Date();
  }
}