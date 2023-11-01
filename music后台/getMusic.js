const path = require("path");
const fs = require("fs");
// 实现音乐文件的数据响应
module.exports =  function getMusic(reqPath,res){
    // 获取请求的文件路径
    const filePath = decodeURIComponent(reqPath);
    const staticPath = path.join(__dirname, 'music', filePath);

    // 检查文件是否存在
    if (fs.existsSync(staticPath)) {
        // 设置响应头，并发送音乐文件
        res.setHeader('Content-Type', 'audio/mpeg');
        res.writeHead(200);

        // 创建可读流并将音乐文件内容通过流发送给客户端
        const stream = fs.createReadStream(staticPath);
        // 通过这段代码可以实现将指定路径下的文件发送给客户端浏览器进行展示或下载的功能。
        stream.pipe(res);
    } else {
        // 文件不存在时返回404状态码
        res.writeHead(404);
        res.end('File Not Found');
    }
}