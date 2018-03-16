/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 */

let baseUrl = '';
let routerMode = 'history';
let linkedmeKey = '1357cc17c938b98079fafb246ea25602';

baseUrl = window.location.host.toString().indexOf('h5') > -1 ? window.location.host : 'http://h5.jfz.net';
//风险测评相关的地址
let riskTestUrl = baseUrl + "/fortune/user/risk-test";

export {
	linkedmeKey,
	baseUrl,
	routerMode,
	riskTestUrl
}