const {Builder,WebElement, By, Key, until} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');

const init = async() => {
    const builder = new Builder();
    const opt = new Options();
    opt.windowSize({width:1200,height:800});
    builder.setChromeOptions(opt);
    const driver = await builder.forBrowser('chrome').build();
    return  driver;
};

const login = async(driver,obj) => {
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

const createAd = async(driver,str) => {
    const params = str.split(',');
    let segu = params[2];
    let idx = params[1];
    let name = params[0];
    // 等待 ]新建广告位]按钮出现 并点击
    await driver.wait(until.elementLocated(By.linkText('新建广告位'))).click();
    //等待  [选择媒体]出现  并点击
    let xpath =  '//div[@class="selection-container selection-container-single with-search"]';
    await driver.wait(until.elementLocated(By.xpath(xpath))).click();
    //【选择媒体】 TODO:这里要动态配置
    xpath =  '//ul[@class="selection-results"]/li[@class="selection-info"][3]';
    await driver.findElement(By.xpath(xpath)).click();
    //选择  【广告场景】
    xpath = `//ul[@class="union-card-list list-contain-4"]/li[@class="union-card-item"][${segu}]`;
    await driver.findElement(By.xpath(xpath)).click();
    //选择 [广告样式]
    if (segu === '1'){
        xpath = `//ul[@class="union-card-list card-list-dtxxl list-contain-2"]/li[${idx}]`;
    }else if (segu === '4'){
        xpath = `//ul[@class="union-card-list card-list-cp list-contain-2"]/li[${idx}]`;
    }
    await driver.findElement(By.xpath(xpath)).click();
    // [输入广告位名称]
    xpath = '//input[@placeholder="限15个汉字或30个字符"]';
    let nameEle = await driver.findElement(By.xpath(xpath));
    await driver.wait(until.elementIsEnabled(nameEle));
    nameEle.sendKeys(name);

    //点击[完成]按钮
    xpath = '//button[@class="union-complete-btn spaui-button spaui-button-primary spaui-component"]';
    await driver.findElement(By.xpath(xpath)).click();
    //等待此 element出现
    xpath = '//button[@class="spaui-button spaui-button-primary spaui-component"]';
    let iknow = await driver.wait(until.elementLocated(By.xpath(xpath))).click();
    await driver.executeScript("arguments[0].click();", iknow);


};

exports.launch = async (obj) => {

    const driver = await init();

    try {
        await login(driver,obj);

        for (let i = 0 ; i< obj.adnames.length; i++){
            await createAd(driver,obj.adnames[i]);
        }

    } finally {
        driver.sleep(10000);
        driver.quit();
    }
};

