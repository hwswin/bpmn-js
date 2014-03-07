var Diagram = require('../../Diagram'),
          _ = require('../../util/underscore');

/**
 * @namespace djs
 */

/**
 * @class
 *
 * A service that allow to drop an element
 */
function PaletteDragDrop(canvas, events, shapes, injector) {
  'use strict';

  var i = 0;
  var dragInProgress = false;

  events.on('standard.palette.init', function(event) {
    init();
  });

  function init() {
    // mouseenter does not work as chrome doesn't fire
    // the event if left button is pressed
    canvas.addListener('mousemove', paletteMoveListener);
    canvas.addListener('mouseup', canvasOnMouseUp);
    //TODO register canvasOnMouseUpAnywhere
  }

  /**
   * Handles what happen in the canvas.
   */
  var paletteMoveListener = function paletteMoveListener() {
    if(dragInProgress) {
      console.log('Move on canvas: ' + i++);
      // TODO dragging draw shape
    }
  };

  /**
   * What happens on mouseup event over canvas
   */
  var canvasOnMouseUp = function canvasOnMouseUp(mouseEvent) {
    if(dragInProgress && mouseEvent.button === 0) {
      var newShape = shapes.convertToShape({
        x: mouseEvent.clientX - 100 / 2.5,
        y: mouseEvent.clientY - 80,
        width: 100,
        height: 80
      });
      canvas.addShape(newShape);
    }
    dragInProgress = false;
  };

  var canvasOnMouseUpAnywhere = function canvasOnMouseUpAnywhere() {
    //TODO Stop interaction
  };

  /**
   * Must be called if a draggable button on palette is clicked
   * It is in the response of the palette to invoke this method.
   *
   * @return {boolean} true if dragStart was successful
   */
  var startDragAndDrop = function startDragAndDrop() {
    if(dragInProgress) {
      console.warn('Drag is still in progress');
      return false;
    }
    dragInProgress = true;
    return true;
  };

  return {
    startDragAndDrop: startDragAndDrop
  };
}

Diagram.plugin('paletteDragDrop', ['canvas', 'events', 'shapes', 'injector', PaletteDragDrop ]);

module.exports = PaletteDragDrop;