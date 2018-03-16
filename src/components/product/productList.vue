<template>
    <section class="product-section-container">
        <div class="head-box" @click="jumpToViewFun(articleDetail.uid)" v-if="representProductItems && representProductItems.length>0">
            <p><span>代表产品</span></p>
        </div>
        <div class="product-content-box" v-if="representProductItems && representProductItems.length>0">
            <ul>
                <li v-for="(item,index) in representProductItems" >
                    <div class="content-box" @click="gotoProductPage(item.url)">
                        <p class="product-title" v-text="item.fundName">
                        </p>
                        <div class="list-product-data" v-if="!!(isInnerAppValue && isAuthIdentify =='1')">
                            <div class="left-data">
                                <p class="data">{{item.unitNet}}<span>({{item.updateTime}})</span></p>
                                <p class="desc">单位净值</p>
                            </div>
                            <div class="right-data">
                                <p class="data">{{item.profitRate*100>0?'+':'-'}}{{item.profitRate*100}}<span>%</span></p>
                                <p class="desc">近一年收益</p>
                            </div>
                        </div>
                        <a @click.stop="gotoUserIdentifyInfoFun(item.url)" :class="[!isInnerAppValue?'linkedme':'']" ref="appDownloadDetailProduct">
                            <div class="list-product-data" v-if="!isInnerAppValue || (isInnerAppValue  && isAuthIdentify!='1')">
                                <div class="left-data">
                                    <p class="data">认证可见</p>
                                    <p class="desc">单位净值</p>
                                </div>
                                <div class="right-data">
                                    <p class="data">认证可见</p>
                                    <p class="desc">近一年收益</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { isInnerApp, linkedmeFun, jumpToView, gotoUserIdentifyInfo, getSessionStore,checkUserIdentifyInfo } from '../../utils/mUtils';
export default {
    data() {
        return {
            representProductItems: null,
            isInnerAppValue: isInnerApp()
        }
    },
    props: ['userDetail', 'linkedUrl'],
    computed: {
        ...mapState([
            'articleDetail',
            'representProduct',
            'isAuthIdentify'
        ])
    },
    mounted: function() {
        let args = {
            "code": this.articleDetail.mngCode,
            "page": 1,
            "pageSize": '1'
        };
        this.getRepresentProduct(args);
    },
    methods: {
        ...mapActions([
            'getRepresentProduct',
            'updateIsAuthIdentify'
        ]),
        gotoProductPage(url){
            window.location.href=url;
        },
        gotoUserIdentifyInfoFun(url) {
            var that = this;
            if (/JFZFortune/i.test(navigator.userAgent)) {
                gotoUserIdentifyInfo(function() {
                    if (/JFZFortune/i.test(navigator.userAgent)) {
                        checkUserIdentifyInfo(function(isAuthIdentifyValue) {
                            let args = {
                                "stateValue": isAuthIdentifyValue
                            };
                            that.updateIsAuthIdentify(args);
                        });
                    }
                });
            } else {
                //linkme
            }

        },
        jumpToViewFun(uid) {
            if (!uid) {
                return;
            }
            var isInnerAppValue = isInnerApp();
            if (!isInnerAppValue) {
                // 跳转到站外个人主页
                var urlPath = '/vueApp/community/userCenter/' + uid;
                // this.$router.push({ path: urlPath });
                window.location.replace(document.location.origin + urlPath);
            } else {
                //跳转到主页
                let viewId = '32',
                    closeWebView = '0',
                    viewProperty = { "uid": uid, "communityIndex": 2 };
                jumpToView(viewId, closeWebView, viewProperty);
            }
        }
    },
    watch: {
        representProduct(value) {
            if (!value || value.length <= 0) {
                return;
            }
            this.representProductItems = value;
            console.log(this.representProductItems);
            let that = this;
            if (!isInnerApp()) {
                //在APP中
                linkedmeFun(function(url) {
                    that.$refs.appDownloadDetailProduct[0].href = url;
                });
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

.product-section-container {
    margin-top: rem(10);
    .head-box {
        background-color: #FFF;
        color: #585D73;
        font-size: rem(16);
        p {
            padding: rem(15);
            position: relative;
            &:before {
                content: '';
                display: inline-block;
                width: rem(4);
                height: rem(14);
                vertical-align: middle;
                margin-right: rem(5);
                background-color: #585D73;
            }
            &:after {
                content: '';
                display: inline-block;
                border-right: 1px solid;
                border-bottom: 1px solid;
                width: rem(8);
                height: rem(8);
                transform: rotate(-45deg);
                position: absolute;
                right: rem(20);
                top: 50%;
                margin-top: rem(-4);
            }
            span {
                display: inline-block;
                vertical-align: middle;
            }
        }
        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: #dbdee4;
            transform: scaleY(0.5);
        }
    }
    .product-content-box {
        ul {
            li {
                background-color: #FFF;
                &:after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 1px;
                    background-color: #dbdee4;
                    transform: scaleY(0.5);
                }
                &:last-child:after {
                    height: 0px;
                }
                .content-box {
                    padding: rem(15);
                }
            }
        }
        a {
            cursor: pointer;
            display: block;
        }
        .product-title {
            color: #3C415F;
            font-size: rem(16);
        }
        .list-product-data {
            display: block;
            display: flex;
            margin-top: rem(20);
            span {
                font-size: rem(11);
                padding-left: rem(5)
            }
            .desc {
                color: #82879B;
                font-size: rem(14);
                margin-top: rem(10);
            }
            .left-data {
                flex: 1;
                color: #555A73;
                font-size: rem(22);
                text-align: left;
            }
            .right-data {
                flex: 1;
                color: #B4923B;
                font-size: rem(22);
                text-align: right;
            }
        }
    }
}
</style>