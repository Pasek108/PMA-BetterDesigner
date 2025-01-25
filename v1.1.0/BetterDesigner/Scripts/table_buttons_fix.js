"use strict"

/*

------ PROBLEM ------  
- The button for toggling columns changes size on hover.  
- Icons in the buttons shift position when the table is squeezed.  
- Buttons do not change the cursor to indicate they are clickable.  

------ HOW TO REPLICATE ------  
- Hover over the table buttons located to the left of the header.  
- Cause table squeeze (table_squeeze_fix.js) and hover over the buttons again.  

------ FIX ------  
Set consistent paddings, align and pointer cursors for the table buttons. 
 
*/

function applyTableButtonsFix() {
  tableButtonsFix()

  const observer = new MutationObserver(tableButtonsFix)
  observer.observe(BetterDesigner.page_content, { childList: true })
}

// set paddings and cursors for all headers buttons
function tableButtonsFix() {
  if (!BetterDesigner.isOnDesignerPage()) return
  // console.log("buttons fix")

  document.querySelectorAll("#canvas_outer .small_tab").forEach((elem) => {
    elem.style.cssText = `
      padding-left: 5px !important; 
      padding-right: 5px !important;
      vertical-align: middle !important;
      cursor: pointer !important;
    `
  })

  document.querySelectorAll("#canvas_outer .small_tab_pref").forEach((elem) => {
    elem.style.cssText = `
      vertical-align: middle !important;
      cursor: pointer !important;
    `
  })
}
