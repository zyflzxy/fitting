// JavaScript Document

function Model(){
	//base(this,LSprite,[]);
	var arg= producturl+"/3d/"+"xml/model.xml";	
	model_xml(arg);
}

function model_xml(arg)
{
   $(".loading").show();
   $.ajax({
        url: arg,
        dataType: 'xml',
        type: 'GET',
        error: function(xml)
        {
            alert("加载XML 文件出错！");
        },
        success: function(xml)
        {
            $(".loading").hide();
			//$(".sidebar").css("height","40%"); 
		    $(".sidebar").slideDown();
			$("#Popover_1").hide();
			$(".model").hide();
			containerLayer.scaleX=containerLayer.scaleY=1;
			LTweenLite.to(containerLayer,.5,{delay:.1,x:LGlobal.width/2-1062/2-0,ease:Strong.easeOut,onComplete:function(){}});	

			 var goodsListHtml = '',
              $goodsList =  $(".dressing-room").find('.js-goods-list');
			$(xml).find("pic").each(function(i)
            {
				var thumb = modelurl+sex+"/model/"+model+"/"+$(this).attr("thumb");
				var head = modelurl+sex+"/model/"+model+"/"+$(this).attr("head");
				var headback = modelurl+sex+"/model/"+model+"/"+$(this).attr("headback");
				var Body = modelurl+sex+"/model/"+model+"/"+$(this).attr("body");
				var bodyback = modelurl+sex+"/model/"+model+"/"+$(this).attr("bodyback");
				var headleft=modelurl+sex+"/model/"+model+"/"+$(this).attr("headleft");
				var headright=modelurl+sex+"/model/"+model+"/"+$(this).attr("headright");
				var bodyleft=modelurl+sex+"/model/"+model+"/"+$(this).attr("bodyleft");
				var bodyright=modelurl+sex+"/model/"+model+"/"+$(this).attr("bodyright");
				var iid=i;
               // var lower = $(this).children("lower").text();
               goodsListHtml += '<li data-iid="' + iid + '" data-head="' + head + '"  data-headback="' + headback + '" data-body="' + Body + '" data-bodyback="' + bodyback + '"  data-headleft="' + headleft + '" data-headright="' + headright + '" data-bodyleft="' + bodyleft + '" data-bodyright="' + bodyright + '" onclick="clickhead(this)" class=""><img src="'+thumb+'" class="img"><p class="goods-name">模 特</li>';
            });
			
			$goodsList.empty();
			 $goodsList.html(goodsListHtml);
			 // $(".sidebar").find("li").css({"width":"80px"});
        }
    });
}

function clickhead(arg){
//
tempData.splice(0);
	tempData.push({name:"head",path:arg.getAttribute("data-head")});
	tempData.push({name:"body",path:arg.getAttribute("data-body")});
	tempData.push({name:"underwear",path:modelurl+sex+"/model/"+model+"/underwear.png"});
	tempData.push({name:"shadow",path:modelurl+sex+"/model/"+model+"/shadow.png"});
	if(model=='jc'){
	tempData.push({name:"head_left",path:arg.getAttribute("data-headleft")});
	tempData.push({name:"body_left",path:arg.getAttribute("data-bodyleft")});
	tempData.push({name:"underwear_left",path:modelurl+sex+"/model/"+model+"/underwear_left.png"});
	tempData.push({name:"shadow_left",path:modelurl+sex+"/model/"+model+"/shadow_back.png"});
	tempData.push({name:"head_right",path:arg.getAttribute("data-headright")});
	tempData.push({name:"body_right",path:arg.getAttribute("data-bodyright")});
	tempData.push({name:"underwear_right",path:modelurl+sex+"/model/"+model+"/underwear_right.png"});
	tempData.push({name:"shadow_right",path:modelurl+sex+"/model/"+model+"/shadow_back.png"});
	
	}else{
	tempData.push({name:"head_back",path:arg.getAttribute("data-headback")});
	tempData.push({name:"body_back",path:arg.getAttribute("data-bodyback")});
	tempData.push({name:"underwear_back",path:modelurl+sex+"/model/"+model+"/underwear_back.png"});
	tempData.push({name:"shadow_back",path:modelurl+sex+"/model/"+model+"/shadow_back.png"});
	}

	if(loadingLayer ==null){
	loadingLayer = new LoadingSample5();
	addChild(loadingLayer);
	}
	LLoadManage.load(
			tempData,
			function(progress){
				loadingLayer.setProgress(progress);
			},
			headInit
		);
//
}

function headInit(result){
	imglist["body"]=result["body"];
	imglist["head"]=result["head"];
	imglist["underwear"]=result["underwear"];
	imglist["shadow"]=result["shadow"];
	if(model=='jc'){
	imglist["body_left"]=result["body_left"];
	imglist["head_left"]=result["head_left"];
	imglist["underwear_left"]=result["underwear_left"];
	imglist["shadow_left"]=result["shadow_left"];
	imglist["body_right"]=result["body_right"];
	imglist["head_right"]=result["head_right"];
	imglist["underwear_right"]=result["underwear_right"];
	imglist["shadow_right"]=result["shadow_right"];
	}else {
	imglist["body_back"]=result["body_back"];
	imglist["head_back"]=result["head_back"];
	imglist["underwear_back"]=result["underwear_back"];
	imglist["shadow_back"]=result["shadow_back"];
	}
	
	
	if(view=='back'){
	var shadow = new LBitmap(new LBitmapData(imglist["shadow_back"]));
	var Body = new LBitmap(new LBitmapData(imglist["body_back"]));
	var underwear = new LBitmap(new LBitmapData(imglist["underwear_back"]));
	var head = new LBitmap(new LBitmapData(imglist["head_back"]));
	}else if(view=='left'){
	var shadow = new LBitmap(new LBitmapData(imglist["shadow_left"]));
	var Body = new LBitmap(new LBitmapData(imglist["body_left"]));
	var underwear = new LBitmap(new LBitmapData(imglist["underwear_left"]));
	var head = new LBitmap(new LBitmapData(imglist["head_left"]));
	}else if(view=='right'){
	var shadow = new LBitmap(new LBitmapData(imglist["shadow_right"]));
	var Body = new LBitmap(new LBitmapData(imglist["body_right"]));
	var underwear = new LBitmap(new LBitmapData(imglist["underwear_right"]));
	var head = new LBitmap(new LBitmapData(imglist["head_right"]));
	}else{
	var shadow = new LBitmap(new LBitmapData(imglist["shadow"]));
	var Body = new LBitmap(new LBitmapData(imglist["body"]));
	var underwear = new LBitmap(new LBitmapData(imglist["underwear"]));
	var head = new LBitmap(new LBitmapData(imglist["head"]));
	}
	
	modelLayer.die();
	modelLayer.removeAllChild();
	
	if(vertices.length>0){
	var tempLayer=new LSprite();	
	tempLayer.addChild(shadow);
	tempLayer.addChild(Body);
	//tempLayer.addChild(head);
	tempLayer.addChild(underwear);
	var bitmapData = new LBitmapData(null, 0, 0, 354, 600);	
	bitmapData.draw(tempLayer);
	
	modelLayer.graphics.clear();
	modelLayer.graphics.beginBitmapFill(bitmapData);
	modelLayer.graphics.drawTriangles(vertices, indices, uvtData);
	var rectLayer = new LSprite();
	rectLayer.graphics.drawRect(0,"#000000",[0, 0, 354,600],false,"#000000");
	modelLayer.addChild(rectLayer);

	}else{
	modelLayer.addChild(shadow);
	modelLayer.addChild(Body);
	Body.scaleY=Body.scaleX=600/Body.getHeight();
	underwear.name='underwear';
	modelLayer.addChild(underwear);
	}
	head.scaleY=head.scaleX=354/head.getWidth();
	modelLayer.addChild(head);
	head.name='head';

	removeChild(loadingLayer);
	loadingLayer = null;
}