"use strict"

/*

------ PROBLEM ------  
The entire page scrolls, causing the following issues:  
- The name panel is hidden to the left if the page is scrolled to the right.  
- Dragging tables from outside the visible screen area causes the table to jump and makes it difficult to move further.  

------ HOW TO REPLICATE ------  
Grab and drag a table to the bottom-right corner, then:  
- Scroll the page to the right and observe the name panel.  
- Scroll the page to the bottom-right corner and try dragging the table back.  

------ FIX ------  
- Added styles to the designer to restrict scrolling to the canvas area.  
- Added styles to the console to allow dragging the bottom scrollbar.  
- Adjusted the canvas area size when collapsing or resizing the navigation panel.  
- Updateed the canvas area size when switching to fullscreen mode.  
- Added events for fullscreen opeion and resizing navigation.

*/

function applyScrollingFix() {
  scrollingFix()

  const observer = new MutationObserver(scrollingFix)
  observer.observe(BetterDesigner.page_content, { childList: true })
}

// set paddings and cursors for all headers buttons
function scrollingFix() {
  if (!BetterDesigner.isOnDesignerPage()) return
  // console.log("scrolling fix")

  // change target to drag
  BetterDesigner.canvas_node = document.querySelector("#canvas_outer")
  BetterDesigner.drag_target = BetterDesigner.canvas_node

  // collapsing navigation
  const navigation_collapser = document.getElementById("pma_navigation_collapser")
  navigation_collapser.addEventListener("click", () => setTimeout(resizeNavigation, 1))

  // resizing navigation
  const navigation_resizer = document.getElementById("pma_navigation_resizer")
  navigation_resizer.addEventListener("mousedown", startNavigationResize)

  // fullscreen
  const observer = new MutationObserver(toggleFullscreen)
  observer.observe(BetterDesigner.page_content, { attributes: true, attributeFilter: ["class"] })

  // change styles
  let navigation_width = $("#pma_navigation").innerWidth()
  let menubar_height = $("#floating_menubar").innerHeight()
  let name_panel_height = $("#name-panel").innerHeight()

  // styles for body
  document.body.style.cssText = `
    margin-bottom: 0px;
    margin-left: ${navigation_width}px;
    padding-top: ${menubar_height}px;
  `

  // styles for designer canvas area
  BetterDesigner.page_content.style.cssText = `
    overflow: hidden !important;
    width: calc(100vw - ${navigation_width + 3}px) !important;
    height: calc(100vh - ${menubar_height}px) !important;
    margin: 0 0 0 3px !important;
  `

  BetterDesigner.canvas_node.style.cssText = `
    overflow: scroll !important;
    width: calc(100vw - ${navigation_width + 3}px) !important;
    height: calc(100vh - ${menubar_height}px - ${name_panel_height}px) !important;
    background: white !important;
  `
  if (BetterDesigner.settings.drag_scrolling) BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")

  // styles for console
  document.querySelector("#pma_console .toolbar").style.cssText = `
    position: absolute !important;
    top: -1.5rem !important;
    height: 1.5rem !important;
  `

  document.querySelectorAll("#name-panel, .side-menu, #pma_console .switch_button img").forEach((elem) => {
    elem.style.cssText = `
      margin: 0 !important;
    `
  })

  document.querySelectorAll("#pma_console .switch_button, #pma_console .button").forEach((elem) => {
    elem.style.cssText = `
      height: 100% !important;
      text-align: center !important;
      padding: 0 1rem !important;
      margin: 0 !important;
    `
  })
}

function startNavigationResize() {
  document.body.style.setProperty("overflow", "hidden", "important")
  document.addEventListener("mousemove", resizeNavigation)
  document.addEventListener("mouseup", stopNavigationResize)
}

function resizeNavigation() {
  const navigation_width = $("#pma_navigation").innerWidth()
  const menubar_height = $("#floating_menubar").innerHeight()
  const name_panel_height = $("#name-panel").innerHeight()

  BetterDesigner.canvas_node.style.cssText = `
    overflow: scroll !important;
    width: calc(100vw - ${navigation_width + 3}px) !important;
    height: calc(100vh - ${menubar_height}px - ${name_panel_height}px) !important;
    background: white !important;
  `
  if (BetterDesigner.settings.drag_scrolling) BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")

  BetterDesigner.page_content.style.cssText = `
    overflow: hidden !important;
    width: calc(100vw - ${navigation_width + 3}px) !important;
    height: calc(100vh - ${menubar_height}px) !important;
    margin: 0 0 0 3px !important;
  `
}

function stopNavigationResize() {
  document.body.overflow = null
  document.removeEventListener("mousemove", resizeNavigation)
  document.removeEventListener("mouseup", stopNavigationResize)
}

function toggleFullscreen() {
  // check if button exist
  const name_panel = document.querySelector("#name-panel")
  const screenshot_mode_button = name_panel.querySelector(".screenshot")

  setTimeout(() => {
    const page_content = BetterDesigner.page_content

    let navigation_width = $("#pma_navigation").innerWidth()
    let menubar_height = $("#floating_menubar").innerHeight()
    let name_panel_height = $("#name-panel").innerHeight()

    // show or hide the fullscreen mode button when toggling fullscreen
    // opening screenshot mode in fullscreen can cause issues with scrolling and dragging
    if (page_content.classList.contains("content_fullscreen")) {
      screenshot_mode_button.style.display = "none"
      navigation_width = -3
      menubar_height = 0
    } else {
      screenshot_mode_button.style.display = null
    }

    BetterDesigner.canvas_node.style.cssText = `
      overflow: scroll !important;
      width: calc(100vw - ${navigation_width + 3}px) !important;
      height: calc(100vh - ${menubar_height}px - ${name_panel_height}px) !important;
      background: white !important;
    `
    if (BetterDesigner.settings.drag_scrolling) BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")

    page_content.style.cssText = `
      overflow: hidden !important;
      width: calc(100vw - ${navigation_width + 3}px) !important;
      height: calc(100vh - ${menubar_height}px) !important;
      margin: 0 0 0 3px !important;
    `
  }, 1)
}
