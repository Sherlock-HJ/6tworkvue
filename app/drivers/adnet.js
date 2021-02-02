const {Builder, WebElement, By, Key, until} = require('selenium-webdriver');
const {Options, ServiceBuilder,} = require('selenium-webdriver/chrome');
const {mainWindow} = require('../main_window');


const init = async () => {
    const builder = new Builder();
    const opt = new Options();
    opt.windowSize({width: 1300, height: 800});
    builder.setChromeOptions(opt);
    const driver = await builder.forBrowser('chrome').build();
    return driver;
};

const login = async (driver, obj) => {
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
};

const createAd = async (driver, str) => {
    const params = str.split('__');
    let placementName = params[0];
    let appName = params[1];
    let scenario = params[2];
    let style = params[3];

    // 等待 [新建广告位]按钮出现 并点击
    await driver.wait(until.elementLocated(By.linkText('新建广告位'))).click();
    //等待  [选择媒体]出现  并点击
    let xpath = '//div[@class="selection-container selection-container-single with-search"]';
    await driver.wait(until.elementLocated(By.xpath(xpath))).click();
    //【选择媒体】
    xpath = `//span[@class="selection-content name" and contains(text(),"${appName}")]`;
    await driver.findElement(By.xpath(xpath)).click();
    //选择  【广告场景】
    xpath = `//p[@class="title" and contains(text(),"${scenario}")]`;
    await driver.findElement(By.xpath(xpath)).click();
    //选择 [广告样式]
    xpath = `//p[@class="title" and contains(text(),"${style}")]`;
    await driver.findElement(By.xpath(xpath)).click();
    // [输入广告位名称]
    xpath = '//input[@placeholder="限15个汉字或30个字符"]';
    let nameEle = await driver.findElement(By.xpath(xpath));
    await driver.wait(until.elementIsEnabled(nameEle));
    nameEle.sendKeys(placementName);

    // await driver.sleep(2000 *1000);

    //点击[完成]按钮
    xpath = '//button[@class="union-complete-btn spaui-button spaui-button-primary spaui-component"]';
    await driver.findElement(By.xpath(xpath)).click();
    //等待此 element出现
    xpath = '//button[@class="spaui-button spaui-button-primary spaui-component"]';
    let iknow = await driver.wait(until.elementLocated(By.xpath(xpath))).click();
    await driver.executeScript("arguments[0].click();", iknow);


};

const getAd = async (driver, obj) => {
    try {
        let countPage = await driver.wait(until.elementLocated(By.css('.pagination')));
        await driver.wait(until.elementIsEnabled(countPage));
        await driver.wait(until.elementIsVisible(countPage));

        const trBy = By.css('tr');
        await driver.wait(until.elementLocated(trBy));
        let trs = await driver.findElements(trBy);

        try {

            for (let idx = 0; idx < trs.length; idx++) {
                let dfd = await trs[idx].getText();
                dfd = dfd.replace(/\n/g, ',');
                if (/广告位,广告位类型,所属媒体/.test(dfd)) {
                    console.log('忽略');
                    continue;
                }
                let arr = dfd.split(',');
                arr[1] = arr[1].slice(3);
                arr[4] = arr[4].slice(3);
                arr = arr.slice(0, 5);

                arr.push(obj.account);
                arr.push(obj.account + '_' + arr[4] + '_' + arr[1]);

                mainWindow().webContents.send('from-chrome-syncing-ad',arr);
            }
        } catch (e) {
            console.log(e);
        }
    }catch (e) {
        console.log(e);
    }



    //是否是最后一页
    let page = await driver.findElement(By.css('.pagination .active')).getText();
    console.log(page);

    let count = await driver.findElement(By.css('.pagination .count')).getText();
    console.log(count);

    const pageFlag = `共${page}页`;
    if (count === pageFlag){
        return  true;
    }else {
        try {
            let nextPage = await driver.wait(until.elementLocated(By.linkText('下一页')));
            await driver.wait(until.elementIsEnabled(nextPage));
            await driver.wait(until.elementIsVisible(nextPage));
            await nextPage.click();
        }catch (e) {
            console.log(e);
        }

        return false;
    }
};

const SyncAd = async (driver, obj) => {
    //创建本地暂存文件

    //按页获取已创建好的广告存储到本地
    let len = 100000;
    if (obj.adnames && obj.adnames.length > 0){
        len = Math.ceil(obj.adnames.length / 20.0);
    }
    for (let i = 0; i < len; i++) {
       let isDone = await getAd(driver, obj);
       if (isDone) break;
    }


};

const launchSyncAd = async (obj) => {
    const driver = await init();

    try {
        //登录
        await login(driver, obj);
        //按页获取已创建好的广告存储到本地
        await SyncAd(driver, obj);
    } catch (e) {
        await driver.executeScript("alert('出错 10秒后退出，也可自行关闭');",);
        await driver.sleep(8 *1000);
    } finally {
        await driver.sleep(2 *1000);
        driver.quit();
    }
};

const launchCreateAd = async (obj) => {

    const driver = await init();

    try {
        //登录
        await login(driver, obj);

        //逐条创建广告
        for (let i = 0; i < obj.adnames.length; i++) {
            await createAd(driver, obj.adnames[i]);
        }

        //按页获取已创建好的广告存储到本地 并上传bmob
        await SyncAd(driver, obj);

    } catch (e) {
        await driver.executeScript(`alert('出错 10秒后退出，也可自行关闭\n${e.error()}');`);
        await driver.sleep(8 *1000);
    } finally {
        await driver.sleep(2 *1000);
        driver.quit();
    }
};

module.exports = {launchCreateAd, launchSyncAd};

