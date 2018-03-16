/**
 * @file
 * Created by major on 17/11/05.
 */
const communityList = r => require(['views/communityList'], r);
const communityDetail = r => require(['views/communityDetail'], r);
const userCenter = r => require(['views/userCenter'], r);
const redPacketRule = r => require(['views/redPacketRule'], r);
const notFound = r => require(['views/notfound'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [{
	path: '/',
	redirect: {
		name: 'communityList'
	}
}, {
	path: '/vueApp/community/communityList',
	component: communityList,
	name: 'communityList'
}, {
	path: '/vueApp/community/userCenter/:userUid',
	component: userCenter,
	name: 'userCenter'
}, {
	path: '/vueApp/community/communityDetail',
	component: communityDetail,
	name: 'communityDetail'
}, {
	path: '/vueApp/community/redPacketRule',
	component: redPacketRule,
	name: 'redPacketRule'
}].map(route => {
	route.path = rootPath + route.path;
	return route;
});

// 404 页
routes.push({
	path: '*',
	component: notFound,
	name: 'notfound'
});

export default routes;