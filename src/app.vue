<!--suppress ALL -->
<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
li,
form,
input,
table,
th,
td {
    margin: 0;
    padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6{
    font-weight: 400;
}

i,
em {
    font-style: normal;
}

ul,
ol {
    list-style-type: none;
}

a {
    text-decoration: none;
}

img {
    display: block;
    max-width: 100%;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
body{
    background-color: #F4F5F7;
    margin: 0 auto;
}
@media (min-width:481px) {
    html {
        font-size: 48px !important;
    }
    body {
        margin: 0 auto;
        width: 480px;
    }
}
* {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.footer-operate-box{  
    -webkit-touch-callout: none;  
    -webkit-user-select: none;  
    -khtml-user-select: none;  
    -moz-user-select: none;  
    -ms-user-select: none;  
    user-select: none;  
}

.one-line-break{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.two-line-break{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.three-line-break{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.detail-link-a {
    color: #3353DB;
    &:link,
    &:visited,
    &:hover,
    &:active {
        color: #3353DB;
    }
}
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}
.red-packet-box {
    color: #3C415F;
    font-size: rem(16);
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none; /* for Chrome */
    user-select: none;
    a:hover, a:visited, a:link, a:active {
        color: #3C415F;
    }
    .content-box{
        &.spe{
            color:#555A73;
        }
    }
    .packet-box {
        margin-top: rem(20);
        display: flex;
        padding: rem(10) rem(15);
        background-color: #FFF7F5;
        border-radius: rem(5);
        overflow: hidden;
        .left {
            width: rem(39);
            height: rem(52);
            background: url(assets/images/redPacket.png) no-repeat center top;
            background-size: 100% 100%;
        }
        .right {
            flex: 1;
            padding-left: rem(10);
            p {
                line-height: rem(26);
            }
        }
        .packet-title {
            color: #555A73;
            font-size: rem(16);
            font-weight: 600;
        }
        .packet-desc {
            color: #82879B;
            font-size: rem(14);
        }
    }
    &.already {
        .packet-box {
            .left {
                background: url(assets/images/redPacketGray.png) no-repeat center top;
                background-size: 100% 100%;
            }
            .packet-title {
                color: #82879B;
                font-size: rem(16);
                font-weight: 600;
            }
            .packet-desc {
                color: #B4B9C3;
                font-size: rem(14);
            }
        }
    }
}
</style>
