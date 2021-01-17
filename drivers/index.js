const {Builder,WebElement, By, Key, until} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');


exports.open = async (obj) => {
    console.log(obj);
    const builder = new Builder();
    const opt = new Options();
    opt.windowSize({width:1200,height:800});
    builder.setChromeOptions(opt);
    const driver = await builder.forBrowser('chrome').build();

    try {
        // Navigate to Url
        await driver.get('https://adnet.qq.com/placement/list');

        const qqLoginFrame = await driver.wait(until.elementLocated(By.id('qqLoginFrame')));
        await driver.wait(until.ableToSwitchToFrame(qqLoginFrame));
        const ptlogin_iframe = await driver.wait(until.elementLocated(By.id('ptlogin_iframe')));
        await driver.wait(until.ableToSwitchToFrame(ptlogin_iframe));
        let sw = await driver.wait(until.elementLocated(By.id('switcher_plogin')));
        await sw.click();
        await driver.findElement(By.id("u")).sendKeys(obj.account);
        await driver.findElement(By.id("p")).sendKeys(obj.pwd);
        await driver.findElement(By.id("login_button")).click();

        await driver.switchTo().defaultContent();

        let search = await driver.wait(until.elementLocated(By.className('form-control')));
        await driver.wait(until.elementIsEnabled(search));

        await driver.sleep(1000);
        try {
            await search.sendKeys('TBS渠道6');
            await search.sendKeys(Key.ENTER);
        } catch (e) {
            console.log('搜索框不可交互')
        }


    } finally {
        await driver.sleep(10000);
        driver.quit();
    }
};


