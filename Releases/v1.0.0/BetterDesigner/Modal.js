"use strict"

class Modal {
  modal_continer
  header_title
  screenshot_mode_content
  pages_porting_content
  export_button
  import_button
  import_input

  constructor() {
    this.addStyles()

    this.modal_continer = this.createModal()
    this.closeModal()
    document.body.appendChild(this.modal_continer)
  }

  addStyles() {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "BetterDesigner/Styles/Modal.css"
    document.head.appendChild(link)
  }

  createModal() {
    /*
    <div class="better-designer-modal">
      <div class="popup">
        <popup-header>
        <screenshot-mode-content>
        <pages-porting-content>
      </div>
    </div>
    */

    const modal = document.createElement("div")
    modal.className = "better-designer-modal"
    modal.style.display = "none"

    const popup = document.createElement("div")
    popup.className = "popup"

    const header = this.createPopupHeader()
    popup.appendChild(header)

    const screenshot_mode_content = this.createScreenshotModeContent()
    popup.appendChild(screenshot_mode_content)

    const pages_porting_content = this.createPagesPortingContent()
    popup.appendChild(pages_porting_content)

    modal.appendChild(popup)

    return modal
  }

  createPopupHeader() {
    /*
    <header>
      <div>Screenshot mode info</div>
      <img class="close" src="BetterDesigner/Images/close-icon" />
    </header>
    */

    const header = document.createElement("header")

    const title = document.createElement("div")
    title.className = "title"
    title.textContent = "Screenshot mode info"
    header.appendChild(title)

    const close = document.createElement("img")
    close.className = "close"
    close.src = "BetterDesigner/Images/close-icon.png"
    close.addEventListener("click", this.closeModal.bind(this))
    header.appendChild(close)

    this.header_title = title

    return header
  }

  createScreenshotModeContent() {
    /*
    <div class="screenshot-mode-content">
      <p>In Chrome and Edge use GoFullPage extension to caputre whole diagram area</p>
      <p>In Firefox you can use built-in screenshot feature with 'Save full page' button</p>
      <p>Press ESC key to close screenshot mode</p>
    </div>
    */

    const screenshot_mode_content = document.createElement("div")
    screenshot_mode_content.className = "screenshot-mode-content"

    const text_1 = document.createElement("p")
    text_1.innerHTML = "In Chrome and Edge use "
    text_1.innerHTML += `<a href="https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl" target="_blank">GoFullPage</a>`
    text_1.innerHTML += " extension to caputre whole diagram area."
    screenshot_mode_content.appendChild(text_1)

    const text_2 = document.createElement("p")
    text_2.innerHTML = "In Firefox you can use built-in screenshot feature with 'Save full page' button. "
    text_2.innerHTML += `<a href="https://support.mozilla.org/en-US/kb/take-screenshots-firefox" target="_blank">Mozilla guide</a>`
    screenshot_mode_content.appendChild(text_2)

    const text_3 = document.createElement("p")
    text_3.innerHTML = "Press <kbd>ESC</kbd> to close screenshot mode"
    screenshot_mode_content.appendChild(text_3)

    this.screenshot_mode_content = screenshot_mode_content

    return screenshot_mode_content
  }

  createPagesPortingContent() {
    /*
    <div class="pages-porting-content">
      <div class="export">
        <h5>export</h5>
        <button>export</button>
        <p>Export succesull</p>
      </div>

      <div class="import">
        <h5>import</h5>
        <input type="file"/>
        <button>import</button>
      </div>
    </div>
    */

    const pages_porting_content = document.createElement("div")
    pages_porting_content.className = "pages-porting-content"

    /* ---------------- */

      const export_section = document.createElement("div")
      export_section.className = "export"

        const export_title = document.createElement("h5")
        export_title.textContent = "Export"
        export_section.appendChild(export_title)

        const export_button = document.createElement("button")
        export_button.textContent = "export"
        export_section.appendChild(export_button)

        const export_info = document.createElement("p")
        export_info.textContent = "Click to download export file"
        export_section.appendChild(export_info)

      pages_porting_content.appendChild(export_section)

    /* ---------------- */

      const import_section = document.createElement("div")
      import_section.className = "import"

        const import_title = document.createElement("h5")
        import_title.textContent = "Import"
        import_section.appendChild(import_title)

        const import_input = document.createElement("input")
        import_input.type = "file"
        import_section.appendChild(import_input)

        const import_button = document.createElement("button")
        import_button.textContent = "import"
        import_section.appendChild(import_button)

      pages_porting_content.appendChild(import_section)
    
    /* ---------------- */

    this.pages_porting_content = pages_porting_content
    this.export_button = export_button
    this.import_button = import_button
    this.import_input = import_input

    return pages_porting_content
  }

  closeModal() {
    this.modal_continer.style.display = "none"
    this.screenshot_mode_content.style.display = "none"
    this.pages_porting_content.style.display = "none"
  }

  openModal(content_type) {
    this.modal_continer.style.display = null

    if (content_type == "screenshot_mode") {
      this.header_title.textContent = "Screenshot mode info"
      this.screenshot_mode_content.style.display = null
    }

    if (content_type == "pages_porting") {
      this.header_title.textContent = "Porting designer pages"
      this.pages_porting_content.style.display = null
    }
  }
}
