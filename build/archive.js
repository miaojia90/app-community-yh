//node中引入shelljs模块
require('shelljs/global')

console.log("archive starting....");

//执行编译脚本
if (exec("npm run build ").code !== 0) {
	console.error("build failed....");
	exit(2);
}

//执行生成配置文件脚本
// if (exec("npm run build-dist-config ").code !== 0) {
// 	console.error("create dist config failed....");
// 	exit(2);
// }

console.log("archive finished....");