"use strict"

/*

------ PROBLEM ------  
- When the cursor moves outside the dragged table, it stops moving.  
- When the cursor is released outside the dragged table:  
    - It remains stuck in the dragging state until the mouse button is correctly released on the grabbed table.  
    - The table jumps to the cursor position when hovering over other canvas elements.  
    - Sometimes the table moves away from the cursor.  

------ HOW TO REPLICATE ------  
Grab and drag the table quickly, release the mouse button, then try to catch the table or grab another one.  

------ FIX ------  
Changeed the event targets of dragging events.  

*/

async function applyTableDraggingFix() {
  // console.log("table dragging")
  const is_loaded = await BetterDesigner.waitForDesigner()

  if (!is_loaded) applyTableDraggingFix()
  else {
    DesignerMove.enablePageContentEvents = changedEnablePageContentEvents
    DesignerMove.enablePageContentEvents()
  }
}

// event targets changed from "#page_content" to document
function changedEnablePageContentEvents() {
  $("#page_content").off("mousedown")
  $("#page_content").off("mouseup")
  $("#page_content").off("mousemove")

  $(document).on("mousedown", function (e) { document.body.style.userSelect = "none"; DesignerMove.mouseDown(e) })
  $(document).on("mouseup",   function (e) { document.body.style.userSelect = null;   DesignerMove.mouseUp(e)   })
  $(document).on("mousemove", function (e) { DesignerMove.mouseMove(e) })
}
