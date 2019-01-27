
importClass(android.graphics.PorterDuffXfermode);
importClass(android.graphics.PorterDuff);
importClass(android.graphics.SweepGradient);

  var Feis = {
    Color: android.graphics.Color,
    Color_toARGB: function(color) {
        return [Feis.Color.alpha(color), Feis.Color.red(color), Feis.Color.green(color), Feis.Color.blue(color)];
    }
  }
  var BG_COLOR = '#ff00ff00'
  BG_COLOR = colors.parseColor(BG_COLOR)
  var argb = Feis.Color_toARGB(BG_COLOR)








var window = floaty.rawWindow(
  <canvas id = "board"
  h = "2000"
  w = "2000"
  />
);
log(device.height)
log(device.width)
window.setTouchable(false);
var bitmap = android.graphics.Bitmap.createBitmap(2000, 2000, android.graphics.Bitmap.Config.ARGB_8888);
var bitmapCanvas = new Canvas(bitmap);
bitmapCanvas.drawARGB(argb[0], argb[1], argb[2], argb[3]);

var paint = new Paint()
paint.setStrokeWidth(50);
paint.setColor(-65536)
paint.setStyle(Paint.Style.STROKE);






paint.setStrokeCap(Paint.Cap.ROUND);
paint.setAntiAlias(true);
paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_ATOP));//paint.setColor(yellowColor);

colorSweep = [ -65536,-61536 ];
position=[0.5,0.7]



sweepGradient=new SweepGradient(device.width / 2, 100, colorSweep, position);
paint.setShader(sweepGradient);



// radien






window.board.on("draw", function (canvas) {
  for(var k in canvas){
    log(k)
  }
  exit()
  canvas.drawBitmap(bitmap, 0, 0, paint);
});
bitmapCanvas.drawRect(71, 724, 543, 1796, paint)







sleep(5000)
exit()
