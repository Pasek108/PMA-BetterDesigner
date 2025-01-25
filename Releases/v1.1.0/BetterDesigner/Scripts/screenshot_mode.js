"use strict"

/*

------ PROBLEM ------  
There are two ways to export the ERD:  
- Export an ugly SVG from the designer, which always uses direct relation connections and has the same appearance.  
- Take a screenshot, but this only captures the visible screen area and loses quality if zoomed out in the browser.  

------ HOW TO REPLICATE ------  
Try to save the ERD image.  

------ FIX ------  
Added button for displaying only canvas on fullscreen, allowing screenshots of arbitrarily large ERDs while preserving 
the same theme and relation styles as displayed.  

How to Take a Screenshot:

- Chrome / Edge: 
  1. Install the [GoFullPage](https://gofullpage.com) extension.  
  2. Open screenshot mode.  
  3. Click the GoFullPage extension icon and save your ERD.  

- Firefox: 
  [Official Guide](https://support.mozilla.org/en-US/kb/take-screenshots-firefox)  
  1. Open screenshot mode.  
  2. Right-click on an empty part of the page to open the context menu.  
  3. Select *Take Screenshot*.  
  4. Click *Save full page*.  
  OR  
  1. Open screenshot mode.  
  2. Use the keyboard shortcut `Ctrl + Shift + S`.  
  3. Click *Save full page*.  
 
*/

function applyScreenshotMode() {
  screenshotMode()

  const observer = new MutationObserver(screenshotMode)
  observer.observe(BetterDesigner.page_content, { childList: true })
}

function screenshotMode() {
  if (!BetterDesigner.isOnDesignerPage()) return
  // console.log("screenshot mode")

  // check if modal exist
  if (document.querySelectorAll(".better-designer-modal").length < 1) {
    BetterDesigner.modal = new Modal()
  }

  // check if button exist
  const name_panel = document.querySelector("#name-panel")
  if (name_panel.querySelectorAll(".screenshot").length > 0) return

  // styles for button
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "BetterDesigner/Styles/screenshot_mode.css"
  document.head.appendChild(link)

  // create button
  const button = document.createElement("button")
  button.className = "screenshot"
  button.title = "Open screenshot mode"
  button.addEventListener("click", openScreenshotMode)
  window.addEventListener("keydown", closeScreenshotMode)
  name_panel.appendChild(button)

  // create button icon
  setTimeout(() => {
    const icon = document.createElement("img")
    icon.src = "BetterDesigner/Images/camera-icon.png"
    button.appendChild(icon)
  }, 500)
}

function openScreenshotMode() {
  BetterDesigner.drag_target = window

  document.body.style.overflow = null
  document.body.style.backgroundColor = "white"
  document.querySelectorAll('body > *:not(#page_content):not(.better-designer-modal)').forEach(elem => elem.style.display = "none")
  document.querySelector('#name-panel').style.display = "none"
  document.querySelector('#side_menu').style.display = "none"
  document.querySelector("#canvas_outer").style.cssText = `
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 999 !important;
    min-width: 100vw !important;
    min-height: 100vh !important;
  `
  if (BetterDesigner.settings.drag_scrolling) BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")

  BetterDesigner.modal.openModal("screenshot_mode")
}

function closeScreenshotMode(e) {
  if (e.key != "Escape") return

  BetterDesigner.drag_target = BetterDesigner.canvas_node

  const navigation_width = $("#pma_navigation").innerWidth()
  const menubar_height = $("#floating_menubar").innerHeight()
  const name_panel_height = $("#name-panel").innerHeight()

  document.body.style.overflow = "hidden !important"
  document.body.style.backgroundColor = null
  document.querySelectorAll('body > *:not(#page_content):not(.better-designer-modal)').forEach(elem => elem.style.display = null)
  document.querySelector('#name-panel').style.display = null
  document.querySelector('#side_menu').style.display = null
  document.querySelector("#canvas_outer").style.cssText = `
    overflow: scroll !important;
    width: calc(100vw - ${navigation_width + 3}px) !important;
    height: calc(100vh - ${menubar_height}px - ${name_panel_height}px) !important;
    background: white !important;
  `
  if (BetterDesigner.settings.drag_scrolling) BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")
}
