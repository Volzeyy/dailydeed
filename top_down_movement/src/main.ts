import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');

canvas!.width = window.innerWidth;
canvas!.height = window.innerHeight;

const ctx: CanvasRenderingContext2D = canvas!.getContext("2d")!;

class Player {
  ctx: CanvasRenderingContext2D;
  position: Array<number>;
  startingPosition: Array<number>;
  width: number;
  height: number;
  movementSpeed: number = 10;
  color: string;
  cursorPosition: Array<number>;

  constructor(width: number, height: number, color: string, ctx: CanvasRenderingContext2D) {
    this.position = [window.innerWidth / 2, window.innerHeight / 2]
    this.startingPosition = [...this.position];
    this.cursorPosition = [...this.position];
    this.width = width;
    this.height = height;
    this.color = color;
    this.ctx = ctx;

    this.initializeMouseInput = this.initializeMouseInput.bind(this);
    this.initializePlayerProperties = this.initializePlayerProperties.bind(this);
    this.initializeKeyboardInput = this.initializeKeyboardInput.bind(this);
    this.draw = this.draw.bind(this);

    this.initializeMouseInput();
    this.initializePlayerProperties();
    this.initializeKeyboardInput();
    this.draw();
  }

  initializeKeyboardInput() {
    document.addEventListener("keydown", (event) => {
      const key: string = event.key;

      switch (key) {
        case "w":
          this.position[1] -= this.movementSpeed;
          break;
        case "a":
          this.position[0] -= this.movementSpeed;
          break;
        case "s":
          this.position[1] += this.movementSpeed;
          break;
        case "d":
          this.position[0] += this.movementSpeed;
          break;
      }

      this.draw();
    }, false)
  }

  initializeMouseInput() {
    document.addEventListener("mousemove", (event) => {
      this.cursorPosition[0] = event.pageX;
      this.cursorPosition[1] = event.pageY;
      this.draw();
    })
  }

  initializePlayerProperties() {
    this.ctx.fillStyle = this.color; 
  }

  drawDistanceBetweenStartingPoint() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.moveTo(this.startingPosition[0] + this.width / 2, this.startingPosition[1] + this.height / 2);
    this.ctx.lineTo(this.position[0] + this.width / 2, this.position[1] + this.height / 2);
    this.ctx.stroke();
  }

  drawDistanceBetweenCursor() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.moveTo(this.position[0] + this.width / 2, this.position[1] + this.height / 2);
    this.ctx.lineTo(this.cursorPosition[0], this.cursorPosition[1]);
    this.ctx.stroke();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  draw() {
    this.clearCanvas();
    requestAnimationFrame(this.draw)
    this.drawDistanceBetweenStartingPoint();
    this.drawDistanceBetweenCursor();
    this.ctx.fillRect(this.position[0], this.position[1], this.width, this.height);
  }
}

const player = new Player(50, 100, "blue", ctx);
