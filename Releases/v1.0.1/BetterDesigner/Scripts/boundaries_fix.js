"use strict"

/*

------ PROBLEM ------  
- The table can be dragged outside the canvas in the top-left corner.  
- The table can be dragged to negative values while visually remaining in place.  

------ HOW TO REPLICATE ------  
- Grab and keep dragging the table to the top-left corner. 
- On the left boundary, keep dragging the table further left and then try dragging it back.  

------ FIX ------  
Adjusted the conditions for setting the lower bound of the table position.  
 
*/

async function applyBoundariesFix() {
  const is_loaded = await BetterDesigner.waitForDesigner()

  if (!is_loaded) applyBoundariesFix()
  else DesignerMove.mouseMove = changedMouseMove
}

// changed position checking
function changedMouseMove(e) {
  if (e.preventDefault) e.preventDefault()

  var newDx = isIe ? e.clientX + document.body.scrollLeft : e.pageX
  var newDy = isIe ? e.clientY + document.body.scrollTop : e.pageY
  var deltaX = globX - newDx
  var deltaY = globY - newDy
  globX = newDx
  globY = newDy

  if (curClick !== null) {
    DesignerMove.markUnsaved()

    var $curClick = $(curClick)
    var curX = parseFloat($curClick.attr("data-" + mainDirection) || $curClick.css(mainDirection))
    var curY = parseFloat($curClick.attr("data-top") || $curClick.css("top"))
    var newX = curX - directionEffect * deltaX
    var newY = curY - deltaY

    // deleted "else" and moved higher
    if (newX < 0) newX = 0
    if (newY < 0) newY = 0

    $curClick.attr("data-" + mainDirection, newX)
    $curClick.attr("data-top", newY)

    if (onGrid) {
      newX = parseInt(newX / gridSize) * gridSize
      newY = parseInt(newY / gridSize) * gridSize
    }

    $curClick.css(mainDirection, newX + "px")
    $curClick.css("top", newY + "px")
  } else if (layerMenuCurClick) {
    if (menuMoved) deltaX = -deltaX

    var $layerMenu = $("#layer_menu")
    var newWidth = $layerMenu.width() + directionEffect * deltaX

    if (newWidth < 150) newWidth = 150
    $layerMenu.width(newWidth)
  }

  if (onRelation || onDisplayField) {
    document.getElementById("designer_hint").style.left = globX + 20 + "px"
    document.getElementById("designer_hint").style.top = globY + 20 + "px"
  }
}
