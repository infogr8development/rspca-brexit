/* Copyright 2008 Paul Bennett - http://paulicio.us
 * Scroller.js
 * Captures mouse wheel events and runs the ScrollSmoothly
 * function based on their output.
 * Aims to aid usability by allowing the user to scroll the 
 * page horizontally smoothly using only their mousewheel.
 * Mousewheel event capture by Adomas PaltanaviÄius at http://adomas.org/
 */

function handle(delta) {
        if (delta <0)
                ScrollSmoothly(1,7,'right');
        else if (delta >0)
                ScrollSmoothly(1,7,'left');
        else
        	;
}
 
function wheel(event){
        var delta = 0;
        if (!event) 
                event = window.event;
        if (event.wheelDelta) {
                delta = event.wheelDelta/120;
                if (window.opera)
                        delta = -delta;
        } else if (event.detail) {
                delta = -event.detail/3;
        }
        if (delta)
                handle(delta);
        if (event.preventDefault)
                event.preventDefault();
	event.returnValue = false;
}

var repeatCount = 0;

function ScrollSmoothly(scrollPos,repeatTimes, direction) {
	if(repeatCount < repeatTimes)
		if(direction == 'right')
			window.scrollBy(1,0);
		else
			window.scrollBy(-1,0);
	else
	{
		repeatCount = 0;
		clearTimeout(cTimeout);
		return;
	}
	repeatCount++;
	cTimeout = setTimeout("ScrollSmoothly('" + scrollPos + "','"+ repeatTimes +"','"+ direction +"')",10);
}
 
/* Initialization code. */
if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;
 
/*
     FILE ARCHIVED ON 07:56:38 Sep 27, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 09:37:25 May 02, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 563.612 (3)
  esindex: 0.01
  captures_list: 577.721
  CDXLines.iter: 9.142 (3)
  PetaboxLoader3.datanode: 58.202 (4)
  exclusion.robots: 0.2
  exclusion.robots.policy: 0.167
  RedisCDXSource: 1.644
  PetaboxLoader3.resolve: 621.706 (4)
  load_resource: 166.162
*/