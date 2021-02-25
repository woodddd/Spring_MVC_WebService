//배열로 잡기
/*if(localStorage.getItem("key") != null){
	$('.nonGoods').hide();
	var output = localStorage.getItem("key"); // 배열받고
	
	var goods = JSON.parse(output); //배열을 제이슨으로 뿌려주고
	
	var div = '<div id="goods_img" style="width: 80px; height: 80px; border : 1px solid #e5e5e5"></div>';
	$(div).appendTo('.goods');
	
	
	$('#goods_img').append($('<img src="' + goods[0] + '" width="80" height="80">'));	
}else{
	$('.nonGoods').show();
}
*/







//recent item(최근본상품)

var Cpage;   // 현재 페이지 
var pagingSize = 3;   // 3개만 보이게끔. 
function chkRecent(a){
	var itemID = getCookie("itemID");
	$(".goods").html('');    // 일단 내용 지우기

	if(itemID){ //쿠키값이 있다면!
		
		$(".nonGoods").hide();
		
		var totcount = itemID.split('&').length-1;   //
		var totpage = Math.ceil(totcount / pagingSize) * 1; //소수점 이하 올림

		Cpage = (totpage >= a )? a:1; //총 페이지보다 a페이지가 작거나 같으면 a페이지로, 총 페이지보다 a페이지가 크다면 1페이지로 이동.
		Cpage = (Cpage < 1)? totpage:Cpage; //현재 페이지가 1보다 작다면? 현재페이지가 총 페이지로, 1보다 크면 현재페이지 그대로 유지. 

		var start = (Cpage-1) * pagingSize;     
		
		
		
		
		for (i = start ; i <= start+(pagingSize-1); i++){
			var thisItem = itemID.split('&')[i];
		
			if(thisItem){
				var img = thisItem.split(':')[0];
				var itemSubject = thisItem.split(':')[1];
				var itemPrice = thisItem.split(':')[2];
				var item_seq = thisItem.split(':')[3];
				
				//var removeBtn = '<button onclick="javascript:removeRecentItem(\''+thisItem+'\')" class="btn_delete"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAAAXNSR0IArs4c6QAAAWRJREFUOBHNlOtNhEAQgNmlBbUCSLx4PVzumrALm7EItYkj9qDxePzmx9kDOB9hyALLyz+6yQR2duZjHuwEwb9fZVneZFn2kuf57W+DxRcGLJOm6auAHo0xnyLHOI6/t4CB1XWdiDyI35sNw/AJGAqR85ZIW9gZXxgNi2iKorirqkoPPuTwtBSpA9sDs9aeoii6Gk1vC3QKBqsDslkDnYONgEvQJZgXOAVFT9NEejVD765eyu7BIP0vzgS2cxvg2uv7JBCDFvouoHv2ArtINw90k71vWZ9SdQKq5R3Rhcrdq757TgKdBpDmBRHWTmT25/cCHZg24ECq1E+A+znoqIYeWHMDyGnQKO+N6gFbWCIRNHdTr1NXoDF0NFA64BqYggeR9qBNDYcwqdVx7tdohoDYtDVlSiUw+KDxwZYmjUbq87Uytp61ZkS2FgYUW3w0UlgBY5uprSHr17c8qSkMWFv8/sb2ByEblYtthvS2AAAAAElFTkSuQmCC" width="10" height="12" alt="삭제 버튼 이미지"></button>'
				
				$(".goods").append('<div id="goods_img"><div class="detail"><button onclick="javascript:removeRecentItem(\''+thisItem+'\')" class="btn_delete"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAAAXNSR0IArs4c6QAAAWRJREFUOBHNlOtNhEAQgNmlBbUCSLx4PVzumrALm7EItYkj9qDxePzmx9kDOB9hyALLyz+6yQR2duZjHuwEwb9fZVneZFn2kuf57W+DxRcGLJOm6auAHo0xnyLHOI6/t4CB1XWdiDyI35sNw/AJGAqR85ZIW9gZXxgNi2iKorirqkoPPuTwtBSpA9sDs9aeoii6Gk1vC3QKBqsDslkDnYONgEvQJZgXOAVFT9NEejVD765eyu7BIP0vzgS2cxvg2uv7JBCDFvouoHv2ArtINw90k71vWZ9SdQKq5R3Rhcrdq757TgKdBpDmBRHWTmT25/cCHZg24ECq1E+A+znoqIYeWHMDyGnQKO+N6gFbWCIRNHdTr1NXoDF0NFA64BqYggeR9qBNDYcwqdVx7tdohoDYtDVlSiUw+KDxwZYmjUbq87Uytp61ZkS2FgYUW3w0UlgBY5uprSHr17c8qSkMWFv8/sb2ByEblYtthvS2AAAAAElFTkSuQmCC" width="10" height="12" alt="삭제 버튼 이미지"></button><div class="recentlySubject">'+ itemSubject +'</div><div class="recentlyPrice">'+ itemPrice +'원</div></div><a class="recentlyGoods" href="/pmang/board/itemView?item_seq='+item_seq+'" target="_top"><img src='+img+'  width="80" heigth="80"></a></div>');
				

			}

		}
		
		//var detailDiv = '<div class="detail">' + removeBtn +'<div class="recentlySubject">'+ itemSubject +'</div><div class="recentlyPrice">'+ itemPrice +'원</div>';
		//$('.recentlyGoods').append(detailDiv);

		$("#recentlypaging").show();

	}else{

		$(".nonGoods").show();

		$("#recentlypaging").hide();
		
		$("#recentCnt").text('');

	}

	updateRecentPage(totcount, Cpage);

}


chkRecent(1);


function removeRecentItem(itemname){

	var itemID = getCookie("itemID");

	itemID = itemID.replace(itemname+"&","");			

	setCookie("itemID",itemID,1);

	chkRecent(Cpage);

}


function updateRecentPage(totcount,Cpage){   

	$("#recentCnt").text(totcount); 

	$("#totalPageCount").text("/ "+Math.ceil((totcount / pagingSize) *1)); 

	if(Math.ceil((totcount / pagingSize) *1) < Cpage){

		$("#recentlycurrentPage").text(Math.ceil((totcount / pagingSize) *1));

	}else{

	$("#recentlycurrentPage").text(Cpage);

	}

}


//다음
$(".btn_next").on('click',function(){

	chkRecent(Cpage + 1);

});

//이전
$(".btn_prev").on('click',function(){

	chkRecent(Cpage - 1);

});


//쿠키 생성
function setCookie(cName, cValue, cDay){
     var expire = new Date();
     expire.setDate(expire.getDate() + cDay);
     cookies = cName + '=' + escape(cValue) + '; path=/ ';
     if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
     document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
     cName = cName + '=';
     var cookieData = document.cookie;
     var start = cookieData.indexOf(cName);
     var cValue = '';
     if(start != -1){
          start += cName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          cValue = cookieData.substring(start, end);
     }
     return unescape(cValue);
}

$('.goods').on({
    mouseenter: function(){ $(this).find('.detail').css('display', 'block'); 
    						$(this).find('.recentlyGoods').css('border', '1px solid black');
    						$(this).find('.recentlyGoods').css('border-left', '0px');
    
    
    },
    mouseleave: function(){ $(this).find('.detail').css('display', 'none'); 
    						$(this).find('.recentlyGoods').css('border', '0px');
    }
}, '#goods_img');


/*$(document).on('hover', '.recentlyGoods', function(){
	$('.detail').css('display', 'block')
},
function(){
	$('.detail').css('display', 'none')
});*/
/*$('.recentlyGoods').hover(function(){
	$('.detail').css('display', 'block')
},
function(){
	$('.detail').css('display', 'none')
});



/*=======================================검색쪽============================*/



$.ajax({
	type : 'post',
	url : '/pmang/board/getSearchKeyword',
	dataType : 'json',
	success : function(data){
		//alert(data.keywordList)
		if(data.keywordList == ''){
			//alert('야 너 왜이래')
			$('.nonList').show();
		}
		else{
			$('.nonList').hide();
			$.each(data.keywordList, function(index, items){
				var insert = '<div id="index_listKeyword"><span id="keywordSpan">'+ items.keyword + '</span><span id="storageDate">'+ items.logtime +'</span><a id="indexSearchX">x</a></div>' 
				$('.existList').append($(insert));
			});
		}
	},
	error : function(err){
		console.log(err);
	}
});


//검색 input에 커서 올라가면 이벤트
$('.searchInput').focus(function(){
	$('.searchClick').show();
}); 

//input안에 x버튼 추가하기
$('.search-wrap').on('input', '.searchInput', function() {
	if($('.searchInput').val() != ""){
		$('#index_searchInsertXspan').show();	
	}else{
		$('#index_searchInsertXspan').hide();
	}
});

//input안에 x버튼 누르면 삭제!
$('#index_searchInsertXspan').click(function(){
	$('.searchInput').val('');
	$('#index_searchInsertXspan').hide();
	$('.searchClick').show();
});


/* $('.searchInput').blur(function(){
	$('.searchClick').hide();
});  */


/* $(document).on("click", function(e){
	if($('#searchListHide').val() == 'show'){
		$('.searchClick').show();
	}else{
		if($('.searchClick').is(e.target)){
			$('.searchClick').hide();
			$('#searchListHide').val("");
		}
	}
});  */

//검색창 이외에 다른 곳을 눌렀을 시 검색창 사라지게 하는것
$(document).click(function(e){
	if(e.target != $('.searchListDiv')){
		if($('form, div').is(e.target)){
			$('.searchClick').hide(); 
		}else if($('#header h2, #header img, .indexnavSpan').is(e.target)){
			$('.searchClick').hide(); 
		}else if($('.footer a, .footer img').is(e.target)){
			$('.searchClick').hide(); 
		}else if($('.hoverli a').is(e.target)){
			$('.searchClick').hide(); 
		}else if($('#aside img, #aside a').is(e.target)){
			$('.searchClick').hide(); 
		}else if($('.slide_wrap img').is(e.target)){
			$('.searchClick').hide(); 
		}		
	}
});


/* $(document).click(function(e){
	if(e.target != $('.searchListDiv')){
		if($('#aside img, #aside a').is(e.target)){
			$('.searchClick').hide(); 
		}	
	}
}); */

//검색어 전체 삭제
$('.entireDelete').click(function(){
	$('.existList').remove();
	
	$.ajax({
		type : 'post',
		url : '/pmang/board/searchAllDelete',
		success : function(data){
			//alert('전체삭제완료!')
		},
		error : function(err){
			console.log(err);
		}
	});
	
	
	
	
	
	$('.nonList').show();
	$('.searchInput').val('');
});



/* 최근검색어 구현 
$('.searchBtn').click(function(){
	if($('.searchInput').val() == ''){
		alert('검색어를 입력해주세요.');
	}else {
		var keyword = $('.searchInput').val();
		//키워드 저장
		$.ajax({
			type : 'post',
			url : '/pmang/board/setSearchKeyword',
			data : {'keyword' : keyword},
			success : function(){
				alert('저장!');
				if(keyword.charAt(0) == "#"){
					var hashtag = keyword.replace('#','')
					location.href = '/pmang/board/searchBoard?hashtag='+hashtag;
				}else {
					location.href = '/pmang/board/searchBoard?search='+keyword;
				}
			},
			error : function(err){
				console.log(err);
			}
		});
		
		//localStorage.setItem(keyword, keyword);
		
		//검색
		if(keyword.charAt(0) == "#"){
			var hashtag = keyword.replace('#','')
			location.href = '/pmang/board/searchBoard?hashtag='+hashtag;
		}else {
			location.href = '/pmang/board/searchBoard?search='+keyword;
		}
		
	
	}
	
	//$('.searchClick').hide();
	
});
*/

/* 최근검색어 구현 */
$('.searchBtn').click(function(){
	if($('.searchInput').val() == ''){
		alert('검색어를 입력해주세요.');
	}else {
		var keyword = $('.searchInput').val();
		//키워드 저장
		$.ajax({
			type : 'post',
			url : '/pmang/board/setSearchKeyword',
			data : {'keyword' : keyword},
			success : function(){
				//alert('저장!');
				if(keyword.charAt(0) == "#"){
					var hashtag = keyword.replace('#','')
					location.href = '/pmang/board/searchBoard?hashtag='+hashtag;
				}else {
					location.href = '/pmang/board/searchBoard?search='+keyword;
				}
			},
			error : function(err){
				console.log(err);
			}
		});
		
		//localStorage.setItem(keyword, keyword);
	}
	
	//$('.searchClick').hide();
	
});

/*if(localStorage.length != 0){
	for(let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i).sort(); 	
		var insert = '<div id="index_listKeyword" class=' + i + '><span id="keywordSpan">'+ localStorage.getItem(key) + '</span><a id="indexSearchX">x</a></div>' 
		$('.existList').prepend($(insert));
	}

	for(var i = 0; i< localStorage.length; i++){
		
		var insert = '<div id="index_listKeyword" class=' + i + '><span id="keywordSpan">'+ localStorage.getItem(i) + '</span><a id="indexSearchX">x</a></div>'
		$('.existList').prepend($(insert));
			
	}	
}*/

//검색어 클릭했을 때,
$(document).on('click', '#keywordSpan', function(){
	
	//alert($(this).text().charAt(0));
	if($(this).text().charAt(0) == "#"){
		var hashtag = $(this).text().replace('#','')
		location.href = '/pmang/board/searchBoard?hashtag='+hashtag;
	}else {
		location.href = '/pmang/board/searchBoard?search='+$(this).text();
	}
});




//엔터값 넣어주기
$('.searchInput').keydown(function(key) {
	if(key.keyCode == 13){
		$('.searchBtn').trigger('click');
		$('.searchInput').click(function(){
			$('.searchClick').show();
		});
	}
});


//최근검색어 목록에 x 누르면 삭제되는것
$('div').off('click').on('click' , '#indexSearchX', function(e){
		e.stopPropagation(); //이벤트 여러번 발생시 부모한테 이벤트가 가지 못하게 막는 것.
		$(this).parent().remove();
		
		$.ajax({
			type: 'post',
			url : '/pmang/board/removeSearch',
			data : {'keyword' : $(this).parent().children('#keywordSpan').text()},
			success : function(){
				//alert('삭제!')
			},
			error : function(err){
				console.log(err);
			}
		});
		
		
		
		if(!$('#index_listKeyword').length){
			$('.nonList').show()
		}else {
			$('.nonList').hide();
		}
});

//닫기버튼 클릭
$('.search_exit').click(function(){
	$('.searchClick').hide();
});


//------------------------------------------------------------------------------
//aside 알림창
$('.notice').hover(function(){
	$('.noticeDiv').toggle();
});



//------------------------------------------------------------------------------
//카테고리
//카테고리
$('.hoverli').hover(function(){
	var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAAAXNSR0IArs4c6QAAAE9JREFUWAnt1rEJACAQA0B1IQv3n8tSwRXSPHLfP4RLk77nOq3wjcLZXjQBqzckHwECBAj8LtCtmbBiayYE9E6AAAECBEIBayYEbNZMKngBdrgHHmiUuOgAAAAASUVORK5CYII=" width="20" height="16" alt="메뉴 버튼 아이콘">';
	$('.hoverliA').html(img);
	$('.category1Menu').show();
}, function(){
	var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAAAXNSR0IArs4c6QAAAExJREFUWAnt1sEJACAMA0DrJt1/SAVXyKfI9V8Il0+qu88afHtwthdNwOkNyUeAAAECvwuUNRNWbM2EgN4JECBAgEAoYM2EgMuaSQUv1d0EPE4sEMMAAAAASUVORK5CYII=" width="20" height="16" alt="메뉴 버튼 아이콘">';
	$('.hoverliA').html(img);
	$('.category1Menu').hide();
});


/*  $('.category1Menu').on('mouseenter mouseleave','li',function(){
	//alert($(this).children('a').text());
	if($(this).children('.category1A').text() != ""){
		$('.category2Div').text($(this).children('.category1A').text());
	}
}); */



$('.category1Menu').on('mouseenter','li',function(){
	if($(this).children('.category1A').text() != ""){
		$(this).css('background','green');
		$(this).children('.category1A').css('color','white');
		if($(this).children('.category1A').text() != ""){
			$('.category2Div').text($(this).children('.category1A').text());
		}
	}
});

$('.category1Menu').on('mouseleave','li',function(){
	if($(this).children('.category1A').text() != ""){
		$(this).css('background','white');
		$(this).children('.category1A').css('color','black');
		
	}
});

/* $('.category2Menu').on('mouseenter mouseleave','li',function(){
	//alert($(this).children('a').text());
	if($(this).children('.category2A').text() != ""){
		$('.category3Div').text($(this).children('.category2A').text());
	}
}); */

$('.category2Menu').on('mouseenter','li',function(){
	if($(this).children('.category2A').text() != ""){
		$(this).css('background','green');
		$(this).children('.category2A').css('color','white');
		if($(this).children('.category2A').text() != ""){
			$('.category3Div').text($(this).children('.category2A').text());
		}
	}
});

$('.category1Menu').on('mouseleave','li',function(){
	if($(this).children('.category2A').text() != ""){
		$(this).css('background','white');
		$(this).children('.category2A').css('color','black');
	}
});



$('.category1A').click(function(){
	var firstCategory = $(this).text(); 
	location.href = "/pmang/board/itemBoard?category1="+firstCategory;
});

$('.category2A').click(function(){
	var firstCategory = $(this).parents('#categoryClickli1').children('a').text();
	var secondCategory = $(this).text();
	
	location.href = "/pmang/board/itemBoard?category1="+firstCategory+"&category2="+secondCategory;
});

$('.category3Menu').on('click','li',function(){
	var firstCategory = $(this).parents('#categoryClickli1').children('a').text();
	var secondCategory = $(this).parent().parent().children('a').text();
	var thirdCategory = $(this).children('a').text();
	
	location.href = "/pmang/board/itemBoard?category1="+firstCategory+"&category2="+secondCategory+"&category3="+thirdCategory;
	
});


//로그인 안했을 때 누르는 판매하기, 내상점
function nologin(){
	//alert('먼저 로그인 하세요.');
	$('#loginli').trigger('click');
}



//----------------------------------------------------------------------
//로그인모달 구현
$('#loginli').click(function(){
	//아이디 저장
	var userId = localStorage.getItem('userId');
	$('#index_userId').val(userId);
	if(!userId) {
		$('#checkedId').prop('checked',false);	
	} else {
		$('#checkedId').prop('checked',true);
	}
	$('.loginModal').show();
	$('.loginModal').on('scroll touchmove mousewheel', function(e){
		e.preventDefault();
		e.stopPropagation(); 
		return false;
	});
});
$('.close').click(function(){
	$('#index_userId').val('');
	$('#index_pwd').val('');
	$('.loginModal').hide();
	$('.loginModal').off('scroll touchmove mousewheel');
});
$(document).click(function(e){
	if($('.loginModal').is(e.target)){
		$('.loginModal').hide(); 
		$('.loginModal').off('scroll touchmove mousewheel');
	}
});


$('.noticeContent').on('click','a',function(){
	$('#loginli').trigger('click');
});







//---------------------------------로그인. 회원가입--------------------------------------------------//
$('#index_writeBtn').click(function(){
	location.href="/pmang/member/writeForm"
});

$('#index_searchIdBtn').click(function(){
	location.href="/pmang/member/searchId"
});
$('#index_searchPwBtn').click(function(){
	location.href="/pmang/member/searchPw"
});

//엔터시 로그인
$(document).keydown(function(key) {
	if(key.keyCode == 13){
		$('#loginBtn').trigger('click');
		$(document).click(function(){
		});
	}
});

$('#loginBtn').click(function(){
	$('#index_userIdDiv').empty();
	$('#index_pwdDiv').empty();
	
	if($('#index_userId').val()==''){
		$('#index_userIdDiv').text('아이디를 입력해 주세요')
						.css('color','red')
						.css('font-size','8pt')
						.css('font-weight','bold');
		
	}else if($('#index_pwd').val()==''){
		$('#index_pwdDiv').text('비밀번호를 입력해 주세요')
						 .css('color','red')
						 .css('font-size','8pt')
						 .css('font-weight','bold');
	}else{
		$.ajax({
			type: 'post',
			url: '/pmang/member/login',
			data: {'userId': $('#index_userId').val(), 'pwd': $('#index_pwd').val()},
			dataType: 'text',
			success: function(data){
				
				if(data == 'success'){
					//로컬스토리지에 아이디 저장(로그인폼 아이디 저장기능)
					var checked = $('#checkedId').is(":checked");
					if(checked) {
						localStorage.setItem('userId', $('#index_userId').val());
					} else {
						localStorage.setItem('userId', '');
					}
					alert($('#index_userId').val()+"님 환영합니다!");
					location.reload();
					return 
				} 
				if (data == "idFail") {
					alert('존재하지 않는 아이디입니다.');
					return 
				} 
				if(data == 'pwdfail'){
					alert('비밀번호를 확인해 주세요.');
					return
				}
				if(data == 'authFail'){
					alert('이메일 인증 후 로그인해주세요.');
					return
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	}
});




//여긴 상품등록쪽..
//---------------------------------------------------------------------------------------------------
//등록하기 버튼을 클릭했을때.
$('.itemWriteBtn').click(function(){
	//alert($('button[name=hashtag1]').text())
	if($('#sessionId').val() != null){
		//전송할 formData 생성!
		var formData = new FormData($('#sellerWriteForm')[0]); 
		
		for(var i = 1; i < 4; i++){
			if($("button[name=hashtag"+i+"]").text() != ""){
				formData.append("hashtag"+i, $("button[name=hashtag"+i+"]").text());
			}else {
				formData.append("hashtag"+i, "");
			}
		}
		
		var category1 = $(".selectL").text();
		var category2 = $(".selectM").text();
		var category3 = $(".selectS").text();
		
		var realNum = $('.price_input').val().replace(/\,/g,'');
		
		
		var img1url = $('.imageChoice_ul').children().eq(1).children('img').attr("src");
		var img2url = $('.imageChoice_ul').children().eq(2).children('img').attr("src");
		var img3url = $('.imageChoice_ul').children().eq(3).children('img').attr("src");
		var img1 = $('.imageChoice_ul').children().eq(1).children('img').attr("title");
		var img2 = $('.imageChoice_ul').children().eq(2).children('img').attr("title");
		var img3 = $('.imageChoice_ul').children().eq(3).children('img').attr("title");
		
		
		formData.append("item_price",realNum);
		formData.append("category1",category1);
		formData.append("category2",category2);
		formData.append("category3",category3);
		formData.append("img1",img1);
		formData.append("img2",img2);
		formData.append("img3",img3);
		formData.append("img1url",img1url);
		formData.append("img2url",img2url);
		formData.append("img3url",img3url);
		
	
		//데이터 잘 들어왔는지 확인
		/* for (var pair of formData.entries()) { console.log(pair[0]+ ', ' + pair[1]); } */
	
	
		
		
		
		//유효성 검사
		$('#imageCheck').hide();
		$('.itemSubjectDiv').hide();
		$('#categoryCheck').hide();
		$('#priceDiv').text("");
		
		$('.imageChoice_ul').css('border-color','rgb(195, 194, 204)');
		$('.itemSubjectText').css('border-color','rgb(195, 194, 204)');
		$('input[name=item_subject]').css('border-color','rgb(195, 194, 204)');
		$('.categoryChoice_div').css('border-color','rgb(195, 194, 204)');
		$('.price_input').css('border','1px solid rgb(195, 194, 204)');
		
		if($('#imageCountHidden').val() == 0){ //이미지 등록 확인
			$('#imageCheck').show();
			$('.imageChoice_li').css('border-color','green');
			
			var offset = $('.main_sectionFrame').offset();
			$('html').animate({scrollTop : offset.top}, 400);
			
		}else if($('input[name=item_subject]').val().length < 2){ //제목 수 확인
			$('input[name=item_subject]').css('border-color','green');
			$('input[name=item_subject]').css('border-color','green');
			$('.itemSubjectDiv').show();
			
			var offset = $('.imageChoice_div').offset();
			$('html').animate({scrollTop : offset.top}, 400);
			
		}else if($('#choice').text() == ""){ //카테고리 확인
			$('.categoryChoice_div').css('border-color','green');
			$('#categoryCheck').show();
			
			var offset = $('.imagecontent').offset();
			$('html').animate({scrollTop : offset.top}, 400);
			
		}else if($('.price_input').val() == "" || $('.price_input').val() < 100){ //가격확인
			$('#priceDiv').text('※100원 이상 입력해주세요.');
			$('.price_input').css('border','1px solid green');
			
			var offset = $('.locationText_div').offset();
			$('html').animate({scrollTop : offset.top}, 400);
			
		}else if($('.qty_input').val() == ""){ //수량 확인
			$('.qty_input').val('1');
		}else {
			$.ajax({
				type: 'post',
				enctype: 'form-data',
				processData: false, //데이터를 컨텐트 타입에 맞게 변환 여부
				contentType: false,//요청 컨텐트 타입
				url: '/pmang/member/sellerWrite',
				data: formData,
				success: function(data){
					alert('상품 등록 완료');
					location.href='/pmang/index'; //추후에 상품관리 페이지로 바뀌게 해야함!
				},
				error: function(err){
					console.log(err);
				}
			});
			
		}
	}else {
		alert('로그인 하세요.');
		$('#loginli').trigger('click');
	}
});




//우석 수정 
$('.pmangTok').on('click',function(){
	if($('#sessionId').val() != null){
		window.open("/pmang/talk/talkRoomList","pmangTalk","width=375 height=667");      
	}else {
		alert('로그인 하세요.');
		$('#loginli').trigger('click');
	}
});
// 우석 수정 -----------------------------------


$('#footerNotice').click(function(){
	$(location).attr("href", "/pmang/board/notice?tabNo=1");
	$('#noticeLabel').trigger('click');
});

$('#footerPolicy').click(function(){
	$(location).attr("href", "/pmang/board/notice?tabNo=2");	
});

$('#footerFQA').on('click',function(){
	$(location).attr("href", "/pmang/board/notice?tabNo=3");
});
$('#footerQnA').on('click',function(){
	$(location).attr("href", "/pmang/board/qna");
});




/* ---------------------------------------------------------------------- */
//카카오 로그인 js
 window.Kakao.init("d738a87db4961b1bfd9e5ce2fefec44d");
$('#kakaoBtn').click(function(event){
	event.preventDefault();
	 window.Kakao.Auth.login({
		scope:'profile, account_email, gender',
		success: function(authObj){
			window.Kakao.API.request({
				url:'/v2/user/me',
				success: function(res){
		
					var kakaoId = res.id;
					var userName = res.kakao_account.profile.nickname;
					var gender = res.kakao_account.gender == 'male' ? 0 : 1;
					var emailIndex= res.kakao_account.email.indexOf('@');
					var email1 = res.kakao_account.email.substring(0,emailIndex);
					var email2 = res.kakao_account.email.substring(emailIndex + 1, res.kakao_account.email.length);
					 	
					 $.ajax({
						type: 'post',
						url: '/pmang/member/kakaoLogin',
						data: {
							'kakaoId': kakaoId,
							'userId': kakaoId,
							'userName' : userName,
							'gender': gender,
							'email1': email1,
							'email2': email2,
						},
						dataType: 'text',
						success: function(data){
							if(data == 'loginSuccess'){
								alert('로그인 성공');
								location.href="/pmang/index";
							} else if(data == 'JoinSuccess'){
								alert('카카오 회원가입을 축하드립니다.');
								location.href="/pmang/index";
							}
							console.log(data);
						},
						error: function(err){
							console.log(err);
						}
					}); 
				}
				
				
			});
		}
	}); 
});



// 내 찜수 확인
$(document).ready(function(){
	$('#hiddenUserId').trigger('click');
});


$('#hiddenUserId').click(function(event){	
	 $.ajax({
			type: 'post',
			url: '/pmang/board/getMyZzim',
			data: {'userId': $('#hiddenUserId').val()},
			dataType: 'json',
			error: function(err){
				console.log(err);
			},
			success: function(result){
				
				$('.bag_clickA').text(result.list.length);
				if(result.list.length==0){
					$('#userZzim').attr("src","/pmang/image/zzimNo.png");
				}else{
					$('#userZzim').attr("src","/pmang/image/zzimYes.png");
				}
			}
			
		}); 
	
});



