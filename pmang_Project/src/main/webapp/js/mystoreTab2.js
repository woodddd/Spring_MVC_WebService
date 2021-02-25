
//찜 목록
$(document).ready(function(){
	//게시글 총 개수
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreWishCnt',
		dataType:'text',
		success:function(data){
			console.log(data);
			$('.tab2Name span').text(data);
		},
		error:function(err){
			console.log(err);
		}
	});
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreWishList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
		//	$('li#wish.tabmenu a span').text(data.list.length);
			$.each(data.list,function(index,items){
				
				//console.log(items.item_seq);
			
				if(items.item_state=='sold'){	//판매완료
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
									class:'wishitemSoldDiv',
									text:'판매완료'
								})).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
					
					$('.favImg').css('opacity','0.4');
					
				}else if(items.item_state!='sold'){
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList',
								href:'#'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
				}
				
				//$('#mystoreTab2PagingDiv').html(data.mystoreTab2Paging.pagingHTML);
				
				// 최근본상품 쿠키체크!
				function checkCookie(img, itemSubject, itemPrice, item_seq) {
				    var itemID = getCookie("itemID");
					var thisItem= img+':'+itemSubject+':'+itemPrice+':'+item_seq;
					
						if (itemID != "" && itemID != null) {
							if (itemID.indexOf(thisItem) == -1){ // 값이 없으면
								setCookie("itemID",thisItem+"&"+itemID, 1);
							 }
						} else if (itemID == "" || itemID == null) {
								setCookie("itemID",thisItem+"&", 1);
						}

				}
				
			//찜 상품 클릭했을 때 상품이동 -> itemView로
			$('.favList').on('click',function(){
				//alert('클릭');
				var item_seq=$(this).find("#chk_li").val();
				//alert(item_seq);
				
				var itemSubject=$(this).find(".favInfoName").text();
				var itemPrice=$(this).find(".favInfoPrice").text();
				var img=$(this).find("img").attr("src");
				
				//alert(item_seq+' '+itemSubject+' '+itemPrice+' '+img);
				
				checkCookie(img, itemSubject, itemPrice, item_seq);
				
				location.href="/pmang/board/itemView?item_seq="+item_seq;
			});
			});
		},error:function(err){
			console.log(err);
		}
	});
	
	
	var bool_sw=false;
	$(this).scroll(function(e){
		var scrollHeight=$(document).height();
		var scrollPosition=$(window).height()+$(window).scrollTop();
		
		var pg=$('#pg').val();
		
		let cnt=$('.tab2Name span').text();
		//console.log(cnt);
		//console.log($('.mystoreFavList').length);
		
		
		if(scrollPosition>scrollHeight-800){
			if(cnt==$('.mystoreFavList').length){
				
				return false;
			}
			
			pg++;
			
			$.ajax({
				type:'post',
				url:'/pmang/board/getMystoreWishList',
				data:{'pg':pg},
				dataType:'json',
				success:function(data){
					console.log(JSON.stringify(data));
					bool_sw=true;
				//	$('li#wish.tabmenu a span').text(data.list.length);
					$.each(data.list,function(index,items){
						
						//console.log(items.item_seq);
					
						if(items.item_state=='sold'){	//판매완료
							$('<div/>').append($('<div/>',{
								class:'mystoreFavList'
									}).append($('<a/>',{
										class:'favList'
									}).append($('<div/>',{
										class:'favChoice'
									}).append($('<input/>',{
										type:'checkbox',
										id:'chk_li',
										value:items.item_seq
									})).append($('<label/>',{
										for:'chk_li'
									}).append($('<span/>'
											)))).append($('<div/>',{
												class:'favImg'
											}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
										))).append($('<div/>',{
											class:'wishitemSoldDiv',
											text:'판매완료'
										})).append($('<div/>',{
										class:'favInfo'
									}).append($('<div/>',{
										class:'favInfoName',
										text:items.item_subject,
									})).append($('<div/>',{
										class:'favInfoPrice',
										text:items.item_price+'원'
									})).append($('<div/>',{
										class:'favInfoTime',
										text:timeCalc(items.logtime)
									})).append($('<div/>',{
										class:'favInfoLoc',
										text:items.item_location
									}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
											)))))).append($('<input/>',{
												type:'hidden',
												id:'item_seq',
												value:items.item_seq
											})).appendTo($('.mystoreFav'));
							
							$('.favImg').css('opacity','0.4');
							
						}else if(items.item_state!='sold'){
							$('<div/>').append($('<div/>',{
								class:'mystoreFavList'
									}).append($('<a/>',{
										class:'favList',
										href:'#'
									}).append($('<div/>',{
										class:'favChoice'
									}).append($('<input/>',{
										type:'checkbox',
										id:'chk_li',
										value:items.item_seq
									})).append($('<label/>',{
										for:'chk_li'
									}).append($('<span/>'
											)))).append($('<div/>',{
												class:'favImg'
											}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
										))).append($('<div/>',{
										class:'favInfo'
									}).append($('<div/>',{
										class:'favInfoName',
										text:items.item_subject,
									})).append($('<div/>',{
										class:'favInfoPrice',
										text:items.item_price+'원'
									})).append($('<div/>',{
										class:'favInfoTime',
										text:timeCalc(items.logtime)
									})).append($('<div/>',{
										class:'favInfoLoc',
										text:items.item_location
									}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
											)))))).append($('<input/>',{
												type:'hidden',
												id:'item_seq',
												value:items.item_seq
											})).appendTo($('.mystoreFav'));
						}
						
						//$('#mystoreTab2PagingDiv').html(data.mystoreTab2Paging.pagingHTML);
						
						// 최근본상품 쿠키체크!
						function checkCookie(img, itemSubject, itemPrice, item_seq) {
						    var itemID = getCookie("itemID");
							var thisItem= img+':'+itemSubject+':'+itemPrice+':'+item_seq;
							
								if (itemID != "" && itemID != null) {
									if (itemID.indexOf(thisItem) == -1){ // 값이 없으면
										setCookie("itemID",thisItem+"&"+itemID, 1);
									 }
								} else if (itemID == "" || itemID == null) {
										setCookie("itemID",thisItem+"&", 1);
								}

						}
						
					//찜 상품 클릭했을 때 상품이동 -> itemView로
					$('.favList').on('click',function(){
						//alert('클릭');
						var item_seq=$(this).find("#chk_li").val();
						//alert(item_seq);
						
						var itemSubject=$(this).find(".favInfoName").text();
						var itemPrice=$(this).find(".favInfoPrice").text();
						var img=$(this).find("img").attr("src");
						
						//alert(item_seq+' '+itemSubject+' '+itemPrice+' '+img);
						
						checkCookie(img, itemSubject, itemPrice, item_seq);
						
						location.href="/pmang/board/itemView?item_seq="+item_seq;
					});
					});
				},error:function(err){
					console.log(err);
				}
			});
			
		}
		
		//return false;
	});
});

//날짜계싼
function timeCalc(value){
	
	// 받아온 날짜 문자열 자르기
	var year=value.substring(0,4);
	var month=value.substring(5,7);
	var day=value.substring(8,10);
	
	var today=new Date();	// 현재 날짜
	var log=new Date(value);	// 받아온 날짜
	
	var diff=Math.floor((today.getTime()-log.getTime())/(1000*3500*24));
	// diff=Math.ceil(diff/(1000*3500*24));
	
	var result=Math.round(diff/30);
	// alert(diff+' '+result);
	if(result==0){
		if(diff==0){
			return '오늘';
		}else{
			
			return diff+'일전';
		}
	}else if(result!=0){
		return result+'달전';
	}
	
	
}


// 탭메뉴 - 찜 전체선택
$(document).on("click","input[id='choice_chk']",function(){
	
	
	
	var chk=$(this).is(":checked");
	if(chk){
		$(".favChoice input").prop('checked',true);
		
	}else{
		$(".favChoice input").prop('checked',false);
		
	}
});

//탭메뉴 - 찜(선택삭제) 유효성검사
$(document).on("click",".choiceDeleteBtn",function(){
	
	if(doubleSubmitCheck()) return;		// 중복클릭방지
	
	var cnt=$('input[id="chk_li"]:checked').length;
	var arr=new Array();
	$('input[id="chk_li"]:checked').each(function(){
		arr.push($(this).attr('value'));
	});
	
	if (cnt==0) {
		alert("삭제할 찜을 선택하세요.");
		$("#choice_chk").focus();
		
	}else{
		alert
		$.ajax({
			type:'post',
			url:'/pmang/board/wishListDelete',
			data:'item_seq='+arr+'&cnt='+cnt,
			dataType:'json',
			success:function(data){
				if(data>0){
					
					alert('찜 목록을 삭제했습니다.');
					location.href='/pmang/board/mystore?userid='+$('#memid').val();
				}
			},
			error:function(err){
				console.log(err);
			}
				
		});
	}
});

//최신순
$('#latest').on('click',function(){
	$('div.mystoreFavList').remove();
	$('#latest').css('color','green');
	$('#popularity').css('color','black');
	$('#lowerPrice').css('color','black');
	$('#highestPrice').css('color','black');
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreWishList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
		//	$('li#wish.tabmenu a span').text(data.list.length);
$.each(data.list,function(index,items){
				
				//console.log(items.item_seq);
			
				if(items.item_state=='sold'){	//판매완료
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
									class:'wishitemSoldDiv',
									text:'판매완료'
								})).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
					
					$('.favImg').css('opacity','0.4');
					
				}else if(items.item_state!='sold'){
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList',
								href:'#'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
				}
				
				//$('#mystoreTab2PagingDiv').html(data.mystoreTab2Paging.pagingHTML);
				
				// 최근본상품 쿠키체크!
				function checkCookie(img, itemSubject, itemPrice, item_seq) {
				    var itemID = getCookie("itemID");
					var thisItem= img+':'+itemSubject+':'+itemPrice+':'+item_seq;
					
						if (itemID != "" && itemID != null) {
							if (itemID.indexOf(thisItem) == -1){ // 값이 없으면
								setCookie("itemID",thisItem+"&"+itemID, 1);
							 }
						} else if (itemID == "" || itemID == null) {
								setCookie("itemID",thisItem+"&", 1);
						}

				}
				
			//찜 상품 클릭했을 때 상품이동 -> itemView로
			$('.favList').on('click',function(){
				//alert('클릭');
				var item_seq=$(this).find("#chk_li").val();
				//alert(item_seq);
				
				var itemSubject=$(this).find(".favInfoName").text();
				var itemPrice=$(this).find(".favInfoPrice").text();
				var img=$(this).find("img").attr("src");
				
				//alert(item_seq+' '+itemSubject+' '+itemPrice+' '+img);
				
				checkCookie(img, itemSubject, itemPrice, item_seq);
				
				location.href="/pmang/board/itemView?item_seq="+item_seq;
			});
			});
		},error:function(err){
			console.log(err);
		}
	});
});
//인기순
$('#popularity').click(function(){
	$('div.mystoreFavList').remove();
	
	$('#popularity').css('color','green');
	$('#latest').css('color','black');
	$('#lowerPrice').css('color','black');
	$('#highestPrice').css('color','black');
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreWishPopularList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
		//	$('li#wish.tabmenu a span').text(data.list.length);
$.each(data.list,function(index,items){
				
				//console.log(items.item_seq);
			
				if(items.item_state=='sold'){	//판매완료
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
									class:'wishitemSoldDiv',
									text:'판매완료'
								})).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
					
					$('.favImg').css('opacity','0.4');
					
				}else if(items.item_state!='sold'){
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList',
								href:'#'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
				}
				
				//$('#mystoreTab2PagingDiv').html(data.mystoreTab2Paging.pagingHTML);
				
				// 최근본상품 쿠키체크!
				function checkCookie(img, itemSubject, itemPrice, item_seq) {
				    var itemID = getCookie("itemID");
					var thisItem= img+':'+itemSubject+':'+itemPrice+':'+item_seq;
					
						if (itemID != "" && itemID != null) {
							if (itemID.indexOf(thisItem) == -1){ // 값이 없으면
								setCookie("itemID",thisItem+"&"+itemID, 1);
							 }
						} else if (itemID == "" || itemID == null) {
								setCookie("itemID",thisItem+"&", 1);
						}

				}
				
			//찜 상품 클릭했을 때 상품이동 -> itemView로
			$('.favList').on('click',function(){
				//alert('클릭');
				var item_seq=$(this).find("#chk_li").val();
				//alert(item_seq);
				
				var itemSubject=$(this).find(".favInfoName").text();
				var itemPrice=$(this).find(".favInfoPrice").text();
				var img=$(this).find("img").attr("src");
				
				//alert(item_seq+' '+itemSubject+' '+itemPrice+' '+img);
				
				checkCookie(img, itemSubject, itemPrice, item_seq);
				
				location.href="/pmang/board/itemView?item_seq="+item_seq;
			});
			});
		},error:function(err){
			console.log(err);
		}
	});
});

//저가순
$('#lowerPrice').click(function(){
	$('div.mystoreFavList').remove();
	
	$('#lowerPrice').css('color','green');
	$('#latest').css('color','black');
	$('#popularity').css('color','black');
	$('#highestPrice').css('color','black');
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreWishLowerPriceList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
		//	$('li#wish.tabmenu a span').text(data.list.length);
$.each(data.list,function(index,items){
				
				//console.log(items.item_seq);
			
				if(items.item_state=='sold'){	//판매완료
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
									class:'wishitemSoldDiv',
									text:'판매완료'
								})).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
					
					$('.favImg').css('opacity','0.4');
					
				}else if(items.item_state!='sold'){
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList',
								href:'#'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
				}
				
				//$('#mystoreTab2PagingDiv').html(data.mystoreTab2Paging.pagingHTML);
				
				// 최근본상품 쿠키체크!
				function checkCookie(img, itemSubject, itemPrice, item_seq) {
				    var itemID = getCookie("itemID");
					var thisItem= img+':'+itemSubject+':'+itemPrice+':'+item_seq;
					
						if (itemID != "" && itemID != null) {
							if (itemID.indexOf(thisItem) == -1){ // 값이 없으면
								setCookie("itemID",thisItem+"&"+itemID, 1);
							 }
						} else if (itemID == "" || itemID == null) {
								setCookie("itemID",thisItem+"&", 1);
						}

				}
				
			//찜 상품 클릭했을 때 상품이동 -> itemView로
			$('.favList').on('click',function(){
				//alert('클릭');
				var item_seq=$(this).find("#chk_li").val();
				//alert(item_seq);
				
				var itemSubject=$(this).find(".favInfoName").text();
				var itemPrice=$(this).find(".favInfoPrice").text();
				var img=$(this).find("img").attr("src");
				
				//alert(item_seq+' '+itemSubject+' '+itemPrice+' '+img);
				
				checkCookie(img, itemSubject, itemPrice, item_seq);
				
				location.href="/pmang/board/itemView?item_seq="+item_seq;
			});
			});
		},error:function(err){
			console.log(err);
		}
	});
});

//고가순
$('#highestPrice').click(function(){
	$('div.mystoreFavList').remove();
	
	$('#highestPrice').css('color','green');
	$('#latest').css('color','black');
	$('#lowerPrice').css('color','black');
	$('#popularity').css('color','black');
	
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreWishHighestPriceList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
		//	$('li#wish.tabmenu a span').text(data.list.length);
$.each(data.list,function(index,items){
				
				//console.log(items.item_seq);
			
				if(items.item_state=='sold'){	//판매완료
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
									class:'wishitemSoldDiv',
									text:'판매완료'
								})).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
					
					$('.favImg').css('opacity','0.4');
					
				}else if(items.item_state!='sold'){
					$('<div/>').append($('<div/>',{
						class:'mystoreFavList'
							}).append($('<a/>',{
								class:'favList',
								href:'#'
							}).append($('<div/>',{
								class:'favChoice'
							}).append($('<input/>',{
								type:'checkbox',
								id:'chk_li',
								value:items.item_seq
							})).append($('<label/>',{
								for:'chk_li'
							}).append($('<span/>'
									)))).append($('<div/>',{
										class:'favImg'
									}).append($('<img src="/pmang/storage/'+items.img1+'" width="139" height="100%" alt="찜한 상품이미지"/>' 
								))).append($('<div/>',{
								class:'favInfo'
							}).append($('<div/>',{
								class:'favInfoName',
								text:items.item_subject,
							})).append($('<div/>',{
								class:'favInfoPrice',
								text:items.item_price+'원'
							})).append($('<div/>',{
								class:'favInfoTime',
								text:timeCalc(items.logtime)
							})).append($('<div/>',{
								class:'favInfoLoc',
								text:items.item_location
							}).prepend($('<img src="../image/locationIcon.png" alt="위치 아이콘"/>'
									)))))).append($('<input/>',{
										type:'hidden',
										id:'item_seq',
										value:items.item_seq
									})).appendTo($('.mystoreFav'));
				}
				
				//$('#mystoreTab2PagingDiv').html(data.mystoreTab2Paging.pagingHTML);
				
				// 최근본상품 쿠키체크!
				function checkCookie(img, itemSubject, itemPrice, item_seq) {
				    var itemID = getCookie("itemID");
					var thisItem= img+':'+itemSubject+':'+itemPrice+':'+item_seq;
					
						if (itemID != "" && itemID != null) {
							if (itemID.indexOf(thisItem) == -1){ // 값이 없으면
								setCookie("itemID",thisItem+"&"+itemID, 1);
							 }
						} else if (itemID == "" || itemID == null) {
								setCookie("itemID",thisItem+"&", 1);
						}

				}
				
			//찜 상품 클릭했을 때 상품이동 -> itemView로
			$('.favList').on('click',function(){
				//alert('클릭');
				var item_seq=$(this).find("#chk_li").val();
				//alert(item_seq);
				
				var itemSubject=$(this).find(".favInfoName").text();
				var itemPrice=$(this).find(".favInfoPrice").text();
				var img=$(this).find("img").attr("src");
				
				//alert(item_seq+' '+itemSubject+' '+itemPrice+' '+img);
				
				checkCookie(img, itemSubject, itemPrice, item_seq);
				
				location.href="/pmang/board/itemView?item_seq="+item_seq;
			});
			});
		},error:function(err){
			console.log(err);
		}
	});

	
});