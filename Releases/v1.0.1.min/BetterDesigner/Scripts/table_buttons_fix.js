"use strict";function applyTableButtonsFix(){tableButtonsFix();new MutationObserver(tableButtonsFix).observe(document.querySelector("#page_content"),{childList:1})}function tableButtonsFix(){BetterDesigner.isOnDesignerPage()&&(document.querySelectorAll("#canvas_outer .small_tab").forEach((t=>{t.style.cssText="\n      padding-left: 5px !important; \n      padding-right: 5px !important;\n      vertical-align: middle !important;\n      cursor: pointer !important;\n    "})),document.querySelectorAll("#canvas_outer .small_tab_pref").forEach((t=>{t.style.cssText="\n      vertical-align: middle !important;\n      cursor: pointer !important;\n    "})))}