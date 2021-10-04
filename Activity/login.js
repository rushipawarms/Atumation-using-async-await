const puppeteer = require("puppeteer");
const Challenge = require("./challenges");
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
            let url=page.url();
            await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click(".btn.btn-green.backbone.pull-right")]);
            await createchallege(Challenge[0]);
            // for(let i=1;i<Challenge.length;i++)
            // {
            //     await page.goto(url);
            //     await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}),page.click(".btn.btn-green.backbone.pull-right")]);
            //     await createchallege(Challenge[i]);
            // }
           
    }
    catch(error){
        console.log("error");
    }

})();
// "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
//       "Description": "Question 1",
//       "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
//       "Input Format": "Integer",
//       "Constraints": "n <= 10 ^ 9",
//       "Output Format": "String",
//       "Tags": "Basics",
//       "Testcases": [
//         {
//           "Input": "7",
//           "Output": "Prime"
//         },
//         {
//           "Input": "9",
//           "Output": "Not Prime"
//         }
//       ]
async function createchallege(challenge)
{
    try{
        let name=challenge["Challenge Name"];
        let desc=challenge["Description"];
        let Stat=challenge["Problem Statement"];
        let Inputt=challenge["Input Format"];
        let Constr=challenge["Constraints"];
        let outpu=challenge["Output Format"];
        let tag=challenge["Tags"];
       
        await tab.waitForSelector("#name",{visible:true});
        await tab.type("#name",name);
        await tab.type("#preview",desc);
        await tab.waitForSelector("#problem_statement-container .CodeMirror textarea",{visible:true});
        await tab.type("#problem_statement-container .CodeMirror textarea",Stat);
        await tab.type("#input_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea",Inputt);
        await tab.type("#constraints-container .CodeMirror textarea",Constr);
        await tab.type("#output_format-container .CodeMirror textarea",outpu);
        await tab.type("#tags_tag",tag);
        await tab.keyboard.press("Enter");
        tab.waitForTimeout(5000);
        await tab.click(".save-challenge.btn.btn-green");
        
    }
    catch(error){
        console.log(error);
    }
}
