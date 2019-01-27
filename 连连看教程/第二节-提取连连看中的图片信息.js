// 第二节-提取连连看中的图片信息,图片是放在格子中的
//最外边大格子的信息
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}
var window = floaty.rawWindow(
  <canvas id = "board"
  h = "{{device.height}}"
  w = "{{device.width}}"
  />
);
window.setSize(device.width, device.height)
window.setTouchable(false);
setInterval(() => {}, 3000)
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
// var bitmap = android.graphics.Bitmap.createBitmap(device.width, device.height, android.graphics.Bitmap.Config.ARGB_8888);
var bitmapCanvas = new Canvas(bitmap);
var paint = new Paint()
paint.setStrokeWidth(10);
var color = '#ff0000'
color = colors.parseColor(color)
paint.setColor(color)
// c=paint.getColor()
// log(c)
// c=paint.getStrokeWidth()
// log(c)
// exit()
// paint.setColor(-28707)
paint.setStyle(Paint.Style.STROKE);
paint.setTextAlign(Paint.Align.CENTER);
paint.setTextSize(35);
window.board.on("draw", function (canvas) {
  canvas.drawBitmap(bitmap, 0, 0, paint);
});



// bitmapCanvas.drawRect(71, 1724, 143, 1796, paint)
// sleep(5000)
// exit()


threads.start(
  function (){
    sleep(5000)
    window.close()
    exit()
  }
)










var leftTopCoordinates = {
  x: 35,
  y: 391
}
var rightBottomCoordinates = {
  x: 1044,
  y: 1828
}
var rowNumber = 10
var columnNumber = 7
var gridWidth = (rightBottomCoordinates.x - leftTopCoordinates.x) / columnNumber
var gridHeight = (rightBottomCoordinates.y - leftTopCoordinates.y) / rowNumber
log('gridWidth=%d, gridHeight=%d', gridWidth, gridHeight)
var sideLength = gridWidth / 2


















//创建需要的文件夹
//保存图片的文件夹
var 连连看截图路径 = "/sdcard/快手小游戏/连连看截图/"
var fe=files.exists(连连看截图路径)
if(fe){
  //移除上次留下来的截图
  files.removeDir(连连看截图路径)
}
// exit()
files.createWithDirs(连连看截图路径);

function Grid(row, column, img) {
  this.row = row || null
  this.column = column || null
  this.img = img || null
  //连连看的图片一般都是均分的,姑且认为图片没有边框,将大格子的长宽等分,就可以计算出图片中心坐标了
  var centerX=leftTopCoordinates.x+(this.column*2-1)*gridWidth/2
  this.centerX = centerX
  var centerY=leftTopCoordinates.y+(this.row*2-1)*gridWidth/2
  this.centerY = centerY
}








// var gridTest=new Grid(1,1)
// log(gridTest)
// exit()



//我们最终是要点击图片的
Grid.prototype.click = function () {
  var x = this.centerX
  var y = this.centerY
  press(x, y, 1)
}
//加一个截图的方法,用来验证我们的坐标选择的是否正确,不合适的话,就调整一下
//游戏刚开始的时候我们截图,这样就不需要考虑背景色了
Grid.prototype.captureScreen = function (img) {
  //截取图片中心
  //正方形,边长格子宽度的一半
  var x = this.centerX - sideLength / 2
  var y = this.centerY - sideLength / 2
  var w = sideLength
  var h = sideLength
  var clip = images.clip(img, x, y, w, h);
  var path = 连连看截图路径 + util.format('row%dcolumn%d.png', this.row, this.column)
  images.save(clip, path);
}
Grid.prototype.showCenterBox = function () {
  var centerX = this.centerX
  var centerY = this.centerY
  var left = centerX - sideLength / 2
  var top = centerY - sideLength / 2
  var right = centerX + sideLength / 2
  var bottom = centerY + sideLength / 2
  bitmapCanvas.drawRect(left, top, right, bottom, paint)
  // * drawText(String text, float x, floaty, Paint paint)

  var originalStrokeWidth= paint.getStrokeWidth()
  var originalColor = paint.getColor()
  var textColor='#00ff00'
  color = colors.parseColor(textColor)
  paint.setColor(color)
  paint.setStrokeWidth(2)
  bitmapCanvas.drawText(util.format('行%d\n列%d',this.row,this.column),left,top,paint)
  paint.setColor(originalColor)
  paint.setStrokeWidth(originalStrokeWidth)

}
//初始化格子
var bigGrid = new Array(rowNumber + 2)
for (let i = 0; i < bigGrid.length; i++) {
  bigGrid[i] = new Array(columnNumber + 2)
}
//给予格子的位置信息
for (let i = 1; i < bigGrid.length-1; i++) {
  var rowGrids=bigGrid[i]
  for(let j=1;j<rowGrids.length-1;j++){
    bigGrid[i][j]=new Grid(i,j)
  }
}





// traverseBigGrid()

// function traverseBigGrid(){
//   for(let i=0;i<bigGrid.length;i++){
//     var rowGrids=bigGrid[i]
//     for(let j=0;j<rowGrids.length;j++){
//       var grid=rowGrids[j]
//       if(grid){
//         log(grid)
//         grid.showCenterBox()
//       }
//     }
//   }
// }




//游戏刚开始,先截图,保存原始图片信息
var img=captureScreen()
for(let i=0;i<bigGrid.length;i++){
  var rowGrids=bigGrid[i]
  for(let j=0;j<rowGrids.length;j++){
    var grid=rowGrids[j]
    if(grid){
      grid.captureScreen(img)
    }
  }
}
log('保存原始图片信息完毕')
// 从左上角第一个开始遍历,找到和所选图片相同的所有图片
var hasJudgedGrids=[]
for (let i = 1; i < bigGrid.length-1; i++) {
  var rowGrids=bigGrid[i]
  for(let j=1;j<rowGrids.length-1;j++){
    var grid=bigGrid[i][j]
    var path = 连连看截图路径 + util.format('row%dcolumn%d.png', i, j)
    var options={
      region:[
        leftTopCoordinates.x,
        leftTopCoordinates.y,
        rightBottomCoordinates.x-leftTopCoordinates.x,
        rightBottomCoordinates.y-leftTopCoordinates.y
      ],
      max:13
    }
    var points=images.matchTemplate(img, images.read(path), options).points
    log(points.length)
    log(points)
    var block=images.read(path)
    var canvas = new Canvas(img);
    var paint = new Paint();
    paint.setColor(colors.parseColor("#2196F3"));
    points.forEach(point => {
        canvas.drawRect(point.x, point.y, point.x + block.width, point.y + block.height, paint);
    });
    var image = canvas.toImage();
    images.save(image, "/sdcard/tmp.png");

    app.viewFile("/sdcard/tmp.png");







    exit()
  }
}



// var leftTopCoordinates = {
//   x: 35,
//   y: 391
// }
// var rightBottomCoordinates = {
//   x: 1044,
//   y: 1828
// }








// var superMario = images.read("./super_mario.jpg");
// var block = images.read("./block.png");
// var points = images.matchTemplate(superMario, block, {
//     threshold: 0.8
// }).points;

// toastLog(points);

// var canvas = new Canvas(superMario);
// var paint = new Paint();
// paint.setColor(colors.parseColor("#2196F3"));
// points.forEach(point => {
//     canvas.drawRect(point.x, point.y, point.x + block.width, point.y + block.height, paint);
// });
// var image = canvas.toImage();
// images.save(image, "/sdcard/tmp.png");

// app.viewFile("/sdcard/tmp.png");

// superMario.recycle();
// block.recycle();
// image.recycle();
