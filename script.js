
let points = [];
let nPoints = 100;
let travelers = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  cnt = 0;
  d = 15;
  p = { x: 0, y: 0 };
  points.push(p);
  angleMode(DEGREES);
  c = 0;
  while (c < 2000) {
    r = random(-min(width, height) / 2.5);
    a = random(360);
    p = {
      x: r * cos(a),
      y: r * sin(a)
    };
    c++;
    b = true;
    for (let i = 0; i < points.length; i++) {
      if (dist(p.x, p.y, points[i].x, points[i].y) < d) {
        b = false;
      }
    }
    if (b) {
      cnt++;
      points[cnt] = p;
    }
  }
  travelers[0] = {
    x: 0,
    y: 0,
    x1: 0,
    y1: 0,
    r: random(20, width / 4),
    centerX: 0,
    centerY: 0,
    a: 0,
    t: 0,
    speed: 0.5,
    d: 30
  };
}

function draw() {
  translate(width / 2, height / 2);
  background(0, 0, 0, 20);
  t = frameCount / 30;
  rotate(t);
  for (let i = 0; i < travelers.length; i++) {
    travelers[i].x = travelers[i].r * cos(travelers[i].a + travelers[i].t);
    travelers[i].y = travelers[i].r * sin(travelers[i].a + travelers[i].t);
    travelers[i].t += travelers[i].speed;
  }

  d2 = 20;
  noStroke();

  for (let i = 0; i < points.length; i++) {
    fill(100, 150, 200);
    circle(points[i].x, points[i].y, 2);
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < travelers.length; j++) {
      s = dist(points[i].x, points[i].y, travelers[j].x, travelers[j].y);
      if (s < travelers[j].d) {
        rd = map(travelers[j].x, -width / 2, width / 2, 50, 200);
        gr = map(travelers[j].y, -width / 2, width / 2, 80, 150);
        bl = map(travelers[j].y, -width / 2, width / 2, 100, 250);
        stroke(rd, gr, bl, 50);
        line(points[i].x, points[i].y, travelers[j].x, travelers[j].y);
      }
    }
  }
}

function mousePressed() {
  x = mouseX - width / 2;
  y = mouseY - height / 2;
  // console.log(mouseX, mouseY, x, y);
  if (dist(x, y, 0, 0) < min(width, height) / 2.2) {
    r = sqrt(x * x + y * y);
    if (x >= 0) {
      a = asin(y / r);
    } else if (x < 0 && y > 0) {
      a = acos(x / r);
    } else {
      a = 180 - asin(y / r);
    }
    travelers.push({
      x: 0,
      y: 0,
      x1: x,
      y1: y,
      r: r,
      centerX: 0,
      centerY: 0,
      a: a - t,
      t: 0,
      speed: random(-0.5, 0.5),
      d: randomGaussian(d + 15, 10)
    });
  }
}


function keyPressed() {
  points = [];
  travelers = [];
  setup();
  draw();
}