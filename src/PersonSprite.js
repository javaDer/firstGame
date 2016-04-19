var PersonSprite = cc.Sprite.extend({
    _rect:null,
    _touchX:null,
    ctor:function(){
        this._super('#person.png');
        this._rect = cc.rect(0,0,this.getContentSize().width,this.getContentSize().height);

        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchStart:this.onTouchStart,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled : this.onTouchCancelled
        },this);


        var person= new cc.Sprite(res.person);
        person.x = this.width / 2;
        person.y = this.height / 2;
        this.addChild(person);

        cc.spriteFrameCache.addSpriteFrames(res.person_plist);
    },

    getRect:function () {
        return cc.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
    },

    isTouchInRect:function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.getRect();
        myRect.x += this.x;
        myRect.y += this.y;
        return cc.rectContainsPoint(myRect, getPoint);
    },

    onTouchBegan : function (touch, event) {
        var target = event.getCurrentTarget();
        if (!target.isTouchInRect(touch)){
            return false
        }
        //target.animationFrames();
        return true;

    },

    onTouchMoved : function (touch, event) {
        var target = event.getCurrentTarget();

        var x = touch.getLocation().x;
        if(x < 0){
            x = 0;
        }
        if( x > winSize.width){
            x = winSize.width;
        }

        target.setPositionX(x);

    },

    onTouchEnded : function (touch, event) {
        var target = event.getCurrentTarget();
        //target.unschedule(target.personMove)
        //target.stopAllActions();
    },

    onTouchCancelled : function (touch, event) {
        var target = event.getCurrentTarget();

    },
    /**
     *
     */
    animationFrames:function(){
        this.stopAllActions();
        var animation = new cc.Animation();
        for (var i = 1; i <= 10; i++) {
            var frameName = "img_" + i + ".png";
            cc.log("frameName = " + frameName)
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            animation.addSpriteFrame(spriteFrame);
        }

        animation.setDelayPerUnit(0.08);           //设置两个帧播放时间
        animation.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

        this.runAction(cc.animate(animation).repeatForever());

    },
    personMove:function(){
        var x = this.getPositionX();
        if(x < this._touchX){
            x += 10;
        }else{
            x -= 10;
        }
        this.setPositionX(x);
    }
});