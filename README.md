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

# Table of Contents
* [Overview :sparkles:](#overview-sparkles)
  * [About](#about)
  * [Features](#features)
  * [Installation](#installation)
* [Details :scroll:](#details-scroll)
  * [Settings](#settings)
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

# Overview :sparkles:

## About
The phpMyAdmin designer is a built-in tool for creating ERDs (Entity-Relationship Diagrams) for databases. However, several issues make it frustrating to use, and it lacks essential features, such as exporting saved pages. This project provides fixes and improvements to enhance its functionality, making it a more effective tool.

<br>

## Features
- Fix - dragging tables  
- Fix - table squeezing at canvas borders
- Fix - table buttons shifting positions on hover
- Fix - dragging tables outside canvas boundaries
- Fix - scrolling issues in the designer area
- Fix - invisible relations when dragging tables
- New feature - scrolling the designer area using the mouse
- New feature - enhanced ERD screenshot capabilities
- New feature - importing and exporting designer pages
- Each feature works independently and can be disabled in the `settings.json` file
- Compatible with different themes

<br>

> [!NOTE]  
> Room for improvements:
> - Testing compatibility with other phpMyAdmin versions
> - Testing support for different operating systems
> - New feature - dragging relations with the mouse
> - New feature - changing relation colors
> - New feature - option to make all tables the same size
> - New feature - table style picker


## Installation
- Download normal or minified release
- Extract the downloaded release zip file
- Move it to the `phpMyAdmin` folder

If you have an existing `config.header.inc.php` file: 
- Copy `config.header.inc.php` content from release
- Paste it at the top of your existing `phpMyAdmin/config.header.inc.php`

<br> 

# Details :scroll:

## Settings

## table_dragging_fix

## table_squeeze_fix

## table_buttons_fix

## boundaries_fix

## scrolling_fix

## smooth_relations

## drag_scrolling

## screenshot_mode

## pages_porting

