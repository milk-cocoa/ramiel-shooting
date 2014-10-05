(function(global){
    function ScoreManager(ds) {
        this.ds = ds;
    }
    ScoreManager.prototype.fetch = function(cb) {
        this.ds.query({}).sort("desc").limit(10).done(function(users) {
            cb(null, users);
        });
    }
    global.ScoreManager = ScoreManager;
}(window))
