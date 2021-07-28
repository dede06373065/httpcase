const http=require('http')
const querystring=require('querystring')
const server=http.createServer((req,res)=>{
    const method=req.method
    const url=req.url
    const path=url.split('?')[0]//用？把地址栏分割开来，取前面的一部分作为path
    const query =querystring.parse(url.split('?')[1])//？分割地址栏取后面的一部分
    res.setHeader('Content-type','application/json')
    //设置返回格式为JSON
    const resData={
        method,
        url,
        path,
        query
    }
    if(method==='GET'){
        res.end(
            JSON.stringify(resData)
        )
    }
    if(method=='POST'){
        let postData=''
        req.on('data',chunk=>{
            postData+=chunk.toString()
        })
        req.on('end',()=>{
            resData.postData=postData
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})
server.listen(8000)
console.log('ok 8000')