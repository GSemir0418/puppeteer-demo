// 爬取掘金的前端面试文章
// 引入puppeteer
const puppeteer = require("puppeteer");
const fs = require('fs');
// 使用async/await处理异步
(async () => {
  // 创建一个Browser（浏览器）实例
  const browser = await puppeteer.launch({
    // 设置有头模式（默认为true，无头模式）
    headless: true,
    // 指定浏览器路径
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  // 在浏览器中创建一个新的页面
  const page = await browser.newPage();

  // 打开指定页面
  await page.goto("https://juejin.cn");

  // 等待页面搜索框加载完成
  await page.waitForSelector('.search-form input');

  // 聚焦搜索框元素 
  await page.focus('.search-form input');

  // 输入搜索关键词
  await page.keyboard.type('前端面试', { delay: 200 });

  // 点击搜索按钮
  await page.click('.seach-icon-container', { delay: 1000 });

  // 等待搜索结果页面加载完成
  await page.waitForSelector('.result-list .result-list .entry');

  // 按时间筛选
  await page.click('.search-list.result-list .nav-list.left li:nth-child(2)', { delay: 1000 });
  // 等待筛选后的结果页面加载完成
  await page.waitForSelector('.result-list .result-list .entry');

  // 拿到所有文章数据
  const entries = await page.$$('.result-list .result-list .entry');
  const data = []
  for (let entry of entries) {
    const a = await entry.$('a')
    const url = await a.evaluate(el => el.getAttribute('href'))
    const titleDiv = await a.$('.jj-link.title div')
    const title = await titleDiv.evaluate(el => el.innerText)
    data.push({ title, url, })
  }

  // 将数据写入 txt 文件中
  fs.writeFileSync('./data.txt', JSON.stringify(data, null, 2))

  // 关闭浏览器实例
  await browser.close();
})();