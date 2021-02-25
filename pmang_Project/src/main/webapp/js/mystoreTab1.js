
//상품 목록
$(document).ready(function(){
	// 게시글 총 개수
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreItemCnt',
		dataType:'text',
		success:function(data){
			console.log(data);
			$('.tabName span').text(data);
		},
		error:function(err){
			console.log(err);
		}
	});
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreItemList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
			
			$('#selectCategory span').text(data.list.length);
			$('#mystoreSold span').text(data.list.length+'회');
		// $('li#default.tabmenu a span').text(data.list.length);
			$.each(data.list,function(index,items){
				console.log(items.item_state);
				if(items.item_state=='sold'){	// 판매완료일때
					
				/*
				 * $('<div/>').append($('<div/>',{
				 * 
				 * class:'storeItemFrame' }).append($('<a/>',{
				 * class:'itemLink', href:'#' }).append($('<div/>',{
				 * class:'itemImageArea' }).append($('<img
				 * src="/pmang/storage/'+items.img1+'" width="194px"
				 * height="194px" alt="상품 이미지"/>' )).append($('<div/>',{
				 * class:'imageAreaDiv' }))).append($('<div/>',{
				 * class:'itemSoldDiv', text:'판매완료' })) .append($('<div/>',{
				 * class:'itemContent' }).append($('<div/>',{ class:'itemName',
				 * text:items.itemSubject })).append($('<div/>',{
				 * class:'itemPriceAndTime' }).append($('<div/>',{
				 * class:'itemPrice', text:items.item_price })).append($('<div/>',{
				 * class:'itemTime' }).append($('<span/>',{
				 * text:timeCalc(items.logtime)
				 * }))))))).appendTo($('.storeSelection3'));
				 */
					// $('#mystoreTab1PagingDiv').html(data.mystoreTab1Paging.pagingHTML);
			

						var itemFrameDiv = '<div class="itemFrame"></div>';
						
						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:0.4"></a>';
						var itemContentDiv = '<div class="itemContent">';
						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
						itemContentDiv += '<div class="itemPriceAndTime">';
						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
						itemContentDiv += '</div>';
						itemContentDiv += '</div>';
						
						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
						itemloc += items.item_location +'</div>';
						 var soldout='<div class="itemSoldDiv">판매완료</div>';
						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).append($(soldout)).appendTo($('.storeSelection3'));
						
						// $('.itemLink img').css('opacity','0.4');
				}
				
				else if(items.item_state!='sold'){	// 판매완료가 아닐경우
					
		

					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:1"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.storeSelection3'));
					
					// $('.itemLink img').css('opacity','1');
				}

		})
		},
		error:function(err){
			console.log(err);
		}
	});

	
	var bool_sw=false;
	// 무한스크롤
	$(this).on("scroll",function(){
		var scrollHeight=$(document).height();
		var scrollPosition=$(window).height()+$(window).scrollTop();
		
		var pg=$('#pg').val();
		let cnt=$('.tabName span').text();
		
		if(scrollPosition>scrollHeight-800){
			if(cnt==$('.storeItemFrame').length){
				// console.log('길이가같아ㅏ');
				
				return false;
			}
			pg++;
			$.ajax({
				type:'post',
				url:'/pmang/board/getMystoreItemList',
				data:{'pg':pg},
				dataType:'json',
				success:function(data){
					console.log(JSON.stringify(data));
					
					bool_sw=true;
					$('#selectCategory span').text(data.list.length);
					$('#mystoreSold span').text(data.list.length+'회');
				// $('li#default.tabmenu a span').text(data.list.length);
					$.each(data.list,function(index,items){
						if(items.item_state=='sold'){	// 판매완료일때
							var itemFrameDiv = '<div class="itemFrame"></div>';
							
							var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
							itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:0.4"></a>';
							var itemContentDiv = '<div class="itemContent">';
							itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
							itemContentDiv += '<div class="itemPriceAndTime">';
							itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
							itemContentDiv += '</div>';
							itemContentDiv += '</div>';
							
							var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
							itemloc += items.item_location +'</div>';
							 var soldout='<div class="itemSoldDiv">판매완료</div>';
							$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).append($(soldout)).appendTo($('.storeSelection3'));
							
							// $('.itemLink img').css('opacity','0.4');
						}
						
						else if(items.item_state!='sold'){	// 판매완료가 아닐경우
							
				

							var itemFrameDiv = '<div class="itemFrame"></div>';
							
							var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
							itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:1"></a>';
							var itemContentDiv = '<div class="itemContent">';
							itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
							itemContentDiv += '<div class="itemPriceAndTime">';
							itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
							itemContentDiv += '</div>';
							itemContentDiv += '</div>';
							
							var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
							itemloc += items.item_location +'</div>';
							
							$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.storeSelection3'));
							
							// $('.itemLink img').css('opacity','1');
						}
				})
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});
	
	


// 날짜계싼
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
		return diff+'일전';
	}else if(result!=0){
		return result+'달전';
	}
	
	
}


// 최신순
$('#latest').on('click',function(){
	$('div.itemFrame').remove();

	$('#latest').css('color','green');
	$('#popularity').css('color','black');
	$('#lowerPrice').css('color','black');
	$('#highestPrice').css('color','black');
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreItemList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
			
			$('#selectCategory span').text(data.list.length);
			$('#mystoreSold span').text(data.list.length+'회');
		// $('li#default.tabmenu a span').text(data.list.length);
			$.each(data.list,function(index,items){
				if(items.item_state=='sold'){	// 판매완료일때
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:0.4"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					 var soldout='<div class="itemSoldDiv">판매완료</div>';
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).append($(soldout)).appendTo($('.storeSelection3'));
				}
				
				else if(items.item_state!='sold'){	// 판매완료가 아닐경우
					
		

var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:1"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.storeSelection3'));
					
					// $('.itemLink img').css('opacity','1');
				}
		});

		},
		error:function(err){
			console.log(err);
		}
	});
});
// 인기순
$('#popularity').click(function(){

	$('div.itemFrame').remove();

	
	$('#popularity').css('color','green');
	$('#latest').css('color','black');
	$('#lowerPrice').css('color','black');
	$('#highestPrice').css('color','black');
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreItemPopularList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
			
			$('#selectCategory span').text(data.list.length);
			$('#mystoreSold span').text(data.list.length+'회');
		// $('li#default.tabmenu a span').text(data.list.length);
			$.each(data.list,function(index,items){
				
				if(items.item_state=='sold'){	// 판매완료일때
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:0.4"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					 var soldout='<div class="itemSoldDiv">판매완료</div>';
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).append($(soldout)).appendTo($('.storeSelection3'));
				}
				
				else if(items.item_state!='sold'){	// 판매완료가 아닐경우
					
		

var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:1"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.storeSelection3'));
					
					// $('.itemLink img').css('opacity','1');
				}
		});

		},
		error:function(err){
			console.log(err);
		}
	});
});

// 저가순
$('#lowerPrice').click(function(){

	$('div.itemFrame').remove();

	
	$('#lowerPrice').css('color','green');
	$('#latest').css('color','black');
	$('#popularity').css('color','black');
	$('#highestPrice').css('color','black');
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreItemLowerPriceList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
			
			$('#selectCategory span').text(data.list.length);
			$('#mystoreSold span').text(data.list.length+'회');
		// $('li#default.tabmenu a span').text(data.list.length);
			$.each(data.list,function(index,items){
				if(items.item_state=='sold'){	// 판매완료일때
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:0.4"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					 var soldout='<div class="itemSoldDiv">판매완료</div>';
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).append($(soldout)).appendTo($('.storeSelection3'));
				}
				
				else if(items.item_state!='sold'){	// 판매완료가 아닐경우
					
		

var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:1"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.storeSelection3'));
					
					// $('.itemLink img').css('opacity','1');
				}
		});

		},
		error:function(err){
			console.log(err);
		}
	});
});

// 고가순
$('#highestPrice').click(function(){

	$('div.itemFrame').remove();

	
	$('#highestPrice').css('color','green');
	$('#latest').css('color','black');
	$('#lowerPrice').css('color','black');
	$('#popularity').css('color','black');
	
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getMystoreItemHighestPriceList',
		data:{'pg':$('#pg').val()},
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
			
			$('#selectCategory span').text(data.list.length);
			$('#mystoreSold span').text(data.list.length+'회');
		// $('li#default.tabmenu a span').text(data.list.length);
			$.each(data.list,function(index,items){

				if(items.item_state=='sold'){	// 판매완료일때
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:0.4"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					 var soldout='<div class="itemSoldDiv">판매완료</div>';
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).append($(soldout)).appendTo($('.storeSelection3'));
				}
				
				else if(items.item_state!='sold'){	// 판매완료가 아닐경우
					
		

var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지" style="opacity:1"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.storeSelection3'));
					
					// $('.itemLink img').css('opacity','1');
				}
		});

		},
		error:function(err){
			console.log(err);
		}


});
});


// 올린 시간 체크.
function timeForToday(value) {
    var today = new Date();
    var timeValue = new Date(value);
    
    var betweenSeconds = Math.floor((today.getTime() - timeValue.getTime()) / 1000);
    if (betweenSeconds < 60) {
        return betweenSeconds+'초전';
    }

    var betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    
    if (betweenTime < 60) {
        return betweenTime+'분전';
    }

    var betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return betweenTimeHour + '시간전';
    }

    var betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return betweenTimeDay+'일전';
    }

    return Math.floor(betweenTimeDay / 365)+'년전';
}

// 콤마!
function addComma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

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


// 아이템 클릭했을 때
$('.storeSelection3').on('click', '.itemLink', function(){

	var item_seq = $(this).children("#item_seqSpan").text();
	var itemSubject = $(this).find('.itemName').text();
	var itemPrice = $(this).find(".itemPrice").text();
	var img = $(this).children("img").attr('src');
	// alert($(this).children("#item_seqSpan").text());
	
	checkCookie(img, itemSubject, itemPrice, item_seq);
	
	
	location.href="/pmang/board/itemView?item_seq="+item_seq;
});

});
