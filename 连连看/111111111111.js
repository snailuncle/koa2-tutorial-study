//请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}
//连连看
//连连看分三个步骤
//一是提取画面中的格子信息
//二是判断格子是否可以连接
//三是点击可以连接的格子
//以上三个步骤循环,格子消除完毕
//我们定义一个格子
//row 行
//column 列
var startPoint = {
  x: 49,
  y: 406
}
var endPoint = {
  x: 1043,
  y: 1819
}
var rowNum = 10
var columnNum = 7
var backgroundColor = '#221843'
var gridWidth = (endPoint.x - startPoint.x) / columnNum
var gridHeight = (endPoint.y - startPoint.y) / rowNum
log('格子宽度: %s,格子高度: %s', gridWidth, gridHeight)
var imgPath = "/sdcard/快手小小游戏/连连看截图/"
files.createWithDirs(imgPath);
//一个格子应该有哪些信息?
function Grid(row, column) {
  this.row = row
  this.column = column
  this.existStatus = false
  this.centerxy = {
    x: startPoint.x + (gridWidth / 2) * (2 * this.column - 1),
    y: startPoint.y + (gridHeight / 2) * (2 * this.row - 1),
  }
}
Grid.prototype.click = function () {
  var x = this.centerxy.x
  var y = this.centerxy.y
  press(x, y, 1)
}
Grid.prototype.imgSize = gridWidth / 4
Grid.prototype.getImg = function (screenShot) {
  var x = this.centerxy.x - (this.imgSize / 2)
  var y = this.centerxy.y - (this.imgSize / 2)
  var w = this.imgSize
  var h = this.imgSize
  var clip = images.clip(screenShot, x, y, w, h);
  return clip
}
Grid.prototype.saveImg = function (screenShot) {
  images.save(this.getImg(screenShot), util.format('%s行%d列%d.png', imgPath, this.row, this.column));
}
Grid.prototype.isBg = function (screenShot) {
  log(this.row, this.column)
  log('this.centerxy.x=%d, this.centerxy.y=%d', this.centerxy.x, this.centerxy.y)
  var centerXYColor = images.pixel(screenShot, this.centerxy.x, this.centerxy.y)
  var OneEighthWidth = gridWidth / 8
  var color1 = images.pixel(screenShot, this.centerxy.x - OneEighthWidth, this.centerxy.y - OneEighthWidth)
  var color2 = images.pixel(screenShot, this.centerxy.x, this.centerxy.y - OneEighthWidth)
  var color3 = images.pixel(screenShot, this.centerxy.x + OneEighthWidth, this.centerxy.y - OneEighthWidth)
  var color4 = images.pixel(screenShot, this.centerxy.x - OneEighthWidth, this.centerxy.y)
  var color5 = images.pixel(screenShot, this.centerxy.x, this.centerxy.y)
  var color6 = images.pixel(screenShot, this.centerxy.x + OneEighthWidth, this.centerxy.y)
  var color7 = images.pixel(screenShot, this.centerxy.x - OneEighthWidth, this.centerxy.y + OneEighthWidth)
  var color8 = images.pixel(screenShot, this.centerxy.x, this.centerxy.y + OneEighthWidth)
  var color9 = images.pixel(screenShot, this.centerxy.x + OneEighthWidth, this.centerxy.y + OneEighthWidth)
  var ninePoints = [
    color1, color2, color3, color4, color5, color6, color7, color8, color9
  ]
  var similarToBGColorNum = 0
  for (let i = 0; i < ninePoints.length; i++) {
    if (colors.isSimilar(ninePoints[i], backgroundColor)) {
      similarToBGColorNum++;
    }
  }
  if (similarToBGColorNum > 3) {
    return true
  }
  // if (colors.isSimilar(centerXYColor, backgroundColor)) {
  //   var centerXYColorDown = images.pixel(screenShot, this.centerxy.x, this.centerxy.y+OneEighthWidth)
  //   if (colors.isSimilar(centerXYColorDown, backgroundColor)) {
  //     return true
  //   }
  // }
  return false
}
Grid.prototype.updateExistStatus = function (screenShot) {
  this.existStatus = !this.isBg(screenShot)
}
//创建一个二维数组,用来保存格子信息,
//大格子的最外围算是透明格子
// i 第i行
// j 第j列
var gridArr = new Array(rowNum + 2)
// log(gridArr.length)
// exit()
for (let i = 0; i < gridArr.length; i++) {
  gridArr[i] = new Array(columnNum + 2)
  for (let j = 0; j < gridArr[i].length; j++) {
    gridArr[i][j] = new Grid(i, j)
  }
}
main()

function main() {
  var screenShot = captureScreen();
  extractGridInfo(screenShot)
  var gridsCoupleArr = canConnect(screenShot)
  clickGrid(gridsCoupleArr)
}

function extractGridInfo(screenShot) {
  //提取所有格子的信息
  //一个二维数组
  // gridArr
  for (let i = 1; i < gridArr.length - 1; i++) {
    for (let j = 1; j < gridArr[i].length - 1; j++) {
      var grid = gridArr[i][j]
      grid.updateExistStatus(screenShot)
      grid.saveImg(screenShot)
    }
  }
  logGridArr(gridArr)
}

function logGridArr(gridArr) {
  var s = ''
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr[i].length; j++) {
      var grid = gridArr[i][j]
      if (grid.existStatus) {
        s += 1
      } else {
        s += 0
      }
    }
    s += '\n'
  }
  log(s)
}

function canConnect(screenShot) {
  var result = []
  var sameImgGridsArr = getSameImgGridsArr(screenShot)
  for (let i = 0; i < sameImgGridsArr.length; i++) {
    var canConnectCoupleGridsArr = getCanConnectCoupleGridsArr(sameImgGridsArr[i])
    if (canConnectCoupleGridsArr) {
      result.push.apply(result, canConnectCoupleGridsArr)
    }
  }

  return result
}

function getCanConnectCoupleGridsArr(sameImgGridsArr) {
  var markedGrids = []
  var result = []
  for (let i = 0; i < sameImgGridsArr.length - 1; i++) {
    for (let j = 1; j < sameImgGridsArr.length; j++) {
      var grid1 = sameImgGridsArr[i]
      var grid2 = sameImgGridsArr[j]
      if (
        markedGrids.indexOf(grid1) > -1 ||
        markedGrids.indexOf(grid2) > -1) {
        continue;
      } else {
        markedGrids.push(grid1)
        markedGrids.push(grid2)
      }
      if (canConnect2gridsFinalJudgement(grid1, grid2)) {
        result.push([grid1, grid2])
      }
    }
  }
  return result
}

function canConnect2gridsFinalJudgement(grid1, grid2) {
  if (canConnect2gridsFirst(grid1, grid2) || canConnect2gridsSecond(grid1, grid2)) {
    return true
  }
  return false
}
//两个格子能不能连接
//是检查两个格子的上下左右连续的空格子有没有交点,包括格子本身
//如果没有交点,做二次交点判断
//二次交点做完还没有交点就是不能连接
//以上逻辑,可以转化为求两个数组有没有相同的元素
function hasSameElement(gridArr1, gridArr2) {
  for (let i = 0; i < gridArr1.length; i++) {
    if (gridArr2.indexOf(gridArr1[i]) > -1) {
      return true
    }
  }
  return false
}
//一次交点判断
function canConnect2gridsFirst(grid1, grid2) {
  if (canConnect2grids(grid1, grid2)) {
    return true
  }
  return false
}
//二次交点判断
function canConnect2gridsSecond(grid1, grid2) {
  var grid1UpGridArr = getGridsInTheSpecifiedDirection(grid1, 'up')
  var grid1DownGridArr = getGridsInTheSpecifiedDirection(grid1, 'down')
  var grid1LeftGridArr = getGridsInTheSpecifiedDirection(grid1, 'left')
  var grid1RightGridArr = getGridsInTheSpecifiedDirection(grid1, 'right')
  var grid2UpGridArr = getGridsInTheSpecifiedDirection(grid2, 'up')
  var grid2DownGridArr = getGridsInTheSpecifiedDirection(grid2, 'down')
  var grid2LeftGridArr = getGridsInTheSpecifiedDirection(grid2, 'left')
  var grid2RightGridArr = getGridsInTheSpecifiedDirection(grid2, 'right')
  var grid1UpDownLeftRight = [
    grid1UpGridArr,
    grid1DownGridArr,
    grid1LeftGridArr,
    grid1RightGridArr
  ]
  var grid2UpDownLeftRight = [
    grid2UpGridArr,
    grid2DownGridArr,
    grid2LeftGridArr,
    grid2RightGridArr
  ]
  for (let i = 0; i < grid1UpDownLeftRight.length; i++) {
    var grids1InTheSpecifiedDirection = grid1UpDownLeftRight[i]
    var grids2InTheSpecifiedDirection = grid2UpDownLeftRight[i]
    grids1InTheSpecifiedDirection.map(
      (gridFirst) => {
        grids2InTheSpecifiedDirection.map(
          (gridSecond) => {
            if (canConnect2grids(gridFirst, gridSecond)) {
              return true
            }
          }
        )
      }
    )
  }
  return false
  // grid1UpDownLeftRight.map(
  //   (grids1InTheSpecifiedDirection)=>{
  //     grid2UpDownLeftRight.map(
  //       (grids2InTheSpecifiedDirection)=>{
  //         if(hasSameElement(grids1InTheSpecifiedDirection,grids2InTheSpecifiedDirection)){
  //           return true
  //         }
  //       }
  //     )
  //   }
  // )
}

function canConnect2grids(grid1, grid2) {
  if (hasIntersectionPoints(grid1, grid2)) {
    return true
  }
  return false
}

function hasIntersectionPoints(grid1, grid2) {
  var grid1UpGridArr = getGridsInTheSpecifiedDirection(grid1, 'up', true)
  var grid1DownGridArr = getGridsInTheSpecifiedDirection(grid1, 'down', true)
  var grid1LeftGridArr = getGridsInTheSpecifiedDirection(grid1, 'left', true)
  var grid1RightGridArr = getGridsInTheSpecifiedDirection(grid1, 'right', true)
  var grid2UpGridArr = getGridsInTheSpecifiedDirection(grid2, 'up', true)
  var grid2DownGridArr = getGridsInTheSpecifiedDirection(grid2, 'down', true)
  var grid2LeftGridArr = getGridsInTheSpecifiedDirection(grid2, 'left', true)
  var grid2RightGridArr = getGridsInTheSpecifiedDirection(grid2, 'right', true)
  var grid1UpDownLeftRight = [
    grid1UpGridArr,
    grid1DownGridArr,
    grid1LeftGridArr,
    grid1RightGridArr
  ]
  var grid2UpDownLeftRight = [
    grid2UpGridArr,
    grid2DownGridArr,
    grid2LeftGridArr,
    grid2RightGridArr
  ]
  grid1UpDownLeftRight.map(
    (grids1InTheSpecifiedDirection) => {
      grid2UpDownLeftRight.map(
        (grids2InTheSpecifiedDirection) => {
          if (hasSameElement(grids1InTheSpecifiedDirection, grids2InTheSpecifiedDirection)) {
            return true
          }
        }
      )
    }
  )
  return false
}

function getGridsInTheSpecifiedDirection(grid, direction, includeSelf) {
  var gridArr = []
  if (includeSelf) {
    gridArr = [grid]
  }
  var row = grid.row
  var column = grid.column
  switch (direction) {
    case 'up':
      for (let i = row - 1; i >= 0; i--) {
        if (isEmptyGrid(gridArr[i][column])) {
          gridArr.push(gridArr[i][column])
        }
      }
      break;
    case 'down':
      for (let i = row + 1; i <= rowNum + 1; i++) {
        if (isEmptyGrid(gridArr[i][column])) {
          gridArr.push(gridArr[i][column])
        }
      }
      break;
    case 'left':
      for (let i = column - 1; i >= 0; i--) {
        if (isEmptyGrid(gridArr[row][i])) {
          gridArr.push(gridArr[row][i])
        }
      }
      break;
    case 'right':
      for (let i = column + 1; i <= columnNum + 1; i++) {
        if (isEmptyGrid(gridArr[row][i])) {
          gridArr.push(gridArr[row][i])
        }
      }
      break;
    default:
      throw '只允许四个方向,up,down,left,right' + '你的方向是' + direction
  }
  return gridArr
}

function isEmptyGrid(grid) {
  log(grid)
  if (grid.existStatus) {
    return false
  } else {
    return true
  }
}

function getSameImgGridsArr(screenShot) {
  //从左到右从上到下,一个一个对比图片相同的格子是否可以连接
  var sameImgGridsArr = []
  var markedGrids = []
  for (let i = 1; i < gridArr.length - 1; i++) {
    for (let j = 1; j < gridArr[i].length - 1; j++) {
      var grid = gridArr[i][j]
      if (markedGrids.indexOf(grid) > -1) {
        continue;
      }
      var sameGrids = getSameImgGrids(grid, screenShot)
      sameImgGridsArr.push(sameGrids)
      markedGrids.push.apply(markedGrids, sameGrids)
    }
  }
  return sameImgGridsArr
}

function getSameImgGrids(grid, screenShot) {
  // 范围30
  var superMario = screenShot;
  var block = grid.getImg(screenShot);
  var points = images.matchTemplate(superMario, block, {
    threshold: 0.8
  }).points;
  log(points)
  var result = []
  points.map((point) => {
    var x = point.x
    var y = point.y
    for (let i = 1; i < gridArr.length - 1; i++) {
      for (let j = 1; j < gridArr[i].length - 1; j++) {
        var grid = gridArr[i][j]
        var centerxy = grid.centerxy
        if (Math.abs(centerxy.x - x) < 30 && Math.abs(centerxy.y - y) < 30) {
          result.push(gridArr[i][j])
        }
      }
    }
  })
  if (points.length == result.length) {
    return result
  }
  // else{
  //   alert('相似图片的数量和points不匹配')
  //   exit()
  // }
  //  [ {102.0, 458.0},
  //    {102.0, 884.0},
  //    {812.0, 600.0},
  //    {244.0, 1310.0},
  //    {810.0, 600.0} ]
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
}

function clickGrid(gridsCoupleArr) {
  if (gridsCoupleArr && gridsCoupleArr.length > 0) {
    for (let i = 0; i < gridsCoupleArr.length; i++) {
      var grid1 = gridsCoupleArr[0]
      var grid2 = gridsCoupleArr[1]
      grid1.click()
      grid2.click()
    }
  } else {
    log('没有成对的格子了,连连看应该都连接完毕了,脚本结束!')
    exit();
  }
}
