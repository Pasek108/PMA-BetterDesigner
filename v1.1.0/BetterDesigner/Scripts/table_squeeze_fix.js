"use strict"

/*

------ PROBLEM ------  
Table headers are squeezed to match the length of the longest row when moved outside the right boundary of the canvas.  

------ HOW TO REPLICATE ------  
Grab and drag a table with header text longer than the longest text in its rows to the right.  

------ FIX ------  
Prevented header text from breaking into multiple lines.  
 
*/

function applyTableSqueezeFix() {
  tableSqueezeFix()

  const observer = new MutationObserver(tableSqueezeFix)
  observer.observe(BetterDesigner.page_content, { childList: true })
}

// set `white-space: nowrap` to all table headers
function tableSqueezeFix() {
  if (!BetterDesigner.isOnDesignerPage()) return
  // console.log("table squezze fix")

  document.querySelectorAll("#canvas_outer .tab_zag, #canvas_outer .tab_zag_2").forEach((elem) => {
    elem.style.cssText = `
      white-space: nowrap !important;
    `
  })
}
