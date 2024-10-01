const { getBrowser } = require('./index');

(async () => {
  // 获取 browser 实例
  const browser = await getBrowser();
  // 创建 page 实例
  const page = await browser.newPage();
  // 打开指定页面
  await page.goto('https://www.baidu.com');
  // 截图
  await page.screenshot({ path: 'baidu.png' });
  // 关闭 browser 实例
  await browser.close();
})();