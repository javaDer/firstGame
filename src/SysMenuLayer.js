var SysMenuLayer = cc.Layer.extend({
    _sprite:null,
    _spritePlaying:false,

    ctor:function(){
        this._super();
        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.person_plist);


        //背景
        var bgSprite=new cc.Sprite(res.bg);
        bgSprite.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(bgSprite);

        //开始按钮
        var btn1= new ButtonSprite("",res.play,res.play,this,null,this.onTouchEndedBack.bind(this),0);
        //btn1.setText('Button');
        btn1.x = winSize.width / 2;
        btn1.y = winSize.height *4/24;


        var helloLabel = new cc.LabelTTF("来吧！", "Arial", 48);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;

        this._sprite = new cc.Sprite('#img_1.png');
        this._sprite.x = winSize.width / 2;
        this._sprite.y = winSize.height / 2;
        this.addChild(this._sprite);



    },
    onTouchEndedBack:function(){
       // alert(1);
        console.log('Start');
        cc.director.runScene(new cc.TransitionFade(1, new GamePlayScene()));

    },

    animationFrames:function(){
        this._sprite.stopAllActions();
        var animation = new cc.Animation();
            for (var i = 1; i <= 10; i++) {
                var frameName = "img_" + i + ".png";
                //cc.log("frameName = " + frameName)
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                animation.addSpriteFrame(spriteFrame);
            }

        animation.setDelayPerUnit(0.08);           //设置两个帧播放时间
        //animation.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

        var action = cc.animate(animation);
        this._sprite.runAction(cc.repeatForever(action));

    }
});

var SysMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SysMenuLayer();
        this.addChild(layer);
    }
});