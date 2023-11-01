const fs = require("fs");
module.exports = function saveUserInfo(a){
    const data = JSON.stringify({
        username:a.username,
        password:a.password,
        email:a.email
    });
    return new Promise((resolve,reject)=>{
        fs.writeFile(`./user/${a.username}.json`,data,(err)=>{
            if(err) return reject(err);
            return resolve(true);
        })
    })
}