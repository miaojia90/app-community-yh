<template>
    <section class="list-item-section">
        <div class="item-box" v-for="(item,index) in itemTopic.items">
            <div @click="enterCommunityDetail(item.id)">
                <div class="head">
                    <div class="user-headImg-div" :class="[item.isAuth==1?'active':'']">
                        <img class="user-headImg" :src="item.avatar" v-if="!!item.avatar" />
                        <img src="../../assets/images/avatar_default.png" v-if="!!!item.avatar" class="user-headImg" />
                    </div>
                    <div class="user-desc">
                        <div class="desc-top">
                            <span class="user-name">{{item.nickname}}</span>
                            <span class="user-mark" v-if="item.userTag">{{item.userTag}}</span>
                        </div>
                        <div class="desc-bottom">
                            <span class="public-date">{{item.publishAt}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-content-box" v-if="item.type != 4">
                <div @click="enterCommunityDetail(item.id)">
                    <div class="content margin-bottom-10 two-line-break" v-if="item.title">
                        <span class="mark top" v-if="item.isTop==1">置顶</span><span class="fontWeight" v-html="item.title"></span>
                    </div>
                    <div class="content three-line-break" v-html="item.abstract">
                    </div>
                </div>
                <div class="content margin-top-10">
                    <div class="transmit-box" v-if="(item.from && item.from.content && item.from.content.length>0)" @click="enterCommunityDetail(item.from.id)">
                        <p class="transform-userName" v-if="item.from.nickname">
                            {{item.from.nickname}}：
                        </p>
                        <p class="transform-title" v-if="item.from.title" v-html="item.from.title">
                        </p>
                        <div class="transform-content three-line-break" v-html="item.from.content">
                        </div>
                    </div>
                </div>
            </div>
            <div class="red-packet-box" v-if="item.type == 4" :class="[item.redPacket.status!=1?'already':'']" @click="enterCommunityDetail(item.id)">
                <div class="content-box three-line-break spe" v-html="item.abstract">
                </div>
                <div class="packet-box">
                    <div class="left">
                    </div>
                    <div class="right">
                        <p class="packet-title" v-html="item.redPacket.title"></p>
                        <p class="packet-desc" v-text="item.redPacket.received==1?'该红包已领取':(item.redPacket.status==1?'领取红包':(item.redPacket.status==2?'该红包已被领完':'该红包已过期'))"></p>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <span class="mark spe" v-if="item.articleTag">{{item.articleTag}}</span>
                <span class="like">{{item.likes}}</span>
                <span class="comment">{{item.commentNum}}</span>
                <span class="look">{{item.pv}}</span>
            </div>
        </div>
        <div v-if="!(itemTopic.items.length>0)" class="no-article">
            <img src="../../assets/images/notfund_article.png" />
            <p>暂无相关帖子</p>
        </div>
        <div class="open-app-area" v-if="itemTopic.page.count>3">
            <a :href="linkedUrl" class="linkedme">打开APP查看更多</a>
        </div>
    </section>
</template>
<script>
import {
    linkedmeKey
} from '../../utils/env.js';
import { mapState, mapActions } from 'vuex';
import { getStore, checkUserSession, isInnerApp, publishComment,jumpToView, linkedmeInnerApp } from '../../utils/mUtils';
export default {
    data() {
        return {
            isInnerApp: isInnerApp(),
            targetUid: null
        }
    },
    computed: {
        ...mapState([
            'sendArticleList',
            'discussArticleList'
        ])
    },
    props: ['listTitle', "itemTopic", "linkedUrl"],
    methods: {
        //选中的社区详情信息
        enterCommunityDetail(id) {
            var urlPath = '/vueApp/community/communityDetail/' + id;
            window.location.replace(document.location.origin + urlPath);
        },
        linkedMeFun(responseUrl) {
            let that = this;
            if (!isInnerApp()) {
                //在APP中
                // if(){
                //     that.$refs.appDownloadRedPacket.href = responseUrl;
                // }
            }

        }
    },
    mounted: function() {
        //linkedme
        this.targetUid = this.$route.params.userUid;
        let viewId = '32',
            viewProperty = { "uid": this.targetUid };
        linkedmeInnerApp(viewId, viewProperty, this.linkedMeFun);
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.open-app-area {
    width: 100%;
    height: rem(40);
    line-height: rem(40);
    color: #d2b978;
    font-size: rem(16);
    text-align: center;
    background-color: #FFF;
    padding-bottom: rem(10);
    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #d2b978;
    }
}

.list-item-section {
    background-color: #FFF;
    .no-article {
        padding: rem(50);
        img {
            width: rem(110);
            height: rem(110);
            margin: 0 auto;
        }
        p {
            color: #82879B;
            font-size: rem(16);
            height: rem(25);
            line-height: rem(25);
            text-align: center;
        }
    }
    .item-box {
        padding: rem(15) rem(15) 0 rem(15);
        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: #E6E9EB;
            transform: scaleY(0.5);
        }
        div {
            overflow: hidden;
        }
        &:last-child {
            &:after {
                height: 0px;
            }
        }
        .head {
            overflow: hidden;
            padding-bottom: rem(10);
            display: flex;
            align-items: center;
            .user-headImg-div {
                float: left;
                position: relative;
                width: rem(35);
                height: rem(35);
                vertical-align: middle;
                img {
                    width: rem(35);
                    height: rem(35);
                    border-radius: 50%;
                }
                &.active {
                    &:after {
                        content: '';
                        width: rem(10);
                        height: rem(10);
                        position: absolute;
                        bottom: rem(0);
                        right: 0;
                        background: url(../../assets/images/v_big_normal.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
            }
            .user-headImg {
                display: block;
                width: rem(35);
                height: rem(35);
            }
            .user-name {
                float: left;
                font-size: rem(16);
                color: #82879B;
                margin-left: rem(10);
                line-height: rem(24);
            }
            .user-mark {
                float: left;
                font-size: rem(12);
                color: #d2b978;
                margin-left: rem(10); // height: rem(20);
                // line-height: rem(20);
                padding: 0 rem(6);
                border: 1px solid #d2b978;
                border-radius: rem(12);
                margin-top: rem(3);
            }
            .public-date {
                float: left;
                font-size: rem(14);
                color: #B4B9C3;
                line-height: rem(24);
                margin-left: rem(10);
            }
        }
        .content {
            font-size: rem(16);
            color: #555A73;
            line-height: rem(25);
            .fontWeight {
                font-weight: 600;
                font-size: rem(18);
            }
            .mark {
                font-size: rem(12);
                padding: 0 rem(5);
                line-height: rem(25);
                margin-right: rem(7);
                &.top {
                    color: #F74C31;
                    border: 1px solid #F74C31;
                }
                &.spe {
                    color: #82879B;
                    border-radius: rem(10);
                    line-height: rem(20);
                    border: 1px solid #82879B;
                }
            }
            .transmit-box {
                background-color: #F4F5F7;
                padding: rem(20) rem(10);
                .transform-userName {
                    color: #555A73;
                    line-height: rem(25);
                    font-size: rem(16);
                    font-weight: 600;
                }
                .transform-title {
                    color: #555A73;
                    font-size: rem(16);
                    padding: rem(8) 0;
                    font-weight: 600;
                }
                .transform-content {
                    font-size: 16px;
                    line-height: rem(23);
                    color: #555A73;
                }
            }
        }
        .margin-bottom-10 {
            margin-bottom: rem(6);
        }
        .margin-top-10 {
            margin-top: rem(10);
        }
        .bottom {
            overflow: hidden;
            padding-top: rem(10);
            padding-bottom: rem(15);
            .mark {
                float: left;
                font-size: rem(12);
                padding: 0 rem(5);
                line-height: rem(22);
                &.top {
                    color: #F74C31;
                    border: 1px solid #F74C31;
                }
                &.spe {
                    color: #82879B;
                    border-radius: rem(12);
                    line-height: rem(20);
                    border: 1px solid #82879B;
                }
            }
            .look {
                font-size: rem(14);
                line-height: rem(22);
                color: #82879B;
                float: right;
                &:before {
                    content: '';
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    background: url(../../assets/images/see.png) no-repeat center top;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-right: rem(5);
                }
            }
            .like {
                font-size: rem(14);
                line-height: rem(22);
                color: #82879B;
                float: right;
                &:before {
                    content: '';
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    background: url(../../assets/images/likes_nor.png) no-repeat center top;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-right: rem(5);
                }
                &.acitve {
                    &:before {
                        background: url(../../assets/images/likes.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
            }
            .comment {
                font-size: rem(14);
                line-height: rem(22);
                color: #82879B;
                float: right;
                margin: 0 rem(20);
                &:before {
                    content: '';
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    background: url(../../assets/images/answer.png) no-repeat center top;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-right: rem(5);
                }
            }
        }
    }
}
</style>