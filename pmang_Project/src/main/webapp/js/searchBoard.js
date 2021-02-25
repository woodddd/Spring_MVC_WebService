//올린 시간 체크.
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

//콤마!
function addComma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}



$(document).ready(function(){
	
	
	if($('#order').val() == ''){
		$('#order').val('최신순');
	}
	
	for(var i = 0; i < $('.searchResultOrder').children().length; i++){
		if($('.searchResultOrder').children().eq(i).text() == $('#order').val()){
			$('.searchResultOrder').children().eq(i).addClass('orderChoice');
		}
	}
	
	if($('#hashtag').val() == ''){
		$('.searchInput').val($('#search').val());
		var num = 0;
		$.ajax({
			type: 'post',
			url : '/pmang/board/indexSearchBoard',
			data : {'searchKeyword' : $("#search").val(), 'pg' : $('#pg').val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				console.log(JSON.stringify(data.bestItemList.length));
				if(data.bestItemList.length == 0){
					$('.search_catagoryDiv').remove();
					var zero = '<div class="zeroDiv">';
					zero += '<div class="zeroKeyword">'+$("#search").val()+'</div>';
					zero += '에 대한 검색결과가 없습니다.';
					zero += '</div>';
					
					var confirm = '<div class="confirmDiv">';
					confirm += '- 단어의 철자가 정확한지 확인해 보세요.<br>';
					confirm += '- 보다 일반적인 검색어로 다시 검색해 보세요.<br>';
					confirm += '- 검색어의 띄어쓰기를 다르게 해보세요<br>';
					confirm += '- 유해/금지어가 아닌지 확인해주세요<br>';
					confirm += '- 그만 괴롭혀주세요</div>';
					confirm += '</div>';
	
					$(zero).appendTo($('.zeroSearch'));
					$(confirm).appendTo($('.zeroSearch'));
					
				}else{
					$('.zeroSearch').remove();
				$.each(data.bestItemList, function(index, items){
					var bestA = '<a id="bestA">';
					bestA += '<div class="bestctg1">' + items.CATEGORY1 + '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAaVJREFUKBWFUz1LA0EQde9DIjaxSBNIG2shnR9whYVgIQqnjURikhP/QDqLVPoL9KJJEUHIgYggSFCs7K2tU6ZIrAwa73zvyB6bM8GB3Ox782Z2Z3YjZmCe5832er2WruvVYrH4Rm6aaQz0+/0ruC3f99v1en1xmpi85rpuNQiCfQL41HA4fGo0GhniSaYJIRZigQySnpGUivEhFKgqLmHwhzEBe7Ecx/lQee4QlEqlMsgbNYD1En4PGMicyodNI8nPZrN5+Ds1iPUKBnKLPk3JhwkElmUNk8nkHpIeZZAeR92Au4YPtVECg7Ztf5mmuY2kF2LFdmu12jmxUMho2Ww25weDQRtVlyOSYiHOxnaQwUQi4UMcSKz6PzuwQVS6h55njwycWy6Xj8Z2gIiYDY6JwbUw+mNm6/xIS6fTF1jnJaZHZU7NzuVyP8QGPzRM4RSVeYGqvWLUO5jetyTDI0FcgbgiyZHn09iE+FPlBZp0QPAoqr3jPlYLhUJXJbnmDmsxsgPx+iSxTDgYNcYGu4ZhUNyJFYlgeA98kXhknqZpJ//9RX8BYkCa7Y9z0J0AAAAASUVORK5CYII=" width="6" height="10" alt="화살표 아이콘"></div>';
					bestA += '<div class="bestctg2">' + items.CATEGORY2 + '</div>';
					if(items.CATEGORY3 != null){
						bestA += '<div class="bestctg3">' + items.CATEGORY3 + '</div>';
					}
					bestA += '<div class="bestCount">' + items.CNT3 + '개</div>';
					bestA += '</a>';
					
					$(bestA).appendTo($("#bestCategory"));
				});
				
				$.each(data.category1List, function(index, items){
					
					var ListA = "<div id='clickCategoryList'>";
					ListA += "<a id='clickCtg1A'>";
					ListA += "<div class='clickCtg1'>"+ items.CATEGORY1 + "</div>";
					ListA += "<div class='clickCtgCount'>" + items.CNT1 + '개</div>';
					ListA += "</a>";
					ListA += "</div>";
					
					$(ListA).appendTo($('.searchCtgListDiv'));
					
					num += 1;	
					
					if(num == 5){
						num = 0;
					}
					
				});
				
				if(5 % num != 0){
					for(var i = 0; i < Math.abs(5-num); i++){
						var emptyDiv = "<div id='emptyDiv'></div>";
						$(emptyDiv).appendTo($('.searchCtgListDiv'));
					}
				}
				
				$('#searchKeywordCount').text(data.totalSearchItem +'개');
				
				//목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				
				}
	
			},
			error : function(err){
				console.log(err)
			}
			
		}); //ajax 문 끝!
	}
	
	
	else if($('#hashtag').val() != ''){
		$('.searchInput').val($('#hashtag').val());
		var num = 0;
		$.ajax({
			type: 'post',
			url : '/pmang/board/hashtagBoard',
			data : {'hashtag' : $("#hashtag").val(), 'pg' : $('#pg').val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				console.log(JSON.stringify(data.bestItemList.length));
				if(data.bestItemList.length == 0){
					$('.search_catagoryDiv').remove();
					var zero = '<div class="zeroDiv">';
					zero += '<div class="zeroKeyword">'+$("#hashtag").val()+'</div>';
					zero += '에 대한 검색결과가 없습니다.';
					zero += '</div>';
					
					var confirm = '<div class="confirmDiv">';
					confirm += '- 단어의 철자가 정확한지 확인해 보세요.<br>';
					confirm += '- 보다 일반적인 검색어로 다시 검색해 보세요.<br>';
					confirm += '- 검색어의 띄어쓰기를 다르게 해보세요<br>';
					confirm += '- 유해/금지어가 아닌지 확인해주세요<br>';
					confirm += '- 그만 괴롭혀주세요</div>';
					confirm += '</div>';
	
					$(zero).appendTo($('.zeroSearch'));
					$(confirm).appendTo($('.zeroSearch'));
					
				}else{
					$('.zeroSearch').remove();
					$.each(data.bestItemList, function(index, items){
					var bestA = '<a id="bestA">';
					bestA += '<div class="bestctg1">' + items.CATEGORY1 + '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAaVJREFUKBWFUz1LA0EQde9DIjaxSBNIG2shnR9whYVgIQqnjURikhP/QDqLVPoL9KJJEUHIgYggSFCs7K2tU6ZIrAwa73zvyB6bM8GB3Ox782Z2Z3YjZmCe5832er2WruvVYrH4Rm6aaQz0+/0ruC3f99v1en1xmpi85rpuNQiCfQL41HA4fGo0GhniSaYJIRZigQySnpGUivEhFKgqLmHwhzEBe7Ecx/lQee4QlEqlMsgbNYD1En4PGMicyodNI8nPZrN5+Ds1iPUKBnKLPk3JhwkElmUNk8nkHpIeZZAeR92Au4YPtVECg7Ztf5mmuY2kF2LFdmu12jmxUMho2Ww25weDQRtVlyOSYiHOxnaQwUQi4UMcSKz6PzuwQVS6h55njwycWy6Xj8Z2gIiYDY6JwbUw+mNm6/xIS6fTF1jnJaZHZU7NzuVyP8QGPzRM4RSVeYGqvWLUO5jetyTDI0FcgbgiyZHn09iE+FPlBZp0QPAoqr3jPlYLhUJXJbnmDmsxsgPx+iSxTDgYNcYGu4ZhUNyJFYlgeA98kXhknqZpJ//9RX8BYkCa7Y9z0J0AAAAASUVORK5CYII=" width="6" height="10" alt="화살표 아이콘"></div>';
					bestA += '<div class="bestctg2">' + items.CATEGORY2 + '</div>';
					bestA += '<div class="bestctg3">' + items.CATEGORY3 + '</div>';
					bestA += '<div class="bestCount">' + items.CNT3 + '개</div>';
					bestA += '</a>';
					
					$(bestA).appendTo($("#bestCategory"));
				});
				
				$.each(data.category1List, function(index, items){
					
					var ListA = "<div id='clickCategoryList'>";
					ListA += "<a id='clickCtg1A'>";
					ListA += "<div class='clickCtg1'>"+ items.CATEGORY1 + "</div>";
					ListA += "<div class='clickCtgCount'>" + items.CNT1 + '개</div>';
					ListA += "</a>";
					ListA += "</div>";
					
					$(ListA).appendTo($('.searchCtgListDiv'));
					
					num += 1;
					
					if(num == 5){
						num = 0;
					}
					
					
				});
				
				if(5 % num != 0){
					for(var i = 0; i < 5-num; i++){
						var emptyDiv = "<div id='emptyDiv'></div>";
						$(emptyDiv).appendTo($('.searchCtgListDiv'));
					}
				}
				
				$('#searchKeywordCount').text(data.totalSearchItem +'개');
				
				//목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				
				}
	
			},
			error : function(err){
				console.log(err)
			}
			
		}); //ajax 문 끝!
	}
	
});//ready



//카테고리 1버튼 클릭할때,

$('.searchCtgListDiv').on('click', '#clickCtg1A', function(){
		var category1 = $(this).children('.clickCtg1').text();
		var category1Total = $(this).children('.clickCtgCount').text();
		$('#beforeCtgCount1').val(category1Total);
		$('#searchKeyword').text(category1);
		$('#searchKeywordCount').text(category1Total);
		
		//위에 있던거 다 비우자.
		$('.bestCatagoryDiv').empty();
		$('.searchCtgListDiv').empty();
		$('.searchItemList3').empty();
		
		var beforeCtgDiv = '<div class="beforeCtg">';
		beforeCtgDiv += '<a class="beforeA"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAT5JREFUeNqc1D1Iw1AUhuHUBlHBTTqIg6OLIDiICNpNxD8EKf5AcRUUZ0VdCu0qTg6CgyJanERxELq0g0q2Li5dikMHN6EqKPpeOBfCMUmDBx5KT/q1Nyf3NuF5nhOzJrGJDJptMUMbuMW0vHa5LQJJHEjQVhqnUcFuXGJK9V+QCwv24xqDqv+EeTSC7nEUjwGhK1lmw7zRwSWUkFL9gkzz3TZsMIE9nKPDF/jEGnbw4/8mVz54jFX1K69YQCVoCK5Mbk71nzGDWtjIzVK/nX+UCS7jTPUH8IDxqKAZQBb7agA9uJfhBAYdCeSwgg/f9XacIC+T/xO0dYEJ+5B9tY0iOsOCdluNoKr6iyijNyxoqo4x3Kn+sGzHoajz+IZZHKp+H3ZbHWTzjLewji/pmb2cjfsPcCSn/0ZW0fwVYABN5zteECERqgAAAABJRU5ErkJggg==" width="7" height="10" alt="이전 카테고리 아이콘"> 이전 카테고리 </a>';
		beforeCtgDiv += '<a class="resetA"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXdJREFUeNq8VoGNgzAMBNQFWIEV6AgwQn4EVqAjhBUYoYwAK2SEZ4RnBN6WjipvgZOX2liyEInhfHF8Sb7ve5bCbrGBzrmaHhV5jaGVva7rJeb7PMSIAHp6GA9AGgNO5AOBbt53nJShsUEFokD+uQWLGNsANoD9TF6Sf9HYdFNY2H+WgX9qAdLg/bpGCogjX/DMvHoZEWeCmwHr2p/U4MH0lU3SXwEcVoh3Kyhz9vcrEDaa45gxtK6FyMyI4rb+TlIYPaOByDoxN4ZAYLMsfKhGsk/G2F4OALlXHxF9DvzxJ4nN/Z0SVGSJLC0Qir5649UnGTlfTqB1HwGSct+9E+iPehOLb7Fsj0PmI88rC7XeQptB9g6rsY0AMWhcVu0Z7aIffBT0PBFIh8NtomxXxJVo8u4kfqG4NgRUIjvtRN2U+UMjndpHWN9WkaBKAXFnIME7A7HrcNaE+mpDYsOVEOcx1y0CbFDo5mQZXYzS56nudcm07leAAQCNm6zQoK6U9QAAAABJRU5ErkJggg==" width="13" height="13" alt="초기화 아이콘"> 초기화 </a>';
		beforeCtgDiv += '</div>'
		$(beforeCtgDiv).appendTo('.bestCatagoryDiv');
if($('#hashtag').val() == ''){		
		var num = 0;
		$.ajax({
			type : 'post',
			url : '/pmang/board/searchClickCtg1',
			data : {'category1' : category1, 'pg' : $('#pg').val(), searchKeyword : $("#search").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리2 버튼 생성
				$.each(data.category2List, function(index, items){
					
					var ListA = "<div id='clickCategoryList'>";
					ListA += "<a id='clickCtg2A'>";
					ListA += "<div class='clickCtg2'>"+ items.CATEGORY2 + "</div>";
					ListA += "<div class='clickCtgCount'>" + items.CNT2 + '개</div>';
					ListA += "</a>";
					ListA += "</div>";
					
					$(ListA).appendTo($('.searchCtgListDiv'));
					
					num += 1;	
					
					if(num == 5){
						num = 0;
					}
					
					
				});
				
				if(5 % num != 0){
					for(var i = 0; i < 5-num; i++){
						var emptyDiv = "<div id='emptyDiv'></div>";
						$(emptyDiv).appendTo($('.searchCtgListDiv'));
					}
				}
				
				//카테고리1 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
	}//search	
else {
		var num = 0;
		$.ajax({
			type : 'post',
			url : '/pmang/board/hashtagClickCtg1',
			data : {'category1' : category1, 'pg' : $('#pg').val(), hashtag : $("#hashtag").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리2 버튼 생성
				$.each(data.category2List, function(index, items){
					
					var ListA = "<div id='clickCategoryList'>";
					ListA += "<a id='clickCtg2A'>";
					ListA += "<div class='clickCtg2'>"+ items.CATEGORY2 + "</div>";
					ListA += "<div class='clickCtgCount'>" + items.CNT2 + '개</div>';
					ListA += "</a>";
					ListA += "</div>";
					
					$(ListA).appendTo($('.searchCtgListDiv'));
					
					num += 1;	
					
					if(num == 5){
						num = 0;
					}
					
				});
				
				if(5 % num != 0){
					for(var i = 0; i < 5-num; i++){
						var emptyDiv = "<div id='emptyDiv'></div>";
						$(emptyDiv).appendTo($('.searchCtgListDiv'));
					}
				}
				
				//카테고리1 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
		
	}//hashtag

});//click



//카테고리2 버튼 클릭할때,
$('.searchCtgListDiv').on('click', '#clickCtg2A', function(){
	var category2 = $(this).children('.clickCtg2').text();
	var category2Total = $(this).children('.clickCtgCount').text();
	$('#beforeCtg').val(category2);
	$('#beforeCtgCount2').val(category2Total);
	
	$('#searchKeyword').append($('<span id="ltSpan"> > </span><span id="ctg2Span">' + category2 + '</span>'));
	$('#searchKeyword').css('color','black');
	$('#ctg2Span').css('color', 'green');
	$('#searchKeywordCount').text(category2Total);
	
	
	//위에 있던거 다 비우자.
	$('.searchCtgListDiv').empty();
	$('.searchItemList3').empty();
	
	if($('#hashtag').val() == ''){	
		var num = 0;
		$.ajax({
			type : 'post',
			url : '/pmang/board/searchClickCtg2',
			data : {'category2' : category2, 'pg' : $('#pg').val(), searchKeyword : $("#search").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리3 버튼
				$.each(data.category3List, function(index, items){
					
					if(items.CATEGORY3 != null){
					
					var ListA = "<div id='clickCategoryList'>";
					ListA += "<a id='clickCtg3A'>";
					ListA += "<div class='clickCtg3'>"+ items.CATEGORY3 + "</div>";
					ListA += "<div class='clickCtgCount'>" + items.CNT3 + '개</div>';
					ListA += "</a>";
					ListA += "</div>";
					
					$(ListA).appendTo($('.searchCtgListDiv'));
					
					}
					
					num += 1;	
					
					if(num == 5){
						num = 0;
					}
					
				});
				
				if(5 % num != 0){
					for(var i = 0; i < 5-num; i++){
						var emptyDiv = "<div id='emptyDiv'></div>";
						$(emptyDiv).appendTo($('.searchCtgListDiv'));
					}
				}
				
				//카테고리2 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
	}//search
	
	else{
		var num = 0;
		$.ajax({
			type : 'post',
			url : '/pmang/board/hashtagClickCtg2',
			data : {'category2' : category2, 'pg' : $('#pg').val(), hashtag : $("#hashtag").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리3 버튼
				$.each(data.category3List, function(index, items){
					
					if(items.CATEGORY3 != null){
						
						var ListA = "<div id='clickCategoryList'>";
						ListA += "<a id='clickCtg3A'>";
						ListA += "<div class='clickCtg3'>"+ items.CATEGORY3 + "</div>";
						ListA += "<div class='clickCtgCount'>" + items.CNT3 + '개</div>';
						ListA += "</a>";
						ListA += "</div>";
						
						$(ListA).appendTo($('.searchCtgListDiv'));
						
						}
					
					num += 1;	
					if(num == 5){
						num = 0;
					}
					
				});
				
				if(5 % num != 0){
					for(var i = 0; i < 5-num; i++){
						var emptyDiv = "<div id='emptyDiv'></div>";
						$(emptyDiv).appendTo($('.searchCtgListDiv'));
					}
				}
				
				//카테고리2 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
	}//hashtag
});//click


//카테고리3 버튼 클릭할 때,
$('.searchCtgListDiv').on('click', '#clickCtg3A', function(){
	var category2 = $('#ctg2Span').text();
	var category3 = $(this).children('.clickCtg3').text();
	var category3Total = $(this).children('.clickCtgCount').text();
	$('#ctg2Span').text(category3);
	$('#searchKeywordCount').text(category3Total);
	
	//위에 있던거 다 비우자.
	$('.searchCtgListDiv').empty();
	$('.searchItemList3').empty();
	
	if($('#hashtag').val() == ''){	
		$.ajax({
			type : 'post',
			url : '/pmang/board/searchClickCtg3',
			data : {'category2' : category2, 'category3' : category3, 'pg' : $('#pg').val(), searchKeyword : $("#search").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리3 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
	}//search
	
	else{
		$.ajax({
			type : 'post',
			url : '/pmang/board/hashtagClickCtg3',
			data : {'category2' : category2, 'category3' : category3, 'pg' : $('#pg').val(), hashtag : $("#hashtag").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리3 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
	}//hashtag
	
});//click



//이전 카테고리를 눌렀을 때,
$('.bestCatagoryDiv').on('click', '.beforeA', function(){
	//alert('눌리긴하니')
	if(!$('.searchCtgListDiv').children().length){
		var category2 = $('#beforeCtg').val();
		//var category2Total = $('#beforeCtgCount2').val();
		$('#ltSpan').remove();
		$('#ctg2Span').remove();
		$('#searchKeyword').append($('<span id="ltSpan"> > </span><span id="ctg2Span">' + category2 + '</span>'));
		$('#ctg2Span').css('color', 'green');
		
		
		$('.searchItemList3').empty();
		
		
		if($('#hashtag').val() == ''){	
			var num = 0;
			$.ajax({
				type : 'post',
				url : '/pmang/board/searchClickCtg2',
				data : {'category2' : category2, 'pg' : $('#pg').val(), searchKeyword : $("#search").val(), 'order' : $('#order').val()},
				dataType : 'json',
				success : function(data){
					//카테고리3 버튼
					$.each(data.category3List, function(index, items){
						
						if(items.CATEGORY3 != null){
							
							var ListA = "<div id='clickCategoryList'>";
							ListA += "<a id='clickCtg3A'>";
							ListA += "<div class='clickCtg3'>"+ items.CATEGORY3 + "</div>";
							ListA += "<div class='clickCtgCount'>" + items.CNT3 + '개</div>';
							ListA += "</a>";
							ListA += "</div>";
							
							$(ListA).appendTo($('.searchCtgListDiv'));
							
							}
						else {
							if($('#hashtag').val() == ''){
								location.href='/pmang/board/searchBoard?search='+$('#search').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
							}else {
								location.href='/pmang/board/searchBoard?hashtag='+$('#hashtag').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
							}
						}
						
						num += 1;	
						
						if(num == 5){
							num = 0;
						}
						
					});
					
					if(5 % num != 0){
						for(var i = 0; i < 5-num; i++){
							var emptyDiv = "<div id='emptyDiv'></div>";
							$(emptyDiv).appendTo($('.searchCtgListDiv'));
						}
					}
					
					//카테고리2 목록
					$.each(data.itemList, function(index, items){
						
						var itemFrameDiv = '<div class="itemFrame"></div>';
						
						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
						var itemContentDiv = '<div class="itemContent">';
						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
						itemContentDiv += '<div class="itemPriceAndTime">';
						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
						itemContentDiv += '</div>';
						itemContentDiv += '</div>';
						
						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
						itemloc += items.item_location +'</div>';
						
						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
						
					});
					
					var category2Total = $('.itemFrame').length;
					$('#searchKeywordCount').text(category2Total + '개');
					
					//페이징
					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				},
				error : function(err){
					console.log(err);
				}
			});//ajax
		}//search
		else {
			var num = 0;
			$.ajax({
				type : 'post',
				url : '/pmang/board/hashtagClickCtg2',
				data : {'category2' : category2, 'pg' : $('#pg').val(), hashtag : $("#hashtag").val(), 'order' : $('#order').val()},
				dataType : 'json',
				success : function(data){
					//카테고리3 버튼
					$.each(data.category3List, function(index, items){
						
						if(items.CATEGORY3 != null){
							
							var ListA = "<div id='clickCategoryList'>";
							ListA += "<a id='clickCtg3A'>";
							ListA += "<div class='clickCtg3'>"+ items.CATEGORY3 + "</div>";
							ListA += "<div class='clickCtgCount'>" + items.CNT3 + '개</div>';
							ListA += "</a>";
							ListA += "</div>";
							
							$(ListA).appendTo($('.searchCtgListDiv'));
							
							}
						else {
							if($('#hashtag').val() == ''){
								location.href='/pmang/board/searchBoard?search='+$('#search').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
							}else {
								location.href='/pmang/board/searchBoard?hashtag='+$('#hashtag').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
							}
						}
						
						num += 1;	
						
						if(num == 5){
							num = 0;
						}
						
					});
					
					if(5 % num != 0){
						for(var i = 0; i < 5-num; i++){
							var emptyDiv = "<div id='emptyDiv'></div>";
							$(emptyDiv).appendTo($('.searchCtgListDiv'));
						}
					}
					
					//카테고리2 목록
					$.each(data.itemList, function(index, items){
						
						var itemFrameDiv = '<div class="itemFrame"></div>';
						
						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
						var itemContentDiv = '<div class="itemContent">';
						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
						itemContentDiv += '<div class="itemPriceAndTime">';
						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
						itemContentDiv += '</div>';
						itemContentDiv += '</div>';
						
						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
						itemloc += items.item_location +'</div>';
						
						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
						
					});
					
					var category2Total = $('.itemFrame').length;
					$('#searchKeywordCount').text(category2Total + '개');
					
					//페이징
					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				},
				error : function(err){
					console.log(err);
				}
			});//ajax
		}//hashtag
	}//if
	else if($('#clickCtg3A').length){
		//카테고리1 버튼 클릭 한 후.
		$('#ltSpan').remove();
		$('#ctg2Span').remove();
		var category1 = $('#searchKeyword').text();
		//alert($('#searchKeyword').text())
/*		var category1Total = $('#beforeCtgCount1').val();
		$('#searchKeywordCount').text(category1Total);*/
		$('#searchKeyword').css('color','green');
		//위에 있던거 다 비우자.
		$('.searchCtgListDiv').empty();
		$('.searchItemList3').empty();
			
		
		if($('#hashtag').val() == ''){
			var num = 0;
			$.ajax({
				type : 'post',
				url : '/pmang/board/searchClickCtg1',
				data : {'category1' : category1, 'pg' : $('#pg').val(), searchKeyword : $("#search").val(), 'order' : $('#order').val()},
				dataType : 'json',
				success : function(data){
					//카테고리2 버튼 생성
					$.each(data.category2List, function(index, items){
						
						var ListA = "<div id='clickCategoryList'>";
						ListA += "<a id='clickCtg2A'>";
						ListA += "<div class='clickCtg2'>"+ items.CATEGORY2 + "</div>";
						ListA += "<div class='clickCtgCount'>" + items.CNT2 + '개</div>';
						ListA += "</a>";
						ListA += "</div>";
						
						$(ListA).appendTo($('.searchCtgListDiv'));
						
						num += 1;	
						
						if(num == 5){
							num = 0;
						}
						
					});
					
					if(5 % num != 0){
						for(var i = 0; i < 5-num; i++){
							var emptyDiv = "<div id='emptyDiv'></div>";
							$(emptyDiv).appendTo($('.searchCtgListDiv'));
						}
					}
					
					//카테고리1 목록
					$.each(data.itemList, function(index, items){
						
						var itemFrameDiv = '<div class="itemFrame"></div>';
						
						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
						var itemContentDiv = '<div class="itemContent">';
						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
						itemContentDiv += '<div class="itemPriceAndTime">';
						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
						itemContentDiv += '</div>';
						itemContentDiv += '</div>';
						
						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
						itemloc += items.item_location +'</div>';
						
						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
						
					});
					
					var category1Total = $('.itemFrame').length;
					$('#searchKeywordCount').text(category1Total + '개');
					
					//페이징
					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				},
				error : function(err){
					console.log(err);
				}
			});//ajax
		}//search
		else {
			var num = 0;
			$.ajax({
				type : 'post',
				url : '/pmang/board/hashtagClickCtg1',
				data : {'category1' : category1, 'pg' : $('#pg').val(), hashtag : $("#hashtag").val(), 'order' : $('#order').val()},
				dataType : 'json',
				success : function(data){
					//카테고리2 버튼 생성
					$.each(data.category2List, function(index, items){
						
						var ListA = "<div id='clickCategoryList'>";
						ListA += "<a id='clickCtg2A'>";
						ListA += "<div class='clickCtg2'>"+ items.CATEGORY2 + "</div>";
						ListA += "<div class='clickCtgCount'>" + items.CNT2 + '개</div>';
						ListA += "</a>";
						ListA += "</div>";
						
						$(ListA).appendTo($('.searchCtgListDiv'));
						
						num += 1;	
						
						if(num == 5){
							num = 0;
						}
						
					});
					
					if(5 % num != 0){
						for(var i = 0; i < 5-num; i++){
							var emptyDiv = "<div id='emptyDiv'></div>";
							$(emptyDiv).appendTo($('.searchCtgListDiv'));
						}
					}
					
					//카테고리1 목록
					$.each(data.itemList, function(index, items){
						
						var itemFrameDiv = '<div class="itemFrame"></div>';
						
						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
						var itemContentDiv = '<div class="itemContent">';
						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
						itemContentDiv += '<div class="itemPriceAndTime">';
						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
						itemContentDiv += '</div>';
						itemContentDiv += '</div>';
						
						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
						itemloc += items.item_location +'</div>';
						
						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
						
					});
					
					var category1Total = $('.itemFrame').length;
					$('#searchKeywordCount').text(category1Total + '개');
					
					//페이징
					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				},
				error : function(err){
					console.log(err);
				}
			});//ajax
		}//hashtag
	}else {
		if($('#hashtag').val() == ''){
			location.href='/pmang/board/searchBoard?search='+$('#search').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
		}else {
			location.href='/pmang/board/searchBoard?hashtag='+$('#hashtag').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
		}
	}
});



//인기카테고리 선택했을 때,
$('#bestCategory').on('click','#bestA',function(){
	$('#pg').val(1);

	var category1 = $(this).children().first().text().trim();
	var category2 = $(this).children('.bestctg2').text();
	$('#beforeCtg').val(category2);
	var category3 = $(this).children('.bestctg3').text();
	var category3Total = $(this).children('.bestCount').text();
	
	//위에 있던거 다 비우자.
	$('.bestCatagoryDiv').empty();
	$('.searchCtgListDiv').empty();
	$('.searchItemList3').empty();
	
	var beforeCtgDiv = '<div class="beforeCtg">';
	beforeCtgDiv += '<a class="beforeA"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAT5JREFUeNqc1D1Iw1AUhuHUBlHBTTqIg6OLIDiICNpNxD8EKf5AcRUUZ0VdCu0qTg6CgyJanERxELq0g0q2Li5dikMHN6EqKPpeOBfCMUmDBx5KT/q1Nyf3NuF5nhOzJrGJDJptMUMbuMW0vHa5LQJJHEjQVhqnUcFuXGJK9V+QCwv24xqDqv+EeTSC7nEUjwGhK1lmw7zRwSWUkFL9gkzz3TZsMIE9nKPDF/jEGnbw4/8mVz54jFX1K69YQCVoCK5Mbk71nzGDWtjIzVK/nX+UCS7jTPUH8IDxqKAZQBb7agA9uJfhBAYdCeSwgg/f9XacIC+T/xO0dYEJ+5B9tY0iOsOCdluNoKr6iyijNyxoqo4x3Kn+sGzHoajz+IZZHKp+H3ZbHWTzjLewji/pmb2cjfsPcCSn/0ZW0fwVYABN5zteECERqgAAAABJRU5ErkJggg==" width="7" height="10" alt="이전 카테고리 아이콘"> 이전 카테고리 </a>';
	beforeCtgDiv += '<a class="resetA"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXdJREFUeNq8VoGNgzAMBNQFWIEV6AgwQn4EVqAjhBUYoYwAK2SEZ4RnBN6WjipvgZOX2liyEInhfHF8Sb7ve5bCbrGBzrmaHhV5jaGVva7rJeb7PMSIAHp6GA9AGgNO5AOBbt53nJShsUEFokD+uQWLGNsANoD9TF6Sf9HYdFNY2H+WgX9qAdLg/bpGCogjX/DMvHoZEWeCmwHr2p/U4MH0lU3SXwEcVoh3Kyhz9vcrEDaa45gxtK6FyMyI4rb+TlIYPaOByDoxN4ZAYLMsfKhGsk/G2F4OALlXHxF9DvzxJ4nN/Z0SVGSJLC0Qir5649UnGTlfTqB1HwGSct+9E+iPehOLb7Fsj0PmI88rC7XeQptB9g6rsY0AMWhcVu0Z7aIffBT0PBFIh8NtomxXxJVo8u4kfqG4NgRUIjvtRN2U+UMjndpHWN9WkaBKAXFnIME7A7HrcNaE+mpDYsOVEOcx1y0CbFDo5mQZXYzS56nudcm07leAAQCNm6zQoK6U9QAAAABJRU5ErkJggg==" width="13" height="13" alt="초기화 아이콘"> 초기화 </a>';
	beforeCtgDiv += '</div>'
	$(beforeCtgDiv).appendTo('.bestCatagoryDiv');
	
	$('#searchKeyword').text(category1);
	$('#searchKeyword').append($('<span id="ltSpan"> > </span><span id="ctg2Span">' + category3 + '</span>'));
	$('#searchKeywordCount').text(category3Total);
	
	$('#searchKeyword').css('color','black');
	$('#ctg2Span').css('color', 'green');
	
	if($('#hashtag').val() == ''){
		$.ajax({
			type : 'post',
			url : '/pmang/board/searchClickCtg3',
			data : {'category2' : category2, 'category3' : category3, 'pg' : $('#pg').val(), searchKeyword : $("#search").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리3 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
	}//search
	else {
		$.ajax({
			type : 'post',
			url : '/pmang/board/hashtagClickCtg3',
			data : {'category2' : category2, 'category3' : category3, 'pg' : $('#pg').val(), hashtag : $("#hashtag").val(), 'order' : $('#order').val()},
			dataType : 'json',
			success : function(data){
				//카테고리3 목록
				$.each(data.itemList, function(index, items){
					
					var itemFrameDiv = '<div class="itemFrame"></div>';
					
					var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
					itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
					var itemContentDiv = '<div class="itemContent">';
					itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
					itemContentDiv += '<div class="itemPriceAndTime">';
					itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
					itemContentDiv += '</div>';
					itemContentDiv += '</div>';
					
					var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
					itemloc += items.item_location +'</div>';
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.searchItemList3'));
					
				});
				
				//페이징
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error : function(err){
				console.log(err);
			}
		});//ajax
	}//hashtag
	

});//click


//초기화버튼 눌렀을 때,
$('.bestCatagoryDiv').on('click', '.resetA', function(){
	if($('#hashtag').val() == ''){
		location.href='/pmang/board/searchBoard?search='+$('#search').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
	}else {
		location.href='/pmang/board/searchBoard?hashtag='+$('#hashtag').val()+'&pg='+$('#pg').val()+'&order='+$('#order').val();
	}
});

//order클릭
$('.searchResultOrder').on('click','a',function(){
	if($('#hashtag').val() == ''){
		location.href='/pmang/board/searchBoard?search='+$('#search').val()+'&pg='+$('#pg').val()+'&order='+$(this).text();
	}else {
		location.href='/pmang/board/searchBoard?hashtag='+$('#hashtag').val()+'&pg='+$('#pg').val()+'&order='+$(this).text();
	}
});




//아이템 클릭했을 때
$('.searchItemList3').on('click', '.itemLink', function(){
	var item_seq = $(this).children("#item_seqSpan").text();
	var itemSubject = $(this).find('.itemName').text();
	var itemPrice = $(this).find(".itemPrice").text();
	var img = $(this).children("img").attr('src');
	//alert($(this).children("#item_seqSpan").text());
	
	checkCookie(img, itemSubject, itemPrice, item_seq);

	location.href="/pmang/board/itemView?item_seq="+item_seq;
});


//페이징
function boardPaging(pg){
	if($('#hashtag').val() == ''){
		location.href='/pmang/board/searchBoard?search='+$('#search').val()+'&pg='+pg+'&order='+$('#order').val();
	}else {
		location.href='/pmang/board/searchBoard?hashtag='+$('#hashtag').val()+'&pg='+pg+'&order='+$('#order').val();
	}
}


//최근본상품 쿠키
function checkCookie(img, itemSubject, itemPrice, item_seq) {
    var itemID = getCookie("itemID");
	var thisItem= img+':'+itemSubject+':'+itemPrice+':'+item_seq;
	
		if (itemID != "" && itemID != null) {
			if (itemID.indexOf(thisItem) == -1){ //값이 없으면 
				setCookie("itemID",thisItem+"&"+itemID, 1);
			 }
		} else if (itemID == "" || itemID == null) {
				setCookie("itemID",thisItem+"&", 1);
		}

}
