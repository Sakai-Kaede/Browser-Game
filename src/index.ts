(() => {
  const CANVAS_HEIGHT: number = 650;
  const CANVAS_WIDTH: number = 650;
  const canvas: HTMLCanvasElement = document.getElementById("clock") as HTMLCanvasElement;
  const c: CanvasRenderingContext2D | null = canvas.getContext("2d");

  

  window.addEventListener('load', () => {
    initialize();



    render();
  }, false);

  // 初期化関数
  function initialize() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }

  /**
   * アナログ時計を描画
   */
  function drawClockFace(c: CanvasRenderingContext2D, clockRadius: number, numbersRotationAngle: number): void {
    // 時計の数字
    const numbers: string[] = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

    // 針の色
    const handsColor: string = "#ffffff";

    const sixtieth = 2 * Math.PI / 60;
    const twelfth = sixtieth * 5;

    let index: number;
    let currentAngle: number;

    // 新しく追加されたコード: 時計の内側を灰色で塗りつぶす
    const innerCircleRadius: number = clockRadius * 0.8; // 内側の半径を設定
    c.fillStyle = "#2b2b2b"; // 灰色の色を指定
    c.beginPath();
    c.arc(c.canvas.width / 2, c.canvas.height / 2, innerCircleRadius, 0, 2 * Math.PI);
    c.fill();

    // 時計の数字を描画
    c.fillStyle = handsColor;
    c.font = `${clockRadius / 5}px Arial`;
    c.textAlign = "center";
    c.textBaseline = "middle";

    for (index = 0; index < 12; index++) {
        currentAngle = index * twelfth - Math.PI / 2 + numbersRotationAngle;
        const x: number = c.canvas.width / 2 + clockRadius / 1.55 * Math.cos(currentAngle);
        const y: number = c.canvas.height / 2 + clockRadius / 1.55 * Math.sin(currentAngle);

        c.save();
        c.translate(x, y);
        c.rotate((index * 30 * Math.PI / 180) + numbersRotationAngle);
        c.fillText(numbers[index], 0, 0);
        c.restore();
    }

    // 時計の外側の円を描画
    c.save();
    c.strokeStyle = handsColor;
    const outerCircleRadius: number = clockRadius * 0.8;
    c.lineWidth = clockRadius / 30;
    c.beginPath();
    c.arc(c.canvas.width / 2, c.canvas.height / 2, outerCircleRadius, 0, 2 * Math.PI);
    c.stroke();
    c.restore();
  }

  function drawClockHands(c: CanvasRenderingContext2D, clockRadius: number, numbersRotationAngle: number, secondsAngle: number, minutesAngle: number, hoursAngle: number, handsColor: string): void {
      let handsWidth: number = clockRadius / 20;

      // 時、分、秒の針を描画
      c.fillStyle = handsColor;
      c.strokeStyle = handsColor;
      c.lineWidth = handsWidth;

      c.save();
      c.translate(c.canvas.width / 2, c.canvas.height / 2);
      c.rotate(numbersRotationAngle);

      // 秒針の描画
      c.save();
      c.beginPath();
      c.rotate(secondsAngle);
      c.fillRect(
          -handsWidth / 2,
          -handsWidth / 2,
          handsWidth,
          -clockRadius + clockRadius / 5
      );
      c.fill();
      c.restore();

      // 分針の描画
      c.save();
      c.beginPath();
      c.rotate(minutesAngle);
      c.fillRect(
          -handsWidth / 2,
          -handsWidth / 2,
          handsWidth,
          -clockRadius + clockRadius / 3
      );
      c.fill();
      c.restore();

      // 時針の描画
      c.save();
      c.beginPath();
      c.rotate(hoursAngle);
      c.fillRect(
          -handsWidth / 2,
          -handsWidth / 2,
          handsWidth,
          -clockRadius + clockRadius / 1.5
      );
      c.fill();
      c.restore();
      c.restore();
  }

  function drawOppositeSide(c: CanvasRenderingContext2D, clockRadius: number, numbersRotationAngle: number, secondsAngle: number, minutesAngle: number, level4: boolean, level4_gameOver: boolean, handsColor: string): void {
      let handsWidth: number = clockRadius / 20;

      if (level4) {
          c.save();
          c.globalAlpha = 0.7;  // 透明度を0.7に設定
          c.translate(c.canvas.width / 2, c.canvas.height / 2);
          c.rotate(numbersRotationAngle);

          c.save();
          // ぶつかってもゲームオーバーにならない間は透明度を0.7に設定
          if (!level4_gameOver) {
              c.globalAlpha = 0.3;
          } else {
              c.globalAlpha = 1;
          }
          c.fillStyle = "#808080";
          c.beginPath();
          c.rotate(secondsAngle + Math.PI); // 180度反対側に回転
          c.fillRect(
              -handsWidth / 2,
              -handsWidth / 2,
              handsWidth,
              -clockRadius + clockRadius / 5
          );
          c.fill();
          c.restore();

          c.save();
          // ぶつかってもゲームオーバーにならない間は透明度を0.7に設定
          if (!level4_gameOver) {
              c.globalAlpha = 0.3;
          } else {
              c.globalAlpha = 1;
          }

          c.fillStyle = "#808080";
          c.beginPath();
          c.rotate(minutesAngle + Math.PI); // 180度反対側に回転
          c.fillRect(
              -handsWidth / 2,
              -handsWidth / 2,
              handsWidth,
              -clockRadius + clockRadius / 3
          );
          c.fill();
          c.restore();

          c.restore();
          c.restore();
      }
  }

  function drawCenterDot(c: CanvasRenderingContext2D, clockRadius: number, handsColor: string): void {
      // 時計の中央の点を描画
      c.save();
      c.fillStyle = handsColor;
      c.beginPath();
      c.arc(c.canvas.width / 2, c.canvas.height / 2, clockRadius / 20, 0, 2 * Math.PI);
      c.fill();
      c.restore();
  }

  function drawClock(c: CanvasRenderingContext2D, clockRadius: number, numbersRotationAngle: number, secondsAngle: number, minutesAngle: number, hoursAngle: number, level4: boolean, level4_gameOver: boolean): void {
      const handsColor: string = "#ffffff";
      
      drawClockFace(c, clockRadius, numbersRotationAngle);
      drawClockHands(c, clockRadius, numbersRotationAngle, secondsAngle, minutesAngle, hoursAngle, handsColor);
      drawOppositeSide(c, clockRadius, numbersRotationAngle, secondsAngle, minutesAngle, level4, level4_gameOver, handsColor);
      drawCenterDot(c, clockRadius, handsColor);
  }
  

  let numbersRotationAngle: number = 0;
  const rotationSpeed: number = 0.00003;
  const last:number = +new Date();
  const timeElapsed:number = +new Date() - last;
  // +をつけることでオペランドを数値に変換する

  const reverse: boolean = false;

  function updateNumbersAngles() {
    // 変数reverseによって回転方向を変える
    if (reverse) {
        numbersRotationAngle -= rotationSpeed * timeElapsed;
    } else {
        numbersRotationAngle += rotationSpeed * timeElapsed;
    }
  }

  function render() {
    // キャンバスを描画
    if (c) {
      c.fillStyle = "black"
      c.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    const shortestSide: number = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);
    const clockRadius: number = shortestSide / 2 - shortestSide / 20;

    
    const secondsAngle: number = 0;
    const minutesAngle: number = 0;
    const hoursAngle: number = 0;
    const level4: boolean = false;
    const level4_gameOver: boolean = false;

    if(c){
      drawClock(c, clockRadius, numbersRotationAngle, secondsAngle, minutesAngle, hoursAngle, level4, level4_gameOver);
    }
    

    requestAnimationFrame(render);
  }
})();