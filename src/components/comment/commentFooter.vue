<template>
    <section class="comment-footer-section">
        <div class="footer-operate-box" v-if="isInnerApp">
            <div class="content">
                <div class="transmit" @click="forwardFun" v-if="versionNum>=410">
                    <div class="box">
                        <span class="transmit-icon"></span>
                    </div>
                </div>
                <div class="left" @click="publishCommentFun">
                    <div class="box">
                        <span class="comment-icon"></span>
                    </div>
                    <span>({{articleDetail.commentNum}})</span>
                </div>
                <div class="right" @click="giveThumbsUp(articleDetail.liked)" v-bind:class="thumbsUpActive">
                    <div class="box">
                        <span class="likes-icon"></span>
                    </div>
                    <span>({{articleDetail.likes}})</span>
                </div>
            </div>
        </div>
        <div class="footer-operate-box img-bottom" v-if="!isInnerApp && !managementUid">
            <a :href="linkedUrl" class="linkedme">
               <img src="../../assets/images/footerBanner.png" class="footer-banner" />
            </a>
        </div>
        <!-- 理财师底部 -->
        <financialAdvisorFooter v-if="!isInnerApp && managementUid"></financialAdvisorFooter>
        <toast :toastInfo="toastInfo" v-if="toastFlag"></toast>
    </section>
</template>
<script>
import {
    linkedmeKey
} from '../../utils/env.js';
import { mapState, mapActions } from 'vuex';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment, commentByCommunity, forwardByCommunity ,getVersion,getQueryString} from '../../utils/mUtils';
import toast from '../common/toast';
import financialAdvisorFooter from '../footer/financialAdvisorFooter';
export default {
    data() {
        return {
            isInnerApp: isInnerApp(), //防止重复获取
            linkedUrl: null,
            toastInfo: '',
            toastFlag: false,
            thumbsUpActive: '',
            versionNum:getVersion(),
            managementUid:null
        }
    },
    props: ['articleDetail'],
    computed: {
        ...mapState([
            'likeInfo',
            'financialAdvisorInfo'
        ])
    },
    components: { toast,financialAdvisorFooter },
    methods: {
        giveThumbsUp(liked) {
            if (liked == 1) {
                return;
            }
            if(!this.articleDetail || !this.articleDetail.id){
               return;
            }
            //点赞
            var that = this;
            //判断是否在APP中还是在H5页面
            if (this.isInnerApp) {
                //在APP中
                //进入到社区的评论
                checkUserSession(function() {
                    console.log("回调函数");
                    that.callThumbsUpInterface();
                });
            }
        },
        //发布评论
        publishCommentFun() {
            if(!this.articleDetail || !this.articleDetail.id){
               return;
            }
            let articleId = this.articleDetail.id,
                replyCommentId = "",
                placeholder = "这一刻的想法...";
            var that = this;
            commentByCommunity(articleId, replyCommentId, placeholder, function() {
                that.publishCommentCallBack('');
            });
        },
        //短文
        forwardFun() {
            if(!this.articleDetail || !this.articleDetail.id){
               return;
            }
            let articleId = this.articleDetail.id,
                placeholder = "小观点也有大见地";
            var that = this;
            forwardByCommunity(articleId, placeholder, function(data) {
                // if(data){
                //    that.publishCommentCallBack(data);
                // }
                that.publishCommentCallBack('');
            });
        },
        publishCommentCallBack(returnUrl) {
            var dataCallBack = {
                state: 'success',
                returnUrl: returnUrl
            };
            //回复评论的回调函数
            this.$emit('eventCallBack', dataCallBack);
        },
        //调用点赞的接口
        async callThumbsUpInterface() {
            let sid = getStore("sessionSid");
            let uid = getStore("sessionUid");
            let articleId = this.articleDetail.id;
            let args = { "articleId": articleId, "uid": uid, "sid": sid };
            await this.thumbsUpFun(args);
        },
        //linkedMe
        linkedMeFun(responseUrl) {
            this.linkedUrl = responseUrl;
        },
        ...mapActions([
            'thumbsUpFun'
        ])
    },
    mounted: function() {
        this.managementUid=getQueryString("_uid");
        if (this.articleDetail.liked == 1) {
            this.thumbsUpActive = "active";
        }
        //linkedme
        linkedmeFun(this.linkedMeFun);
    },
    watch: {
        likeInfo: function(value) {
            if (value.error) {
                //错误信息
                this.toastInfo = value.error.message;
            } else {
                //判断成功的标志
                if (value == 1) {
                    this.toastInfo = "点赞成功！";
                    this.thumbsUpActive = 'active';
                    let dataCallBack = {
                        state: 'success'
                    };
                    this.$emit('eventCallBack', dataCallBack);
                }
            }
            this.toastFlag = true;
            var that = this;
            setTimeout(function() {
                that.toastFlag = false;
                that.toastInfo = "";
            }, 3000)
        },
        articleDetail(value) {
            if (!value) {
                return;
            }
            if (value.liked == 1) {
                this.thumbsUpActive = "active";
            }
        },
        linkedUrl: function(value) {
            this.linkedUrl = value;
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}
@media (min-width:481px) {
    .comment-footer-section {
        .footer-operate-box{
            margin: 0 auto;
            width: 480px !important;
        }
        img{
             width: 480px !important;
        }
    }
}
.comment-footer-section {
    .footer-operate-box {
        &.img-bottom {
            height: rem(65);
        }
        position: fixed;
        // left:0;
        // right:0;
        bottom: 0;
        height: rem(55);
        min-height: rem(55);
        width: 100%;

        z-index: 9000;
        .content {
            display: flex;
            height: rem(55);
            background-color: #FFF;
            align-items: center;
            justify-content: center;
            .left,
            .right,
            .transmit {
                flex: 1;
                color: #3C415F;
                font-size: rem(17);
                height: rem(30);
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;
            }
            .box {
                display: flex;
                align-items: center;
                justify-content: center;
                width: rem(30);
                height: rem(30);
            }
            .left {
                border-left: 1px solid #F4F5F7;
                border-right: 1px solid #F4F5F7;
                .comment-icon {
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    vertical-align: middle;
                    background: url(../../assets/images/icon_comment.png);
                    background-size: 100% 100%;
                }
            }
            .transmit {
                .transmit-icon {
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    vertical-align: middle;
                    background: url(../../assets/images/icon_transmit.png);
                    background-size: 100% 100%;
                }
            }
            .right {
                &.active {
                    color: #D2B978;
                    .likes-icon {
                        animation: comment-scale 1s ease-in-out 1;
                        -webkit-animation: comment-scale 1s ease-in-out 1;
                        background: url(../../assets/images/likes.png);
                        background-size: 100% 100%;
                    }
                }
                .likes-icon {
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    vertical-align: middle;
                    background: url(../../assets/images/icon_likes.png);
                    background-size: 100% 100%;
                }
            }
        }
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: #E6E9EB;
            transform: scaleY(0.5);
        }
        a:link,
        a:visited,
        a:hover,
        a:active {
            color: #3C415F;
        }
        .footer-banner {
            width: 100%;
            height: rem(65);
        }
    }
}

@keyframes comment-scale {
    50% {
        transform: scale(1.2);
    }
}

@-webkit-keyframes comment-scale {
    50% {
        -webkit-transform: scale(1.2);
    }
}
</style>