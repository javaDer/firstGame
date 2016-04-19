var GamePlayLayer = cc.Layer.extend({
    _scoreLabel:null,
    _score:0,
    _lifeLength:0,
    _lifeMaxLength:5,
    person:null,
    gameStepIndex:-1,
    enemyLength:0,
    enemySpeed:0,
    zdSpeed:0,
    /**
     * 游戏关卡
     */
    gameStep:{
        one:{
            maxEnemyLength:50,
            enemySpeed:1,
            zdSpeed:0.8,
            enemyInterval:0.25,
            zdInterval:1
        },
        two:{
            maxEnemyLength:100,
            enemySpeed:0.9,
            zdSpeed:0.7,
            enemyInterval:0.2,
            zdInterval:0.8
        },
        three:{
            maxEnemyLength:150,
            enemySpeed:0.9,
            zdSpeed:0.7,
            enemyInterval:0.2,
            zdInterval:0.5
        }
    },
    ctor:function(){
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.test_plist);


        //背景
        var bg = new cc.Sprite(res.bg);
        bg.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(bg);

        this._scoreLabel = new cc.LabelTTF("得分：0", "Arial", 24);
        this._scoreLabel.anchorX = 1;
        this._scoreLabel.x = winSize.width - 20;
        this._scoreLabel.y = winSize.height - 40;
        this.addChild(this._scoreLabel)


        //自己
        this.person = new PersonSprite();
        this.person.x = winSize.width / 2;
        this.person.y = winSize.height *4/24;
        //this.person.visible = false;
        this.addChild(this.person);

        for(var i=1; i<this._lifeMaxLength+1; i++){
            var life = new cc.Sprite(res.life);
            life.anchorX = 0;
            life.x = i*40-20;
            life.y = winSize.height -40;
            life.setName('life_'+i);
            this.addChild(life);
        }

        this.createEnemys();
        this.scheduleUpdate();
    },

    /**
     *
     */
    onTouchBack:function(){
        console.log('Back');
        cc.director.runScene(new cc.TransitionFade(2, new SysMenuScene()));
    },

    /**
     * 创建炸弹
     */
    createZD:function(){
        var zd = new cc.Sprite("#red.png");
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

    /**
     * 创建敌人
     */
    createEnemys:function(){

        if(this.enemyLength < this.gameStep.one.maxEnemyLength && this.gameStepIndex != 0){
            //第一关
            this.gameStepIndex = 0;
            this.toGameStep('one');

        }
        else if(this.enemyLength >= this.gameStep.one.maxEnemyLength && this.enemyLength < this.gameStep.two.maxEnemyLength && this.gameStepIndex != 1){
            //第二关
            this.gameStepIndex = 1;
            this.toGameStep('two');
        }
        else if(this.enemyLength >= this.gameStep.two.maxEnemyLength && this.enemyLength < this.gameStep.three.maxEnemyLength && this.gameStepIndex != 2){
            //第二关
            this.gameStepIndex = 2;
            this.toGameStep('three');
        }

        this.enemyLength++;

        //敌人
        var enemy = new cc.Sprite("#blue.png");
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

        //document.getElementById('output').innerHTML = this.enemyLength;
    },

    /**
     * 获取所有 敌人/炸弹
     * @param name
     * @returns {Array}
     */
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

    /**
     * 粒子效果
     * @param enemy
     */
    killEnemyParticle:function(sprite){
        var particle2 = new cc.ParticleSystem(res.particle2_plist);
        this.addChild(particle2);
        particle2.x = sprite.x;
        particle2.y = sprite.y;
    },

    /**
     * 每帧碰撞检测
     */
    update:function(){
        var pBox= this.person.getBoundingBox();
        var enemys = this.getEnemys('enemy');
        var zds = this.getEnemys('zd');

        //检测敌人
        for(var i=0; i<enemys.length; i++){
            var enemy = enemys[i];
            var eBox = enemy.getBoundingBox();
            if(cc.rectIntersectsRect(pBox,eBox)){
                this._score += 10;
                this._scoreLabel.setString('得分：'+this._score);
                CU.playerEffect(res.select_wav);
                this.killEnemyParticle(enemy);
                this.removeChild(enemy,true);
            }
        }

        //检测炸弹
        for(var i=0; i<zds.length; i++){
            var zd = zds[i];
            var eBox = zd.getBoundingBox();
            if(cc.rectIntersectsRect(pBox,eBox)){

                //console.log(this._lifeLength);
                CU.playerEffect(res.select_wav);
                this.killEnemyParticle(zd);
                this.removeChild(zd,true);

                var life = this.getChildByName('life_'+(this._lifeMaxLength-this._lifeLength));

                if(life){
                    this.removeChild(life);
                }

                if(this._lifeLength >= this._lifeMaxLength){
                    cc.log('死了');
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
                }

                this._lifeLength++;

                return;
            }
        }
    },

    /**
     * 更换关卡
     * @param key
     */
    toGameStep:function(key){
        this.unschedule(this.createEnemys);
        this.unschedule(this.createZD);

        var thiz = this;
        //window.setTimeout(function(){
            console.log('key:'+key+'  length:'+this.enemyLength);
            var step = thiz.gameStep[key];
            thiz.enemySpeed = step.enemySpeed;
            thiz.zdSpeed = step.zdSpeed;
            thiz.schedule(thiz.createEnemys,step.enemyInterval);
            thiz.schedule(thiz.createZD,step.zdInterval);
        //},2000);
    },

    /**
     *
     */
    gameOver:function(){
        this.person.stopAllActions();
        this.unschedule(this.createEnemys);
        this.unschedule(this.createZD);
        this.unscheduleUpdate();

    },


});

var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GamePlayLayer();
        this.addChild(layer);
    }
});