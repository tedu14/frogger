const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWin = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 650,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile(path.resolve(__dirname, 'index.html'))

    win.focus()
}

app.whenReady().then(createWin)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWin()
    }
})