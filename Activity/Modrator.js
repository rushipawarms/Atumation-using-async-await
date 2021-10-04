const puppeteer = require("puppeteer");
const Challenge = require("./challenges");
let tab;
let gbrowser;
let Clinks=[];
(async function()
{
    try{
        let openB=await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
          });
          gbrowser=openB;
            let pages=await openB.pages();
            let page= pages[0];
            tab=page;
            await page.goto("https://www.hackerrank.com/auth/login");
            await page.type("#input-1","wafib72734@drlatvia.com");
            await page.type("#input-2","12345678");
            await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button")]);
            await page.click('div[data-analytics="NavBarProfileDropDown"]');
            await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
            await page.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li");
            let bothli=await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
            let requiredli=bothli[bothli.length-1];
            await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),requiredli.click()]);
            await addmodrator(); 
    }
    catch(error){
        console.log("error");
    }
})();
async function addmodrator()
{
    try{
        await tab.waitForSelector(".backbone.block-center");
        let alla=await tab.$$(".backbone.block-center");
        let links=[];
        for(let i=0;i<alla.length;i++)
        {
            let link=await tab.evaluate(function(ele){return ele.getAttribute("href");},alla[i]);
            await links.push(link);
            
        }
        for(let i=0;i<links.length;i++)
        {
            let clink="https://www.hackerrank.com"+links[i];
            Clinks.push(clink);
        }
        let allpp=[];
        for(let i=0;i<Clinks.length;i++)
        {
            let newtab= await gbrowser.newPage();
           let pp= addMtoque(newtab,Clinks[i]);
           allpp.push(pp);
        }
        await Promise.all(allpp);
        let allli=await tab.$$(".pagination li");
        let nextB=allli[allli.length-2];
        let dis=await tab.evaluate(function(ele){
            return ele.classList.contains("disabled");
        },nextB);
        if(dis)
        {
            return
        }
        await Promise.all([tab.waitForNavigation({waitUntil:"networkidle0"}),nextB.click()]);
        Clinks=[];
        await addmodrator(); 

        
    }
    catch(error)
    {
        console.log(error);
    }
      

}
async function addMtoque(newtab,link)
{
    try{
       await newtab.goto(link);
       await handlesave(newtab);
       await newtab.waitForSelector('li[data-tab="moderators"]');
       await Promise.all([newtab.waitForNavigation({waitUntil:"networkidle0"}),newtab.click('li[data-tab="moderators"]')]);
       await newtab.waitForSelector("#moderator");
       await newtab.type("#moderator","krish");
       await newtab.keyboard.press("Enter");
       await newtab.click(".save-challenge.btn.btn-green");
       await newtab.close();
    }
    catch(error)
    {
        console.log(error);
    }
   
}
async function handlesave(newtab)
{
    try{
        await newtab.waitForSelector("#confirmBtn");
        await newtab.click("#confirmBtn");
    }
   catch(error){
        console.log("Save button not Found");
        return;

   }

}