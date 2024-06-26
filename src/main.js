const{crawlPage} = require('./crawler.js');
const{printReport} = require('./report.js');
(async()=>{
    if(process.argv.length < 3){
        console.log("no website provided")
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("too many command line args")
        process.exit(1);
    }
    const baseURL = process.argv[2]
    console.log("starting crawl")
    const pages = await crawlPage(baseURL,baseURL,{})
    printReport(pages)
})()