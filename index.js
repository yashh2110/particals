const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// initial mouse position
let mouse = {
  x: 0,
  y: 0,
  radius: ((canvas.width / 85) * canvas.height) / 85,
};

// particals array
let particalsArray;

// mouse position on move
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Partical {
  constructor(x, y, dirX, dirY, radius, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.radius = radius;
    this.color = color;
  }

  // method to draw a circle in the canvas
  drawCirc() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // updating the circles position and speed and direction of motion
  updateCirc() {
    if (this.x > canvas.width || this.x < 0) {
      this.dirX = -this.dirX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dirY = -this.dirY;
    }

    // calculating the distab=nce between the curser and the partical
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius + this.radius) {
      if (mouse.x > this.x && this.x > this.radius * 10) {
        this.x -= 10;
        this.dirX = -this.dirX;
      }
      if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
        this.x += 10;
        this.dirX = -this.dirX;
      }
      if (mouse.y > this.y && this.y > this.radius * 10) {
        this.y -= 10;
        this.dirY = -this.dirY;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
        this.y += 10;
        this.dirY = -this.dirY;
      }
    }

    this.x += this.dirX;
    this.y += this.dirY;
    this.drawCirc();
  }
}

// creation and initialtion of the parictals
const init = () => {
  particalsArray = [];
  const particalCount = (canvas.width * canvas.height) / 10000;
  for (let i = 0; i < particalCount; i++) {
    let radius = Math.random() * 5 + 0.7;

    let x = Math.random() * (canvas.width - radius * 4) + radius * 2;
    let y = Math.random() * (canvas.height - radius * 4) + radius * 2;
    let dirX = Math.random() * 4 - 2;
    let dirY = Math.random() * 4 - 2;
    let color = "rgba(0,0,0,1)";
    particalsArray.push(new Partical(x, y, dirX, dirY, radius, color));
  }
};

// conneting the lines between the circles
const lines = () => {
  let opacity = 1;
  for (let i = 0; i < particalsArray.length; i++) {
    for (let j = 0; j < particalsArray.length; j++) {
      // calculating the distance between the circles
      const dx = particalsArray[i].x - particalsArray[j].x;
      const dy = particalsArray[i].y - particalsArray[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < ((canvas.width / 90) * canvas.height) / 90) {
        opacity = 1 - dist / 20000;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particalsArray[i].x, particalsArray[i].y);
        ctx.lineTo(particalsArray[j].x, particalsArray[j].y);
        ctx.stroke();
      }
    }
  }
};

// animate the circles to move randomly
const animate = () => {
  console.log(particalsArray);
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particalsArray.length; i++) {
    particalsArray[i].updateCirc();
  }
  lines();
};

// calling the init and animate functions
init();
animate();

const Particals = () => {
  return <canvas id="canvas"></canvas>;
};
export default Particals;
