// Modules to control application life and create native browser window
const {Builder, By, Key, until} = require('selenium-webdriver');

const {app, BrowserWindow, ipcMain} = require('electron');

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg);
    (async function example() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            // Navigate to Url
            await driver.get('https://adnet.qq.com/placement/list');
            console.log(1)
            await driver.switchTo().frame(driver.findElement( By.id("ptlogin_iframe")));
            console.log(2)
            let sw = await driver.wait(until.elementLocated( By.id('switcher_plogin')),1000);
            console.log(3)
            await sw.click();
            console.log(4)
            // browser.find_element_by_id('u').send_keys('2304724890');
            // browser.find_element_by_id('p').send_keys('gdcm84479855');
            // browser.find_element_by_id('u').send_keys('360530020');
            // browser.find_element_by_id('p').send_keys('xilu123$%^&');
            // browser.find_element_by_id('u').send_keys('3278166907');
            // browser.find_element_by_id('p').send_keys('gdcm84479855');
            await driver.findElement( By.id("u")).sendKeys('1241554103');
            console.log(5)
            await driver.findElement( By.id("p")).sendKeys('gdcm84479855');
            console.log(6)
            await driver.findElement( By.id("login_button")).click();
            console.log(7)

            await driver.switchTo().defaultContent();
            console.log(8)

            await driver.wait( until.elementLocated( By.className('form-control')),10000);
            let  search = await driver.findElement( By.className('form-control'));
            while (true){
                await driver.sleep(1000);
                try {
                    await search.sendKeys('TBS渠道6');
                    await search.sendKeys( Key.ENTER);
                    break;
                }catch (e) {
                    console.log('搜索框不可交互')
                }
            }


        }
        finally{
            await driver.sleep(10000);
            driver.quit();
        }
    })();



    event.reply('asynchronous-reply', {placement_id:123,app_id:'yioyio',name:'接待室里看风景阿卡丽'});
    return;
});


const debug = /--debug/.test(process.argv[2]);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 160*5,
        height: 90*5,
        webPreferences: {
            nodeIntegration: true,
            // enableRemoteModule: false,
            // webSecurity:true
        }
    });

    // and load the index.html of the app.
    if (debug) {
        mainWindow.loadURL('http://localhost:8080/');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile('./dist/index.html');
    }
    // mainWindow.maximize();


    // mainWindow.loadURL('http://localhost:8080/')
    // mainWindow.loadURL('http://39.100.25.53:8082/')

    // Open the DevTools.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
