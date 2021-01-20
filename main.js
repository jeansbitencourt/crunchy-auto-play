const { app, BrowserWindow, ipcMain } = require('electron')

let menuWindow
let playerWindow

function createMenu() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    backgroundColor: "#000",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })
  win.loadFile('index.html')
  return win
}

function createPlayer(event, arg) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    backgroundColor: "#000",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })
  win.loadFile('player.html')
  win.maximize()
  win.once('ready-to-show', () => {
    setTimeout(() => {
      win.webContents.send('loadURL', arg)
    }, 2000)
  })
  win.on('closed', () => {
    menuWindow.webContents.send('showInfo', 'O player foi fechado!')
  })
  return win
}

app.whenReady().then(() => {
  menuWindow = createMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    menuWindow = createMenu()
  }
})

ipcMain.on('openPlayer', (event, arg) => {
  playerWindow = createPlayer(event, arg)
})

ipcMain.on('showPlayerInfo', (event, arg) => {
  menuWindow.webContents.send('showInfo', arg)
})
