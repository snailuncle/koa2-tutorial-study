
f=floaty.rawWindow(
  <vertical padding='96'>
    <button id="logo" text='按钮1' w='auto' />
    <button id="panel" text='按钮2' w='auto' />
    <button id="adjust" text='按钮3' w='auto' />
  </vertical>
)
ui.run(
  function (){
    f.logo.on("click", () => {
      log('logo')
    })
    f.adjust.on("click", () => {
      log("adjust")
    })
  }
)
sleep(10000)
