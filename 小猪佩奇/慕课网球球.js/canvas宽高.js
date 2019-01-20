console.show()
var h=device.height
var w=device.width
var window = floaty.rawWindow(
  <canvas id="board" h="{{h}}" w="{{w}}" />
);
window.board.on("draw", function (canvas) {
  var w=canvas.getWidth()
  var h=canvas.getHeight()
  log(w)
  log(h)
})
sleep(1555)

