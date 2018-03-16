<template>
    <div class="communityDetail-box">
        <div class="communityList">
            <!-- 文章存在 -->
            <div class="article-exist" v-if="!(articleDetailError && articleDetailError.error)">
                <div v-if="articleDetail.id">
                    <div class="communityHead">
                        <DetailTitle :articleDetail="articleDetail" :uid="uid" @eventModalDialog="eventModalDialog" @eventFollowCallBack="eventFollowCallBack" :linkedUrl="linkedUrl"></DetailTitle>
                    </div>
                    <div class="community-detail-content">
                        <DetailContent :articleDetail="articleDetail">
                        </DetailContent>
                    </div>
                    <ProductList></ProductList>
                    <!-- 热门评论 -->
                    <div class="community-item-list" id="communityCommentID" v-show="hotArticleCommentObject && hotArticleCommentObject.length>0">
                        <ListTitle :listTitle="'热门评论'" :type="hot"></ListTitle>
                        <div class="comment-list-box">
                            <CommentItem :uid="uid" :articleComment="hotArticleCommentObject" :articleDetail="articleDetail" @eventCommentCallBack="eventCallBack" @eventCommentDelete="eventCommentDelete" :type="'hot'"></CommentItem>
                        </div>
                    </div>
                    <!-- 最新评论 -->
                    <div class="community-item-list" id="communityCommentID" v-show="!!isCheckApp || (!isCheckApp && !(hotArticleCommentObject && hotArticleCommentObject.length>0))">
                        <ListTitle :listTitle="'最新评论'" :type="titleType" :articleDetail="articleDetail" v-if="articleDetail"></ListTitle>
                        <div class="comment-list-box" v-load-more="loaderMore">
                            <CommentItem :uid="uid" :articleComment="articleCommentObject" :articleDetail="articleDetail" @eventCommentCallBack="eventCallBack" @eventCommentDelete="eventCommentDelete" :type="'new'"></CommentItem>
                        </div>
                    </div>
                    <transition name="loading">
                        <loading v-show="articleDetail.commentNum!=0  && showLoading && isCheckApp"></loading>
                    </transition>
                    <FooterComm v-show="!isCheckApp || articleDetail.commentNum==0 || !showLoading"></FooterComm>
                    <CommentFooter :articleDetail="articleDetail" @eventCallBack="eventCallBack"></CommentFooter>
                </div>
                <skeleton v-if="!articleDetail.id"></skeleton>
            </div>
            <!-- 文章不存在 -->
            <div class="article-no-exist" v-if="articleDetailError && articleDetailError.error">
                <img src="../assets/images/notfund_article.png" />
                <p>这个帖子找不到了...</p>
            </div>
            <modalDialog :modalDialogInfo="modalDialogInfo" v-if="modalDialogFlag" :articleDetail="articleDetail" @eventIsDelete="eventIsDelete"></modalDialog>
            <toast :toastInfo="toastInfo" v-if="toastFlag"></toast>
            <!-- 遮罩 -->
            <div class="mark-article-box" v-if="(!isCheckApp && articleDetail.isAuthShow ==1) || (isCheckApp && articleDetail.isAuthShow ==1 && isAuthIdentify != '1')">
                <div class="mark-bg"></div>
                <div class="authentication-box">
                    <p>
                        本文内容仅对合格投资者开放
                    </p>
                    <div class="operate-div">
                        <a @click="gotoUserIdentifyInfoFun" :class="[!isCheckApp?'linkedme':'']" ref="appDownloadDetail">认证可见</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import DetailTitle from 'components/communityDetail/detailTitle';
import DetailContent from 'components/communityDetail/detailContent';
import skeleton from 'components/common/skeleton';
import ListTitle from 'components/communityList/listTitle';
import CommentItem from 'components/comment/commentItem';
import FooterComm from 'components/footer/footer';
import CommentFooter from 'components/comment/commentFooter';
import ProductList from 'components/product/productList';
import { showBack, animate, innerAppShare, getQueryString } from '../utils/mUtils';
import { qqShare } from '../utils/qqShare';
import '../utils/webcount.js';
import { baseUrl } from '../utils/env';
import { loadMore } from 'components/common/mixin';
import loading from 'components/common/loading';
import modalDialog from 'components/common/modalDialog';
import toast from 'components/common/toast';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment, getUserSession, jumpToView, closeWebView, enterDetailPageEvent, statistic, checkUserIdentifyInfo, gotoUserIdentifyInfo, getSessionStore } from '../utils/mUtils';
export default {
    data() {
        return {
            preventRepeat: false, //防止重复获取
            showLoading: false, //显示加载动画
            commentPage: 1, //文章的页码
            commentPageSize: 30, //每页显示的数量          
            titleType: 'comment',
            commentCount: '0',
            articleCommentObject: null,
            hotArticleCommentObject: null,
            isCheckApp: isInnerApp(),
            listTitle: '回复',
            uid: getStore("sessionUid"),
            flag: 0,
            modalDialogFlag: false,
            modalDialogInfo: '是否确认删除？',
            toastInfo: '',
            toastFlag: false,
            linkedUrl: null,
            articleId: getQueryString("articleId"),
            managementUid: null,
            timeStamp: 0
        }
    },
    mixins: [loadMore],
    computed: {
        ...mapState([
            'articleDetail',
            'articleComment',
            'commentPageInfo',
            'articleDetailError',
            'articleDeleteInfo',
            'hotArticleComment',
            'financialAdvisorInfo',
            'isAuthIdentify'
        ])
    },
    methods: {
        initData(articleId) {
            this.timeStamp = (new Date()).valueOf();
            this.uid = getStore("sessionUid");
            let articleArgs = {
                "articleId": articleId,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            }
            this.getArticleDetail(articleArgs);
            var temPageSize = 30;
            if (isInnerApp()) {
                temPageSize = 30;
            } else {
                temPageSize = 3;
            }
            let args = {
                "articleId": articleId,
                "page": 1,
                "pageSize": temPageSize,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            };
            this.getArticleComment(args);

            //获取热门评论的接口数据 
            let argsHot = {
                "articleId": articleId,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            };
            this.getHotArticleComment(args);
            //分享 站内分享 站外分享
            // this.showRightShareButton();
            if (isInnerApp()) {
                //友盟统计
                statistic('COMMUNITY_article');
            }
            //检查认证
        },
        //加载更多
        async loaderMore() {
            let that = this;
            if (!isInnerApp()) {
                return;
            }
            if (this.preventRepeat) {
                return
            }
            if (this.commentPageInfo.count == 0) {
                return;
            }
            if (this.commentPageInfo.current == this.commentPageInfo.total) {
                setTimeout(function() {
                    that.preventRepeat = false;
                    that.showLoading = false;
                }, 2000);
                return;
            }
            // console.log("加载更多");
            this.preventRepeat = true;
            this.showLoading = true;
            if (this.commentPageInfo.count < 30) {
                setTimeout(function() {
                    that.preventRepeat = false;
                    that.showLoading = false;
                }, 2000);
                return;
            }
            let args = { "articleId": this.articleId, "page": parseInt(this.commentPageInfo.current) + 1, "pageSize": this.commentPageInfo.size, "uid": getStore("sessionUid"), "sid": getStore("sessionSid") };
            await this.getArticleComment(args);
            setTimeout(function() {
                that.preventRepeat = false;
            }, 2000);
        },
        showRightShareButton() {
            let url = window.location.href,
                viewTitle = "",
                alwayShow = 0,
                shareID = "1",
                imageUrl = "http://oss-cn-hangzhou.aliyuncs.com/jfzapp-static2/ad/fceacff8cb99a84461acb09440d2a3ed.png",
                afterClickBottonCallback = function() {};
            let content = "在这里，和私募大咖聊投资。分享自@金斧子私募社区平台";
            let tempTitle = '分享 ' + this.articleDetail.nickname + ' 的金斧子内容';
            let shareTitle = this.articleDetail.title ? this.articleDetail.title : tempTitle;
            let articleType = this.articleDetail.type;
            if (articleType == 4) {
                shareTitle = "【" + this.articleDetail.nickname + "】在金斧子发了现金红包 无门槛领取";
            }
            innerAppShare(viewTitle, shareTitle, content, url, imageUrl, shareID, alwayShow, afterClickBottonCallback);
            let wxshareparamsUrl = baseUrl + "/weixin/other/wxshareparams?url=" + encodeURIComponent(window.location.href.split("#")[0]);
            qqShare(shareTitle, url, imageUrl, content, wxshareparamsUrl);
        },
        eventCallBack(...data) {
            if (data[0].state == "success") {
                if (data[0].returnUrl && data[0].returnUrl.length > 0) {
                    window.location.href = data[0].returnUrl;
                    return;
                }
                this.preventRepeat = false; //防止重复获取
                this.showLoading = false; //显示加载动画
                this.initData(this.articleId);
                window.scrollTo(0, document.getElementById("communityCommentID").offsetTop);
            }
        },
        eventModalDialog(...data) {
            this.modalDialogFlag = true;
            this.modalDialogInfo = '是否确认删除？';
        },
        eventFollowCallBack(...data) {
            this.toastFlag = true;
            this.toastInfo = data[0].message;
            var that = this;
            let articleArgs = {
                "articleId": this.articleId,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            }
            this.getArticleDetail(articleArgs);
            setTimeout(function() {
                that.toastFlag = false;
            }, 3000);
        },
        eventIsDelete(...data) {
            if (data[0].type == "1") {
                this.deleteArticle();
            } else {
                this.modalDialogFlag = false;
            }
        },
        eventCommentDelete() {
            this.uid = getStore("sessionUid");
            let articleArgs = {
                "articleId": this.articleId,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            }
            this.getArticleDetail(articleArgs);
        },
        deleteArticle() {
            var that = this;
            checkUserSession(function() {
                let args = {
                    "uid": getStore("sessionUid"),
                    "sid": getStore("sessionSid"),
                    "articleId": that.articleDetail.id
                };
                that.deleteArticleFun(args);
            });
        },
        //认证
        authenticationFun() {
            //判断是站内还是站外
            var that=this;
            checkUserIdentifyInfo(function(isAuthIdentifyValue){
                let args = {
                    "stateValue": isAuthIdentifyValue
                };
                that.updateIsAuthIdentify(args);
            });
        },
        gotoUserIdentifyInfoFun() {
            var that = this;
            if (/JFZFortune/i.test(navigator.userAgent)) {
                gotoUserIdentifyInfo(function() {
                    if (/JFZFortune/i.test(navigator.userAgent)) {
                        that.authenticationFun();
                    }
                });
            } else {
                //linkme
            }

        },
        //linkedMe
        linkedMeFun(responseUrl) {
            this.linkedUrl = responseUrl;
        },
        ...mapActions([
            'getArticleDetail',
            'getArticleComment',
            'deleteArticleFun',
            'getHotArticleComment',
            'getFinancialAdvisorInfo',
            'getApiRequestTimeStamp',
            'updateIsAuthIdentify'
        ])
    },
    created() {
        this.articleId = getQueryString("articleId");
        this.articlePage = 1;
        this.articlePageSize = 30;
        //linkedme
        linkedmeFun(this.linkedMeFun);
        if (/JFZFortune/i.test(navigator.userAgent)) {
            this.authenticationFun();
        }
        var that = this;
        if (isInnerApp()) {
            getUserSession(function() {
                if (!that.articleComment || that.articleComment.length <= 0) {
                    that.initData(that.articleId);
                } else {
                    that.articleCommentObject = that.articleComment;
                }

            });
        } else {
            if (!that.articleComment || that.articleComment.length <= 0) {
                this.initData(this.articleId);
            } else {
                that.articleCommentObject = that.articleComment;
            }

        }
    },
    mounted() {
        document.title = '金斧子社区';
        //查看是否存在有理财师ID
        this.managementUid = getQueryString("_uid");
        //如果站外获取理财师的信息
        if (!isInnerApp()) {
            if (this.managementUid && this.managementUid.length > 0) {
                let args = {
                    "useDecrypt": 1,
                    "uid": this.managementUid,
                };
                this.getFinancialAdvisorInfo(args);
            }
        }
    },
    watch: {
        articleComment: function(value) {
            if (!value) {
                return;
            }
            this.articleCommentObject = value;
            //发送请求计算接口响应时间 TODO
            var endTimeStamp = (new Date()).valueOf();
            let args = {
                "articleId": this.articleId,
                "uid": getStore("sessionUid"),
                "api": '/fortune/community/article-detail',
                "time": endTimeStamp - this.timeStamp
            };
            this.getApiRequestTimeStamp(args);
        },
        hotArticleComment(value) {
            if (!value) {
                return;
            }
            this.hotArticleCommentObject = value;
        },
        commentPageInfo(value) {
            if (!value) {
                return;
            }
            if (this.commentPageInfo.count > 30) {
                this.showLoading = true;
            }
        },
        articleDetail: function(value) {
            if (!value) {
                return;
            }
            this.commentCount = value.commentNum;
            if (this.flag == 0) {
                //站内分享
                this.showRightShareButton();
                this.flag++;
            }
            let that = this;
            if (!isInnerApp()) {
                //在APP中
                linkedmeFun(function(url) {
                    that.$refs.appDownloadDetail.href = url;
                });
            }
        },
        articleDeleteInfo: function(value) {
            //查看是否删除成功
            if (value.deleteStatus && value.deleteStatus == 1) {
                this.toastInfo = '删除成功';
                this.modalDialogFlag = false;
            } else {
                this.toastInfo = '删除失败';
                // 关闭弹出弹出层 
                this.modalDialogFlag = false;
            }
            this.toastFlag = true;
            var that = this;
            setTimeout(function() {
                that.toastFlag = false;
                if (value.deleteStatus && value.deleteStatus == 1) {
                    setTimeout(function() {
                        closeWebView();
                    }, 1000);
                }
            }, 3000);
        },
        uid: function(value) {
            if (!value) {
                return;
            }
            this.uid = value;
        },
        linkedUrl: function(value) {
            this.linkedUrl = value;
        }
    },
    components: { DetailTitle, DetailContent, ListTitle, CommentItem, CommentFooter, FooterComm, loading, modalDialog, toast, skeleton, ProductList }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.community-item-list {
    margin-top: rem(10);
}

.article-no-exist {
    img {
        width: rem(110);
        height: rem(110);
        margin: rem(100) auto 0 auto;
    }
    p {
        height: rem(50);
        line-height: rem(50);
        text-align: center;
        color: #82879B;
        font-size: rem(16);
    }
}

.mark-article-box {
    .mark-bg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9900;
    }
    .authentication-box {
        border-radius: rem(10);
        background: #FFF;
        width: rem(270);
        height: rem(111);
        position: fixed;
        z-index: 9999;
        top: 50%;
        left: 50%;
        margin-top: rem(-60);
        margin-left: rem(-135);
        p {
            color: #555A73;
            font-size: rem(17);
            line-height: rem(60);
            text-align: center;
        }
        .operate-div {
            text-align: center;
            font-size: rem(17);
            a:link,
            a:visited,
            a:hover,
            a:active {
                color: #B4923B;
            }
            color: #B4923B;
            line-height: rem(50);
            border-top: 1px solid #B4B9C3;
            cursor: pointer;
        }
    }
}
</style>