const{normalizeURL,getURLsFromHTML}=require("../src/crawler");
const{test,expect}= require("@jest/globals");


test("normalizeURL strip protocol",()=>{
    const input = "http://blog.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected);
})


test("normalizeURL trim slash",()=>{
    const input = "http://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected);
})

test("normalizeURL capitals",()=>{
    const input = "http://BLOG.Boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected);
})

test("normalizeURL sstrip http",()=>{
    const input = "http://blog.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected);
})


test("getURLsFromHTML absolute",()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="http://blog.boot.dev/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL ='http://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["http://blog.boot.dev/"]
    expect(actual).toEqual(expected);
})


test("getURLsFromHTML relative",()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL ='http://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["http://blog.boot.dev/path/"]
    expect(actual).toEqual(expected);
})

test("getURLsFromHTML multiple urls",()=>{
    const inputHTMLBody = `
    <html>
        <body>
             <a href="http://blog.boot.dev/path1/">
                Boot.dev Blog
            </a>
            <a href="/path2/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL ='http://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["http://blog.boot.dev/path1/","http://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected);
})

test("getURLsFromHTML invalid",()=>{
    const inputHTMLBody = `
    <html>
        <body>
             <a href="invalid">
               invalid link
            </a>
           
        </body>
    </html>
    `
    const inputBaseURL ='http://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected);
})