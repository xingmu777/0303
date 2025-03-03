import http from "http";
import fs from "fs";
import path from "path";
import url from "url";
import mime from "mime";
const HOST = "127.0.0.1";
const POTH = 9527;
const cwd = process.cwd();
export function tranDir(dirpath,tree=[]) {
    const dirinfo = fs.readdirSync(dirpath);
    dirinfo.forEach((filename)=>{
        const fullPath = path.join(dirpath,filename);
        if(fs.statSync(fullPath).isDirectory()){
            tree.push({
                name:filename,
                fullPath,
                children:tranDir(fullPath),
            })
        }
        if(fs.statSync(fullPath).isFile()){
            tree.push({
                name:filename,
                fullPath,
            })
        }
    })
    return tree;
}
tranDir(cwd)
function isFile(targeFilePath) {
    return fs.existsSync(targeFilePath)&&fs.statSync(targeFilePath).isFile();
}
function requestHandle(req,res) {
    const{pathname,searchParams} = new url.URL(req.url,`http://${HOST}:${POTH}`);
    console.log(pathname,searchParams);
    const targeFilePath = path.join(cwd,pathname);
    if(req.url==="/shui") {
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify(tranDir(cwd)));
    } 
    // 必传参:filename
    // 删除指定文件
    else if(req.url==="/delete") {
        fs.rmdir(targeFilePath);
        res.setHeader("Content-Type","text/pain");
        res.end("已删除文件：",pathname);
    } else {
        // 必传参:filename
        // 读取文件返回
        if(isFile(targeFilePath)) {
            const buffer =fs.readFileSync(targeFilePath);
            const contentType = mime.getType(targeFilePath) || "application/json";
            res.setHeader("Content-Type",contentType.startsWith("text")?`${contentType};charset-utf8`:contentType);
            // fs.createReadStream("www/index.html").pipe(res);
            res.end(buffer);
        }
    }
}

function createStaticeSearver() {
    const server = new http.Server();
    server.addListener("request",requestHandle);
    server.addListener("listening",()=>{
        console.log(`服务运行在：http://${HOST}:${POTH}`);
    });
    server.listen(POTH,HOST);
}
createStaticeSearver();