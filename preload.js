const ipcRenderer = require('electron').ipcRenderer
document.addEventListener("DOMContentLoaded", function () {
    // ipcRenderer.sendToHost('html-content' , document.body.innerHTML)

    ipcRenderer.sendToHost('show-info', `Exibindo a página "${document.title}"`)

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

        const infos = document.body.innerHTML.split('vilos.config.media = ')[1].split(';')[0]
        if (infos) {
          ipcRenderer.sendToHost('html-content' ,  JSON.parse(infos))
        }

      } else {
        setTimeout(() => {
          manipulatePlayer()
        }, 2000)
      }
    }

    manipulatePlayer()
})