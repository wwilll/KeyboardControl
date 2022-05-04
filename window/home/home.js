const { ipcRenderer } = require('electron')

window.onload = () => {
  document.querySelector('#close').addEventListener('click', (e) => {
    ipcRenderer.send('close-window', 'home')
  })
}
