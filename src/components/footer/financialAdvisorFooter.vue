<template>
    <footer class="fixed-footer-container" @click="gotoRegister">
        <div class="appointment-div foot">
            <div class="content">
                <div class="left">
                    <img :src="financialAdvisorInfo.headImage" />
                </div>
                <div class="center">
                    <p class="userInfo">{{financialAdvisorInfo.name}}
                        <i class="star"></i>
                        <i class="star"></i>
                        <i class="star"></i>
                        <i class="star"></i>
                        <i class="star"></i>
                    </p>
                    <p class="userDesc">
                        资深财富规划师
                    </p>
                </div>
                <div class="right">
                    <a class="appointment"></a>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
 import { mapState, mapActions } from 'vuex';
 import { baseUrl } from '../../utils/env';
 import { getQueryString} from '../../utils/mUtils';
 export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState([
            'financialAdvisorInfo'
        ])        
    },
    methods:{
        gotoRegister(){
            let managementUid=getQueryString("_uid");
            if(!managementUid){
                return;
            }
            window.location.href=baseUrl+"/home/financial-advisor-invitation?_uid="+managementUid;
        }
    }
 }   
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

footer {
    &.fixed-footer-container {
        .appointment-div {
            position: relative;
            width: 100%;
            height: rem(130/2);
            background: url(../../assets/images/appointment/mark.png) no-repeat;
            background-size: 100% rem(130/2);
            position: fixed;
            background-color: #162254;
            &.foot {
                bottom: 0;
                z-index: 10000;
                right: 0;
                left: 0;
            }
            .content {
                padding: rem(18/2) rem(30/2);
                div {
                    float: left;
                }
                .left {
                    width: rem(100/2);
                    height: rem(100/2);
                    img {
                        width: rem(92/2);
                        height: rem(92/2);
                        border-radius: 50%;
                    }
                }
                .center {
                    padding-left: rem(20/2);
                    .userInfo {
                        color: #f9efab;
                        font-size: rem(34/2);
                        line-height: rem(94/2/2);
                        .star {
                            content: '';
                            display: inline-block;
                            vertical-align: middle;
                            width: rem(22/2);
                            height: rem(22/2);
                            background: url(../../assets/images/appointment/star.png) no-repeat;
                            background-size: 100% 100%;
                            margin: 0 rem(2);
                        }
                    }
                    .userDesc {
                        color: #f9efab;
                        font-size: rem(26/2);
                        line-height: rem(94/2/2);
                    }
                }
                .right {
                    float: right;
                    overflow: hidden;
                    .appointment {
                        display: inline-block;
                        width: rem(172/2);
                        height: rem(66/2);
                        background: url(../../assets/images/appointment/btn.png) no-repeat;
                        background-size: 100% 100%;
                        margin: rem(14/2) 0;
                        margin-right: rem(5);
                    }
                }
            }
        }
    }
}
</style>