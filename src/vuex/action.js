import fetchJsonp from '../utils/fetchJsonp';

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

export default {
	//获取社区信息
	async getArticleList({
		commit,
		state
	}, {
		blockId,
		page,
		pageSize
	}) {
		let result = fetchJsonp('/fortune/community/article-list', {
			blockId: blockId,
			page: page,
			pageSize: pageSize
		})
		result.then(function(response) {
			return response.json()
		}).then(function(json) {
			if (json.error) {
				return;
			}
			commit(GETARTICLELIST, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		})
	},
	//获取板块详情
	async getBlockDetail({
		commit,
		state
	}, blockId) {
		let result = fetchJsonp('/fortune/community/block-detail', {
			blockId: blockId
		});
		result.then(function(response) {
			return response.json()
		}).then(function(json) {
			let res = JSON.stringify(json);
			if (json.error) {
				return;
			}
			commit(GETBLOCKDETAIL, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//获取板块文章详情
	async getArticleDetail({
		commit,
		state
	}, {
		articleId,
		uid,
		sid
	}) {
		let result = fetchJsonp('/fortune/community/article-detail', {
			articleId: articleId,
			uid: uid,
			sid: sid
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			if (json.error) {
				commit(NOARTICLE, json);
			} else {
				commit(GETARTICLEDETAIL, json);
			}
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//获取文章的评论
	async getArticleComment({
		commit,
		state
	}, {
		articleId,
		page,
		pageSize,
		uid,
		sid
	}) {
		let result = fetchJsonp('/fortune/comment/comment-list', {
			code: articleId,
			type: 'community',
			page: page,
			pageSize: pageSize,
			uid: uid,
			sid: sid,
			orderLike: '0'
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			if (json.error) {
				return;
			}
			commit(GETARTICLCOMMENT, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//触发点赞逻辑
	async thumbsUpFun({
		commit,
		state
	}, {
		uid,
		sid,
		articleId
	}) {
		console.log("点赞开始");
		let result = fetchJsonp('/fortune/community/click-like', {
			uid: uid,
			sid: sid,
			articleId: articleId
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(CLICKLIKECOMMIT, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//触发评论点赞的逻辑
	async commentThumbsUpFun({
		commit,
		state
	}, {
		uid,
		sid,
		commentId
	}) {
		console.log("评论点赞开始");
		let result = fetchJsonp('/fortune/comment/click-like', {
			uid: uid,
			sid: sid,
			commentId: commentId,
			type: 'community'
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(COMMENTCLICKLIKECOMMIT, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//删除文章
	async deleteArticleFun({
		commit,
		state
	}, {
		uid,
		sid,
		articleId
	}) {
		let result = fetchJsonp('/fortune/community/delete-article', {
			uid: uid,
			sid: sid,
			articleId: articleId,
			type: 'community'
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(DELETEARTICLE, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//关注
	async followOperateFun({
		commit,
		state
	}, {
		uid,
		sid,
		targetUid,
		focusType,
		followType
	}) {
		let result = fetchJsonp('/fortune/community/focus', {
			uid: uid,
			sid: sid,
			targetUid: targetUid,
			focusType: focusType
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(USERFOLLOW, {
				"json": json,
				"followType": followType
			});
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//获取用户详情信息
	async getUserDetail({
			commit,
			state
		},
		uid) {
		let result = fetchJsonp('/fortune/community/user-detail', {
			targetId: uid
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(GETUSERDETAIL, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//获取发送帖子列表
	async getSendArticleList({
		commit,
		state
	}, {
		targetUid,
		page,
		pageSize
	}) {
		let result = fetchJsonp('/fortune/community/send-article-list', {
			targetId: targetUid,
			page: page,
			pageSize: pageSize
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(SENDARTICLELIST, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//讨论帖子列表
	async getDiscussArticleList({
		commit,
		state
	}, {
		targetUid,
		page,
		pageSize
	}) {
		let result = fetchJsonp('/fortune/community/discuss-article-list', {
			targetId: targetUid,
			page: page,
			pageSize: pageSize
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(DISCUSSARTICLELIST, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	async deleteCommentDelte({
		commit,
		state
	}, {
		commentId,
		uid,
		sid,
		type
	}) {
		let result = fetchJsonp('/fortune/comment/delete-comment', {
			id: commentId,
			type: type,
			uid: uid,
			sid: sid
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			commit(COMMENTDELETE, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//获取文章的热门评论
	async getHotArticleComment({
		commit,
		state
	}, {
		articleId,
		uid,
		sid
	}) {
		let result = fetchJsonp('/fortune/comment/hot-comment-list', {
			code: articleId,
			type: 'community',
			uid: uid,
			sid: sid
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			if (json.error) {
				return;
			}
			commit(GETHOTARTICLECOMMENT, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//获取理财师信息
	async getFinancialAdvisorInfo({
		commit,
		state
	}, {
		uid,
		useDecrypt
	}) {
		let result = fetchJsonp('/fortune/user/financial-info', {
			uid: uid,
			useDecrypt: useDecrypt
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			if (json.error) {
				return;
			}
			commit(GETFINANCIALADVISORINFO, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//动态跟新store中的state的值
	async dynamicUpdateDetail({
		commit,
		state
	}, {
		stateValue,
		receivedValue
	}) {
		if (stateValue) {
			commit(DYNAMICUPDATEBYDETAIL, stateValue, receivedValue);
		}
	},
	//获取到帖子详情的数据的起始时间
	async getApiRequestTimeStamp({
		commit,
		state
	}, {
		uid,
		articleId,
		api,
		time
	}) {
		let result = fetchJsonp('/common/report/time', {
			uid,
			articleId,
			api,
			time
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			if (json.error) {
				return;
			}
			commit(GETAPIREQUSTTIMESTAMP, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//获取代表产品的数据
	async getRepresentProduct({
		commit,
		state
	}, {
		code,
		page,
		pageSize
	}) {
		let result = fetchJsonp('/fortune/pof/manager-product-list', {
			code: code,
			page: page,
			pageSize: pageSize
		});
		result.then(function(response) {
			return response.json();
		}).then(function(json) {
			let res = JSON.stringify(json);
			if (json.error) {
				return;
			}
			commit(GETREPRESENTPRODUCT, json);
		})['catch'](function(ex) {
			'failed:' + ex;
		});
	},
	//修改state中用户实名认证的信息
	updateIsAuthIdentify({
		commit,
		state
	}, {
		stateValue
	}) {
		if (stateValue) {
			commit(UPDATEISAUTHIDENTITY, stateValue);
		}
	}
}