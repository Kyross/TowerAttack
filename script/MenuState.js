function MenuState() {
    Phaser.State.call(this);
}

MenuState.prototype = Object.create(Phaser.State.prototype);
MenuState.prototype.constructor = MenuState;

MenuState.prototype.create=function() {
    var bg = game.add.image(0, 0, 'bg_menu');
    bg.width=game.world.width;
    bg.height=game.world.height;

    var g=game.add.group();
    g.inputEnableChildren=true;
    g.classType=Phaser.Image;
    g.createMultiple(1,['b_level1','b_level2','b_level3','b_credits'],0,true);
    g.onChildInputUp.add(this.startLevel,this);
    g.align(1,4,game.world.width*0.75,game.world.height*0.1);
    g.alignIn(game.world.bounds,Phaser.CENTER);
}

MenuState.prototype.startLevel= function(button) {
    var lvl=0;
    var key=button.key.charAt(button.key.length-1);
    try {
        lvl=parseInt(key)-1;
    }catch(e) {console.error(e);}
    game.state.clearCurrentState();
    game.state.start('LevelState',true,false,lvl);
}

MenuState.prototype.credits = function() {
    this.displayedCredits = game.add.button(0, 0, 'bg_menu', this.returnMenu, this, 2, 1, 0);
}

MenuState.prototype.returnMenu = function() {
    game.world.remove(this.displayedCredits);
}