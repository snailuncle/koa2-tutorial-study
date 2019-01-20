


var w = device.width
var h = device.height
var xy = [{
  x: w / 8 * 1,
  y: h / 5 * 4
}, {
  x: w / 8 * 3,
  y: h / 5 * 4
}, {
  x: w / 8 * 5,
  y: h / 5 * 4
}, {
  x: w / 8 * 7,
  y: h / 5 * 4
}]
var 两次点击时间间隔 = 60
log(xy)
// exit()
while (1) {

  press(xy[0].x, xy[0].y, 1)
  log(xy[0].x, xy[0].y, 1)
  sleep(两次点击时间间隔)
  press(xy[1].x, xy[1].y, 1)
  log(xy[1].x, xy[1].y, 1)
  sleep(两次点击时间间隔)
  press(xy[2].x, xy[2].y, 1)
  log(xy[2].x, xy[2].y, 1)
  sleep(两次点击时间间隔)
  press(xy[3].x, xy[3].y, 1)
  log(xy[3].x, xy[3].y, 1)
  sleep(两次点击时间间隔)
  // exit()
}
