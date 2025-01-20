"use strict";function applyDragScrolling(){dragScrolling();new MutationObserver(dragScrolling).observe(document.querySelector("#page_content"),{childList:1})}function dragScrolling(){BetterDesigner.isOnDesignerPage()&&(BetterDesigner.canvas_node=document.querySelector("#canvas_outer"),BetterDesigner.canvas_node.style.setProperty("cursor","grab","important"),BetterDesigner.canvas_node.addEventListener("mousedown",mouseDownHandler))}function mouseDownHandler(e){null!=BetterDesigner.canvas_node&&(document.body.style.userSelect="none",BetterDesigner.drag_position={left:BetterDesigner.drag_target==window?window.scrollX:BetterDesigner.drag_target.scrollLeft,top:BetterDesigner.drag_target==window?window.scrollY:BetterDesigner.drag_target.scrollTop,x:e.clientX,y:e.clientY},document.addEventListener("mousemove",mouseMoveHandler),document.addEventListener("mouseup",mouseUpHandler))}function mouseMoveHandler(e){if(null==BetterDesigner.canvas_node||null!==curClick)return;const t=e.clientX-BetterDesigner.drag_position.x,r=e.clientY-BetterDesigner.drag_position.y;BetterDesigner.drag_target==window?window.scrollTo(BetterDesigner.drag_position.left-t,BetterDesigner.drag_position.top-r):(BetterDesigner.drag_target.scrollTop=BetterDesigner.drag_position.top-r,BetterDesigner.drag_target.scrollLeft=BetterDesigner.drag_position.left-t)}function mouseUpHandler(){document.body.style.userSelect=null,document.removeEventListener("mousemove",mouseMoveHandler),document.removeEventListener("mouseup",mouseUpHandler)}