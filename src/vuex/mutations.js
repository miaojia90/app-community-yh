import {
	GETARTICLELIST,
	GETBLOCKDETAIL,
	GETARTICLEDETAIL,
	GETARTICLCOMMENT,
	CLICKLIKECOMMIT,
	COMMENTCLICKLIKECOMMIT,
	DELETEARTICLE,
	NOARTICLE,
	GETUSERDETAIL,
	SENDARTICLELIST,
	DISCUSSARTICLELIST,
	USERFOLLOW,
	COMMENTDELETE,
	GETHOTARTICLECOMMENT,
	GETFINANCIALADVISORINFO,
	GETAPIREQUSTTIMESTAMP,
	DYNAMICUPDATEBYDETAIL,
	GETREPRESENTPRODUCT,
	UPDATEISAUTHIDENTITY
} from './mutationTypes.js'

import {
	setStore,
	getStore
} from '../utils/mUtils'

export default {
	//获取板块信息
	[GETBLOCKDETAIL](state, blockDetail) {
		state.blockDetail = blockDetail;
	},
	//获取社区列表信息
	[GETARTICLELIST](state, articleList) {
		state.articlePageInfo = articleList.page;
		let tempList = articleList.items;
		state.articleList = [state.articleList,
			...tempList
		];
		state.titleName = '最新';
	},
	//没有帖子详情页
	[NOARTICLE](state, articleDetailError) {
		state.articleDetailError = articleDetailError;
	},
	// 获取帖子详情的信息
	[GETARTICLEDETAIL](state, articleDetail) {
		state.articleDetail = articleDetail;
	},
	// 获取帖子详情的评论信息
	[GETARTICLCOMMENT](state, articleComment) {
		state.commentPageInfo = articleComment.page;
		let tempList = articleComment.items;
		// console.log("...state.articleComment", state.articleComment);
		if (articleComment.page.current == 1) {
			state.articleComment = tempList;
		} else {
			state.articleComment = [...state.articleComment,
				...tempList
			];
		}
	},
	//点赞提交按钮
	[CLICKLIKECOMMIT](state, likeInfo) {
		state.likeInfo = likeInfo;
	},
	//评论点赞提交按钮
	[COMMENTCLICKLIKECOMMIT](state, likeInfo) {
		if (likeInfo == 1) {
			likeInfo = new Date().getTime();
		}
		state.commentLikeInfo = likeInfo;
	},
	//删除文章
	[DELETEARTICLE](state, articleDeleteInfo) {
		state.articleDeleteInfo = articleDeleteInfo;
	},
	//获取用户详情信息
	[GETUSERDETAIL](state, userDetail) {
		state.userDetail = userDetail;
	},
	//获取发送帖子列表
	[SENDARTICLELIST](state, sendArticleList) {
		state.sendArticleList = sendArticleList;
	},
	//讨论帖子列表
	[DISCUSSARTICLELIST](state, discussArticleList) {
		state.discussArticleList = discussArticleList;
	},
	//关注
	[USERFOLLOW](state, followCallBackInfo) {
		state.followCallBackInfo = followCallBackInfo;
	},
	//删除
	[COMMENTDELETE](state, commentDeleteInfo) {
		state.commentDeleteInfo = commentDeleteInfo;
	},
	[GETHOTARTICLECOMMENT](state, hotArticleComment) {
		state.hotArticleComment = hotArticleComment;
	},
	//理财师信息
	[GETFINANCIALADVISORINFO](state, financialAdvisorInfo) {
		state.financialAdvisorInfo = financialAdvisorInfo;
	},
	//帖子详情的时间戳
	[GETAPIREQUSTTIMESTAMP](state, temp) {
		// state.financialAdvisorInfo = financialAdvisorInfo;
	},
	//修改红包状态值
	[DYNAMICUPDATEBYDETAIL](state, stateValue, receivedValue) {
		state.articleDetail[0].redPacket.status = stateValue;
		state.articleDetail[0].redPacket.received = receivedValue;
	},
	//代表产品
	[GETREPRESENTPRODUCT](state, representProduct) {
		state.representProduct = representProduct.items;
	},
	//修改用户实名认证的数据
	[UPDATEISAUTHIDENTITY](state, stateValue) {
		state.isAuthIdentify = stateValue;
	}
}