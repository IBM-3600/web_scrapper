const{sortPages}=require("../src/report");
const{test,expect}= require("@jest/globals");


test("sort pages",()=>{
    const input ={
        "http://blog.boot.dev/path":1,
        "http://blog.boot.dev":3,
    } 
    const actual = sortPages(input)
    const expected = [
        ["http://blog.boot.dev",3],
        ["http://blog.boot.dev/path",1]
    ]
    expect(actual).toEqual(expected);
})


test("sort for 5 pages",()=>{
    const input ={
        "http://blog.boot.dev/path":1,
        "http://blog.boot.dev/path1":3,
        "http://blog.boot.dev/path2":2,
        "http://blog.boot.dev/path3":8,
        "http://blog.boot.dev":4,
    } 
    const actual = sortPages(input)
    const expected = [
        ["http://blog.boot.dev/path3",8],
        ["http://blog.boot.dev",4],
        ["http://blog.boot.dev/path1",3],
        ["http://blog.boot.dev/path2",2],
        ["http://blog.boot.dev/path",1]
    ]
    expect(actual).toEqual(expected);
})