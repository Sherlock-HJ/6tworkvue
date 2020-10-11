const {Builder, By, Key, until} = require('selenium-webdriver');


exports.open = async (obj) => {
    console.log(obj);

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
};


