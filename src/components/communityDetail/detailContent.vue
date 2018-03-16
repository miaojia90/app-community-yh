<template>
    <section class="detail-content-section" id="detail-content-section-id">
        <div class="title">
            <span class="mark spe" v-if="articleDetail.articleTag">{{articleDetail.articleTag}}</span><span class="mark top" v-if="articleDetail.isTop==1">置顶</span><span class="title-span">{{articleDetail.title}}</span>
        </div>
        <div class="detail-content-box" v-if="articleDetail.type != 4">
            <div class="content-box" v-html="articleDetail.content"></div>
            <img :src="articleDetail.imgUrl" v-if="articleDetail.imgUrl" />
            <div class="transmit-box" @click="enterTransmitPage(articleDetail.from.id,articleDetail.from.isDelete)" v-if="(articleDetail.from && articleDetail.from.content && articleDetail.from.content.length>0)">
                <p class="transform-userName" v-if="articleDetail.from.nickname">
                    {{articleDetail.from.nickname}}：
                </p>
                <p class="transform-title" v-if="articleDetail.from.title">
                    {{articleDetail.from.title}}
                </p>
                <div class="transform-content three-line-break" v-html="articleDetail.from.content">
                </div>
            </div>
        </div>
        <div class="red-packet-box" v-if="articleDetail.type == 4" :class="[articleDetail.redPacket.status!=1?'already':(articleDetail.redPacket.received==1?'already':'')]" @click="dismantlingRedEnvelopesFun(articleDetail.redPacket.id,articleDetail.uid,articleDetail.isFocus)">
            <a id="appDownload"  ref="appDownloadDetail" :class="[!isInnerAppFlag?'linkedme':'']">
                <div class="content-box" v-html="articleDetail.content">
                </div>
                <div class="packet-box">
                    <div class="left">
                    </div>
                    <div class="right">
                        <p class="packet-title" v-html="articleDetail.redPacket.title"></p>
                        <p class="packet-desc" v-text="articleDetail.redPacket.received==1?'该红包已领取':(articleDetail.redPacket.status==1?'领取红包':(articleDetail.redPacket.status==2?'该红包已被领完':'该红包已过期'))"></p>
                    </div>
                </div>
            </a>
        </div>
        <toast :toastInfo="toastInfo" v-if="toastFlag"></toast>
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { isInnerApp, linkedmeFun, getVersion, dismantlingRedEnvelopes, checkUserSession, getStore, imageShrink } from '../../utils/mUtils';
import toast from '../common/toast';
export default {
    data() {
        return {
            flag: false,
            versionNum: getVersion(),
            toastInfo: '',
            toastFlag: false,
            isInnerAppFlag:isInnerApp()
        }
    },
    components: { toast },
    computed: {
        ...mapState([
            'articleDetail',
            'followCallBackInfo'
        ])
    },
    mounted: function() {
        this.showZoomImg();
        let that= this;
        if (!isInnerApp()) {
            //在APP中
            linkedmeFun(function(url) {
                if(that.articleDetail.type==4){
                   that.$refs.appDownloadDetail.href=url;
                }
            });
        }
    },
    methods: {
        enterTransmitPage(id, isDelete) {
            if (isDelete == 1) {
                return;
            }
            var urlPath = '/vueApp/community/communityDetail/' + id;
            window.location.href = document.location.origin + urlPath;
        },
        dismantlingRedEnvelopesFun(id, authorUid, isFocus) {
            var that = this;
            if (isInnerApp()) {
                if (getVersion() < 430) {
                    //提示
                    this.toastFlag = true;
                    this.toastInfo = "请升级到最新版本领取红包！";
                    setTimeout(function() {
                        that.toastFlag = false;
                        that.toastInfo = "";
                    }, 5000);
                    return;
                }
                //在APP中
                dismantlingRedEnvelopes(id, function(res) {
                    //修改页面的状态 TODO
                    if (res) {
                        var isReceived = res.isReceived;
                        var stateValue = res.state;
                        that.articleDetail.redPacket.received = res.isReceived ? 1 : 0;
                        that.articleDetail.redPacket.status = res.state;
                        if (res.isReceived) {
                            //关注用户 
                            if (isFocus == 1 || isFocus == "1") {
                                return false;
                            }
                            checkUserSession(function() {
                                let args = {
                                    "uid": getStore("sessionUid"),
                                    "sid": getStore("sessionSid"),
                                    "targetUid": that.articleDetail.uid,
                                    "focusType": 1,
                                    "followType": 0
                                };
                                that.followOperateFun(args);
                            });
                        }
                    }
                });
            }
        },
        showZoomImg() {
            var parent = document.getElementById('detail-content-section-id');
            parent.addEventListener('click', function(e) {
                var el = e.target;
                while (el.tagName !== 'IMG') {
                    if (el === parent) {
                        el = null
                        break
                    }
                    el = el.parentNode;
                }
                if (el) {
                    let imgSrc = el.src;
                    //调用后台jock
                    if (imgSrc) {
                        imageShrink(imgSrc);
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
            })
        },
        ...mapActions([
            'dynamicUpdateDetail',
            'followOperateFun'
        ])
    },
    watch: {
        followCallBackInfo(value) {
            if (value && value.followType == 1) {
                return;
            }
            if (value && value.json.focusStatus == 1) {
                this.articleDetail.isFocus = 1;
            } else if (value && value.json.focusStatus == 0) {
                this.articleDetail.isFocus = 0;
            } else {
                return;
            }
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.detail-content-section {
    color: #3C415F;
    font-size: rem(18);
    padding: 0 rem(15) rem(15) rem(15);
    min-height: rem(100);
    background-color: #FFF;
    .title {
        font-size: rem(25);
        color: #3C415F;
        word-wrap: break-word;
        padding: rem(10) 0;
        .title-span {
            /*margin-left: rem(10);*/
            vertical-align: middle;
        }
        .mark {
            display: inline-block;
            font-size: rem(12);
            padding: rem(2) rem(5);
            vertical-align: middle;
            margin-right: rem(8);
            &.top {
                color: #F74C31;
                border: 1px solid #F74C31;
            }
            &.spe {
                color: #C4950F;
                border: 1px solid #C4950F;
            }
        }
    }
    .content-box {
        line-height: rem(30);
        word-wrap: break-word;
    }
    &:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #E6E9EB;
        transform: scaleY(0.5);
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
</style>