var name = 'jake'
var age = '18'
parseTemplate = (str) => {
  var reg = /\$\{.+?\}/g
  var r = str.match(reg)
  var variable;
  var newStr;
  for (var i = 0; i < r.length; i++) {
    variable = r[i].replace(/[${}]/g, '')
    // newStr = str.replace(r[i], eval(variable))
    newStr = str.replace(r[i], global[variable])

    str = newStr
  }
  return str
}

function temp() {
  var name = 'god'
  var age = 88888
  var str = "im ${name}, my age is ${age}"
  var newStr = parseTemplate(str)
  return newStr
}
log(temp())
