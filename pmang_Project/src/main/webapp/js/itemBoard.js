/*카테고리 펼쳐지는 부분*/
$('.selectItem1').hover(function(){
	$('.down1').css('display', 'block')
},
function(){
	$('.down1').css('display', 'none')
});

$('.selectItem2').hover(function(){
	$('.down2').css('display', 'block')
},
function(){
	$('.down2').css('display', 'none')
});

$('.selectItem3').hover(function(){
	$('.down3').css('display', 'block')
},
function(){
	$('.down3').css('display', 'none')
});


/* var firstCategory = ['패션', '디지털/가전', '도서/티켓', '리빙용품', '스포츠/레저', '뷰티/미용', '유아/출산', '기타', '커뮤니티' ] */
/*  secondCategory 종류  */
var fashion = ['여성의류', '남성의류', '패션잡화', '', ''];
	var women = ['아우터','티셔츠','니트','셔츠/블라우스','맨투맨/후드집업','원피스/세트','바지','스커트','',''];
	var men = ['아우터','티셔츠','니트','셔츠','맨투맨/후드집업','바지','','','',''];
	var goods = ['가방','신발','액세서리','시계','모자'];

var digital = ['모바일', '가전제품', '음반/영상기기', '컴퓨터/주변기기', '카메라', '게임', '', '', '',''];
	var mobile = ['스마트폰', '태블릿', '액세서리/주변기기','',''];
	var home = ['소형가전(밥솥/다리미)', '대형가전(냉장고/세탁기/TV)', '미용가전', '사무용품',''];
	var music = ['음향기기','비디오/프로젝터','CD/DVD/음반','',''];
	var pc = ['데스크탑', '키보드/마우스', '모니터', 'CPU/메인보드/메모리/HDD/SDD', '노트북/넷북', '기타 액세서리','','','',''];
	var camera = ['DSLR/미러리스','필름카메라','디지털 카메라','기타 액세서리',''];
	var game = ['pc게임', '콘솔 게임', '게임 타이틀','',''];
var book = ['도서', '티켓', '', '',''];
	var read = ['학습/사전/참고서', '만화/아동', '인문/교양/소설', '경영/경제/사회', '과학/컴퓨터/인터넷','예술/디자인','기타 도서','','',''];
	var ticket = ['기프티콘/쿠폰/상품권','예매권/항공권','','',''];
var living = ['생활용품', '가구', '주방용품', '',''];
	var daily = ['문구/학습', '침구', '욕실','',''];
	var furniture = ['거실가구', '생활가구', '사무용가구', '인테리어 소품',''];
	var kitchen = ['식기세트','냄비/프라이팬','조리도구','수저/커트러리','컵/잔/텀블러', '주방 잡화','밀폐용기','커피용품','',''];
var sports = ['실내', '실외', '', '',''];
	var indoor = ['헬스','요가','골프','수영',''];
	var out = ['축구', '야구', '농구','자전거/킥보드','등산','낚시/캠핑','','','',''];
var beauty = ['스킨케어', '메이크업', '헤어/바디', '향수/아로마', '네일아트/케어', '뷰티소품','','','',''];
	var skin = ['클렌칭/스크럽','스킨/토너/미스트','로션/에멀젼','에센스/크림','팩/마스크','썬케어','','','',''];
	var makeup = ['색조메이크업','베이스메이크업','','',''];
	var hair = ['샴푸/린스/트리트먼트','헤어스타일링','바티클렌저/로션','헤어/핸드/풋케어',''];
	var perfume = ['여성향수','남성향수','공용향수','',''];
	var nailArt = ['네일아트/스티커','매니큐어/페디큐어','네일케어도구','',''];
	var beautyTool = ['브러시/퍼프','파우치/정리함','거울','',''];
var child = ['영아의류(-2세)', '여아의류(3-6세)', '남아의류(3-6세)', '육아잡화', '동화책/완구/인형/장난감'];
	var baby = ['상의', '하의', '기타','',''];
	var girl = ['원피스/세트', '아우터','상하의','티셔츠','바지','치마','','','',''];
	var boy = ['아우터','상하의','티셔츠','바지','남방'];
	var babygoods = ['신발','모자','가방','양말',''];
	var fairy = ['인형','교육/완구','장난감','물놀이도구','놀이터도구'];
var others = ['피망나눔','차량,오토바이', '기타','',''];


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


//처음 카테고리 클릭해서 들어왔을 때 -> 최신순으로 아이템 보여줌. 카테고리1, 2, 3 중 뭐가 들어왔는 지 확인해서 detailListDiv를 생성.
$(document).ready(function(){
	//파람에 order가 없으면 최신순으로
	if($('#order').val() == ''){
		$('#order').val('최신순');
	}
	
	if($('#location').val() != ''){
		$('#detailAddr').text($('#location').val());
	};
	
	/*if($('#pg').val() == ''){
		$('#pg').val(1);
	}
	*/
	//파람에 온 값과 orderby에 있는 text와 같으면 내가 선택한 orderChoice.
	for(var i = 0; i < $('.orderby').children().length; i++){
		if($('.orderby').children().eq(i).text() == $('#order').val()){
			$('.orderby').children().eq(i).addClass('orderChoice');
		}
	}
	
	
	//모든 프레임 삭제
	$('.itemFrame').remove();
	
	//카테고리1만 들어왔을 때,
	if($('.top2').text().trim() == ""){
		$.ajax({
			type: 'post',
			url: '/pmang/board/getitemBoardList',
			data : {'category1' : $('.top1').text().trim(), 'pg' : $("#pg").val(), 'order' : $('#order').val(), 'location' : $('#location').val()},
			dataType : 'json',
			success: function(data){
				//alert(JSON.stringify(data));
				$.each(data.itemBoardList, function(index, items){
					
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
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
				});
				
				var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
				$("#findItemH2").append($(entireItemNumSpan));
				
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				
				
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	//카테고리 1, 2만 들어왔을 때,
	else if($('.top3').text().trim() == ""){
		$.ajax({
			type: 'post',
			url: '/pmang/board/getitemBoardList',
			data : {'category1': $('.top1').text().trim(), 'category2':$('.top2').text().trim(), 'pg' : $("#pg").val(), 'order' : $('#order').val(), 'location' : $('#location').val()},
			dataType : 'json',
			success: function(data){
				$.each(data.itemBoardList, function(index, items){
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
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
				});
				
				var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
				$("#findItemH2").append($(entireItemNumSpan));
				
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	//카테고리 1,2,3 다 있을 때
	else{
		$.ajax({
			type: 'post',
			url: '/pmang/board/getitemBoardList',
			data : {'category1': $('.top1').text().trim(), 'category2':$('.top2').text().trim(), 'category3':$('.top3').text().trim(), 'pg' : $("#pg").val(), 'order' : $('#order').val(), 'location' : $('#location').val()},
			dataType : 'json',
			success: function(data){
				$.each(data.itemBoardList, function(index, items){
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
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
				});
				
				var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
				$("#findItemH2").append($(entireItemNumSpan));
				
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	

	
	//카테고리1 선택
	for(var i=0; i<$('.down1').children().length; i++){
		if($('.down1').children().eq(i).text().trim() == $('.top1').text().trim()){
			$('.down1').children().eq(i).addClass('select1');
		}
	}
	
	
	//카테고리1이 select로 들어왔을 때, 카테고리2를 보여줄 detailItem 설치!
	 if($('.select1').text() == '패션'){
			for(var i = 0; i < fashion.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">'
				if(fashion[i] == ""){
					div += '<a id="clickno">' + fashion[i] + '</a></div>'
				}else {
					
					div += '<a>' + fashion[i] + '</a><div id="itemCount">0개</div></div>';
					$('.down2').append('<a href="#">'+fashion[i]+'</a>');
				}
				
				$('.detailItem').append(div);
				
			
			}		
		}else if($('.select1').text() == '디지털/가전'){
			for(var i = 0; i < digital.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
				if(digital[i] == ""){
					div += '<a id="clickno">' + digital[i] + '</a></div>'
				}else {
					div += '<a>' + digital[i] + '</a><div id="itemCount">0개</div></div>';
					$('.down2').append('<a href="#">'+digital[i]+'</a>');
				}
				

				$('.detailItem').append(div);
			}
		}else if($('.select1').text() == '도서/티켓'){
			for(var i = 0; i < book.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
				if(book[i] == ""){
					div += '<a id="clickno">' + book[i] + '</a></div>'
				}else {
					div += '<a>' + book[i] + '</a><div id="itemCount">0개</div></div>';
					
					$('.down2').append('<a href="#">'+book[i]+'</a>');
				}
				

				$('.detailItem').append(div);
			}
		}else if($('.select1').text() == '리빙용품'){
			for(var i = 0; i < living.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
				if(living[i] == ""){
					div += '<a id="clickno">' + living[i] + '</a></div>'
				}else {
					div += '<a>' + living[i] + '</a><div id="itemCount">0개</div></div>';
					$('.down2').append('<a href="#">'+living[i]+'</a>');
				}

				$('.detailItem').append(div);
			}
		}else if($('.select1').text() == '스포츠/레저'){
			for(var i = 0; i < sports.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
				if(sports[i] == ""){
					div += '<a id="clickno">' + sports[i] + '</a></div>'
				}else {
					div += '<a>' + sports[i] + '</a><div id="itemCount">0개</div></div>';
					$('.down2').append('<a href="#">'+sports[i]+'</a>');
				}
				
				$('.detailItem').append(div);
			}
		}else if($('.select1').text() == '뷰티/미용'){
			for(var i = 0; i < beauty.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
				if(beauty[i] == ""){
					div += '<a id="clickno">' + beauty[i] + '</a></div>'
				}else {
					div += '<a>' + beauty[i] + '</a><div id="itemCount">0개</div></div>';
					$('.down2').append('<a href="#">'+beauty[i]+'</a>');
				}

				$('.detailItem').append(div);
			}
		}else if($('.select1').text() == '유아/출산'){
			for(var i = 0; i < child.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
				if(child[i] == ""){
					div += '<a id="clickno">' + child[i] + '</a></div>'
				}else {
					div += '<a>' + child[i] + '</a><div id="itemCount">0개</div></div>';
					$('.down2').append('<a href="#">'+child[i]+'</a>');
				}

				$('.detailItem').append(div);
			}
		}else if($('.select1').text() == '기타'){
			for(var i = 0; i < others.length; i++){
				var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
				if(others[i] == ""){
					div += '<a id="clickno">' + others[i] + '</a></div>'
				}else {
					div += '<a>' + others[i] + '</a><div id="itemCount">0개</div></div>';
					$('.down2').append('<a href="#">'+others[i]+'</a>');
				}

				$('.detailItem').append(div);
			}
		}
	 
	 //h2 바꿔주기
	 $('#findItemH2').html('<span id="itemSelectSpan">'+$('.select1').text()+'</span>의 전체상품');
	 
	 
	 
	 
	 //detailItemList에 그 상품에 대한 개수...
		if($('.top2').text().trim() == ""){
			$.ajax({
				type: 'post',
				url: '/pmang/board/getItemBoardCount',
				data : {'category1' : $('.select1').text().trim(), 'location' : $('location').val()},
				dataType : 'json',
				success: function(data){
					console.log(JSON.stringify(data));
					$.each(data.ctgMapList, function(index, items){
							/*alert($('.detailItem').children().length)*/
							for(var i=0; i < $('.detailItem').children().length; i++){
								if($('#detailItemList'+i).children('a').text().trim() == items.CATEGORY2){
									//alert(items.CNT2);
									$('#detailItemList'+i).children('div').text(items.CNT2+"개");
									}
								}
							
					});
				},
				error: function(err){
					console.log(err);
				}
			});
	}


	//카테고리1에서의 select를 통해 down2를 생성했고, 생성 후 그 down2와 들어온 카테고리랑 같으면 select2가 된다.
	for(var i=0; i<$('.down2').children().length; i++){
		if($('.down2').children().eq(i).text().trim() == $('.top2').text().trim()){
			$('.down2').children().eq(i).addClass('select2');
		}
	}
	
	
	//카테고리2가 들어와 있을 때, 
	if($('.top2').text().trim() != "") {
		//카테고리2가 있으니 카테고리2 목록을 보여주는 detailItemList1을 없애고 카테고리3 목록을 보여주는 detailItemList2를 만든다.
		$('.detailItemList1').remove();
		
		if($('.select2').text() == '여성의류'){
			for(var i = 0; i < women.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + women[i] + '</a>';
				if(women[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+women[i]+'</a>');	
				}
				
				$('.detailItem').append(div);

			}		
		}else if($('.select2').text() == '남성의류'){
			for(var i = 0; i < men.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + men[i] + '</a>';
				if(men[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+men[i]+'</a>');
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '패션잡화'){
			for(var i = 0; i < goods.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + goods[i] + '</a>';
				if(goods[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+goods[i]+'</a>');	
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '모바일'){
			for(var i = 0; i < mobile.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + mobile[i] + '</a>';
				if(mobile[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+mobile[i]+'</a>');
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '가전제품' ){
			for(var i = 0; i < home.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + home[i] + '</a>';
				if(home[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+home[i]+'</a>');	
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '음반/영상기기'){
			for(var i = 0; i < music.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + music[i] + '</a>';
				if(music[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+music[i]+'</a>');
				}
				

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '컴퓨터/주변기기'){
			for(var i = 0; i < pc.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + pc[i] + '</a>';
				if(pc[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+pc[i]+'</a>');
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '카메라'){
			for(var i = 0; i < camera.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + camera[i] + '</a>';
				if(camera[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+camera[i]+'</a>');	
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '게임'){
			for(var i = 0; i < game.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + game[i] + '</a>';
				if(game[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+game[i]+'</a>');
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '도서'){
			for(var i = 0; i < read.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + read[i] + '</a>';
				if(read[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+read[i]+'</a>');	
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '티켓'){
			for(var i = 0; i < ticket.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + ticket[i] + '</a>';
				if(ticket[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+ticket[i]+'</a>');	
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '생활용품'){
			for(var i = 0; i < daily.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + daily[i] + '</a>';
				if(daily[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+daily[i]+'</a>');
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '가구'){
			for(var i = 0; i < furniture.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + furniture[i] + '</a>';
				if(furniture[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+furniture[i]+'</a>');	
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '주방용품'){
			for(var i = 0; i < kitchen.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + kitchen[i] + '</a>';
				if(kitchen[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+kitchen[i]+'</a>');
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '실내'){
			for(var i = 0; i < indoor.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + indoor[i] + '</a>';
				if(indoor[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+indoor[i]+'</a>');
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '실외'){
			for(var i = 0; i < out.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + out[i] + '</a>';
				if(out[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+out[i]+'</a>');
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '스킨케어'){
			for(var i = 0; i < skin.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + skin[i] + '</a>';
				if(skin[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+skin[i]+'</a>');	
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '메이크업'){
			for(var i = 0; i < makeup.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + makeup[i] + '</a>';
				if(makeup[i] == ""){
					div += '</div>'
				}else {
					$('.down3').append('<a href="#">'+makeup[i]+'</a>');	
					div += '<div id="itemCount">0개</div></div>';
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '헤어/바디'){
			for(var i = 0; i < hair.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + hair[i] + '</a>';
				if(hair[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+hair[i]+'</a>');
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '향수/아로마'){
			for(var i = 0; i < perfume.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + perfume[i] + '</a>';
				if(perfume[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+perfume[i]+'</a>');	
				}
				
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '네일아트/케어'){
			for(var i = 0; i < nailArt.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + nailArt[i] + '</a>';
				if(nailArt[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+nailArt[i]+'</a>');
				}
				
				$('.detailItem').append(div);
				
			}
		}else if($('.select2').text() == '뷰티소품'){
			for(var i = 0; i < beautyTool.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + beautyTool[i] + '</a>';
				if(beautyTool[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+beautyTool[i]+'</a>');
				}

				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '영아의류(-2세)'){
			for(var i = 0; i < baby.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + baby[i] + '</a>';
				if(baby[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+baby[i]+'</a>');	
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '여아의류(3-6세)'){
			for(var i = 0; i < girl.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + girl[i] + '</a>';
				if(girl[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+girl[i]+'</a>');	
				}
			
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '남아의류(3-6세)'){
			for(var i = 0; i < boy.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + boy[i] + '</a>';
				if(boy[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+boy[i]+'</a>');	
				}
				
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '육아잡화'){
			for(var i = 0; i < babygoods.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + babygoods[i] + '</a>';
				if(babygoods[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+babygoods[i]+'</a>');	
				}
			
				$('.detailItem').append(div);

			}
		}else if($('.select2').text() == '동화책/완구/인형/장난감'){
			for(var i = 0; i < fairy.length; i++){
				var div = '<div class = "detailItemList2" id="detailItemList' + i +'"><a href="#">' + fairy[i] + '</a>';
				if(fairy[i] == ""){
					div += '</div>'
				}else {
					div += '<div id="itemCount">0개</div></div>';
					$('.down3').append('<a href="#">'+fairy[i]+'</a>');	
				}
				
				$('.detailItem').append(div);
			}
		} 
	}	
	
	
	
	//select2가 존재한다면 h2는 select2의 text로 대체, 그리고 detailItem2 옆에 그 카테고리 총 개수 보여주기.
	if($('.select2').text() != ''){
		$('#findItemH2').html('<span id="itemSelectSpan">'+$('.select2').text()+'</span>의 전체상품');
		
		$.ajax({
			type: 'post',
			url: '/pmang/board/getItemBoardCount',
			data: {'category2' : $('.select2').text().trim(), 'location' : $('#location').val()},
			dataType : 'json',
			success: function(data){
				console.log(JSON.stringify(data));
				$.each(data.ctgMapList, function(index, items){
						/*alert($('.detailItem').children().length)*/
						for(var i=0; i < $('.detailItem').children().length; i++){
							if($('#detailItemList'+i).children('a').text().trim() == items.CATEGORY3){
								//alert(items.CNT2);
								$('#detailItemList'+i).children('div').text(items.CNT3+"개");
							}
						}
				});
			},
			error: function(err){
				console.log(err);
			}
		});
	}

	
	
	
	//카테고리2가 들어왔을 때, down3를 만들었으니 이 down3와 카테고리3와 같은 텍스트를 찾아 select3로 해준다.
	for(var i=0; i<$('.down3').children().length; i++){
		if($('.down3').children().eq(i).text().trim() == $('.top3').text().trim()){
			$('.down3').children().eq(i).addClass('select3');
		}
	}
	

	//카테고리 처리
	//카테고리1,2가 있을 때,
	if($('.top2').text().trim() != "" && $('.top3').text().trim() == ""){
		$('.secondCategory').show();
		$('.thirdCategory').hide();
	}
	//카테고리1,2,3 다 있을 때, detailItemList아예 숨기기!
	else if($('.top2').text().trim() != "" && $('.top3').text().trim() != ""){
		$('.secondCategory').show();
		$('.thirdCategory').show();
		$('.detailItem').hide();
		//마지막 카테고리3의 상품 h2
		$('#findItemH2').html('<span>'+$('.select3').text()+'</span>의 전체상품')
	}
	//카테고리1만 있을 때..
	else {
		$('.secondCategory').hide();
		$('.thirdCategory').hide();
	}
	

});//ready


//-----------------------------------------------------------------------------------------------------------------//



//카테고리1을 눌렀을 때,
$('.selectItem1').on('click', 'a', function(){
	$('.top2').text(''); //카테고리1을 누르면 2,3는 비워줘야 한다.
	$('.top3').text('');
	$('#pg').val(1); //페이지는 다시 1로..
	$('.selection3').empty(); //다시 비워주고 붙이기.
	//$('.entireView').css('color','black');
	//카테고리 밑창화살표
	var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">';
	
	//내가 클릭한 것을 select1으로 다시 바꿔줌.
	$('.select1').removeClass('select1');
	$(this).addClass('select1');
	
	//내가 클릭한 것을 카테고리1으로 올려 보여주고 밑창화살표까지 붙이기!
	$('.top1').html($(this).text() + img);
	
	//카테고리가 바뀌었으니 그 카테고리에 맞는 아이템뽑아오기.
	$.ajax({
		type: 'post',
		url: '/pmang/board/getitemBoardList',
		data : {'category1' : $('.select1').text().trim(), 'pg' : $("#pg").val(), 'order' : $('#order').val(), 'location' : $('#location').val()},
		dataType : 'json',
		success: function(data){
			$.each(data.itemBoardList, function(index, items){
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
				
				$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
			});
			
			var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
			$("#findItemH2").append($(entireItemNumSpan));
			
			$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			
			
		},
		error: function(err){
			console.log(err);
		}
	});
	
	//datailItemList 보여주기
	$('.detailItem').show();
	//기존에 있던 건 다 지워주기.
	$('.detailItemList1').remove();
	$('.detailItemList2').remove();
	$('.detailItemList3').remove();
	
	//카테고리1을 선택했으니 2,3 박스는 숨겨준다.
	$('.secondCategory').hide();
	$('.thirdCategory').hide();
	
	//클릭했으니까 이건 잠시 숨겨두기
	$('.down1').hide();
	
	/* if($('.top2').text().trim().length){
		//alert($('.top2').text())
	}else{
		alert('secondCategory없음')
		$('.detailItem').show();
	} */
	 

	//다시 노가다를 시작..
	//다시 선택해서 받은 select1과 같은 이름을 찾아서 detailItemList1을 채워준다.
	if($('.select1').text() == '패션'){
		for(var i = 0; i < fashion.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">'
			if(fashion[i] == ""){
				div += '<a id="clickno">' + fashion[i] + '</a></div>'
			}else {
				div += '<a>' + fashion[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+fashion[i]+'</a>');
			}
			
			$('.detailItem').append(div);
			
		
		}		
	}else if($('.select1').text() == '디지털/가전'){
		for(var i = 0; i < digital.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
			if(digital[i] == ""){
				div += '<a id="clickno">' + digital[i] + '</a></div>'
			}else {
				div += '<a>' + digital[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+digital[i]+'</a>');
			}
			

			$('.detailItem').append(div);
		}
	}else if($('.select1').text() == '도서/티켓'){
		for(var i = 0; i < book.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
			if(book[i] == ""){
				div += '<a id="clickno">' + book[i] + '</a></div>'
			}else {
				div += '<a>' + book[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+book[i]+'</a>');
			}
			

			$('.detailItem').append(div);
		}
	}else if($('.select1').text() == '리빙용품'){
		for(var i = 0; i < living.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
			if(living[i] == ""){
				div += '<a id="clickno">' + living[i] + '</a></div>'
			}else {
				div += '<a>' + living[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+living[i]+'</a>');
			}

			$('.detailItem').append(div);
		}
	}else if($('.select1').text() == '스포츠/레저'){
		for(var i = 0; i < sports.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
			if(sports[i] == ""){
				div += '<a id="clickno">' + sports[i] + '</a></div>'
			}else {
				div += '<a>' + sports[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+sports[i]+'</a>');
			}
			
			$('.detailItem').append(div);
		}
	}else if($('.select1').text() == '뷰티/미용'){
		for(var i = 0; i < beauty.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
			if(beauty[i] == ""){
				div += '<a id="clickno">' + beauty[i] + '</a></div>'
			}else {
				div += '<a>' + beauty[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+beauty[i]+'</a>');
			}

			$('.detailItem').append(div);
		}
	}else if($('.select1').text() == '유아/출산'){
		for(var i = 0; i < child.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
			if(child[i] == ""){
				div += '<a id="clickno">' + child[i] + '</a></div>'
			}else {
				div += '<a>' + child[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+child[i]+'</a>');
			}

			$('.detailItem').append(div);
		}
	}else if($('.select1').text() == '기타'){
		for(var i = 0; i < others.length; i++){
			var div = '<div class = "detailItemList1" id="detailItemList' + i +'">';
			if(others[i] == ""){
				div += '<a id="clickno">' + others[i] + '</a></div>'
			}else {
				div += '<a>' + others[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down2').append('<a href="#">'+others[i]+'</a>');
			}

			$('.detailItem').append(div);
		}
	}
	 
	//다시 선택한 select1의 카테고리명을 h2에 올려줌
	 $('#findItemH2').html('<span id="itemSelectSpan">'+$('.select1').text()+'</span>의 전체상품');
	 
	//이제 카테고리1을 갖고서 카테고리2의 목록과 그 목록 아이템 개수를 얻어오자.
		$.ajax({
				type: 'post',
				url: '/pmang/board/getItemBoardCount',
				data : {'category1' : $('.select1').text().trim(), 'location' : $('#location').val()},
				dataType : 'json',
				success: function(data){
					console.log(JSON.stringify(data));
					$.each(data.ctgMapList, function(index, items){
							/*alert($('.detailItem').children().length)*/
							for(var i=0; i < $('.detailItem').children().length; i++){
								if($('#detailItemList'+i).children('a').text().trim() == items.CATEGORY2){
									//alert(items.CNT2);
									$('#detailItemList'+i).children('div').text(items.CNT2+"개");
									}
								}
							
					});
				},
				error: function(err){
					console.log(err);
				}
			});

	
			
});


//detailList1을 눌렀을 때, 긍까 카테고리1에서 카테고리2로 넘어갔을 때,
 $('.detailItem').on('click', '.detailItemList1', function(e){
	 //페이지 1로 맞춰주기.
	 $('#pg').val(1);
	 //카테고리2로 넘어가는 것이니까, top1,2만 나와야 함.
	 $('.top3').text('');
	 
	 //$('.entireView').css('color','black');
	 
	 //내가 클릭한 div가 빈칸이 아니라면, 보드 뿌리기.
	 if($(this).children('a').text() != ''){
		 //있던 아이템 목록은 비워주기.
		 $('.selection3').empty();
		 
		 //down 목록 만들어주기~
		 var down2 = new Array();
		 //detailItemList1 개수만큼 down을 뿌려주는데, down2에 이 목록 text를 넣어준다.
		 for(var i = 0; i < $('.detailItem').children('div').length; i++){
			 //alert($('#detailItemList'+i).text())
			 down2[i] = $('#detailItemList'+i).children('a').text();
		 }
		 
		 //기존에 있는 down2목록 비워주기
		 $('.down2').empty();
		 
		 //만들어 놓은 dowmArray를 넣어주자!
		for(var i = 0; i < down2.length; i++){
			if(down2[i] != ""){
				$('.down2').append('<a href="#">'+down2[i]+'</a>');	
			}
		} 
	
		 //밑창 화살표이미지.
		 var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">';
		 //카테고리2로 넘어갔으니까 보여주기.
		 $('.secondCategory').show();
		 
		 //클릭한 text 이미지랑 같이 카테고리2에 올려주기
		 $('.top2').html($(this).children('a').text() + img);
		 
		 //1은 지우고 detailItemList2를 보여줄거임!
		 $('.detailItemList1').remove();
		 
	
		 //생성한 down2와 내가 클릭한 text와 같은 걸 select2로 반영.
		for(var i=0; i<$('.down2').children().length; i++){
			if($('.down2').children().eq(i).text().trim() == $(this).children('a').text()){
				$('.down2').children().eq(i).addClass('select2');
			}
		}
	
		//내가 선택한 카테고리에 해당하는 아이템 보드에 뿌리기!
		$.ajax({
			type: 'post',
			url: '/pmang/board/getitemBoardList',
			data : {'category1': $('.select1').text().trim(), 'category2':$('.select2').text().trim(), 'pg' : $("#pg").val(), 'order' : $('#order').val(), 'location' : $('#location').val()},
			dataType : 'json',
			success: function(data){
				$.each(data.itemBoardList, function(index, items){
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
					
					$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
				});
				
				var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
				$("#findItemH2").append($(entireItemNumSpan));
				
				$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
			},
			error: function(err){
				console.log(err);
			}
		});

	
		
	//detailItem2만들기.	
	if($('.select2').text() == '여성의류'){
		for(var i = 0; i < women.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(women[i] == ""){
				div += '<a id="clickno">' + women[i] + '</a></div>'
			}else {
				div += '<a href="#">' + women[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+women[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}		
	}else if($('.select2').text() == '남성의류'){
		for(var i = 0; i < men.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(men[i] == ""){
				div += '<a id="clickno">' + men[i] + '</a></div>'
			}else {
				div += '<a href="#">' + men[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+men[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '패션잡화'){
		for(var i = 0; i < goods.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(goods[i] == ""){
				div += '<a id="clickno">' + goods[i] + '</a></div>'
			}else {
				div += '<a href="#">' + goods[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+goods[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '모바일'){
		for(var i = 0; i < mobile.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(mobile[i] == ""){
				div += '<a id="clickno">' + mobile[i] + '</a></div>'
			}else {
				div += '<a href="#">' + mobile[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+mobile[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '가전제품' ){
		for(var i = 0; i < home.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(home[i] == ""){
				div += '<a id="clickno">' + home[i] + '</a></div>'
			}else {
				div += '<a href="#">' + home[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+home[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '음반/영상기기'){
		for(var i = 0; i < music.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(music[i] == ""){
				div += '<a id="clickno">' + music[i] + '</a></div>'
			}else {
				div += '<a href="#">' + music[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+music[i]+'</a>');	
			}
			

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '컴퓨터/주변기기'){
		for(var i = 0; i < pc.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(pc[i] == ""){
				div += '<a id="clickno">' + pc[i] + '</a></div>'
			}else {
				div += '<a href="#">' + pc[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+pc[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '카메라'){
		for(var i = 0; i < camera.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(camera[i] == ""){
				div += '<a id="clickno">' + camera[i] + '</a></div>'
			}else {
				div += '<a href="#">' + camera[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+camera[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '게임'){
		for(var i = 0; i < game.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(game[i] == ""){
				div += '<a id="clickno">' + game[i] + '</a></div>'
			}else {
				div += '<a href="#">' + game[i] + '</a><div id="itemCount">10만+</div></div>';
				$('.down3').append('<a href="#">'+game[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '도서'){
		for(var i = 0; i < read.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(read[i] == ""){
				div += '<a id="clickno">' + read[i] + '</a></div>'
			}else {
				div += '<a href="#">' + read[i] + '</a><div id="itemCount">10만+</div></div>';
				$('.down3').append('<a href="#">'+read[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '티켓'){
		for(var i = 0; i < ticket.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(ticket[i] == ""){
				div += '<a id="clickno">' + ticket[i] + '</a></div>'
			}else {
				div += '<a href="#">' + ticket[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+ticket[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '생활용품'){
		for(var i = 0; i < daily.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(daily[i] == ""){
				div += '<a id="clickno">' + daily[i] + '</a></div>'
			}else {
				div += '<a href="#">' + daily[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+daily[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '가구'){
		for(var i = 0; i < furniture.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(furniture[i] == ""){
				div += '<a id="clickno">' + furniture[i] + '</a></div>'
			}else {
				div += '<a href="#">' + furniture[i] + '</a><div id="itemCount">10만+</div></div>';
				$('.down3').append('<a href="#">'+furniture[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '주방용품'){
		for(var i = 0; i < kitchen.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(kitchen[i] == ""){
				div += '<a id="clickno">' + kitchen[i] + '</a></div>'
			}else {
				div += '<a href="#">' + kitchen[i] + '</a><div id="itemCount">10만+</div></div>';
				$('.down3').append('<a href="#">'+kitchen[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '실내'){
		for(var i = 0; i < indoor.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(indoor[i] == ""){
				div += '<a id="clickno">' + indoor[i] + '</a></div>'
			}else {
				div += '<a href="#">' + indoor[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+indoor[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '실외'){
		for(var i = 0; i < out.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(out[i] == ""){
				div += '<a id="clickno">' + out[i] + '</a></div>'
			}else {
				div += '<a href="#">' + out[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+out[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '스킨케어'){
		for(var i = 0; i < skin.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(skin[i] == ""){
				div += '<a id="clickno">' + skin[i] + '</a></div>'
			}else {
				div += '<a href="#">' + skin[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+skin[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '메이크업'){
		for(var i = 0; i < makeup.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(makeup[i] == ""){
				div += '<a id="clickno">' + makeup[i] + '</a></div>'
			}else {
				div += '<a href="#">' + makeup[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+makeup[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '헤어/바디'){
		for(var i = 0; i < hair.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(hair[i] == ""){
				div += '<a id="clickno">' + hair[i] + '</a></div>'
			}else {
				div += '<a href="#">' + hair[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+hair[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '향수/아로마'){
		for(var i = 0; i < perfume.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(perfume[i] == ""){
				div += '<a id="clickno">' + perfume[i] + '</a></div>'
			}else {
				div += '<a href="#">' + perfume[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+perfume[i]+'</a>');	
			}
			
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '네일아트/케어'){
		for(var i = 0; i < nailArt.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(nailArt[i] == ""){
				div += '<a id="clickno">' + nailArt[i] + '</a></div>'
			}else {
				div += '<a href="#">' + nailArt[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+nailArt[i]+'</a>');	
			}
			
			$('.detailItem').append(div);
			
		}
	}else if($('.select2').text() == '뷰티소품'){
		for(var i = 0; i < beautyTool.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(beautyTool[i] == ""){
				div += '<a id="clickno">' + beautyTool[i] + '</a></div>'
			}else {
				div += '<a href="#">' + beautyTool[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+beautyTool[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '영아의류(-2세)'){
		for(var i = 0; i < baby.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(baby[i] == ""){
				div += '<a id="clickno">' + baby[i] + '</a></div>'
			}else {
				div += '<a href="#">' + baby[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+baby[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '여아의류(3-6세)'){
		for(var i = 0; i < girl.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(girl[i] == ""){
				div += '<a id="clickno">' + girl[i] + '</a></div>'
			}else {
				div += '<a href="#">' + girl[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+girl[i]+'</a>');	
			}
		
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '남아의류(3-6세)'){
		for(var i = 0; i < boy.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(boy[i] == ""){
				div += '<a id="clickno">' + boy[i] + '</a></div>'
			}else {
				div += '<a href="#">' + boy[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+boy[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '육아잡화'){
		for(var i = 0; i < babygoods.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(babygoods[i] == ""){
				div += '<a id="clickno">' + babygoods[i] + '</a></div>'
			}else {
				div += '<a href="#">' + babygoods[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+babygoods[i]+'</a>');	
			}
		
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '동화책/완구/인형/장난감'){
		for(var i = 0; i < fairy.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(fairy[i] == ""){
				div += '<a id="clickno">' + fairy[i] + '</a></div>'
			}else {
				div += '<a href="#">' + fairy[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+fairy[i]+'</a>');	
			}
			
			$('.detailItem').append(div);
		}
	} 
	
	$('#findItemH2').html('<span id="itemSelectSpan">'+$('.select2').text()+'</span>의 전체상품');
	
	
	//detailItem2에 새겨질 개수..
	$.ajax({
		type: 'post',
		url: '/pmang/board/getItemBoardCount',
		data: {'category2' : $('.select2').text().trim(), 'location' : $('#location').val()},
		dataType : 'json',
		success: function(data){
			console.log(JSON.stringify(data));
			$.each(data.ctgMapList, function(index, items){
					/*alert($('.detailItem').children().length)*/
					for(var i=0; i < $('.detailItem').children().length; i++){
						if($('#detailItemList'+i).children('a').text().trim() == items.CATEGORY3){
							//alert(items.CNT2);
							$('#detailItemList'+i).children('div').text(items.CNT3+"개");
						}
					}
			});
		},
		error: function(err){
			console.log(err);
		}
	});
	
	
  }//if
	 
	 
});


 
 //카테고리2를 클릭했을 때,
$('.selectItem2').on('click', 'a', function(){
	//항상 새로운 카테고리를 선택할 때는 페이지는 1로.. 초기화..
	$('#pg').val(1);
	
	//카테고리2를 클릭했으니 카테고리3는 잠시 비워주자.
	$('.top3').text('');
	$('.selection3').empty();
	//$('.entireView').css('color','black');
	
	//카테고리2 상자에 붙일 이미지..
	var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">';
	
	//기존 select2는 삭제하고 내가 선택한 카테고리를 select2로 선택!
	$('.select2').removeClass('select2');
	$(this).addClass('select2');
	
	//선택한 카테고리2 올리기.
	$('.top2').html($(this).text() + img);
	
	//선택한 카테고리에 해당하는 아이템 보여주기.
	$.ajax({
		type: 'post',
		url: '/pmang/board/getitemBoardList',
		data : {'category1': $('.select1').text().trim(), 'category2':$('.select2').text().trim(), 'pg' : $("#pg").val(), 'order' : $('#order').val(), 'location' : $('#location').val()},
		dataType : 'json',
		success: function(data){
			$.each(data.itemBoardList, function(index, items){
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
				
				$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
			});
			
			var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
			$("#findItemH2").append($(entireItemNumSpan));
			
			$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
		},
		error: function(err){
			console.log(err);
		}
	});
	
	
	//$('.top2').text('');
	//detailItemList다 지우기.....
	$('.detailItemList1').remove();
	$('.detailItemList2').remove();
	$('.detailItemList3').remove();
	//카테고리2를 선택했으니 카테고리3는 숨기자
	$('.thirdCategory').hide();
	//detailItem 다시 보여주기!
	$('.detailItem').show();
	
	//누른건 숨겨주자.
	$('.down2').hide();
	
	
	//detailItemList2 생성!(카테고리3을 보여줄 div)
	if($('.select2').text() == '여성의류'){
		for(var i = 0; i < women.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(women[i] == ""){
				div += '<a id="clickno">' + women[i] + '</a></div>'
			}else {
				div += '<a href="#">' + women[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+women[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}		
	}else if($('.select2').text() == '남성의류'){
		for(var i = 0; i < men.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(men[i] == ""){
				div += '<a id="clickno">' + men[i] + '</a></div>'
			}else {
				div += '<a href="#">' + men[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+men[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '패션잡화'){
		for(var i = 0; i < goods.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(goods[i] == ""){
				div += '<a id="clickno">' + goods[i] + '</a></div>'
			}else {
				div += '<a href="#">' + goods[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+goods[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '모바일'){
		for(var i = 0; i < mobile.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(mobile[i] == ""){
				div += '<a id="clickno">' + mobile[i] + '</a></div>'
			}else {
				div += '<a href="#">' + mobile[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+mobile[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '가전제품' ){
		for(var i = 0; i < home.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(home[i] == ""){
				div += '<a id="clickno">' + home[i] + '</a></div>'
			}else {
				div += '<a href="#">' + home[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+home[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '음반/영상기기'){
		for(var i = 0; i < music.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(music[i] == ""){
				div += '<a id="clickno">' + music[i] + '</a></div>'
			}else {
				div += '<a href="#">' + music[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+music[i]+'</a>');	
			}
			

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '컴퓨터/주변기기'){
		for(var i = 0; i < pc.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(pc[i] == ""){
				div += '<a id="clickno">' + pc[i] + '</a></div>'
			}else {
				div += '<a href="#">' + pc[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+pc[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '카메라'){
		for(var i = 0; i < camera.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(camera[i] == ""){
				div += '<a id="clickno">' + camera[i] + '</a></div>'
			}else {
				div += '<a href="#">' + camera[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+camera[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '게임'){
		for(var i = 0; i < game.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(game[i] == ""){
				div += '<a id="clickno">' + game[i] + '</a></div>'
			}else {
				div += '<a href="#">' + game[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+game[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '도서'){
		for(var i = 0; i < read.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(read[i] == ""){
				div += '<a id="clickno">' + read[i] + '</a></div>'
			}else {
				div += '<a href="#">' + read[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+read[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '티켓'){
		for(var i = 0; i < ticket.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(ticket[i] == ""){
				div += '<a id="clickno">' + ticket[i] + '</a></div>'
			}else {
				div += '<a href="#">' + ticket[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+ticket[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '생활용품'){
		for(var i = 0; i < daily.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(daily[i] == ""){
				div += '<a id="clickno">' + daily[i] + '</a></div>'
			}else {
				div += '<a href="#">' + daily[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+daily[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '가구'){
		for(var i = 0; i < furniture.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(furniture[i] == ""){
				div += '<a id="clickno">' + furniture[i] + '</a></div>'
			}else {
				div += '<a href="#">' + furniture[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+furniture[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '주방용품'){
		for(var i = 0; i < kitchen.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(kitchen[i] == ""){
				div += '<a id="clickno">' + kitchen[i] + '</a></div>'
			}else {
				div += '<a href="#">' + kitchen[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+kitchen[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '실내'){
		for(var i = 0; i < indoor.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(indoor[i] == ""){
				div += '<a id="clickno">' + indoor[i] + '</a></div>'
			}else {
				div += '<a href="#">' + indoor[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+indoor[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '실외'){
		for(var i = 0; i < out.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(out[i] == ""){
				div += '<a id="clickno">' + out[i] + '</a></div>'
			}else {
				div += '<a href="#">' + out[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+out[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '스킨케어'){
		for(var i = 0; i < skin.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(skin[i] == ""){
				div += '<a id="clickno">' + skin[i] + '</a></div>'
			}else {
				div += '<a href="#">' + skin[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+skin[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '메이크업'){
		for(var i = 0; i < makeup.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(makeup[i] == ""){
				div += '<a id="clickno">' + makeup[i] + '</a></div>'
			}else {
				div += '<a href="#">' + makeup[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+makeup[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '헤어/바디'){
		for(var i = 0; i < hair.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(hair[i] == ""){
				div += '<a id="clickno">' + hair[i] + '</a></div>'
			}else {
				div += '<a href="#">' + hair[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+hair[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '향수/아로마'){
		for(var i = 0; i < perfume.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(perfume[i] == ""){
				div += '<a id="clickno">' + perfume[i] + '</a></div>'
			}else {
				div += '<a href="#">' + perfume[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+perfume[i]+'</a>');	
			}
			
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '네일아트/케어'){
		for(var i = 0; i < nailArt.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(nailArt[i] == ""){
				div += '<a id="clickno">' + nailArt[i] + '</a></div>'
			}else {
				div += '<a href="#">' + nailArt[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+nailArt[i]+'</a>');	
			}
			
			$('.detailItem').append(div);
			
		}
	}else if($('.select2').text() == '뷰티소품'){
		for(var i = 0; i < beautyTool.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(beautyTool[i] == ""){
				div += '<a id="clickno">' + beautyTool[i] + '</a></div>'
			}else {
				div += '<a href="#">' + beautyTool[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+beautyTool[i]+'</a>');	
			}

			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '영아의류(-2세)'){
		for(var i = 0; i < baby.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(baby[i] == ""){
				div += '<a id="clickno">' + baby[i] + '</a></div>'
			}else {
				div += '<a href="#">' + baby[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+baby[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '여아의류(3-6세)'){
		for(var i = 0; i < girl.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(girl[i] == ""){
				div += '<a id="clickno">' + girl[i] + '</a></div>'
			}else {
				div += '<a href="#">' + girl[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+girl[i]+'</a>');	
			}
		
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '남아의류(3-6세)'){
		for(var i = 0; i < boy.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(boy[i] == ""){
				div += '<a id="clickno">' + boy[i] + '</a></div>'
			}else {
				div += '<a href="#">' + boy[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+boy[i]+'</a>');	
			}
			
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '육아잡화'){
		for(var i = 0; i < babygoods.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(babygoods[i] == ""){
				div += '<a id="clickno">' + babygoods[i] + '</a></div>'
			}else {
				div += '<a href="#">' + babygoods[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+babygoods[i]+'</a>');	
			}
		
			$('.detailItem').append(div);

		}
	}else if($('.select2').text() == '동화책/완구/인형/장난감'){
		for(var i = 0; i < fairy.length; i++){
			var div = '<div class = "detailItemList2" id="detailItemList' + i +'">';
			if(fairy[i] == ""){
				div += '<a id="clickno">' + fairy[i] + '</a></div>'
			}else {
				div += '<a href="#">' + fairy[i] + '</a><div id="itemCount">0개</div></div>';
				$('.down3').append('<a href="#">'+fairy[i]+'</a>');	
			}
			
			$('.detailItem').append(div);
		}
	} 
	
	
	$('#findItemH2').html('<span id="itemSelectSpan">'+$('.select2').text()+'</span>의 전체상품');
	
	
	//detailItemList2에 붙일 카테고리3개수...
	$.ajax({
		type: 'post',
		url: '/pmang/board/getItemBoardCount',
		data: {'category2' : $('.select2').text().trim(), 'location' : $('#location').val()},
		dataType : 'json',
		success: function(data){
			console.log(JSON.stringify(data));
			$.each(data.ctgMapList, function(index, items){
					/*alert($('.detailItem').children().length)*/
					for(var i=0; i < $('.detailItem').children().length; i++){
						if($('#detailItemList'+i).children('a').text().trim() == items.CATEGORY3){
							//alert(items.CNT2);
							$('#detailItemList'+i).children('div').text(items.CNT3+"개");
						}
					}
			});
		},
		error: function(err){
			console.log(err);
		}
	});
});





//detailItemList2를 눌렀을 때, 긍까 카테고리2에서 3로 넘어갈 때!
$('.detailItem').on('click', '.detailItemList2', function(){
	//항상 넘어갈땐 페이지 1에서.. 시작..
	$('#pg').val(1);
	//$('.entireView').css('color','black');
	
	//선택한 div text가 비어있지 않을때,
	if($(this).children('a').text() != ''){
		//기존 보드 비워주기
		$('.selection3').empty();
		
		//기존down3 비우기.
		$('.down3').empty();
		
		//div에 있는 것을 array로 만들어서 down3에 뿌려주기..
		var down3 = new Array();
		for(var i = 0; i < $('.detailItem').children('div').length; i++){
			//alert($('#detailItemList'+i).text())
			down3[i] = $('#detailItemList'+i).children('a').text();
		}
		
		for(var i = 0; i < down3.length; i++){
			if(down3[i] != ""){
				$('.down3').append('<a href="#">'+down3[i]+'</a>');	
			}
		} 
		
		//카테고리3 밑화살표로 붙일 이미지..
		var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">';
		
		//카테고리3 보여주기
		$('.thirdCategory').show();
		//기존 detailItemList2는 삭제
		$('.detailItemList2').remove();
		//내가 클릭한 걸 카테고리3로 올리기
		$('.top3').html($(this).children('a').text() + img);
		//카테고리3 뒤에는 아무것도 없으니 숨기기
		$('.detailItem').hide();
		
		
		//select3 생성!
		for(var i=0; i<$('.down3').children().length; i++){
			if($('.down3').children().eq(i).text().trim() == $(this).children('a').text()){
				$('.down3').children().eq(i).addClass('select3');
			}
		}
		
		
	
			$.ajax({
				type: 'post',
				url: '/pmang/board/getitemBoardList',
				data : {'category1': $('.select1').text().trim(), 'category2':$('.select2').text().trim(), 'category3':$('.select3').text().trim(), 'pg' : $("#pg").val(), 'order': $('#order').val(), 'location' : $('#location').val()},
				dataType : 'json',
				success: function(data){
					$.each(data.itemBoardList, function(index, items){
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
						
						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
					});
					
					var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
					$("#findItemH2").append($(entireItemNumSpan));
					
					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
				},
				error: function(err){
					console.log(err);
				}
			});
		 
		$('#findItemH2').html('<span>'+$('.select3').text()+'</span>의 전체상품');
		
	}//if
});

//카테고리3눌렀을 때,
$('.selectItem3').on('click', 'a', function(){

	$('#pg').val(1);
	$('.selection3').empty();
	//$('.entireView').css('color','black');
	
	
	var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">';
	$('.select3').removeClass('select3');
	$(this).addClass('select3');
	$('.top3').html($(this).text() + img);
	$('.down3').hide();
	
	
	//보드 바꿔주기
	$.ajax({
		type: 'post',
		url: '/pmang/board/getitemBoardList',
		data : {'category1': $('.select1').text().trim(), 'category2':$('.select2').text().trim(), 'category3':$('.select3').text().trim(), 'pg' : $("#pg").val(), 'order' : $('#order').val(), 'location' : $('#location').val()},
		dataType : 'json',
		success: function(data){
			$.each(data.itemBoardList, function(index, items){
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
				
				$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
			});
			
			var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
			$("#findItemH2").append($(entireItemNumSpan));
			
			$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
		},
		error: function(err){
			console.log(err);
		}
	});
	
	$('#findItemH2').html('<span>'+$('.select3').text()+'</span>의 전체상품');
		
});



///*orderby click*/
//$('.orderby').on('click','a',function(){
//		$('#order').val($(this).text());
//		$('#pg').val(1);
//		$("#entireItemNumSpan").remove();
//		$('.orderChoice').removeClass('orderChoice');
//		$(this).addClass('orderChoice');
//		
//		$('.itemFrame').remove();
//		if($('.top2').text().trim() == ""){
//			$.ajax({
//				type: 'post',
//				url: '/pmang/board/getOrderbyItem',
//				data : {'category1' : $('.top1').text().trim(), 'order' : $(this).text(), 'pg' : $("#pg").val()},
//				dataType : 'json',
//				success: function(data){
//					$.each(data.orderbylist, function(index, items){
//						
//						var itemFrameDiv = '<div class="itemFrame"></div>';
//						
//						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
//						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
//						var itemContentDiv = '<div class="itemContent">';
//						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
//						itemContentDiv += '<div class="itemPriceAndTime">';
//						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
//						itemContentDiv += '</div>';
//						itemContentDiv += '</div>';
//						
//						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
//						itemloc += items.item_location +'</div>';
//						
//						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
//					});
//					
//					var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
//					$("#findItemH2").append($(entireItemNumSpan));
//					
//					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
//					
//					
//					
//				},
//				error: function(err){
//					console.log(err);
//				}
//			});
//		}else if($('.top3').text().trim() == ""){
//			$.ajax({
//				type: 'post',
//				url: '/pmang/board/getOrderbyItem',
//				data : {'category1': $('.top1').text().trim(), 'category2':$('.top2').text().trim() , 'order' : $(this).text(), 'pg' : $("#pg").val()},
//				dataType : 'json',
//				success: function(data){
//					$.each(data.orderbylist, function(index, items){
//						var itemFrameDiv = '<div class="itemFrame"></div>';
//						
//						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
//						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
//						var itemContentDiv = '<div class="itemContent">';
//						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
//						itemContentDiv += '<div class="itemPriceAndTime">';
//						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
//						itemContentDiv += '</div>';
//						itemContentDiv += '</div>';
//						
//						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
//						itemloc += items.item_location +'</div>';
//						
//						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
//					});
//					
//					var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
//					$("#findItemH2").append($(entireItemNumSpan));
//					
//					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
//				},
//				error: function(err){
//					console.log(err);
//				}
//			});
//		}else{
//			$.ajax({
//				type: 'post',
//				url: '/pmang/board/getOrderbyItem',
//				data : {'category1': $('.top1').text().trim(), 'category2':$('.top2').text().trim(), 'category3':$('.top3').text().trim() , 'order' : $(this).text(), 'pg' : $("#pg").val()},
//				dataType : 'json',
//				success: function(data){
//					$.each(data.orderbylist, function(index, items){
//						var itemFrameDiv = '<div class="itemFrame"></div>';
//						
//						var itemLinkA = '<a class="itemLink"><span id="item_seqSpan">'+items.item_seq+'</span>';
//						itemLinkA += '<img src="/pmang/storage/'+items.img1+'" width="194" height="194" alt="상품이미지"></a>';
//						var itemContentDiv = '<div class="itemContent">';
//						itemContentDiv += '<div class="itemName">'+items.item_subject+'</div>';
//						itemContentDiv += '<div class="itemPriceAndTime">';
//						itemContentDiv += '<div class="itemPrice">'+addComma(items.item_price)+'</div><div class="itemTime"><span>'+timeForToday(items.logtime)+'</span></div>'
//						itemContentDiv += '</div>';
//						itemContentDiv += '</div>';
//						
//						var itemloc = '<div class="itemLocation"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">';
//						itemloc += items.item_location +'</div>';
//						
//						$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv)).append($(itemloc))).appendTo($('.selection3'));
//					});
//					
//					var entireItemNumSpan = '<span id="entireItemNumSpan">' + data.entireItemNum + '개</span>';
//					$("#findItemH2").append($(entireItemNumSpan));
//					$("#itemBoardPagingDiv2").html(data.boardPaging.pagingHTML);
//					
//				},
//				error: function(err){
//					console.log(err);
//				}
//			});
//		}
//	
//});


//order클릭
$('.orderby').on('click','a',function(){
	 if($('.top2').text().trim() == "" && $('.top3').text().trim() == ""){
		location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text().trim()+'&pg='+$('#pg').val()+'&order='+$(this).text()+'&location='+$('#location').val());
	}else if($('.top2').text().trim() != "" && $('.top3').text().trim() == ""){
		location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text()+'&category2='+$('.top2').text().trim()+'&pg='+$('#pg').val()+'&order='+$(this).text()+'&location='+$('#location').val());
	}else if($('.top2').text().trim() != "" && $('.top3').text().trim() != ""){
		location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text()+'&category2='+$('.top2').text().trim()+'&category3='+$('.top3').text().trim()+'&pg='+$('#pg').val()+'&order='+$(this).text()+'&location='+$('#location').val());
	}
});



//페이징 처리 -> 왜 trigger 안먹냐고
function boardPaging(pg){
		if($('.top2').text().trim() == "" && $('.top3').text().trim() == ""){
			location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text().trim()+'&pg='+pg+'&order='+$('#order').val()+'&location='+$('#location').val());
		}else if($('.top2').text().trim() != "" && $('.top3').text().trim() == ""){
			location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text()+'&category2='+$('.top2').text().trim()+'&pg='+pg+'&order='+$('#order').val()+'&location='+$('#location').val());
		}else if($('.top2').text().trim() != "" && $('.top3').text().trim() != ""){
			location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text()+'&category2='+$('.top2').text().trim()+'&category3='+$('.top3').text().trim()+'&pg='+pg+'&order='+$('#order').val()+'&location='+$('#location').val());
		}	
	
}



//아이템 클릭했을 때
$('.selection3').on('click', '.itemLink', function(){

	var item_seq = $(this).children("#item_seqSpan").text();
	var itemSubject = $(this).find('.itemName').text();
	var itemPrice = $(this).find(".itemPrice").text();
	var img = $(this).children("img").attr('src');
	//alert($(this).children("#item_seqSpan").text());
	
	checkCookie(img, itemSubject, itemPrice, item_seq);
	
	
	location.href="/pmang/board/itemView?item_seq="+item_seq;
});



/* 위치 모달 */
$('.locationSearch').click(function(){
	 $('.locationModal').css('display','block');
	 $('body').css('overflow','hidden');
});

$('#x').click(function(){
	$('.locationModal').css('display','none');
	$('body').css('overflow','auto');
});

$(document).click(function(e){
	if($('.locationModal').is(e.target)){
		$('.locationModal').css('display','none'); 
		$('body').css('overflow','auto');
	}
}); 



//최근본상품 쿠키체크!
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


/* 위치 검색 */

//위치 검색
if (navigator.geolocation) { // GPS를 지원하면
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	var lat = position.coords.latitude; //위도
	    	var lon = position.coords.longitude; //경도
	      	$('#lat').val(lat);
	    	$('#lon').val(lon);
	    }, function(error) {
	      console.error(error);
	    }, {
	      enableHighAccuracy: false,
	      maximumAge: 0,
	      timeout: Infinity
	    });
	  } else {
	    alert('GPS를 지원하지 않습니다');
	    }

$('#mainLocBtn').click(function(){
	if($('#userId').val() != ''){
		window.open("/pmang/pm_itemBoard/mainLoc.jsp", "주요위치", "width=500, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=no, left=500, top=100" );  		
		$('#x').trigger('click');
	}else if($('#userId').val() == ''){
		//alert('로그인하세요.');
		$('#x').trigger('click');
		$('#loginli').trigger('click');
	}
});

$('#mapBtn').click(function(){
	  window.open("/pmang/pm_itemBoard/map.jsp?lon=" + $('#lon').val() + "&lat=" + $('#lat').val(), "지도띄우기", "width=1024, height=800, toolbar=no, menubar=no, scrollbars=no, resizable=no,toolbars=no, menubar=no,left=500, top=100");
});


$("#gpsBtn").click(function(){
	if (navigator.geolocation) { // GPS를 지원하면
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	var lat = position.coords.latitude; //위도
	    	var lon = position.coords.longitude; //경도
	      	positionCheck(lat, lon);
	    }, function(error) {
	      console.error(error);
	    }, {
	      enableHighAccuracy: false,
	      maximumAge: 0,
	      timeout: Infinity
	    });
	  } else {
	    alert('현재 위치를 가져올 수 없습니다. \n 브라우저 설정의 위치정보 사용을 허용으로 바꾸어 주시거나 GPS사용을 on으로 변경 후 다시 시도해 주세요.');
	  }
	
});

function positionCheck(lat, lon){
	var position = new daum.maps.LatLng(lat, lon); 
	searchDetailAddrFromCoords(position, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          
            var detailAddr = result[0].address.address_name;
           
            $('#detailAddr').html(detailAddr);
            $('.locationModal').css('display','none');
            
            //특수문자
            var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            //공백
            var empty = /\s/g;
            //숫자
            var num = /[0-9]/g;
            
            //보내는 주소는 숫자 제외 동만 보내기..
            var address = detailAddr.replace(regExp,"");
            //address = address.replace(empty, "");
            address = address.replace(num, "");
            
            //alert(address)


            
            if($('.top2').text().trim() == "" && $('.top3').text().trim() == ""){
            	location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text().trim()+'&pg='+$('#pg').val()+'&order='+$('#order').val()+'&location='+address);
    		}else if($('.top2').text().trim() != "" && $('.top3').text().trim() == ""){
    			location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text().trim()+'&category2='+$('.top2').text().trim()+'&pg='+$('#pg').val()+'&order='+$('#order').val()+'&location='+address);
    		}else if($('.top2').text().trim() != "" && $('.top3').text().trim() != ""){
    			location.href = encodeURI('/pmang/board/itemBoard?category1='+$('.top1').text().trim()+'&category2='+$('.top2').text().trim()+'&category3='+$('.top3').text().trim()+'&pg='+$('#pg').val()+'&order='+$('#order').val()+'&location='+address);
    		}

        }   
    });
}

function searchDetailAddrFromCoords(coords, callback) {
	var geocoder = new kakao.maps.services.Geocoder();
	geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

