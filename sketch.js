
let xspacing = 10; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 150.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let noiseVal;

const oscImg = 'osc2.png'
let img;
const mapImgPath = 'map.png'
let imgMap;

function preload() {
  img = loadImage(oscImg);
  imgMap = loadImage(mapImgPath);
}

function setup() {
  createCanvas(1000, 1000);
  w = 300 + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  slider = createSlider(-300, 300, 0, 1);
}

function draw() {
  noiseVal = slider.value();
  noiseVal = map(noise(frameCount / 100),0, 1, -200, 200);
  background('#00376A');
  // background(0);
  
  image(imgMap, -0, -0, 1000, 1000);
  image(img, -0, -200);
  
  fill(0);
  rect(80, 100, 480, 300);
  scale(0.5)
  translate(150,0,0)
  if(noise(round(frameCount / 5)) < 0.2) {
    
  }
  else {
  
    let modFreq = map(mouseY, height, 0, 0, 1);
    let modFreq2 = map(mouseX, height, 0, 0, 1);
    // console.log(modFreq);

    const vals = calcWave(sin, modFreq);
    const valsCos = calcWave(cos, modFreq2);
    renderWave(vals);
    renderWave(valsCos);
    renderWaveParametric(vals, valsCos);
  }
}

function calcWave(func, freq) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.01;
  const vals = new Array(floor(w * 3 / xspacing));

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < vals.length; i++) {
    vals[i] = 
      func(freq * x) * amplitude +
      map(noise(frameCount/100, i), 0,1,-noiseVal,noiseVal) ;
    x += dx;
  }
  
  return vals;
}

function renderWave(values) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < values.length; x++) {
    ellipse(x * xspacing, height / 2 + values[x], 4, 4);
  }
}


const renderWaveParametric = (x, y) => {
  noStroke();
  fill('#01AFA6');
  // A simple way to draw the wave with an ellipse at each location
  for (let i = 0; i < x.length; i++) {
    ellipse(width / 2 + x[i], height / 2 + y[i], 6, 6);
  }
}
