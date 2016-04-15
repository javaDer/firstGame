var GamePlayLayer = cc.Layer.extend({
    person:null,
    stepOne:50,
    enemyLength:0,
    enemySpeed:2,
    zdSpeed:1,
    ctor:function(){
        this._super();

        //背景
        var bg = new cc.Sprite(res.bg);
        bg.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(bg);

        //自己
        this.person = new PersonSprite();
        this.person.x = winSize.width / 2;
        this.person.y = winSize.height *4/24;
        this.addChild(this.person);

        this.createEnemys();
        this.scheduleUpdate();
        this.schedule(this.createEnemys,1/5);
        this.schedule(this.createZD,2);


        return true;
    },
    onTouchBack:function(){
        console.log('Back');
        cc.director.runScene(new cc.TransitionFade(2, new SysMenuScene()));
    },
    createZD:function(){
        var zd = new cc.Sprite(res.person);
        zd.setName('zd');
        this.addChild(zd, 2);
        var x = winSize.width*Math.random();
        zd.x = x;
        zd.y = winSize.height;

        var moveEnemy = cc.moveBy(this.zdSpeed, 10, -(winSize.height+50));
        var killEnemy = cc.callFunc(function () {
            var parent = this.getParent();
            parent.removeChild(this,true);

        }, zd);

        zd.runAction(cc.sequence(moveEnemy,killEnemy));
    },
    createEnemys:function(){
        this.enemyLength++;
        if(this.enemyLength > this.stepOne){
            this.unschedule(this.createEnemys);
            //this.unschedule(this.createZD);

            this.schedule(this.createEnemys,1/10);
            //this.schedule(this.createZD,1);
            this.enemySpeed = 1;
            this.zdSpeed = 0.5;
        }
        //敌人
        var enemy = new cc.Sprite(res.blue);
        enemy.setName('enemy');
        this.addChild(enemy, 2);
        var x = winSize.width*Math.random();
        enemy.x = x;
        enemy.y = winSize.height;

        var moveEnemy = cc.moveBy(this.enemySpeed, 10, -(winSize.height+50));
        var killEnemy = cc.callFunc(function () {
            var parent = this.getParent();
            parent.removeChild(this,true);

        }, enemy);

        enemy.runAction(cc.sequence(moveEnemy,killEnemy));
    },
    getEnemys:function(name){
        var arr = [];
        var childRens = this.getChildren();
        for(var i=0; i<childRens.length; i++) {
            if (childRens[i].getName() == name) {
                arr.push(childRens[i]);
            }
        }
        return arr;
    },
    update:function(){
        var pBox= this.person.getBoundingBox();
        var enemys = this.getEnemys('enemy');
        var zds = this.getEnemys('zd');

        for(var i=0; i<enemys.length; i++){
            var enemy = enemys[i];
            var eBox = enemy.getBoundingBox();
            if(cc.rectIntersectsRect(pBox,eBox)){

                CU.playerEffect(res.select_wav);
                //cc.log('碰到了');
                this.killEnemyParticle(enemy);
                this.removeChild(enemy,true);
            }
        }

        for(var i=0; i<zds.length; i++){
            var zd = zds[i];
            var eBox = zd.getBoundingBox();
            if(cc.rectIntersectsRect(pBox,eBox)){
                cc.log('死了');
                CU.playerEffect(res.select_wav);
                this.killEnemyParticle(zd);
                this.removeChild(zd,true);

                for(var s=0; s<enemys.length; s++){
                    var enemy = enemys[s];
                    CU.playerEffect(res.select_wav);
                    this.killEnemyParticle(enemy);
                    this.removeChild(enemy,true);
                }
                this.gameOver();
                var thiz = this;
                window.setTimeout(function(){
                    thiz.onTouchBack();
                },500);

                return;
            }
        }

    },
    gameOver:function(){
        this.unschedule(this.createEnemys);
        this.unschedule(this.createZD);
        this.unscheduleUpdate();

    },
    killEnemyParticle:function(enemy){
        var particle2 = new cc.ParticleSystem(res.particle2_plist);
        this.addChild(particle2);
        particle2.x = enemy.x;
        particle2.y = enemy.y;
    }

});

var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GamePlayLayer();
        this.addChild(layer);
    }
});