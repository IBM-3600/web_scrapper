const {JSDOM} =require('jsdom');
async function crawlPage(currentURL){
    console.log(`actively crawling: ${currentURL} `)
    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error in fetch with status :${resp.status} on page: ${currentURL}`)
            return
        }
        const contentType = resp.headers.get("content-type");
        if(contentType !== "text/html"){
            console.log(`non html response, content type ${contentType},on page: ${currentURL}`)
            return
        }
            console.log(await resp.text())
    }catch(err){
          console.log(`error in fetch: ${err.message} on page: ${currentURL}`)  
    }
    
}
const getURLsFromHTML=(htmlBody,baseURL)=>{
   const URLs = []
   const dom = new JSDOM(htmlBody)
   const linkElements = dom.window.document.querySelectorAll('a')
   for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) ==='/'){
            //relative
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
            URLs.push(urlObj.href)
            }catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
            
        }else{
            //absolute
           
            try{
                const urlObj = new URL(linkElement.href)
            URLs.push(urlObj.href)
            }catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
        }
   }

   return URLs
}



const normalizeURL=(stringURL)=>{
    const urlObj = new URL(stringURL)
   const hostPath = `${urlObj.hostname}${urlObj.pathname}`
   if(hostPath.length > 0 && hostPath.slice(-1) ==='/'){
    return hostPath.slice(0,-1);
   }
   return hostPath
}

module.exports={normalizeURL,getURLsFromHTML,crawlPage}