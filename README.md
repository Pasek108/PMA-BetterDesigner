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
  * [User interface](#user-interface)
  * [Matchstick representation](#matchstick-representation)
  * [Equation generator](#equation-generator)
  * [Project structure](#project-structure)

<br>

# Overview :sparkles:

## About
This is 

<br>

## Features
- Fix for dragging the table
- Fix for the table squeezing on canvas border
- Fix for the table buttons jumping on hover
- Fix for dragging tables outside canvas boundaries 
- Fix for scrolling the designer area
- Fix for invisible relations when dragging the table
- Improvement for scrolling the designer area with mouse
- Improvement for screenshooting ERD
- Improvement for importing and exporting designer pages
- Each feature works on its own and can be disabled in `settings.json` file
- Works with different themes

<br>

> [!NOTE]  
> Room for improvements:
> - Testing other versions of phpMyAdmin
> - Testing other operating systems
> - Improvement for dragging relations


## Installation
- Download normal or minified release
- Extract release zip 
- Move it to the phpMyAdmin folder

If you have existing `config.header.inc.php` file: 
- copy `config.header.inc.php` content from release
- paste it on the top of your `phpMyAdmin/config.header.inc.php`

<br> 
