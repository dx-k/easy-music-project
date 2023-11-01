const http = require("http");
const fs = require("fs");
const getMusic = require("./getMusic");
const url = require("url");
const path = require("path");
const query = require("./queryUser");
const saveUserInfo = require("./saveUserInfo");

const WebServer = http.createServer();
const port = 8865;
WebServer.listen(port, () => {
    console.log(`服务启动成功，请访问http://127.0.0.1:${port}`);
})
WebServer.on("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-type", "application/json;text/plain;");
    res.setHeader("Access-Control-Allow-Origin", "*");

    switch (req.method) {
        case "GET":
            // 解决浏览器get请求后汉字在服务端乱码问题
            // console.log(decodeURIComponent(req.url));
            const q = url.parse(req.url, true);
            switch(q.path.slice(-4)){
                // 针对音乐文件做出相应
                case ".m4a":
                    getMusic(q.path,res);
                    break;
                default:
                    res.end(JSON.stringify({
                        status:"ok",
                        message:"默认数据"
                    }));
                    break;
            }  
            break;
        case "POST":
            let data = ""
            req.on('data', chunk => {
                data += chunk;
            })

            req.on('end', () => {
                const a = JSON.parse(data);
                // 开始查询
                query(a.username, "./user")
                // 存在放回true，不存在返回false
                .then(result => {
                    // 用户存在返回true，不存在返回false
                    console.log(result);
                    // 如果用户需要创建，并且用户不存在则存储用户信息
                    if (a.isCreate === true && result == false) {
                        // 开始存储用户信息
                        saveUserInfo(a)
                        .then(result => {
                            // 创建成功返回结果
                            res.end(JSON.stringify({ createEnd: result }));
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    } else {
                        // 不需要存储用户信息，直接返回用户已经存在
                        res.end(JSON.stringify({ userIsExist: result }));
                    }
                })
                .catch(e => {
                    res.end(JSON.stringify(e));
                })
            })
            break;
        default:
            res.end(JSON.stringify({
                status: "ok",
                message: `您的请求方法${req.method}错误`
            }))
            break;
    }
})

