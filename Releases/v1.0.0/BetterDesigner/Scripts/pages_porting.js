"use strict"

/*

------ PROBLEM ------  
- You can't import or export designer pages, nor can you view or edit them elsewhere (not even in another browser).  
- Sometimes, even saved pages randomly disappear.  

------ HOW TO REPLICATE ------  
Save a designer page and try to open it in another browser.  

------ FIX ------  
Add a button to open a window that allows exporting and importing designer pages.  

*/

function applyPagesPorting() {
  pagesPorting()

  const observer = new MutationObserver(pagesPorting)
  observer.observe(document.querySelector("#page_content"), { childList: true })
}

function pagesPorting() {
  if (!BetterDesigner.isOnDesignerPage()) return
  // console.log("pages porting")

  // check if button exist
  const name_panel = document.querySelector("#name-panel")
  if (name_panel.querySelectorAll(".porting").length > 0) return

  // styles for button
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "BetterDesigner/Styles/pages_porting.css"
  document.head.appendChild(link)

  // create button
  const button = document.createElement("button")
  button.className = "porting"
  button.title = "Import/export pages"
  button.addEventListener("click", () => BetterDesigner.modal.openModal("pages_porting"))
  name_panel.appendChild(button)

  // create button icon
  setTimeout(() => {
    const icon = document.createElement("img")
    icon.src = "BetterDesigner/Images/import-export-icon.png"
    button.appendChild(icon)
  }, 500)

  // add events to pages porting modal
  BetterDesigner.modal.export_button.addEventListener("click", exportPages)
  BetterDesigner.modal.import_button.addEventListener("click", importPages)
}

function exportPages() {
  const location = new URL(window.location.href)
  const current_database = location.searchParams.get("db")

  const indexed_db_tables = ["table_coords", "pdf_pages"]

  const connection = indexedDB.open("pma_designer")
  connection.onsuccess = (e) => {
    const db = e.target.result
    let data = {}

    const transaction = db.transaction(indexed_db_tables, "readonly")
    const objectStore1 = transaction.objectStore(indexed_db_tables[0])
    const objectStore2 = transaction.objectStore(indexed_db_tables[1])

    const allData1 = objectStore1.getAll()
    const allData2 = objectStore2.getAll()

    allData1.onsuccess = () => {
      data[indexed_db_tables[0]] = allData1.result.filter((obj) => obj.dbName == current_database)

      allData2.onsuccess = () => {
        data[indexed_db_tables[1]] = allData2.result.filter((obj) => obj.dbName == current_database)

        const link = document.createElement("a")
        link.download = `${current_database}_exported_pages.txt`
        link.target = "_blank"
        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
        document.head.appendChild(link)

        // wait for the link to be added to the document
        window.requestAnimationFrame(() => {
          const event = new MouseEvent("click")
          link.dispatchEvent(event)
          document.head.removeChild(link)

          alert(`Pages for '${current_database}' databse exported.`)
        })
      }
    }
  }
}

function importPages() {
  const file = BetterDesigner.modal.import_input

  if (file.files.length) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const import_data = JSON.parse(e.target.result)
      const storeNames = ["table_coords", "pdf_pages"]

      const connection = indexedDB.open("pma_designer")
      connection.onsuccess = function (event) {
        let db = event.target.result

        const transaction = db.transaction(storeNames, "readwrite")
        let objectStore1 = transaction.objectStore(storeNames[0])
        let objectStore2 = transaction.objectStore(storeNames[1])

        import_data[storeNames[0]].forEach((item) => objectStore1.put(item))
        import_data[storeNames[1]].forEach((item) => objectStore2.put(item))

        const current_database = import_data[storeNames[0]][0].dbName

        transaction.oncomplete = () => alert(`Pages for '${current_database}' databse imported.`)
        transaction.onerror = (evt) => // console.log("Data import failed:", evt.target.error)
      }

      connection.onerror = (event) => // console.log("Failed to open IndexedDB:", event.target.error)
    }

    reader.readAsText(file.files[0])
  }
}
