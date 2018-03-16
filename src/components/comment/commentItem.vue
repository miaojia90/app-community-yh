<template>
    <section class="comment-item-section">
        <div class="item-content-box" v-for="(item,index) in articleComment" v-if="articleComment && articleComment.length>0">
            <div class="item-box">
                <div class="head">
                    <div class="left" :class="[item.isAuth==1?'isAuth':'']" @click="jumpToViewFun(item.uid)">
                        <img :src="item.avatar" v-if="!!item.avatar" />
                        <img src="../../assets/images/avatar_default.png" v-if="!!!item.avatar" />
                    </div>
                    <div class="center">
                        <div class="phone"><span class="phone-name">{{item.phone}}</span><span class="user-mark" v-if="!!item.userTag">{{item.userTag}}</span></div>
                        <p class="date">{{item.createdAt}}</p>
                    </div>
                    <div class="right" v-if="isInnerApp">
                        <div class="comment" @click="publishCommentFun(item.id,item.phone)">
                        </div>
                        <div class="like" v-bind:class="[item.liked==1 ? 'active' : '']" @click="giveThumbsUp($event,item.id,item.liked)">
                            <span class="like-count">{{item.likes}}</span>
                        </div>
                    </div>
                    <a :href="linkedUrl" v-if="!isInnerApp" class="linkedme">
                        <div class="right">
                            <div class="comment">
                            </div>
                            <div class="like" v-bind:class="[item.liked==1 ? 'active' : '']">
                                <span class="like-count">{{item.likes}}</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="content" v-html="item.content" @click="publishCommentFun(item.id,item.phone)">
                </div>
                <div class="content replyContent" v-if="!!item.replyCommentContent" @click="publishCommentFun(item.id,item.phone)">
                    {{item.replyCommentPhone}}:<span v-html="item.replyCommentContent"></span>
                </div>
                <div class="delete-container">
                    <div class="delete-operate" v-if="isInnerApp && uid == item.uid" @click="deleteCommentFun(item.id)"><span>删除</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="open-app-area" v-if="!isInnerApp && articleDetail.commentNum>3">
            <a :href="linkedUrl" class="linkedme">打开APP,查看更多评论</a>
        </div>
        <!-- 没有评论的区域 -->
        <div class="no-comment-item" v-if="articleDetail.commentNum==0">
            <div v-if="isInnerApp" @click="publishCommentFun()">
                <img src="../../assets/images/rob_sofa.png" />
                <p>评论为空，抢个沙发</p>
            </div>
            <div v-if="!isInnerApp">
                <a :href="linkedUrl" class="linkedme">
                <img src="../../assets/images/rob_sofa.png" />
                </a>
                <p>评论为空，抢个沙发</p>
            </div>
        </div>
        <modalDialog :modalDialogInfo="modalDialogInfo" v-if="modalDialogFlag" @eventIsDelete="eventIsDelete"></modalDialog>
        <toast :toastInfo="toastInfo" v-if="toastFlag"></toast>
    </section>
</template>
<script>
import {
    linkedmeKey
} from '../../utils/env.js';
import { mapState, mapActions } from 'vuex';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment, jumpToView, commentByCommunity } from '../../utils/mUtils';
import toast from '../common/toast';
import modalDialog from '../common/modalDialog';
export default {
    data() {
        return {
            isInnerApp: isInnerApp(), //防止重复获取
            linkedUrl: null,
            toastInfo: '',
            toastFlag: false,
            obj: null,
            tempItemId: null,
            deleteItemId: null,
            sessionUid: getStore("sessionUid"),
            modalDialogFlag: false,
            modalDialogInfo: '删除评论？'
        }
    },
    props: ['articleComment', 'articleDetail', 'uid', 'type'],
    methods: {
        giveThumbsUp(event, id, liked) {
            var obj = event.currentTarget;
            if (liked == 1 || obj.className == "like active") {
                return;
            }
            this.obj = obj;
            console.log("点赞", obj);
            //点赞
            var that = this;
            this.tempItemId = id;
            //判断是否在APP中还是在H5页面
            if (this.isInnerApp) {
                //在APP中
                //进入到社区的评论
                checkUserSession(function() {
                    that.callThumbsUpInterface(id);
                });
            }
        },
        deleteCommentFun(commentId) {
            //删除评论
            this.deleteItemId = commentId;
            this.modalDialogFlag = true;
            this.modalDialogInfo = '删除评论？';
        },
        eventIsDelete(...data) {
            if (data[0].type == "1") {
                this.deleteComment(this.deleteItemId);
            } else {
                this.modalDialogFlag = false;
            }
        },
        deleteComment(commentId) {
            var that = this;
            checkUserSession(function() {
                let args = {
                    "uid": getStore("sessionUid"),
                    "sid": getStore("sessionSid"),
                    "commentId": commentId,
                    "type": 'community'
                };
                that.deleteCommentDelte(args);
            });
        },
        jumpToViewFun(uid) {
            if (!uid) {
                return;
            }
            if (!this.isInnerApp) {
                // 跳转到站外个人主页
                var urlPath = '/vueApp/community/userCenter/' + uid;
                // this.$router.push({ path: urlPath });
                window.location.replace(document.location.origin + urlPath);
            } else {
                //跳转到主页
                let viewId = '32',
                    closeWebView = '0',
                    viewProperty = { "uid": uid };
                jumpToView(viewId, closeWebView, viewProperty);
            }
        },
        //发布评论
        publishCommentFun(CommentId, userName) {
            // let code = "",
            //     type = "",
            //     replyCommentId = "",
            //     placeholder = "回复@" + userName + "";
            // code = this.articleDetail.id;
            // type = "community";
            // replyCommentId = CommentId;
            // var that = this;
            // publishComment(code, type, replyCommentId, placeholder, function() {
            //     that.publishCommentCallBack();
            // });
            if (!this.isInnerApp) {
                return false;
            }
            let articleId = this.articleDetail.id,
                replyCommentId = CommentId,
                placeholder = "回复@" + userName + "";
            if (!userName) {
                replyCommentId = "";
                placeholder = "这一刻的想法...";
            }
            var that = this;
            commentByCommunity(articleId, replyCommentId, placeholder, function() {
                that.publishCommentCallBack('');
            });
        },
        publishCommentCallBack() {
            var dataCallBack = {
                state: 'success',
                returnUrl: ''
            };
            this.$emit('eventCommentCallBack', dataCallBack);
        },
        //调用点赞的接口
        async callThumbsUpInterface(id) {
            let sid = getStore("sessionSid");
            let uid = getStore("sessionUid");
            let commentId = id;
            let args = { "commentId": commentId, "uid": uid, "sid": sid };
            await this.commentThumbsUpFun(args);
        },
        likeCallBack(obj) {
            if (obj.children[0].innerText.indexOf('万') > -1) {

            } else {
                obj.children[0].innerText = parseInt(obj.children[0].innerText) + 1;
            }
            obj.classList.add('active');
        },
        //linkedMe
        linkedMeFun(responseUrl) {
            this.linkedUrl = responseUrl;
        },
        ...mapActions([
            'commentThumbsUpFun',
            'deleteCommentDelte'
        ])
    },
    components: { toast, modalDialog },
    mounted: function() {
        //linkedme
        linkedmeFun(this.linkedMeFun);
    },
    computed: {
        ...mapState([
            'commentLikeInfo',
            'commentDeleteInfo'
        ])
    },
    watch: {
        commentLikeInfo: function(value) {
            console.log("点赞返回的值", value);
            if (value.error) {
                //错误信息
                this.toastInfo = value.error.message;
            } else {
                //判断成功的标志
                if (value > 0) {
                    this.toastInfo = "点赞成功！";
                    //更新数据 遍历数组找到item ID =xxx的对象，修改数据值
                    console.log(this.articleComment);
                    for (let i = 0; i < this.articleComment.length; i++) {
                        if (this.articleComment[i].id == this.tempItemId) {
                            this.articleComment[i].liked = 1;
                            if (this.articleComment[i].likes.indexOf('万') > -1) {} else {
                                this.articleComment[i].likes = parseInt(this.articleComment[i].likes) + 1;
                            }
                            break;
                        }
                    }
                }
            }
            this.toastFlag = true;
            var that = this;
            setTimeout(function() {
                that.toastFlag = false;
                that.toastInfo = "";
            }, 3000)
        },
        linkedUrl: function(value) {
            this.linkedUrl = value;
        },
        commentDeleteInfo: function(value) {
            //查看是否删除成功
            var that = this;
            if (value.deleteStatus && value.deleteStatus == 1) {
                this.toastInfo = '删除成功';
                this.modalDialogFlag = false;
                //遍历数组删除掉数据
            } else {
                this.toastInfo = '删除失败';
                // 关闭弹出弹出层 
                this.modalDialogFlag = false;
            }
            this.toastFlag = true;
            setTimeout(function() {
                that.toastFlag = false;
                let indexSplice = -1;
                for (var i = 0; i < that.articleComment.length; i++) {
                    if (that.articleComment[i].id == that.deleteItemId) {
                        indexSplice = i;
                    }
                }
                // that.articleComment.splice(that.articleComment.findIndex(item => item.id === that.deleteItemId), 1);
                if (indexSplice != -1) {
                    that.articleComment.splice(indexSplice, 1);
                }
                that.deleteItemId = null;
                that.$emit('eventCommentDelete');
            }, 2000);
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.comment-item-section {
    padding: rem(15);
    background-color: #FFF;
    .item-content-box {
        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: #E6E9EB;
            transform: scaleY(0.5);
        }
        &:last-child {
            &:after {
                height: 0px;
            }
        }
    }
    .delete-container {
        overflow: hidden;
        padding: rem(5) 0;
    }
    .delete-operate {
        float: right;
        overflow: hidden;
        font-size: rem(14);
        color: #B4B9C3;
        height: rem(24);
        line-height: rem(24);
        span {
            display: inline-block;
            vertical-align: middle;
        }
        &:before {
            content: '';
            width: rem(14);
            height: rem(14);
            display: inline-block;
            margin-right: rem(3);
            vertical-align: middle;
            background: url(../../assets/images/delete.png) no-repeat center top;
            background-size: 100% 100%;
        }
    }
    .item-box {
        padding: rem(15) 0;
        .head {
            display: flex;
            align-items: center;
            .left {
                position: relative;
                width: rem(35);
                height: rem(35);
                margin-right: rem(10);
                img {
                    width: rem(35);
                    height: rem(35);
                    border-radius: 50%;
                }
                &.isAuth {
                    &:after {
                        content: '';
                        width: rem(10);
                        height: rem(10);
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        background: url(../../assets/images/v_big_normal.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
            }
            .center {
                flex: 1;
                font-size: rem(17);
                .phone {
                    font-size: rem(17);
                    color: #555A73;
                    height: rem(22); // line-height: rem(22);
                    max-width: rem(200);
                    width: 100%;
                    .phone-name {
                        float: left;
                        max-width: rem(120);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .user-mark {
                        float: left;
                        overflow: hidden;
                        font-size: rem(12);
                        color: #d2b978;
                        margin-left: rem(10);
                        padding: 0 rem(6);
                        border: 1px solid #d2b978;
                        border-radius: rem(12);
                    }
                }
                .date {
                    float: left;
                    width: 100%;
                    color: #ADB0BC;
                    font-size: rem(12);
                    height: rem(18);
                    line-height: rem(18);
                }
            }
            .right {
                width: rem(100);
                display: flex;
                .comment {
                    flex: 1;
                    &:after {
                        content: '';
                        display: block;
                        width: rem(20);
                        height: rem(20);
                        margin: 0 auto;
                        background: url(../../assets/images/answer.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
                .like {
                    flex: 1;
                    &:before {
                        margin: 0 auto;
                        content: '';
                        display: block;
                        width: rem(20);
                        height: rem(20);
                        background: url(../../assets/images/likes_nor.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                    .like-count {
                        display: block;
                        text-align: center;
                        line-height: rem(20);
                        font-size: rem(12);
                        color: #ADB0BC;
                    }
                    &.active {
                        &:before {
                            animation: comment-scale 1s ease-in-out 1;
                            -webkit-animation: comment-scale 1s ease-in-out 1;
                            background: url(../../assets/images/likes.png) no-repeat center top;
                            background-size: 100% 100%;
                        }
                        .like-count {
                            color: #D2B978;
                        }
                    }
                }
            }
        }
        .content {
            color: #0A1437;
            font-size: rem(16);
            line-height: rem(24);
            margin-left: rem(45);
            margin-top: rem(10);
            word-wrap: break-word;
            &.replyContent {
                color: #555a73;
                background-color: #f4f5f7;
                padding: rem(10);
                border-radius: rem(10);
                word-wrap: break-word;
            }
        }
    }
    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #E6E9EB;
        transform: scaleY(0.5);
    }
    &:last-child {
        &:after {
            height: 0px;
        }
    }
    .no-comment-item {
        background-color: #FFF;
        padding: rem(30) 0;
        font-size: rem(14);
        img {
            width: rem(100);
            height: rem(100);
            margin: 0 auto;
        }
        p {
            text-align: center;
            color: #82879B;
            height: rem(30);
            line-height: rem(30);
            font-size: rem(16);
        }
    }
}

.open-app-area {
    width: 100%;
    height: rem(40);
    line-height: rem(40);
    color: #d2b978;
    font-size: rem(16);
    text-align: center;
    background-color: #FFF;
    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #d2b978;
    }
}

@keyframes comment-scale {
    50% {
        transform: scale(1.1);
    }
}

@-webkit-keyframes comment-scale {
    50% {
        -webkit-transform: scale(1.1);
    }
}
</style>