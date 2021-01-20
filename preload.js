const ipcRenderer = require('electron').ipcRenderer
document.addEventListener("DOMContentLoaded", function () {
    // ipcRenderer.sendToHost('html-content' , document.body.innerHTML)

    ipcRenderer.sendToHost('show-info', 'teste')

    manipulatePlayer = () => {
      const player = document.getElementById('vilos-player')
      const header = document.querySelector('header')
      console.log(player)
      if (player) {
        player.style.width = '100vw'
        player.style.height = '100vh'
        player.style.position = 'fixed'
        player.style.top = 0
        player.style.left = 0
        player.style.zIndex = 50000
        header.style.display = 'none'
        document.body.style.overflow = 'hidden'
      } else {
        setTimeout(() => {
          manipulatePlayer()
        }, 2000)
      }
    }

    manipulatePlayer()
})