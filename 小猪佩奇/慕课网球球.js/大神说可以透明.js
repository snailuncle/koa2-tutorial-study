var window = floaty.rawWindow(
  <canvas id="board" w="*" h="*" />
);
window.setSize(-1, -1);
window.setTouchable(false);
window.board.on("draw", function (canvas) {
  canvas.drawColor(android.graphics.Color.argb(0, 255, 0, 0), android.graphics.PorterDuff.Mode.SRC);
})
sleep(2333)
