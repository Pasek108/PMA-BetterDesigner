"use strict"

/*

------ PROBLEM ------  
- Navigating the designer area using scrollbars or the middle mouse button is difficult.  
- The ability to drag tables creates an expectation that the entire area can be dragged to move.  

------ HOW TO REPLICATE ------  
Try to move the canvas area by dragging your mouse.  

------ FIX ------  
Implemented drag-scrolling events for smoother navigation.  

*/

function applyDragScrolling() {
  dragScrolling()

  const observer = new MutationObserver(dragScrolling)
  observer.observe(BetterDesigner.page_content, { childList: true })
}

function dragScrolling() {
  if (!BetterDesigner.isOnDesignerPage()) return
  // console.log("drag scrolling")

  BetterDesigner.canvas_node = document.querySelector("#canvas_outer")
  BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")
  BetterDesigner.canvas_node.addEventListener("mousedown", mouseDownHandler)
}

function mouseDownHandler(e) {
  if (BetterDesigner.canvas_node == null) return

  document.body.style.userSelect = "none";

  BetterDesigner.drag_position = {
    left: BetterDesigner.drag_target == window ? window.scrollX : BetterDesigner.drag_target.scrollLeft,
    top: BetterDesigner.drag_target == window ? window.scrollY : BetterDesigner.drag_target.scrollTop,
    x: e.clientX,
    y: e.clientY,
  }

  document.addEventListener("mousemove", mouseMoveHandler)
  document.addEventListener("mouseup", mouseUpHandler)
}

function mouseMoveHandler(e) {
  if (BetterDesigner.canvas_node == null || curClick !== null) return

  const dx = e.clientX - BetterDesigner.drag_position.x
  const dy = e.clientY - BetterDesigner.drag_position.y

  if (BetterDesigner.drag_target == window) {
    window.scrollTo(BetterDesigner.drag_position.left - dx, BetterDesigner.drag_position.top - dy)
  } else {
    BetterDesigner.drag_target.scrollTop = BetterDesigner.drag_position.top - dy
    BetterDesigner.drag_target.scrollLeft = BetterDesigner.drag_position.left - dx
  }
}

function mouseUpHandler() {
  document.body.style.userSelect = null;

  document.removeEventListener("mousemove", mouseMoveHandler)
  document.removeEventListener("mouseup", mouseUpHandler)
}
