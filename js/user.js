(function(global){
	function UserManager(ds) {
		this.ds = ds;
		this.user = null;
	}
	UserManager.prototype.init = function(cb) {
		var self = this;
		var user = this.get_current();
		if(!user) {
			user = this.create_user();
		}
		this.ds.get(user.id, function(data) {
			if(data) {
				self.user = data;
			}else{
				self.user = {
					win : 0,
					lose : 0,
					name : ""
				}
			}
			cb(null, self.user);
		});
	}
	UserManager.prototype.create_user = function() {
		var user = {
			id : new Date().getTime().toString(36) + ((Math.random() * 100000) >> 0),
			win : 0,
			lose : 0
		};
		localStorage.setItem("ramiel.userid", JSON.stringify(user));
		this.ds.set(user.id, {
			win : 0,
			lose : 0
		});
		return user;
	}
	UserManager.prototype.get_current = function() {
		var user = localStorage.getItem("ramiel.userid");
		if(user) {
			return JSON.parse(user);
		}else{
			return null;
		}
	}
	UserManager.prototype.set_name = function(name) {
		var user = this.get_current();
		if(user && this.user) {
			this.ds.set(user.id, {
				name : name
			});
		}
	}
	UserManager.prototype.update_score = function(win, lose) {
		var self = this;
		var user = this.get_current();
		console.log(win, lose, user, this.user);
		if(user && this.user) {
			var new_win = Number(this.user.win) + Number(win);
			this.ds.set(user.id, {
				win : new_win,
				lose : Number(this.user.lose) + Number(lose)
			}, function() {
				self.ds.setPriority(user.id, new_win);
			});
		}
	}
	global.UserManager = UserManager;
}(window))