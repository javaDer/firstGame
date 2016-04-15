/**通用工具*/
var CU=CU||{};

/**播放音效*/
CU.playerEffect=function(url){
	if(GS.sound){
		var s = cc.audioEngine.playEffect(url);
	}
}

/**分数移动*/
CU.moveScore=function(x,y,score,parent,callBack){
	var labelBMFont = new cc.LabelBMFont(score, res.num_fnt);
	
	var w=labelBMFont.width;
	var h=labelBMFont.height;
	
	labelBMFont.attr({
		anchorX: 0,
		anchorY: 0,
		scaleX:0.9,
		scaleY:0.9
	});
	var w=labelBMFont.width*0.5;
	var h=labelBMFont.height*0.5;
	labelBMFont.x=x+(CommonGame.unitW-w)/2,
	labelBMFont.y=y+(CommonGame.unitH-h)/2,
	
	parent.addChild(labelBMFont);
	
	//var action=cc.moveTo(0.6,ClassicsGameLayer.scoreMoveEndPoint);
	var action=cc.moveTo(0.6,GameLayer.scoreMoveEndPoint);
	labelBMFont.runAction(new cc.Sequence(action,new cc.CallFunc(function(){
		callBack();
		labelBMFont.setVisible(false);
	},this)));
};



/**设置控件的宽度——在cocos里是不会出现缩放的；但是导入的js里就会*/
CU.textBMFontWidth=0;//1个字符的label的宽度（——————在cocos里是不会出现缩放的；但是导入的js里就会。。）
CU.setTextBmFontString=function(textBMFont,text){
	var num=text.length;
	textBMFont.width=num*CU.textBMFontWidth;
	textBMFont.string=text;
}