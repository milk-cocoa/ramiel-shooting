function ViewManager(){
}

ViewManager.update_alives = function(players){
    $("#alives").html("生存者" + Object.keys(players).length);
}

ViewManager.dec_hp = function(amount){
    $("#lifebar").width(Number($("#lifebar").width()) - amount);
}

ViewManager.dec_mp = function(amount){
    if(Number($("#powerbar").width()) < 20) return false;
    $("#powerbar").width(Number($("#powerbar").width()) - amount);
    return true;
}

ViewManager.inc_mp = function(amount){
    if(Number($("#powerbar").width()) >= 200) return false;
    $("#powerbar").width(Number($("#powerbar").width()) + amount);
    return true;
}






