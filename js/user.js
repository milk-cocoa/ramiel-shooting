(function(global){
	function UserManager(ds) {
		this.ds = ds;
		this.user = null;
	}
	UserManager.prototype.init = function(_cb) {
		var cb = _cb || nop;
		var self = this;
		var user_id = this.get_current();
		if(user_id) {
			this.ds.get(user_id, function(data) {
				self.user = data;
				cb(null, self.user);
			});
		}else{
			self.user = this.create_user();
			cb(null, self.user);
		}
	}
	UserManager.prototype.create_user = function() {
		var user_id = new Date().getTime().toString(36) + ((Math.random() * 100000) >> 0);
		var user = {
			win : 0,
			lose : 0,
			name : "名無し"
		};
		localStorage.setItem("ramiel.user.id", user_id);
		this.ds.set(user_id, user);
		return user;
	}
	UserManager.prototype.get_current = function() {
		var user_id = localStorage.getItem("ramiel.user.id");
		if(user_id) {
			return user_id;
		}else{
			return null;
		}
	}
	UserManager.prototype.set_name = function(name) {
		var user_id = this.get_current();
		if(user_id && this.user) {
			this.ds.set(user_id, {
				name : name
			});
		}
	}
	UserManager.prototype.update_score = function(win, lose) {
		var self = this;
		var user_id = this.get_current();
		if(user_id && this.user) {
			var new_win = Number(this.user.win) + Number(win);
			this.ds.set(user_id, {
				win : new_win,
				lose : Number(this.user.lose) + Number(lose)
			}, function() {
				self.ds.setPriority(user_id, new_win);
			});
		}
	}
	function nop(){}
	global.UserManager = UserManager;
}(window))