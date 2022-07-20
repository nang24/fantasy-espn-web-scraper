const puppeteer = require('puppeteer');

async function scrapePlayerPage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="fittPageContainer"]/div[2]/div[1]/div/div/div[1]/div[1]/div[1]/div[1]/figure[2]/div[2]/img');
    const image = await el.getProperty('src'); // possibly image? idts
    const avatarURL = await (await image).jsonValue();

    const [el2] = await page.$x('//*[@id="fittPageContainer"]/div[2]/div[1]/div/div/div[1]/div/div[2]/h1');
    const text = await el2.getProperty('textContent');
    const name = await text.jsonValue();

    browser.close();

    // console.log({name, avatarURL});

    return {name, avatarURL};
}

// scrapePlayerPage('https://www.espn.com/nba/player/_/id/3213/al-horford');
module.exports = {
    scrapePlayerPage
}
