describe('Img Gallery', ()=>{
  describe("Overview Integration", ()=>{
    test.todo('user should see an image gallery for each style');
    test.todo('gallery will change depending on the current style');
  });

  describe('Navigation Arrows', ()=>{
    test.todo(`user can use left & right arrow buttons to cycle images through the primary frame`);
    test.todo(`arrows should disappear if there are no more images in that direction`);
  })

  describe("Thumbnails", ()=>{
    test.todo('selected image will become primary image, shown in bigger size');
    test.todo(`clicking on a thumbnail will jump the clicked image into the primary window, and carousel will center that thumbnail`);
  });

  describe("Expanded View", ()=>{
    test.todo(`clicking a full screen button will expand the image to span the full screen - there are still left and right arrows.`);
    test.todo(`in expanded view, clicking the image zooms in to 2.5x.`);
    test.todo(`Mouse effects the position of the primary image within the frame`);
    test.todo(`Mouse becomes a "zoom out" symbol when zoomed in`);
  });
})


