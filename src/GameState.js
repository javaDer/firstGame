/**游戏需要记录进度的信息*/
var GS=GS||{};

/**游戏类型*/
GS.gameType=0;//0:菜鸟(不隐藏)；1:高手（隐藏上半部分）;2:大神（隐藏所有）

/**不同难度对应的最高分数*/
GS.scores={
    s0:0,
    s1:0,
    s2:0
};

/**存储的key值*/
GS.LocalStorageKey="gameStateKey";

/**加载存储在本地的信息*/
GS.loadLocalStorage=function(key){
	var ls = cc.sys.localStorage;
	//获取经典模式的信息
	var r = ls.getItem(key);
    return r;
};
/**存储本地信息*/
GS.setLocalStorage=function(key,value){
	var ls = cc.sys.localStorage;
	ls.setItem(key, value);
};

GS.sound=1;
/**存储的model对象*/
GS.LocalStorageModel={
	scores:null,//记录
    sound:1 //音效
};