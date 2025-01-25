"use strict";function applyScrollingFix(){scrollingFix();new MutationObserver(scrollingFix).observe(BetterDesigner.page_content,{childList:1})}function scrollingFix(){if(!BetterDesigner.isOnDesignerPage())return;BetterDesigner.canvas_node=document.querySelector("#canvas_outer"),BetterDesigner.drag_target=BetterDesigner.canvas_node;document.getElementById("pma_navigation_collapser").addEventListener("click",(()=>setTimeout(resizeNavigation,1)));document.getElementById("pma_navigation_resizer").addEventListener("mousedown",startNavigationResize);new MutationObserver(toggleFullscreen).observe(BetterDesigner.page_content,{attributes:1,attributeFilter:["class"]});let e=$("#pma_navigation").innerWidth(),t=$("#floating_menubar").innerHeight(),n=$("#name-panel").innerHeight();document.body.style.cssText=`\n    margin-bottom: 0px;\n    margin-left: ${e}px;\n    padding-top: ${t}px;\n  `,BetterDesigner.page_content.style.cssText=`\n    overflow: hidden !important;\n    width: calc(100vw - ${e+3}px) !important;\n    height: calc(100vh - ${t}px) !important;\n    margin: 0 0 0 3px !important;\n  `,BetterDesigner.canvas_node.style.cssText=`\n    overflow: scroll !important;\n    width: calc(100vw - ${e+3}px) !important;\n    height: calc(100vh - ${t}px - ${n}px) !important;\n    background: white !important;\n  `,BetterDesigner.settings.drag_scrolling&&BetterDesigner.canvas_node.style.setProperty("cursor","grab","important"),document.querySelector("#pma_console .toolbar").style.cssText="\n    position: absolute !important;\n    top: -1.5rem !important;\n    height: 1.5rem !important;\n  ",document.querySelectorAll("#name-panel, .side-menu, #pma_console .switch_button img").forEach((e=>{e.style.cssText="\n      margin: 0 !important;\n    "})),document.querySelectorAll("#pma_console .switch_button, #pma_console .button").forEach((e=>{e.style.cssText="\n      height: 100% !important;\n      text-align: center !important;\n      padding: 0 1rem !important;\n      margin: 0 !important;\n    "}))}function startNavigationResize(){document.body.style.setProperty("overflow","hidden","important"),document.addEventListener("mousemove",resizeNavigation),document.addEventListener("mouseup",stopNavigationResize)}function resizeNavigation(){const e=$("#pma_navigation").innerWidth(),t=$("#floating_menubar").innerHeight(),n=$("#name-panel").innerHeight();BetterDesigner.canvas_node.style.cssText=`\n    overflow: scroll !important;\n    width: calc(100vw - ${e+3}px) !important;\n    height: calc(100vh - ${t}px - ${n}px) !important;\n    background: white !important;\n  `,BetterDesigner.settings.drag_scrolling&&BetterDesigner.canvas_node.style.setProperty("cursor","grab","important"),BetterDesigner.page_content.style.cssText=`\n    overflow: hidden !important;\n    width: calc(100vw - ${e+3}px) !important;\n    height: calc(100vh - ${t}px) !important;\n    margin: 0 0 0 3px !important;\n  `}function stopNavigationResize(){document.body.overflow=null,document.removeEventListener("mousemove",resizeNavigation),document.removeEventListener("mouseup",stopNavigationResize)}function toggleFullscreen(){const e=document.querySelector("#name-panel").querySelector(".screenshot");setTimeout((()=>{const t=BetterDesigner.page_content;let n=$("#pma_navigation").innerWidth(),i=$("#floating_menubar").innerHeight(),r=$("#name-panel").innerHeight();t.classList.contains("content_fullscreen")?(e.style.display="none",n=-3,i=0):e.style.display=null,BetterDesigner.canvas_node.style.cssText=`\n      overflow: scroll !important;\n      width: calc(100vw - ${n+3}px) !important;\n      height: calc(100vh - ${i}px - ${r}px) !important;\n      background: white !important;\n    `,BetterDesigner.settings.drag_scrolling&&BetterDesigner.canvas_node.style.setProperty("cursor","grab","important"),t.style.cssText=`\n      overflow: hidden !important;\n      width: calc(100vw - ${n+3}px) !important;\n      height: calc(100vh - ${i}px) !important;\n      margin: 0 0 0 3px !important;\n    `}),1)}