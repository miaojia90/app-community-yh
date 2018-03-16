 <template>
	<div class="toast-container">
         <p class="toast-text">{{toastInfo}}</p>
         <div class="mark">
             
         </div>
	</div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        props: ['toastInfo'],
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}
// 滚动loading
.toast-container {
    width:rem(240);
    line-height: rem(50);
    position:fixed;
    top:50%;
    left:50%;
    margin-left:rem(-110);
    margin-top:rem(-50);
    background-color: rgba(0,0,0,0.6);
    border-radius: rem(10);
    z-index:1000;
    .toast-text{
        color:#FFF;
        font-size:rem(16);
        text-align: center;
        padding: 0 rem(10);
    }
    .mark{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom: 0;
        z-index: 9999;
        background-color: rgba(0,0,0,0.0);  
    }
}
</style>
