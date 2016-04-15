var SysMenuLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;

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


        var helloLabel = new cc.LabelTTF("我的第一个cocos2d游戏", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);

    },
    onTouchEndedBack:function(){
       // alert(1);
        console.log('Start');
        cc.director.runScene(new cc.TransitionFade(1, new GamePlayScene()));
    },
});

var SysMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SysMenuLayer();
        this.addChild(layer);
    }
});