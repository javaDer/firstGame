var ParticleLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        // TODO 特别说明：粒子系统继承自cc.Node。

        // 创建
        var particle1 = new cc.ParticleSystem(res.particle_plist);
        // 添加
        // TODO 注意：这里获取texture， 必须把plist对应的png图片加载进来
        var particleBatchNode = new cc.ParticleBatchNode(particle1.texture);
        this.addChild(particleBatchNode);
        particleBatchNode.addChild(particle1);

        // 属性配置
        particle1.x = 300;

    }
});

var ParticleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new ParticleLayer();
        this.addChild(layer);
    }
});