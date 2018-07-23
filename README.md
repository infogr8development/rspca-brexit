# rspca-brexit
This is a horizontal scrollable story with a pig/chicken walking and meet various animations and quizzes.

The background of each scene is separated in 3 layers (svgs) in order to achieve the parallax effect using the jquery.invertScroll.2.js.
An example of these svg images can be found in app/assets/scenes/scene_1

The main character is a sprite and the walking animation is done using css keyframes and can be found in app/styles/parts/_sprites.scss. Some javascript needed to change the animation css classes upon scrolling left or right can be found in app/scripts/sprite.js

The rest of the animations is going to be gif images. In order to avoid gifs recursive playing and having control over them we used libgif.js to parse gif image data in js, extract individual frames, and render them on a canvas element. There is no way to get the raw image data from a normal image load, so this library does an XHR request for the image and forces the MIME-type to "text/plain". Consequently, using this library is subject to all the same cross-domain restrictions as any other XHR request. See more here https://github.com/buzzfeed/libgif-js



#### 1\. Requirements

1.  [Node](http://nodejs.org/)
2.  [Grunt](https://www.npmjs.com/package/grunt) `npm install -g grunt`
3.  [Grunt Command Line Interface (CLI)](https://www.npmjs.com/package/grunt-cli) `npm install -g grunt-cli`

* * *

#### 2\. Grunt

**First run?** Navigate to project's directory and run `npm install` then run `grunt`.

**Returning?** Just run `grunt`.


**NOTE** The source code is in /app folder. The /www folder is the compiled code ready for upload
