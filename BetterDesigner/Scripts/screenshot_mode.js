"use strict"

/*

------ PROBLEM ------  


------ HOW TO REPLICATE ------  
  

------ FIX ------  

 
*/

function applyScreenshotMode() {
  screenshotMode()

  const observer = new MutationObserver(screenshotMode)
  observer.observe(document.querySelector("#page_content"), { childList: true })
}

function screenshotMode() {
  if (!BetterDesigner.isOnDesignerPage()) return
  console.log("screenshot mode")

  // styles for button
  const style = document.createElement("style")

  style.textContent = `
    #name-panel {
        position: relative;
    }

    #name-panel button.screenshot {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        aspect-ratio: 1;
        margin: 0;
        padding: 0;
        border: 1px solid black;
        background-color: rgba(0, 0, 0, 0);
    }

    #name-panel button.screenshot:hover {
        background-color: rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }

    #name-panel button.screenshot img {
        width: 1.25rem;
        height: 1.25rem;
    }
  `

  document.head.appendChild(style)

  // check if button exist
  const name_panel = document.querySelector("#name-panel")
  if (name_panel.querySelectorAll(".screenshot").length > 0) return

  // create button
  const button = document.createElement("button")
  button.className = "screenshot"
  button.title = "Open screenshot mode"
  button.addEventListener("click", openScreenshotMode)
  window.addEventListener("keydown", closeScreenshotMode)
  name_panel.appendChild(button)

  // create button icon
  const icon = document.createElement("img")
  icon.src = "BetterDesigner/camera-icon.png"
  button.appendChild(icon)
}

function openScreenshotMode() {
  BetterDesigner.drag_target = window

  document.body.style.overflow = null
  document.querySelector("#canvas_outer").style.cssText = `
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 9999 !important;
    min-width: 100vw !important;
    min-height: 100vh !important;
    background: white !important;
  `
  if (BetterDesigner.settings.drag_scrolling) BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")
}

function closeScreenshotMode(e) {
  if (e.key != "Escape") return

  BetterDesigner.drag_target = BetterDesigner.canvas_node

  const navigation_width = $("#pma_navigation").innerWidth()
  const menubar_height = $("#floating_menubar").innerHeight()
  const name_panel_height = $("#name-panel").innerHeight()

  document.body.style.overflow = "hidden !important"
  document.querySelector("#canvas_outer").style.cssText = `
    overflow: scroll !important;
    width: calc(100vw - ${navigation_width + 3}px) !important;
    height: calc(100vh - ${menubar_height}px - ${name_panel_height}px) !important;
    background: white !important;
  `
  if (BetterDesigner.settings.drag_scrolling) BetterDesigner.canvas_node.style.setProperty("cursor", "grab", "important")
}
