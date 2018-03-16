// https://github.com/shelljs/shelljs
require('shelljs/global')
var path = require('path')
var fs = require('fs')
var config = require('../config')
var crypto = require('crypto');
var routes = require('../src/routes');
var env = require('../src/utils/env');
var url = require('url');

//遍历文件夹
function travelDir(dirPath, callback) {
    fs.readdirSync(dirPath).forEach(function(filename) {
        var filePath = path.join(dirPath, filename);
        if (fs.statSync(filePath).isDirectory()) {
            travelDir(filePath, callback);
        } else {
            if (filename !== ".DS_Store") {
                callback(filePath);
            }
        }
    });
}

//生成文件
function createFile(path, fileName, data, callback) {
    var manifestFilePath = path + "/" + fileName;
    var manifestString = JSON.stringify(data);
    try {
        fs.writeFileSync(manifestFilePath, manifestString);
        console.log("create " + fileName + " success");
        callback(manifestFilePath);
    } catch (error) {
        console.error(error);
    }
}

console.log("dist config starting....");

var distRootPath = config.build.distRootPath;
console.log("web dist root path:" + distRootPath);

var filesArray = [];
travelDir(distRootPath, function(filePath) {
    if (path.extname(filePath) !== ".map") {
        filesArray.push(filePath);
    }
});

var URL = url.parse(env.baseUrl);
var mappingUrl = "//" + URL.host + config.build.urlRouterPrefix;

//生成manifest.json
var moduleName = config.build.moduleName;
var moduleId = 185;
var manifest = {
    "id": moduleId,
    "m": moduleName,
    "h": URL.host,
    "timeStamp": new Date().getTime(),
    "apis": "*",
    "mappingUrl": mappingUrl
};
createFile(distRootPath, "manifest.json", manifest, function(path) {
    filesArray.push(path);
});

//生成app-res.json
var requestUrlPrefix = mappingUrl;
var resFileConfig = {};
filesArray.forEach(function(fileName) {
    try {
        var data = fs.readFileSync(fileName);
        var urlSuffix = fileName.slice(distRootPath.length + 1);
        var md5 = crypto.createHash("md5");
        var results = md5.update(data).digest("hex");

        //构造完成url，即服务器上资源对应的请求url
        var url = urlSuffix;
        var content = {
            "url": url,
            "h": results
        };
        resFileConfig[urlSuffix] = content;

        console.log("key:" + urlSuffix + " content:" + JSON.stringify(resFileConfig[urlSuffix]));
    } catch (error) {
        console.error(error);
    }
});

//添加route表映射
routes.forEach(function(route) {
    if (route.path.indexOf(config.build.urlRouterPrefix) > -1) {
        var content = {
            "url": "www/index.html",
            "h": ""
        };
        resFileConfig[route.name] = content;
        console.log("route url:" + route.path);
    }
});

//生成app-res.json文件
createFile(distRootPath, "app-res.json", resFileConfig, function(path) {});

//压缩模块文件夹
//sh web-zip.sh destpath moduleName moduleId
var shellPath = path.resolve(__dirname, './web-zip.sh');
var newCommand = "sh " + shellPath + " " + distRootPath + " " + moduleName + " " + moduleId;
console.log("command:" + newCommand);
if (exec(newCommand).code !== 0) {
    console.error("folder zip failed....");
    exit(2);
}

console.log("dist config finished....");