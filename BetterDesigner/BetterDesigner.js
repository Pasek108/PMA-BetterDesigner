"use strict"

class BetterDesigner {
  static settings = {}
  static canvas_node = null
  static drag_target = window
  static drag_position = { top: 0, left: 0, x: 0, y: 0 }
  static fullscreen = false

  static waitForDesigner() {
    console.log("wait")
    return new Promise((resolve) => {
      setTimeout(() => resolve(typeof DesignerMove != "undefined"), 1)
    })
  }

  static isOnDesignerPage() {
    const current_location = document.location.href.substring(0, 62)
    const target_location = "http://localhost/phpmyadmin/index.php?route=/database/designer"

    return current_location == target_location
  }

  constructor() {
    this.readSettings()
  }

  readSettings() {
    fetch("BetterDesigner/settings.json")
      .then((res) => res.json())
      .then((json) => {
        BetterDesigner.settings = json
        this.applySettings()

        const observer = new MutationObserver(this.applySettings.bind(this))
        observer.observe(document.body, { childList: true })
      })
      .catch((e) => console.error(e))
  }

  applySettings() {
    if (!BetterDesigner.isOnDesignerPage()) return

    if (BetterDesigner.settings.table_dragging_fix) applyTableDraggingFix()
    if (BetterDesigner.settings.table_squeeze_fix) applyTableSqueezeFix()
    if (BetterDesigner.settings.table_buttons_fix) applyTableButtonsFix()
    if (BetterDesigner.settings.boundaries_fix) applyBoundariesFix()
    if (BetterDesigner.settings.scrolling_fix) applyScrollingFix()
    if (BetterDesigner.settings.smooth_relations) applySmoothRelations()
    if (BetterDesigner.settings.drag_scrolling) applyDragScrolling()
    if (BetterDesigner.settings.screenshot_mode) applyScreenshotMode()
    if (BetterDesigner.settings.pages_porting) applyPagesPorting()
  }
}

const better_designer = new BetterDesigner()
