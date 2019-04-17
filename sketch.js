
// ---
// your mission: change the definition of the myRandom() function
// to return a random number---without using random() or
// Math.random(). The random number should be between 0 and 1.
//
// this function will be called to determine the brightness of
// pixels on the screen (continually displayed in order from
// left to right, top to bottom, several pixels per frame.)
//
// define other variables if you need tnco.


// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 1; //decreased step because of long intervals/lack of changing values
var randomCanvas;
let random = 0;
function getRandom() {
 return new Promise(resolve => {
    httpGet('/getRandom', 'json', false, response => {
      resolve(response);
    });
  })
}
async function myRandom() {
  let num = await getRandom();
  return num
}
function setup() {
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
  frameRate(5);
  console.log(myRandom(), ",", myRandom(), ",", myRandom());
}

async function draw() {
  let newRandom = await myRandom()
  console.log('random: ', random);
  console.log(newRandom);
  if (random != newRandom) {
  random = newRandom;
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
    var pxval = map(random, 0, 9999, 0, 255); //use built-in remapping function so i don't have to do math
    console.log('pixel val: ', pxval);
  	for (var j = 0; j < 4; j++) {
    	randomCanvas.pixels[pos+j] = pxval;
  	}
  	pos += 4;
	}

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);
  }
}
