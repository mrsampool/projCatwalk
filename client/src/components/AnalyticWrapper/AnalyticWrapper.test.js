// Libraries
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

// Components
import { AnalyticWrapper } from './AnalyticWrapper.jsx';

describe('AnalyticWrapper', ()=>{

  let exported = null;
  const recordExported = (recordedEvent) => {
    exported = recordedEvent;
  }

  it('should record component for each click', ()=>{

    render(
      <AnalyticWrapper exportEvent={recordExported}>
        <TestComponent1/>
      </AnalyticWrapper>
    );

    let comp1 = screen.queryByTestId('testComponent1');

    fireEvent.click(comp1);

    expect(exported.widget).toEqual('TestComponent1');

  })

  it('should record time for each click', ()=>{

    let testDate = new Date();

    render(
      <AnalyticWrapper exportEvent={recordExported}>
        <TestComponent1/>
      </AnalyticWrapper>
    );

    let comp1 = screen.queryByTestId('testComponent1');

    fireEvent.click(comp1);

    expect(exported.time.toDateString() ).toEqual(testDate.toDateString() );
  })

  it('should record HTML element for each click', ()=>{

    render(
      <AnalyticWrapper exportEvent={recordExported}>
        <TestComponent1/>
      </AnalyticWrapper>
    );

    let comp1 = screen.queryByTestId('testComponent1');

    fireEvent.click(comp1);

    expect(exported.element ).toEqual( 'P' );
  })

});

const TestComponent1 = props =>{
  return <p id='tc1' data-testid='testComponent1'>1</p>;
}