const fs = require("fs");
function queryUser(a,url){
    return new Promise((resolve,reject)=>[
        // readdir用于异步读取给定目录的所有文件名。files为所有文件名组成的数组
        fs.readdir(url,(err,files)=>{
            if(err) return reject(err);
            // 如果files是一个空数组，那么就返回 false ，表示没有这个用户
            if(files[0] === undefined) return resolve(false);
            files.forEach(e=>{
                const index = e.lastIndexOf('.');
                // console.log(e.substring(0,index) == a);
                // 如果存在该用户，则返回true，表示有该用户
                if(e.substring(0,index) == a){
                    return resolve(true);
                }
            })
            // 所有文件查询完毕后，没有该用户则返回false
            return resolve(false);
        })
    ])
}
module.exports = queryUser;