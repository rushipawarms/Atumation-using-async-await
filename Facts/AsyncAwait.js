// let fs=require("fs");
// (async function(){
//   try{
//     console.log(" "+await fs.promises.readFile("../f1.txt"));
//     console.log(" "+await fs.promises.readFile("../f2.txt"));
//   }
//   catch(error){
//       console.log(error);

//   }
//
   
// })();

const puppeteer = require("puppeteer");
let tab;
(async function()
{
    try{
        let openB=await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
          });
            let pages=await openB.pages();
            let page= pages[0];
            tab=page;
            await page.goto("https://www.youtube.com");
            await page.waitForSelector("#search-input #search");
            await page.type("#search-input #search","eclipse bryant lowry");
            await page.waitForSelector("#search-form #search-icon-legacy");
            await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click("#search-form #search-icon-legacy")]);
            await page.waitForSelector('a[title="Eclipse"]');
            await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click('a[title="Eclipse"]')]);

            
    }
catch(error)
{
console.log(error);
}
})();
