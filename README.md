<h1 align="center">PMA-BetterDesigner - Readme</h1>
<p align="center">
  <strong>
    Fixes and improvements for the phpMyAdmin designer to enhance its usability</a>
  </strong>
</p>
<!--
<div align="center">
  <a href="https://www.ur.edu.pl/pl/kolegia/kolegium-nauk-przyrodniczych">
    <img src="_for_readme/ur_banner.jpg?">
  </a>
</div>
-->
<br>

<!--

# Table of Contents
* [Overview :sparkles:](#overview-sparkles)
  * [About](#about)
  * [Features](#features)
  * [Installation](#installation)
* [Details :scroll:](#details-scroll)
  * [table_dragging_fix](#table_dragging_fix)
  * [table_squeeze_fix](#table_squeeze_fix)
  * [table_buttons_fix](#table_buttons_fix)
  * [boundaries_fix](#boundaries_fix)
  * [scrolling_fix](#scrolling_fix)
  * [smooth_relations](#smooth_relations)
  * [drag_scrolling](#drag_scrolling)
  * [screenshot_mode](#screenshot_mode)
  * [pages_porting](#pages_porting)

<br>
-->


# Overview :sparkles:

## About
The [phpMyAdmin](https://www.phpmyadmin.net) designer is a built-in tool for creating ERDs (Entity-Relationship Diagrams) for databases. However, several issues make it frustrating to use, and it lacks essential features, such as exporting saved pages. This project provides fixes and improvements to enhance its functionality, making it a more effective tool.

This project was developed and tested with phpMyAdmin 5.2.1 in the XAMPP package on Windows. Further testing on other operating systems and PMA versions is needed. Fixes and features are separated, allowing you to enable or disable them in any combination using the settings.json file. It should also work with different themes.

<br>

## Installation
1. Download and extract the release zip file.  
2. Navigate to the `v1.x.y.min` folder and copy its contents (`config.header.inc.php` file and `BetterDesigner` folder).  
3. Paste the copied contents into your `phpMyAdmin` folder (e.g. `C:\xampp\phpMyAdmin`).  

## Features
- Fix - dragging tables  
- Fix - table squeezing at canvas borders
- Fix - table buttons shifting positions on hover
- Fix - dragging tables outside canvas boundaries
- Fix - scrolling issues in the designer area
- Fix - invisible relations when dragging tables
- New feature - scrolling the designer area by dragging the mouse
- New feature - zooming the designer area using mouse wheel while holding the Alt key
- New feature - screenshot mode for saving full ERD with [GoFullPage](https://gofullpage.com) or Firefox [full page screenshot](https://support.mozilla.org/en-US/kb/take-screenshots-firefox) 
- New feature - importing and exporting designer pages
- Each feature works independently and can be disabled in the `settings.json` file
- Compatible with different themes

<br>

> [!NOTE]  
> Room for improvements:
> - Testing compatibility with other phpMyAdmin versions
> - Testing support for different operating systems
> - New feature - option to make all tables the same size
> - New feature - table style picker
> - New feature - dragging relations with the mouse
> - New feature - changing relation colors



## Acknowledgements
- [Flaticon - camera icon](https://www.flaticon.com/free-icon/dslr-camera_83574?term=camera&page=1&position=8&origin=tag&related_id=83574)
- [Flaticon - Porting icon](https://www.flaticon.com/free-icon/distribution_8882845?term=import+export&page=1&position=42&origin=search&related_id=8882845)
- [Flaticon - Close icon](https://www.flaticon.com/free-icon/close_2976286?term=close&page=1&position=2&origin=search&related_id=2976286)
- [Stack Overflow - How to save designer pages in phpmyadmin](https://stackoverflow.com/a/78842891/13277499)
- [Phuoc Nguyen - Drag to scroll](https://phuoc.ng/collection/html-dom/drag-to-scroll/)

<br> 

<!--

# Details :scroll:

## table_dragging_fix

### Problem 
- When the cursor moves outside the dragged table, it stops moving.  
- When the cursor is released outside the dragged table:  
    - It remains stuck in the dragging state until the mouse button is correctly released on the grabbed table.  
    - The table jumps to the cursor position when hovering over other canvas elements.  
    - Sometimes the table moves away from the cursor.  

### How to replicate   
Grab and drag the table quickly, release the mouse button, then try to catch the table or grab another one.  

### Fix 
Changed the event targets of dragging events. 


## table_squeeze_fix

### Problem  
Table headers are squeezed to match the length of the longest row when moved outside the right boundary of the canvas.  

### How to replicate  
Grab and drag a table with header text longer than the longest text in its rows to the right.  

### Fix 
Prevented header text from breaking into multiple lines.  


## table_buttons_fix
### Problem  
- The button for toggling columns changes size on hover.  
- Icons in the buttons shift position when the table is squeezed.  
- Buttons do not change the cursor to indicate they are clickable.  

### How to replicate   
- Hover over the table buttons located to the left of the header.  
- Cause table squeeze and hover over the buttons again.  

### Fix  
Set consistent paddings, align and pointer cursors for the table buttons. 


## boundaries_fix

### Problem    
- The table can be dragged outside the canvas in the top-left corner.  
- The table can be dragged to negative values while visually remaining in place.  

### How to replicate  
- Grab and keep dragging the table to the top-left corner. 
- On the left boundary, keep dragging the table further left and then try dragging it back.  

### Fix    
Adjusted the conditions for setting the lower bound of the table position.  


## scrolling_fix

### Problem  
The entire page scrolls, causing the following issues:  
- The name panel is hidden to the left if the page is scrolled to the right.  
- Dragging tables from outside the visible screen area causes the table to jump and makes it difficult to move further.  

### How to replicate   
Grab and drag a table to the bottom-right corner, then:  
- Scroll the page to the right and observe the name panel.  
- Scroll the page to the bottom-right corner and try dragging the table back.  

### Fix 
- Added styles to the designer to restrict scrolling to the canvas area.  
- Added styles to the console to allow dragging the bottom scrollbar.  
- Adjusted the canvas area size when collapsing or resizing the navigation panel.  
- Updateed the canvas area size when switching to fullscreen mode.  


## smooth_relations

### Problem  
When a table is dragged, the relations are not displayed or updated.  

### How to replicate
Grab and drag the table.  

### Fix  
Disableed hiding the canvas and added reload relations when dragging the table.  


## drag_scrolling

### Problem   
- Navigating the designer area using scrollbars or the middle mouse button is difficult.  
- The ability to drag tables creates an expectation that the entire area can be dragged to move.  

### How to replicate
Press and hold the left mouse button, then try to move the canvas area.  

### Fix  
- Implemented drag-scrolling events for canvas and window.
- Added events for fullscreen opeion and resizing navigation


## screenshot_mode

### Problem  
There are two ways to export the ERD:  
- Export an ugly SVG from the designer, which always uses direct relation connections and has the same appearance.  
- Take a screenshot, but this only captures the visible screen area and loses quality if zoomed out in the browser.  

### How to replicate 
Try to save the ERD image.  

### Fix 
Added button for displaying only canvas on fullscreen, allowing screenshots of arbitrarily large ERDs while preserving 
the same theme and relation styles as displayed.  

How to Take a Screenshot:
- Chrome / Edge: 
  1\. Install the [GoFullPage Chrome](https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl)/[GoFullPage Edge](https://microsoftedge.microsoft.com/addons/detail/gofullpage-full-page-sc/hfaciehifhdcgoolaejkoncjciicbemc) extension.  
  2\. Open screenshot mode.  
  3\. Click the GoFullPage extension icon and save your ERD.  

- Firefox: 
  [Official Guide](https://support.mozilla.org/en-US/kb/take-screenshots-firefox)  
  1\. Open screenshot mode.  
  2\. Right-click on an empty part of the page to open the context menu.  
  3\. Select *Take Screenshot*.  
  4\. Click *Save full page*.  
  OR  
  1\. Open screenshot mode.  
  2\. Use the keyboard shortcut `Ctrl + Shift + S`.  
  3\. Click *Save full page*. 


## pages_porting

### Problem    
- You can't import or export designer pages, nor can you view or edit them elsewhere (not even in another browser).  
- Sometimes, even saved pages randomly disappear.  

### How to replicate  
Save a designer page and try to open it in another browser.  

### Fix 
Added button to open a window that allows exporting and importing designer pages.

-->
