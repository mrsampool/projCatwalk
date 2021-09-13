describe("Social Media Buttons", ()=>{
  ['Facebook', 'Twitter', 'Pinterest'].forEach( socialNetwork =>{
    test.todo(`should contain a ${socialNetwork} sharing button`);
  });
});