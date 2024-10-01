const puppeteer = require('puppeteer');

// 单例模式
let browserInstance = null;

async function initBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      // 设置有头模式（默认为true，无头模式） 
      headless: true,
      // 指定浏览器路径
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      // 视口充满屏幕
      defaultViewport: null,
      // 最大化窗口
      args: ['--start-maximized']
    });
  }
  return browserInstance;
}

// 公共方法，返回同一个 browser 实例
async function getBrowser() {
  return await initBrowser();
}

module.exports = {
  getBrowser
};