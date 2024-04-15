const CANVAS_HEIGHT: number = 650;
const CANVAS_WIDTH: number = 650;
const canvas: HTMLCanvasElement = document.getElementById("clock") as HTMLCanvasElement;
const c: CanvasRenderingContext2D | null = canvas.getContext("2d");

/**
 * canvas やコンテキストを初期化する
 */
function initialize() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
}

/**
 * ページのロードが完了したときに発火する load イベント
 */
window.addEventListener('load', () => {
    initialize();
    render();
}, false);

/**
 * 描画処理を行う
 */
function render() {
    
}