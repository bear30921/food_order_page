var vm = new Vue({
	el: '#app',
	data: {
		foods: foodData,
		cart: [],
		cartInfo: false,
		paymentValidation: false,
		foodCategory: '',
		activeBg: 1
	},
	methods: {
		// 食物種類選單切換
		menuToggle: function (menuType, e) {
			this.activeBg = menuType;
			var currentMenu = e.target.text;
			this.foodCategory = currentMenu === '全部' ? '' : currentMenu;
		},
		// 食物種類資料篩選
		filterFood: function (category) {
			if (category !== "") {
				var currentFood = this.foods.filter(function (food) {
					return food.type === category;
				});
				return currentFood;
			} else {
				return this.foods;
			}
		},
		// 增加食物數量
		increase: function (food) {
			this.paymentValidation = false;
			// 一開始json沒有定義count，所以會等於undefined ，或食物數量等於0
			if (food.count === undefined || food.count === 0) {
				// 新增json count 屬性，預設為1 
				this.$set(food, 'count', 1);
				// 增加到購物車
				this.addCart(food);
			} else {
				food.count++;
			}
		},
		// 減少食物數量
		decrease: function (food) {
			if (food.count > 0) {
				food.count--;
				// 食物數量等於0移除購物車
				if (food.count === 0) {
					this.removeCart(food);
				}
			}
		},
		// 新增購物車
		addCart: function (goods) {
			this.cart.push(goods);
		},
		// 移除購物車
		removeCart: function (goods) {
			var cartPosition = this.cart.indexOf(goods);
			this.cart.splice(cartPosition, 1);

			// 購物車內的移除按鈕
			if (goods.count > 0) {
				// 購物車內的食物比對商品清單位置
				var foodPosition = this.foods.indexOf(goods);
				this.foods[foodPosition].count = 0;
			}
		},
		// 打開購物車
		open: function () {
			this.cartInfo = true;
		},
		// 關閉購物車
		leave: function () {
			this.cartInfo = false;
			this.paymentValidation = false;
		},
		// 結帳驗證
		payment: function () {
			if (this.cart.length > 0) {
				this.leave();
				var amount = this.cartCheckout;
				this.paymentValidation = false;
				setTimeout(function () {
					alert('感謝您！ 本次消費金額總共$' + amount + '已全數結清，請耐心等候餐點');
				}, 1000);
				// 食物清單數量歸0
				for (var i = 0; i < this.cart.length; i++) {
					this.cart[i].count = 0;
				}
				// 清空購物車
				this.cart = [];
			} else {
				this.paymentValidation = true;
			}
		},

	},
	computed: {
		// 購物車數量
		cartCount: function () {
			return this.cart.length;
		},
		// 結帳
		cartCheckout: function () {
			var amount = 0;
			if (this.cart.length > 0) {
				for (var i = 0; i < this.cart.length; i++) {
					var price = this.cart[i].price;
					var number = this.cart[i].count;
					var total = price * number;
					amount += total;
				}
			}
			return amount;
		}
	}
});