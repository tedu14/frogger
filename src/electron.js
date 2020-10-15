const { app, BrowserWindow, nativeImage } = require('electron')
const path = require('path')

const createWin = () => {
    const icon = nativeImage.createFromPath(`${path.resolve(__dirname, '..', 'build', 'icon.png')}`)

    if(app.dock){
        app.dock.setIcon(icon)
    }

    const win = new BrowserWindow({
        width: 800,
        height: 650,
        autoHideMenuBar: true,
        icon,
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