"use strict"

/*

------ PROBLEM ------  
When a table is dragged, the relations are not displayed or updated.  

------ HOW TO REPLICATE ------  
Grab and drag the table.  

------ FIX ------  
Disabled hiding the canvas and added reload relations when dragging the table.    

`DesignerMove.markUnsaved` is used instead of `DesignerMove.mouseMove` because:  
- `DesignerMove.mouseMove` is used by another fix (boundaries_fix.js).  
- `DesignerMove.markUnsaved` is smaller and is called during every `DesignerMove.mouseMove`.  

*/

async function applySmoothRelations() {
  const is_loaded = await BetterDesigner.waitForDesigner()

  if (!is_loaded) applySmoothRelations()
  else {
    DesignerMove.mouseDown = changedMouseDown
    DesignerMove.markUnsaved = changedMarkUnsaved
  }
}

// deleted line for hiding canvas
function changedMouseDown(e) {
  globX = isIe ? e.clientX + document.body.scrollLeft : e.pageX
  globY = isIe ? e.clientY + document.body.scrollTop : e.pageY

  if (e.target.tagName === "SPAN") curClick = e.target.parentNode.parentNode.parentNode.parentNode
  else if (e.target.className === "tab_zag_2") curClick = e.target.parentNode.parentNode.parentNode
  else if (e.target.id === "layer_menu_sizer_btn") layerMenuCurClick = 1
  else if (e.target.className === "M_butt") return false

  if (curClick !== null) {
    // document.getElementById('canvas').style.display = 'none';
    curClick.style.zIndex = 2
  }
}

// added canvas reloading on marking as unsaved
function changedMarkUnsaved() {
  change = 1
  $("#saved_state").text("*")

  DesignerMove.reload()
}
