var PersonSprite = cc.Sprite.extend({
    _rect:null,
    _touchX:null,
    ctor:function(){
        this._super(res.person);
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
        return true;
    },

    onTouchMoved : function (touch, event) {
        var target = event.getCurrentTarget();
        target.setPositionX(touch.getLocation().x);
        //var x = target.x;
        //console.log(x);
        //if(x < window.winSize.width-target._rect.width/2+20 && x > target._rect.width/2-20){
        //
        //}

        //target.setPosition(touch.getLocation());


        //
        //console.log(target.x);
        //console.log(target._rect);



    },

    onTouchEnded : function (touch, event) {
        var target = event.getCurrentTarget();
        //target.unschedule(target.personMove)
    },

    onTouchCancelled : function (touch, event) {
        var target = event.getCurrentTarget();

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