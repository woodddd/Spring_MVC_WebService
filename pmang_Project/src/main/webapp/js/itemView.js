//------------------------------우석수정
var partner_userId;

      function getItemInfo(){
         $.ajax({
            type:'post',
            url:'/pmang/board/getItemInfo',
            data: 'item_seq='+$('#item_seq').val(),
            dataType:'json',
            async: false ,
            error:function(err){
               console.log(err);
            },
            success:function(result){
               console.log(result.memUserId);
               partner_userId = result.itemDTO.userId;
               memUserId = result.memUserId;
            }// success
         });// ajax
      }// function
      
      getItemInfo();
      $('#contact').on('click', function() {
         if(memUserId != null && memUserId != partner_userId){
            window.open("/pmang/talk/talkRoom?item_seq=" +$('#item_seq').val() + "&partner_userId=" +partner_userId,"","width=375 height=667");
         }else if(memUserId == partner_userId){
        	 alert('로그인한 유저의 게시물 입니다.');
         }else {
            alert('로그인 하세요.');
            $('#loginli').trigger('click');
         }
      });
//------------------------------우석수정


var fashion = ['여성의류', '남성의류', '패션잡화'];
	var women = ['아우터','티셔츠','니트','셔츠/블라우스','맨투맨/후드집업','원피스/세트','바지','스커트'];
	var men = ['아우터','티셔츠','니트','셔츠','맨투맨/후드집업','바지'];
	var goods = ['가방','신발','액세서리','시계','모자'];

var digital = ['모바일', '가전제품', '음반/영상기기', '컴퓨터/주변기기', '카메라', '게임'];
	var mobile = ['스마트폰', '태블릿', '액세서리/주변기기'];
	var home = ['소형가전(밥솥/다리미)', '대형가전(냉장고/세탁기/TV)', '미용가전', '사무용품(복사기/팩스)'];
	var music = ['음향기기','비디오/프로젝터','CD/DVD/음반'];
	var pc = ['데스크탑', '키보드/마우스', '모니터', 'CPU/메인보드/메모리/HDD/SDD', '노트북/넷북', '기타 액세서리(잉크,쿨러,케이블,USB)'];
	var camera = ['DSLR/미러리스','필름카메라','디지털 카메라','기타 액세서리(메모리/렌즈/필름)'];
	var game = ['pc게임', '콘솔 게임(닌텐도/플스)', '게임 타이틀'];
var book = ['도서', '티켓'];
	var read = ['학습/사전/참고서', '만화/아동', '인문/교양/소설', '경영/경제/사회', '과학/컴퓨터/인터넷','예술/디자인','기타 도서(여행/취미/건강)'];
	var ticket = ['기프티콘/쿠폰/상품권','예매권/항공권'];
var living = ['생활용품', '가구', '주방용품'];
	var daily = ['문구/학습', '침구', '욕실'];
	var furniture = ['거실가구(쇼파/테이블)', '생활가구(침대/화장대)', '사무용가구(책상/의자)', '인테리어 소품'];
	var kitchen = ['식기세트','냄비/프라이팬','조리도구','수저/커트러리','컵/잔/텀블러', '주방 잡화','밀폐용기','커피용품',''];
var sports = ['실내', '실외'];
	var indoor = ['헬스','요가','골프','수영'];
	var out = ['축구', '야구', '농구','자전거/킥보드','등산','낚시/캠핑'];
var beauty = ['스킨케어', '메이크업', '헤어/바디', '향수/아로마', '네일아트/케어', '뷰티소품'];
	var skin = ['클렌칭/스크럽','스킨/토너/미스트','로션/에멀젼','에센스/크림','팩/마스크','썬케어'];
	var makeup = ['색조메이크업','베이스메이크업'];
	var hair = ['샴푸/린스/트리트먼트','헤어스타일링','바티클렌저/로션','헤어/핸드/풋케어'];
	var perfume = ['여성향수','남성향수','공용향수',''];
	var nailArt = ['네일아트/스티커','매니큐어/페디큐어','네일케어도구'];
	var beautyTool = ['브러시/퍼프','파우치/정리함','거울'];
var child = ['영아의류(-2세)', '여아의류(3-6세)', '남아의류(3-6세)', '육아잡화', '동화책/완구/인형/장난감'];
	var baby = ['상의', '하의', '기타'];
	var girl = ['원피스/셋트', '아우터(니트,점퍼,코트)','상하의','티셔츠','바지','치마'];
	var boy = ['아우터','상하의','티셔츠','바지','남방'];
	var babygoods = ['신발','모자','가방','양말'];
	var fairy = ['인형','교육/완구','장난감','물놀이도구','놀이터도구'];
var others = ['피망나눔','차량,오토바이', '기타'];





//아이템 정보 불러오기
$(document).ready(function(){
	$.ajax({
		type:'post',
		url:'/pmang/board/getItem',
		data: 'item_seq='+$('#item_seq').val(),
		dataType:'json',
		error:function(err){
			console.log(err);
		},
		success:function(result){
			
			if($('#hiddenUserId').val() == result.itemDTO.userId){
				var div = '<div id="contact" onclick="loc()">내 상점 관리</div>';
				$('#buttonArea').empty();
				$('#buttonArea').append($(div));
			}
			
			if(result.itemDTO.category3 == null){
				$('.thirdCategory').hide();
			}
			
			
			let money = Number(result.itemDTO.item_price);
			/*$('#itemPic').attr('src', '/pmang/storage/'+result.itemDTO.img1); *///이건 아이템보드에서 이미지 저장할때 
																			  //스토리지에 이미지가 넣어지는데 member컨트롤러에서 폴더경로 바꿔주세요! 꼭!
			$('.nameSpan').text(result.itemDTO.item_subject);
			$('.priceSpan').text(money.toLocaleString());
			//$('.likeSpan').text(result.itemDTO.item_like);
			$('.hitSpan').text(result.itemDTO.hit);
			$('.dateSpan').text(timeForToday(result.itemDTO.logtime));
			$('.conditionSpan').text(result.itemDTO.condition);
			$('.negoSpan').text(result.itemDTO.nego);
			$('.qtySpan').text(result.itemDTO.qty);
			$('.locationSpan').text(result.itemDTO.item_location);
			$('.commentSpan').text(result.itemDTO.item_content);
			$('.category1Span').text(result.itemDTO.category1+" /");
			$('.category2Span').text(result.itemDTO.category2+" /");
			$('.category3Span').text(result.itemDTO.category3);
			$('.hashtag1Span').text(result.itemDTO.hashtag1);
			$('.hashtag2Span').text(result.itemDTO.hashtag2);
			$('.hashtag3Span').text(result.itemDTO.hashtag3);
			
			
			if(result.itemDTO.img1 != 'undefined'){
				$('#photoNum').val('1');
			}
			if(result.itemDTO.img2 != 'undefined'){
				$('#photoNum').val('2');
			}
			if(result.itemDTO.img3 != 'undefined'){
				$('#photoNum').val('3');
			}
			
			
			//<img id="itemPic" src="/pmang/image/itemPic.jpg" alt="item pic">
			if(result.itemDTO.img3!='undefined'){
				$('<img/>',{
					src:'/pmang/storage/'+result.itemDTO.img3,
					class:'itemPicture'})
				.prependTo($('#itemPictureDiv'));
			}
			if(result.itemDTO.img2!='undefined'){
				$('<img/>',{
					src:'/pmang/storage/'+result.itemDTO.img2,
					class:'itemPicture'})
				.prependTo($('#itemPictureDiv'));
			}
			if(result.itemDTO.img1!='undefined'){
				$('<img/>',{
					src:'/pmang/storage/'+result.itemDTO.img1,
					class:'itemPicture'})
				.prependTo($('#itemPictureDiv'));
			}
			
			
			
			if(result.itemDTO.img1!='undefined'){
				$('<li/>',{})
							.append($('<img/>',{
								src : '/pmang/storage/'+result.itemDTO.img1,
								class: 'modalItemPic'}))
				.appendTo($('.panel'));
			}
			if(result.itemDTO.img2!='undefined'){
				$('<li/>',{})
							.append($('<img/>',{
								src : '/pmang/storage/'+result.itemDTO.img2,
								class: 'modalItemPic'}))
				.appendTo($('.panel'));
			}
			if(result.itemDTO.img3!='undefined'){
				$('<li/>',{})
							.append($('<img/>',{
								src : '/pmang/storage/'+result.itemDTO.img3,
								class: 'modalItemPic'}))
				.appendTo($('.panel'));
			}
			
			
			
			$('#comment_seq').trigger('click');
			$('#likedOrNot').trigger('click');
			
			
			

			
			//카테고리 설정
			if(result.itemDTO.category2 == null && result.itemDTO.category3 == null){
				$("#topSpan1").text(result.itemDTO.category1);
			}else if(result.itemDTO.category3 == null){
				$("#topSpan1").text(result.itemDTO.category1);
				$("#topSpan2").text(result.itemDTO.category2);
			}else{
				$("#topSpan1").text(result.itemDTO.category1);
				$("#topSpan2").text(result.itemDTO.category2);
				$("#topSpan3").text(result.itemDTO.category3);
			}
			
			/* down color 입히기 */
			for(var i=0; i<$('.down1').children().length; i++){
				if($('.down1').children().eq(i).text().trim() == result.itemDTO.category1){
					$('.down1').children().eq(i).addClass('select1');
				}
			}
			
			if($('.select1').text() == '패션'){
				for(var i = 0; i < fashion.length; i++){
						$('.down2').append('<a href="#">'+fashion[i]+'</a>');
				}		
				}else if($('.select1').text() == '디지털/가전'){
					for(var i = 0; i < digital.length; i++){
						$('.down2').append('<a href="#">'+digital[i]+'</a>');
					}
				}else if($('.select1').text() == '도서/티켓'){
					for(var i = 0; i < book.length; i++){
						$('.down2').append('<a href="#">'+book[i]+'</a>');
					}
				}else if($('.select1').text() == '리빙용품'){
					for(var i = 0; i < living.length; i++){
						$('.down2').append('<a href="#">'+living[i]+'</a>');
			
					}
				}else if($('.select1').text() == '스포츠/레저'){
					for(var i = 0; i < sports.length; i++){
						$('.down2').append('<a href="#">'+sports[i]+'</a>');
			
					}
				}else if($('.select1').text() == '뷰티/미용'){
					for(var i = 0; i < beauty.length; i++){
						$('.down2').append('<a href="#">'+beauty[i]+'</a>');
					}
				}else if($('.select1').text() == '유아/출산'){
					for(var i = 0; i < child.length; i++){
							$('.down2').append('<a href="#">'+child[i]+'</a>');
						}
				}else if($('.select1').text() == '기타'){
					for(var i = 0; i < others.length; i++){
							$('.down2').append('<a href="#">'+others[i]+'</a>');
					}
			
				}
			
			for(var i=0; i<$('.down2').children().length; i++){
				if($('.down2').children().eq(i).text().trim() == result.itemDTO.category2){
					$('.down2').children().eq(i).addClass('select2');
				}
			}
			
			if($('.select2').text() == '여성의류'){
				for(var i = 0; i < women.length; i++){
						$('.down3').append('<a href="#">'+women[i]+'</a>');	
				}		
			}else if($('.select2').text() == '남성의류'){
				for(var i = 0; i < men.length; i++){
				
						$('.down3').append('<a href="#">'+men[i]+'</a>');
		
				}
			}else if($('.select2').text() == '패션잡화'){
				for(var i = 0; i < goods.length; i++){
					$('.down3').append('<a href="#">'+goods[i]+'</a>');	
				}
			}else if($('.select2').text() == '모바일'){
				for(var i = 0; i < mobile.length; i++){
				
						$('.down3').append('<a href="#">'+mobile[i]+'</a>');
		
				}
			}else if($('.select2').text() == '가전제품' ){
				for(var i = 0; i < home.length; i++){
				
						$('.down3').append('<a href="#">'+home[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '음반/영상기기'){
				for(var i = 0; i < music.length; i++){
			
						$('.down3').append('<a href="#">'+music[i]+'</a>');
		
				}
			}else if($('.select2').text() == '컴퓨터/주변기기'){
				for(var i = 0; i < pc.length; i++){
			
						$('.down3').append('<a href="#">'+pc[i]+'</a>');
		
				}
			}else if($('.select2').text() == '카메라'){
				for(var i = 0; i < camera.length; i++){
		
						$('.down3').append('<a href="#">'+camera[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '게임'){
				for(var i = 0; i < game.length; i++){
			
						$('.down3').append('<a href="#">'+game[i]+'</a>');
		
				}
			}else if($('.select2').text() == '도서'){
				for(var i = 0; i < read.length; i++){
			
						$('.down3').append('<a href="#">'+read[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '티켓'){
				for(var i = 0; i < ticket.length; i++){
			
						$('.down3').append('<a href="#">'+ticket[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '생활용품'){
				for(var i = 0; i < daily.length; i++){
			
						$('.down3').append('<a href="#">'+daily[i]+'</a>');
		
				}
			}else if($('.select2').text() == '가구'){
				for(var i = 0; i < furniture.length; i++){
		
						$('.down3').append('<a href="#">'+furniture[i]+'</a>');	
		
		
				}
			}else if($('.select2').text() == '주방용품'){
				for(var i = 0; i < kitchen.length; i++){
			
						$('.down3').append('<a href="#">'+kitchen[i]+'</a>');
		
		
				}
			}else if($('.select2').text() == '실내'){
				for(var i = 0; i < indoor.length; i++){
			
						$('.down3').append('<a href="#">'+indoor[i]+'</a>');
		
				}
			}else if($('.select2').text() == '실외'){
				for(var i = 0; i < out.length; i++){
			
						$('.down3').append('<a href="#">'+out[i]+'</a>');
		
		
				}
			}else if($('.select2').text() == '스킨케어'){
				for(var i = 0; i < skin.length; i++){
			
						$('.down3').append('<a href="#">'+skin[i]+'</a>');	
		
		
				}
			}else if($('.select2').text() == '메이크업'){
				for(var i = 0; i < makeup.length; i++){
		
						$('.down3').append('<a href="#">'+makeup[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '헤어/바디'){
				for(var i = 0; i < hair.length; i++){
			
						$('.down3').append('<a href="#">'+hair[i]+'</a>');
		
				}
			}else if($('.select2').text() == '향수/아로마'){
				for(var i = 0; i < perfume.length; i++){
				
						$('.down3').append('<a href="#">'+perfume[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '네일아트/케어'){
				for(var i = 0; i < nailArt.length; i++){
			
						$('.down3').append('<a href="#">'+nailArt[i]+'</a>');
		
					
				}
			}else if($('.select2').text() == '뷰티소품'){
				for(var i = 0; i < beautyTool.length; i++){
			
						$('.down3').append('<a href="#">'+beautyTool[i]+'</a>');
		
		
				}
			}else if($('.select2').text() == '영아의류(-2세)'){
				for(var i = 0; i < baby.length; i++){
				
						$('.down3').append('<a href="#">'+baby[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '여아의류(3-6세)'){
				for(var i = 0; i < girl.length; i++){
				
						$('.down3').append('<a href="#">'+girl[i]+'</a>');	
		
				}
			}else if($('.select2').text() == '남아의류(3-6세)'){
				for(var i = 0; i < boy.length; i++){
		
						$('.down3').append('<a href="#">'+boy[i]+'</a>');	
		
		
				}
			}else if($('.select2').text() == '육아잡화'){
				for(var i = 0; i < babygoods.length; i++){
			
						$('.down3').append('<a href="#">'+babygoods[i]+'</a>');	
		
		
				}
			}else if($('.select2').text() == '동화책/완구/인형/장난감'){
				for(var i = 0; i < fairy.length; i++){
					$('.down3').append('<a href="#">'+fairy[i]+'</a>');	
				}
			}
			
			for(var i=0; i<$('.down3').children().length; i++){
				if($('.down3').children().eq(i).text().trim() == result.itemDTO.category3){
					$('.down3').children().eq(i).addClass('select3');
				}
			}	
	
		}//success
	});//ajax
	
});	//ready

function loc(){
	var userid = $('#hiddenUserId').val();
	location.href='/pmang/seller/sellerManagementForm';
}


/* 카테고리 펼쳐지는 부분*/

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


//카테고리 선택했을때
$('.selectItem1').on('click', 'a', function(){
	var category1 = $(this).text(); 
	location.href = '/pmang/board/itemBoard?category1='+category1;
});


$('.selectItem2').on('click', 'a', function(){
	var category1 = $('.select1').text();
	var category2 = $(this).text();
	location.href = '/pmang/board/itemBoard?category1='+category1+'&category2='+category2;
});

	
$('.selectItem3').on('click', 'a', function(){
	var category1 = $('.select1').text();
	var category2 = $('.select2').text();
	var category3 = $(this).text();
	location.href = '/pmang/board/itemBoard?category1='+category1+'&category2='+category2+'&category3='+category3;
});



//올린 시간 몇일전, 몇시간전, 몇분전, 몇초전...
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



//탭메뉴, 문의댓글수 제한
$(document).ready(function(){
	
	$('.contentMenu').click(function(){
		var contentSection = $(this).attr('data-tab');/* 매뉴탭 data-tab값 */
		/* content 탭메뉴 선택 */
		$('li').removeClass('current');
		$(this).addClass('current');
		
		/* To스크롤 */
		var offset = $("#"+contentSection).offset();
		$('html, body').animate({scrollTop : offset.top},0);

		
		
	});
	/* 문의댓글 글자 수 제한 */
	$('#replyText').on('keyup', function(e) {
		var replyText = $(this).val();

		//글자입력란 늘이기
		$(this).height(((replyText.split('\n').length + 1) * 1.5) + 'em');
		//입력한 글자수 표기
		$('#count').html(replyText.length);	
		if(replyText.length >= 300){
			alert("최대 300자까지 입력 가능합니다.");
			$('#count').css('color', 'red');
		}else
			$('#count').css('color', 'black');	
	});
	$('#count').keyup();//이거 지우면 alert가 2번 뜸
	
});


//사진 모달 띄우기
$("#imgCheckBox").on('change',(function(){
	if($("#imgCheckBox").is(":checked")){
		$('.modalComp').css('display', 'block');
	}else{
		$('.modalComp').css('display', 'none');
	}
}));


//댓글 등록하기
$('#replyBtn').click(function() {
	//alert($('#sessionId').val());
	//세션 확인
	if($('#userId').val() == ''){
		alert('로그인 후 댓글을 달아주세요.');
	}else{
	/* 댓글 공백 유효성 검사 */
	if($('#replyText').val()==''){
		alert('댓글내용을 입력해주세요');
		 $('#replyText').focus();
	}
	
	$.ajax({
		type: 'post',
		url: '/pmang/board/itemComment',
		//세션에서 유저키 받아서 넣고, 페이징데이터 추가 필요. --> 확인
		data: {'item_seq' : $('#item_seq').val(), 'item_comment' : $('#replyText').val(), 'userId' : $('#userId').val()},
		dataType: 'json',
		async : false,
		error: function(err){
			console.log(err)
		},
		success: function(result){
			
		}//success
	});//ajax
	
	
	$('#comment_seq').trigger('click');
	
	}
});//replyBtn click

//찜 불러오기(강제 호출용)
$('#likedOrNot').click(function(event){
	$.ajax({
		type: 'post',
		url: '/pmang/board/getWishlist',
		data: 'item_seq='+$('#item_seq').val(),
		dataType: 'json',
		error:function(err){
			console.log(err);
		},
		success:function(result){
			
			$('#zzimIcon').attr('src','/pmang/image/zzimNo.png');
			$('#likedOrNot').val('0');
			$('#like').css('background-color', 'gray');
			
			$('.likeSpan').text(result.list.length);
			$.each(result.list, function(index, items){
				
				if(items.userId == $('#userId').val()){//세션에서 받은 아이디 값을 바꿔줄 것		
					$('#zzimIcon').attr('src','/pmang/image/zzimYes.png');
					$('#likedOrNot').val('1');
					$('#like').css('background-color', 'green');
				}
			})//for
		}//success
	});//ajax
});

//댓글 불러오기(강제 호출용)
$('#comment_seq').click(function(event){
	
	$('#replyText').val('');
	$('.replyList').empty();
	
	$.ajax({
		type:'post',
		url:'/pmang/board/getCommentList',
		data: 'item_seq='+$('#item_seq').val(),
		dataType:'json',
		error:function(err){
			console.log(err);
		},
		success:function(result){
			//console.log(result);
			let pageSize = 5;
			let commentIndex = $('#commentIndex').val();
			console.log(commentIndex);
			$.each(result.list, function(index, items){
				
				if(index < (pageSize*commentIndex)){//정해진만큼만 글 뿌리기
					
				
					$('<div/>',{
						class:'replyUser'})
								.append($('<a/>',{
									href:''})
											.append($('<img/>',{
												class:'profilePic',
												alt: '프사',
												src: items.pf_photo,
												width: '50',
												height: '50'})))
								.append($('<div/>',{
									class: 'replyTot'})
											.append($('<div/>',{
												class: 'commentArea'})
														.append($('<div/>',{
															class: 'replyUserName',
															text: items.userId}))
														.append($('<div/>',{
															class: 'replyDate',
															align: 'right',
															text: items.logtime})))
											.append($('<div/>',{
												class: 'replyContent',
												text: items.item_comment}))
											.append($('<div/>',{
												display : 'flex'})
														.append($('<div/>',{}))
																	.append($('<img/>',{
																		src : '/pmang/image/replyIcon_.png',
																		width : '14px',
																		height : '14px'}))
																	.append($('<a/>',{
																		class: 'commentForComment',
																		onclick:'commentForComment(this)',
																		text:'덧글달기'}))
														.append($('<div/>',{
															class: 'report'+index}))))
								.append($('<hr/>'))
					.appendTo($('.replyList'));
					
					if(items.userId==$('#userId').val()){ //이거 나중에 세션 값으로 바꿔줘
						$('<img/>',{
							class : 'replyPics',
							src : '/pmang/image/deleteIcon_.png',
							width : '14px',
							height : '14px'})
						.appendTo($('.report'+index));
						
						
						$('<a/>',{
							class : 'deleteBtn',
							onclick:'commentDelete(this)',
							text:'삭제하기'})
									.append($('<input/>',{
										class: 'comment_seq',
										type: 'hidden',
										value: items.comment_seq
									}))	
						.appendTo($('.report'+index));			
					}else{
						$('<img/>',{
							class : 'replyPics',
							src : '/pmang/image/reportIcon_.png',
							width : '14px',
							height : '14px'})
						.appendTo($('.report'+index));
						
						$('<a/>',{
							id : 'myBtn111'/*'reportBtn'*/,
							onclick:'commentReport(this)',
							text:'신고하기'})
									.append($('<input/>',{
										class: 'comment_seq',
										type: 'hidden',
										value: items.comment_seq
									}))
						.appendTo($('.report'+index));	
					}
				}//if
			})//for
			$('.commentNum').text(result.list.length);
			if(result.list.length>(pageSize*commentIndex)){
				$('#morePic').attr("src", "/pmang/image/moreBtn.png");
				$('#moreText').text("상품문의 더보기");
			}else{
				$('#moreBtn').css("display", "none");
			}
		}//success
	});//ajax
});//click

//댓글 삭제하기
function commentDelete(that){
	
	let comment_seq = $(that).children('.comment_seq').val();
	console.log(comment_seq);
	
	if(confirm("정말로 삭제하시겠습니까?")){
		$.ajax({
			type: 'post',
			url: '/pmang/board/commentDelete',
			data: {'comment_seq' : comment_seq},
			dataType: 'json',
			async : false,
			error: function(err){
				console.log(err)
			},
			success: function(result){
				
			}//success
		});//ajax
	$('#comment_seq').trigger('click');
	}//if
}//commentDeleteBtn

//대댓글 작성(append안에있어서click작동x)
function commentForComment(that){
	
	//스크롤 이동하기
	let scroll = $('#productInfo').offset();
	$('html,body').stop().animate({scrollTop:scroll.top},300,'swing');
	
	let comment_seq = $(that).next().children().children('.comment_seq').val();
	console.log(comment_seq);
	
	$.ajax({
		type: 'post',
		url: '/pmang/board/getAComment',
		data: {'comment_seq' : comment_seq},
		dataType: 'json',
		async : false,
		error: function(err){
			console.log(err)
		},
		success: function(result){
			//console.log(result.commentDTO.userId);	
			$('#replyText').val('@'+result.commentDTO.userId+':');
		}//success
	});//ajax

}


//댓글 더보기
$('#moreBtn').click(function() {
	let a = parseInt($('#commentIndex').val());
	let b = a + 1;
	$('#commentIndex').val(b);
	$('#comment_seq').trigger('click');
});

//찜버튼 클릭
$('#like').click(function() {
	if($('#likedOrNot').val()=='0'){
		$.ajax({
			type: 'post',
			url: '/pmang/board/pushLike',
			data: {'item_seq' : $('#item_seq').val(), 'userId' : $('#userId').val()},
			dataType: 'json',
			error:function(err){
				console.log(err);
			},
			success:function(result){
				
			}//success
		});//ajax
		
		$('#likedOrNot').trigger('click');
		$('#likedOrNot').val('1');
		$('#hiddenUserId').trigger('click');
		
	}else if($('#likedOrNot').val()=='1'){
		$.ajax({
			type: 'post',
			url: '/pmang/board/cancelLike',
			data: {'item_seq' : $('#item_seq').val(), 'userId' : $('#userId').val()},
			dataType: 'json',
			error:function(err){
				console.log(err);
			},
			success:function(result){
			
			}//success
		});//ajax
		$('#likedOrNot').trigger('click');
		$('#likedOrNot').val('0');
		$('#hiddenUserId').trigger('click');
	}//if
});



/* 인기 카테고리 슬라이드 쇼 이벤트 */

$(document).ready(function() {
  slide();
  slideItemPic();
});


// 슬라이드 
function slide() {
  var wid = 0;
  var now_num = 0;
  var slide_length = 0;
  var auto = null;
  var $panel = $('.panel');
/*  var $panelLi = $panel.children('li');*/

  
  // 변수 초기화
  function init() {
    wid = 800/*$('.slide').width()*/;
    now_num = 0;
    slide_length = parseInt($('#photoNum').val());
  }

  // 이벤트 묶음
  function slideEvent() {

    // 이후 버튼 클릭했을때
    $('.next').click(function() {
      nextChkPlay();
    });

    // 이전 버튼 클릭했을때
    $('.prev').click(function() {
      prevChkPlay();
    });
    
    // 화면크기 재설정 되었을때
    resize();
  }


  // 이전 버튼 클릭시 조건 검사후 슬라이드 무브
  function prevChkPlay() {
    if (now_num == 0) {
      now_num = slide_length - 1;
    } else {
      now_num--;
    }
    slideMove();
  }

  // 이후 버튼 클릭시 조건 검사후 슬라이드 무브
  function nextChkPlay() {
    if (now_num == slide_length - 1) {
      now_num = 0;
    } else {
      now_num++;
    }
    slideMove();
  }

  // 슬라이드 무브
  function slideMove() {
    $panel.stop().animate({
      'margin-left': -800 * now_num
    });
   
  }
  

  
  // 화면크기 조정시 화면 재설정
  function resize() {
    $(window).resize(function() {
      init();
      $panel.css({
        'margin-left': -800 * now_num
      });
    });
  }
  init();
  slideEvent();
  }

      /* 인기 카테고리 슬라이드 쇼 이벤트 */

function slideItemPic(){
	
	//변수 초기화
	function init_pic() {
	    wid_pic = 500;
	    now_num_pic = 0;
	    slide_length_pic = parseInt($('#photoNum').val());
	    
	}
	
	  // 이벤트 묶음
	  function slideEvent_pic() {

	    // 이후 버튼 클릭했을때
	    $('#imgRightBtn').click(function() {
	      nextChkPlay_pic();
	    });

	    // 이전 버튼 클릭했을때
	    $('#imgLeftBtn').click(function() {
	      prevChkPlay_pic();
	    });
	    
	    // 화면크기 재설정 되었을때
	    resize_pic();
	  }

	  // 이전 버튼 클릭시 조건 검사후 슬라이드 무브
	  function prevChkPlay_pic() {
		  console.log("이전 버튼");
	    if (now_num_pic == 0) {
	      now_num_pic = slide_length_pic - 1;
	    } else {
	      now_num_pic--;
	    }
	    slideMove_pic();
	  }

	  // 이후 버튼 클릭시 조건 검사후 슬라이드 무브
	  function nextChkPlay_pic() {
		  console.log("이후 버튼");
	    if (now_num_pic == slide_length_pic - 1) {
	      now_num_pic = 0;
	    } else {
	      now_num_pic++;
	    }
	    slideMove_pic();
	  }

	  // 슬라이드 무브
	  function slideMove_pic() {
		  console.log("슬라이드 무브");
		  $('#itemPictureDiv').stop().animate({
	      'margin-left': -500 * now_num_pic
	    });
	  }
	  

	  
	  // 화면크기 조정시 화면 재설정
	  function resize_pic() {
	    $(window).resize(function() {
	    	console.log("화면 조정");
	      init_pic();
	      $('#itemPictureDiv').css({
	        'margin-left': -500 * now_num_pic
	      });
	    });
	  }
	  
	  init_pic();
	  slideEvent_pic();
}


