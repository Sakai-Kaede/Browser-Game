/**
 * Player クラス
 */
export class Player {
  private position: { x: number; y: number };
  private velocity: { x: number; y: number };
  private width: number;
  private height: number;
  private isJumping: boolean;
  private isFalling: boolean;
  private alpha: number;
  private gravity: number;
  private jumpHeight: number;
  private smallJumpHeight: number;
  private radius: number;
  private c: CanvasRenderingContext2D;
  private CANVAS_HEIGHT: number;

  /**
   * @constructor
   * @param {CanvasRenderingContext2D} c - 描画などに利用する 2D コンテキスト
   * @param {number} x - X 座標
   * @param {number} y - Y 座標
   * @param {number} width - 幅
   * @param {number} height - 高さ
   * @param {number} CANVAS_HEIGHT - キャンバスの大きさ
   */
  constructor(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      CANVAS_HEIGHT: number
  ) {
      this.position = { x: x, y: y };
      this.velocity = { x: 0, y: 0 };
      this.c = c;
      this.CANVAS_HEIGHT = CANVAS_HEIGHT;

      this.width = width;
      this.height = height;

      this.isJumping = true;
      this.isFalling = false;
      this.alpha = 1.0; // 透明度の初期値
      this.gravity = 0.1;
      this.jumpHeight = 5.5; // 大ジャンプの高さ
      this.smallJumpHeight = 4.5; // 小ジャンプの高さ

      this.radius = Math.min(width, height) / 2; // 半径を幅と高さの最小値の半分に設定
  }

  draw() {
      this.c.save();
      this.c.globalAlpha = this.alpha;
      this.c.fillStyle = '#ff8c00';

      // 円形を描画
      this.c.beginPath();
      this.c.arc(
          this.position.x + this.radius,
          this.position.y + this.radius,
          this.radius,
          0,
          2 * Math.PI
      );
      this.c.fill();

      this.c.restore();
  }

  update() {
      this.position.y += this.velocity.y;
      this.draw();

      if (this.position.y + this.height + this.velocity.y <= this.CANVAS_HEIGHT) {
          this.velocity.y += this.gravity;
      } else {
          this.velocity.y = 0;
          this.isJumping = false;
          this.isFalling = false;
      }
  }

  jump(isBigJump: boolean) {
      if (!this.isJumping && !this.isFalling) {
          this.isJumping = true;
          this.velocity.y = -(isBigJump ? this.jumpHeight : this.smallJumpHeight);
      }
  }

  fall() {
      if (this.isJumping && this.velocity.y >= 0) {
          this.isJumping = false;
          this.isFalling = true;
      }
  }

  setAlpha(newAlpha: number) {
      this.alpha = newAlpha;
  }
}