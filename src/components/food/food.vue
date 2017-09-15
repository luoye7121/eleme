<template>
    <div class="food" v-show="showFlag" transition="move" v-el:food>
    	<div class="food-content">
    		<div class="image-header">
    			<img :src='food.image'>
    			<div class="back" @click='hide'><i class='icon-arrow_lift'></i></div>
    		</div>
    		<div class="content">
    			<h1 class="title">{{food.name}}</h1>
    			<div class="detail">
    				<span class='sell-count'>月售{{food.sellCount}}</span>
    				<span class="rating">好评率{{food.rating}}%</span>
    			</div>
    			<div class="price">
    				<span class="now">￥{{food.price}}</span>
    				<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
    			</div>
    			<div class="cartcontrol-wrapper" >
    			<cartcontrol :food="food"></cartcontrol>
    		</div>
    		<div @click.stop.prevent="addFirst"class="buy" v-show="!food.count ||food.count === 0" transition="fade">加入购物车</div>
    		</div>
    		<split v-show="food.info"></split>
    		<div class="info" v-show="food.info">
    			<h1 class="title">商品信息</h1>
    			<p class='text' >{{food.info}}</p>
    		</div>
    		<split></split>
    		<div class="rating">
    			<h1 class="title">商品评价</h1>
    			<ratingselect :only-content='onlyContent' :select-type='selectType'  :desc='desc' :ratings='food.ratings'></ratingselect>
    			<div class="rating-wrapper">
    				<ul v-show="food.ratings &&food.ratings.length">
    					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
    					<div class="user">
    						<span class="name">{{rating.username}}</span>
    						<img :src="rating.avatar" class="avatar" width="12" height="12">
    					</div>
    					<div class="time">{{rating.rateTime |formatDate}}</div>
    					<p class="text">
    					<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
    					{{rating.text}}</p>
    					</li>
    				</ul>
    				<div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script type="ecmascript-6">
import BScroll from 'better-scroll';
import Vue from "vue";
//当引入的是export function()这种的具体的方法是方法名称需要加上一个花括号
//花括号内的可以是多个方法名比如{formatDate,filterAdd等}
//当引入的文件是export default命名的一个组件上h时则不用加上花括号,哈哈哈
import {formatDate} from 'common/js/data';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import ratingselect from 'components/ratingselect/ratingselect'
import split from 'components/split/split'
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
    export default {
    	props: {
    		food: {
    			type:Object
    		}
    	},
    	data() {
    		return {
    			showFlag:false,
    			selectType: ALL,
    			onlyContent:false,
    			desc: {
    				all:'满意',
    				positive:'推荐',
    				negative:'吐槽'
    			}
    		}
    	},
    	//父组件可以调用子组件的方法的但是子组件不可以调用父组件里的方法，即good可以调用food里面methods的方法，但是food组件不能调用good父组件methods里面方法。其中一般组件自己且只能自己使用的方要加上下划线防止父组件的调用
    	methods: {
    		show() {
    			this.showFlag = true;
    			this.selectType = ALL;
    			this.onlyContent = true;
    			this.$nextTick(() => {
    				if(!this.scroll) {
    					this.scroll = new BScroll( this.$els.food,{
    						click:true
    					})
    				} else {
    					this.scroll.refresh();
    				}
    			});
    		},
    		hide() {
    			this.showFlag = false;
    		},
    		addFirst(event) {
    			if(event._constructed) {
    				return ;
    			}
    			this.$dispatch('cart.add',event.target);
    			Vue.set(this.food,'count',1)
    		},
    		needShow(type,text) {
    			if(this.onlyContent && !text){
    				return false;
    			}
    			if(this.selectType === ALL){
    				return true;
    			}else{
    				return type === this.selectType
    			}
    		}
    	},
    	events:{
    		'ratingtype.select'(type) {
    			this.selectType = type;
    			this.$nextTick(() => {
						this.scroll.refresh();
    			});
    		},
    		'content.toggle'(onlyContent) {
    			this.onlyContent = onlyContent;
    			this.$nextTick(() => {
						this.scroll.refresh();
    			});
    		}
    	},
    	components: {
    		cartcontrol,
    		split,
    		ratingselect
    	},
    	filters: {
    		formatDate(time) {
    			let date = new Date(time);
    			return formatDate(date,'yyyy-MM-dd hh:mm');
    		}
    	}
    };
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../../common/stylus/minxin.styl'

.food
	position:fixed;
	left:0
	top:0
	width:100%
	z-index:30
	bottom:48px
	background:#fff
	&.move-transition
		transition:all 0.2s linear
		transform:translate3d(0,0,0)
	&.move-enter,&.move-leave
		transform:translate3d(100%,0,0)
	.image-header
		position:relative
		width:100%
		height:0
		padding-top:100%
		img
			position:absolute
			width:100%
			height:100%
			left:0
			top:0
		.back
			position:absolute
			top:10px
			left:0
			.icon-arrow_lift
				display:block
				padding:10px
				color:#fff
				font-size:20px
	.content
		padding:18px
		position:relative
		.title
			line-height:14px
			margin-bottom:8px
			font-size:14px
			font-weight:700
			color:rgb(7,17,27)
		.detail
			margin-bottom:18px
			line-height:10px
			font-size:0
			height:10px
			.sell-count,.rating
				font-size:10px
				color:rgb(147,153,159)
			.sell-count
				margin-right:12px
		.price
			font-weight:700
			line-height:24px
			.now
				margin-right:18px
				font-size:14px
				color:rgb(240,20,20)
			.old
				text-decoration:line-through
				font-size:10px
				color:rgb(147,153,159)
		.cartcontrol-wrapper
			position:absolute
			right:12px
			bottom:12px
		.buy
			position:absolute
			right:18px
			bottom:18px
			z-index:10
			height:24px
			line-height:24px
			padding:0 12px
			box-sizing:border-box
			font-size:10px
			border-radius:12px
			color:#fff
			background:rgb(0,160,220)
			opacity:1
			&.fade-transition
				transtion:all 0.2s
			&.fade-enter,&.fade-leave
				opacity:0
				z-index: -1
	.info
		padding:18px
		.title
			line-height:14px
			margin-bottom:6px
			font-size:14px
			color:rgb(7,17,27)
		.text
			color:rgb(77,85,93)
			line-height:24px
			font-size:12px
			padding:0 8px
	.rating
		padding-top:18px
		.title
			line-height:14px
			margin-left:18px
			font-size:14px
			color:rgb(7,17,27)
		.rating-wrapper
			padding:0 18px
			.rating-item
				position:relative
				padding:16px 0
				border-1px(rgba(7,17,27,.1))
				.user
					position:absolute
					right:0
					top:16px
					font-size:0
					line-height:12px
					.name
						color:rgb(147,153,159)
						display:inline-block
						vertical-align:top
						font-size:10px
						margin-right:6px
					.avatar
						border-radius:50%
				.time
					margin-bottom:6px
					line-height:12px
					font-size:10px
					color:rgb(147,153,159)
				.text
					line-height:16px
					font-size:12px
					color:rgb(7,17,27)
					.icon-thumb_up,.icon-thumb_down
						margin-right:4px
						line-height:16px
						font-size:12px
					.icon-thumb_up
						color:rgb(0,160,220)
					.icon-thumb_down
						color:rgb(147,153,159)
			.no-rating
				padding:16px 0
				font-size:12px
				color:rgb(147,153,159)
</style>