<template>
    <div class="timeline-wrapper">
        <div class="item-box">
            <div class="head">
                <div class="user-headImg">
                </div>
                <div class="user-tag-box">
                    <span class="user-phone"></span>
                    <span class="user-mark"></span>
                </div>
                <div class="follow-operate"></div>
            </div>
            <div class="bottom">
                <div class="public-date"></div>
                <div class="like"></div>
                <div class="look"></div>
            </div>
        </div>
        <section class="detail-content-section">
            <div class="title">
                <span class="mark spe"></span><span class="mark top"></span><span class="title-span"></span><span class="title-span"></span>
            </div>
            <div class="content-box">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <div class="img-box">
                </div>
            </div>
        </section>
        <div class="list-title-container margin-value">
            <p class="markIcon">
                <span></span>
            </p>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.timeline-wrapper {
    .item-box {
        padding: rem(15);
        background-color: #FFF;
        .title {
            font-size: rem(25);
            color: #3C415F;
            word-wrap: break-word;
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
        .head {
            overflow: hidden;
            padding: rem(10) 0;
            display: flex;
            align-items: center;
            height: rem(40);
            .user-headImg-div {
                position: relative;
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
                ;
            }
            /*垂直居中*/
            .user-headImg {
                float: left;
                width: rem(32);
                height: rem(32);
                border-radius: 50%;
                margin: 1px 0;
                background-color: #F4F5F7;
            }
            .user-phone {
                float: left;
                font-size: rem(16);
                color: #82879B;
                margin-left: rem(10);
                line-height: rem(24);
                width: rem(100);
                height: rem(24);
                background-color: #F4F5F7;
            }
            .user-mark {
                float: left;
                font-size: rem(12);
                color: #d2b978;
                margin-left: rem(10);
                padding: rem(3) rem(6);
                border-radius: rem(12);
                width: rem(50);
                height: rem(18);
                background-color: #F4F5F7;
            }
            .follow-operate {
                border-radius: rem(24);
                background-color: #F4F5F7;
                color: #d2b978;
                position: absolute;
                right: rem(15);
                font-size: rem(14);
                padding: rem(7) rem(5);
                width: rem(70);
                height: rem(20);
                text-align: center;
                vertical-align: middle;
            }
        }
        .content {
            font-size: rem(18);
            color: #555A73;
            line-height: rem(25);
            word-wrap: break-word;
        }
        .bottom {
            overflow: hidden;
            .public-date {
                float: left;
                font-size: rem(14);
                color: #B4B9C3;
                line-height: rem(24);
                width: rem(140);
                height: rem(24);
                background-color: #F4F5F7;
            }
            span {
                display: inline-block;
                vertical-align: middle;
            }
            .look {
                font-size: rem(14);
                line-height: rem(24);
                color: #82879B;
                float: right;
                width: rem(40);
                height: rem(24);
                background-color: #F4F5F7;
            }
            .like {
                font-size: rem(14);
                line-height: rem(24);
                color: #82879B;
                float: right;
                margin-left: rem(10);
                width: rem(40);
                height: rem(24);
                background-color: #F4F5F7;
            }
        }
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
                width: rem(240);
                display: inline-block;
                height: rem(24);
                background-color: #F4F5F7;
            }
            .mark {
                display: inline-block;
                font-size: rem(12);
                padding: rem(2) rem(5);
                vertical-align: middle;
                margin-right: rem(8);
                &.top {
                    color: #F74C31;
                    width: rem(30);
                    height: rem(24);
                    background-color: #F4F5F7;
                }
                &.spe {
                    color: #C4950F;
                    width: rem(30);
                    height: rem(24);
                    background-color: #F4F5F7;
                }
            }
        }
        .content-box {
            p {
                line-height: rem(20);
                word-wrap: break-word;
                height: rem(20);
                margin: rem(5) 0;
                background-color: #F4F5F7;
            }
            .img-box {
                width: 100%;
                height: rem(200);
                background-color: #F4F5F7;
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
    }
    .margin-value {
    margin-top: rem(10);
}

.list-title-container {
    font-size: rem(16);
    color: #555A73;
    background-color: #FFF;
    p {
        padding: rem(15);
        &.markIcon:before {
            content: '';
            display: inline-block;
            width: rem(4);
            height: rem(14);
            vertical-align: middle;
            margin-right: rem(5);
            background-color: #F4F5F7;
        }
        span {
            display: inline-block;
            vertical-align: middle;
            width: rem(30);
            height: rem(20);
            margin-left: rem(10);
            background-color: #F4F5F7;
        }
    }
}
}

</style>