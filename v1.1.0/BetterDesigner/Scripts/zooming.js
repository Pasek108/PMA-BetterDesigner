"use strict"

/*

------ PROBLEM ------  
The designer area cannot be zoomed, limiting the usability and overall experience when working with the designer.

------ HOW TO REPLICATE ------  
Attempt to zoom in or out within the designer area.

------ FIX ------  
Added zoom functionality to enable scaling of the designer canvas area.

*/

function applyZooming() {
  zooming()
  //console.log("zoom")

  const observer = new MutationObserver(zooming)
  observer.observe(BetterDesigner.page_content, { childList: true })
}

function zooming() {
  if (!BetterDesigner.isOnDesignerPage()) return

  // check if zoom indicator
  const canvas_outer = document.querySelector("#canvas_outer")
  if (canvas_outer.querySelectorAll(".zoom-indicator").length > 0) return

  // create zoom indicator
  const zoom_indicator = document.createElement("div")
  zoom_indicator.className = "zoom-indicator"
  zoom_indicator.textContent = "zoom: 100.00%"
  zoom_indicator.style.cssText = `
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 999;
    padding: 0.25rem 0.5rem;
    color: white;
    font-weight: bold;
    background-color: black;
    opacity: 0;
  `
  canvas_outer.appendChild(zoom_indicator)

  canvas_outer.addEventListener("wheel", handleZoom, { passive: false })
  document.body.addEventListener("wheel", handleZoom, { passive: false })

  canvas_outer.addEventListener("keyup", stopAltKey)
  document.body.addEventListener("keyup", stopAltKey)
}

function handleZoom(evt) {
  if (!evt.altKey) return
  evt.preventDefault()

  const scale_up = evt.deltaY < 0
  BetterDesigner.zoom_value += 0.05 * (scale_up ? 1 : -1)

  if (BetterDesigner.zoom_value < 0.1) BetterDesigner.zoom_value = 0.1
  if (BetterDesigner.zoom_value > 2) BetterDesigner.zoom_value = 2

  const zoom_indicator = document.querySelector(".zoom-indicator")
  zoom_indicator.style.transition = null
  zoom_indicator.style.opacity = "1"
  zoom_indicator.textContent = `zoom: ${Math.round(BetterDesigner.zoom_value * 100)}%`
  setTimeout(() => {
    zoom_indicator.style.transition = "opacity 2s"
    zoom_indicator.style.opacity = "0"
  }, 100)

  document.querySelector("form#container-form").style.cssText = `
    transform: scale(${BetterDesigner.zoom_value});
    transform-origin: 0 0;
  `

  document.querySelector("#osn_tab").style.top = `${BetterDesigner.zoom_value / 100}px`
  console.log(document.querySelector("#osn_tab").style.top)

  return false
}

function stopAltKey(evt) {
  if (!(evt.key === "Alt" || evt.altKey)) return

  evt.preventDefault()
  evt.stopPropagation()
  return
}
