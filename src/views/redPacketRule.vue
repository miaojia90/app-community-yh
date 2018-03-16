<template>
    <section class="hot-packet-rule">
        <ul>
            <li v-for="item in redPacketRule">
                <p v-html="item.question" class="question"></p>
                <p v-html="item.answer" class="answer"></p>
            </li>
        </ul>
    </section>
</template>
<script>
import { RedPacketRule } from '../utils/staticData.js';
export default {
    data() {
        return {
            redPacketRule: RedPacketRule
        }
    },
    computed: {

    },
    methods: {

    },
    created() {

    },
    mounted() {
        document.title = '金斧子红包规则';
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.hot-packet-rule {
    ul {
        li {
            .common-style {
                color: #3C4160;
                padding: rem(15);
                line-height: rem(25);
                font-size: rem(16);
            }
            .question {
                @extend .common-style;
                font-weight: 600;
                background-color:#FFF;
            }
            .answer {
                @extend .common-style;
                padding: rem(10) rem(14) rem(10) rem(36);
                background-color: #F4F5F7;
            }
        }
    }
}
</style>