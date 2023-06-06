import './style.css'

const cookieImage = "https://pngimg.com/d/cookie_PNG13656.png";

const app: HTMLDivElement = document.querySelector("#app")!;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let cookies: number = 0;
let clicked: boolean = false;

app.innerHTML = `
  <canvas id="canvas"></canvas>
  <div class="header">
    <div class="cookie-amount-container">
      <img src=${cookieImage} class="cookie-icon"/>
      <p class="cookie-amount">${cookies}</p>
    </div>
  </div>
  <main>
    <div class="cookie-container">
      <img src=${cookieImage} class="cookie"/>
      <div class="shadow-cookie"></div>
    </div>
  </main>
`

document.addEventListener("DOMContentLoaded", () => {
  const cookie: HTMLImageElement = document.querySelector(".cookie")!;
  const cookieAmount: HTMLParagraphElement = document.querySelector(".cookie-amount")!;

  canvas = document.querySelector("#canvas")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext("2d")!;
  ctx.font = "30px Verdana";
  ctx.fillStyle = "#fff";

  cookie?.addEventListener("mousedown", () => {
    cookie.className = "cookie hold"
  });

  cookie?.addEventListener("mouseup", () => {
    if (clicked) {
      return;
    }
    
    cookie.className = "cookie";
    cookies += 1;
    clicked = true;

    draw();

    setTimeout(() => {
      clicked = false;
    }, 10)

    cookieAmount.innerText = `${cookies}`;
  })
})

window.addEventListener("resize", () => {
  canvas.width = window.innerHeight;
  canvas.height = window.innerHeight;
})

function draw() {
  const horizontalPosition = Math.round(Math.random() * window.innerWidth);
  const verticalPosition = Math.round(Math.random() * window.innerHeight);

  
  ctx.fillText("+1", horizontalPosition, verticalPosition);

  setTimeout(() => {
    ctx.clearRect(horizontalPosition -30, verticalPosition - 30, 75, 70);
  }, 2000)
}