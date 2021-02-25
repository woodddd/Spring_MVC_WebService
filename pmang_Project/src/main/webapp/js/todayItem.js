
      /* 인기 카테고리 슬라이드 쇼 이벤트 */

$(document).ready(function() {
  slide();
});


// 슬라이드 
function slide() {
  var wid = 0;
  var now_num = 0;
  var slide_length = 0;
  var auto = null;
  var $dotli = $('.dot>li');
  var $panel = $('.panel');
  var $panelLi = $panel.children('li');

  // 변수 초기화
  function init() {
    wid = $('.slide').width();
    now_num = $('.dot>li.on').index();
    slide_length = $dotli.length;
  }

  // 이벤트 묶음
  function slideEvent() {

    // 슬라이드 하단 dot버튼 클릭했을때
    $dotli.click(function() {
      now_num = $(this).index();
      slideMove();
    });

    // 이후 버튼 클릭했을때
    $('.next').click(function() {
      nextChkPlay();
    });

    // 이전 버튼 클릭했을때
    $('.prev').click(function() {
      prevChkPlay();
    });

    // 오토플레이
    autoPlay();

    // 오토플레이 멈춤
    autoPlayStop();

    // 오토플레이 재시작
    autoPlayRestart();

    // 화면크기 재설정 되었을때
    resize();
  }

  // 자동실행 함수
  function autoPlay() {
    auto = setInterval(function() {
      nextChkPlay();
    }, 4000);
  }

  // 자동실행 멈춤
  function autoPlayStop() {
    $panelLi.mouseenter(function() {
      clearInterval(auto);
    });
  }


  // 자동실행 멈췄다가 재실행
  function autoPlayRestart() {
    $panelLi.mouseleave(function() {
      auto = setInterval(function() {
        nextChkPlay();
      }, 4000);
    });
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
      'margin-left': -wid * now_num
    });
    $dotli.removeClass('on');
    $dotli.eq(now_num).addClass('on');
  }

  // 화면크기 조정시 화면 재설정
  function resize() {
    $(window).resize(function() {
      init();
      $panel.css({
        'margin-left': -wid * now_num
      });
    });
  }
  init();
  slideEvent();
}

      /* 인기 카테고리 슬라이드 쇼 이벤트 */


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
      
var page = 1;
$(document).ready(function(){
	getList(page);
    page++;
	
	$.ajax({
	      type : 'post',
	      url : '/pmang/board/getIndexTotalItem',
	      dataType : 'text',
	      success : function(data){
	    	  $('#total').val(data);
	      },
	      error : function(err){
	    	  console.log(err);
	      }
	});
    
});
      
$(window).scroll(function(){   //스크롤이 최하단 으로 내려가면 리스트를 조회하고 page를 증가시킨다.
    if($(window).scrollTop() >= $(document).height() - $(window).height()){
         getList(page);
         page++;   
    } 
});

function getList(page){
	
	if(page != 1 && page > $('#total').val()){
		return;
	}
	else{
		$.ajax({
	        type : 'post',  
	        dataType : 'json', 
	        data : {"pg" : page},
	        url : '/pmang/board/getIndexBoardList',
	        success : function(data) {
	        	if(data.itemList.length == 0){
	        		$('.selection3').html('<div>아직 장터가 많이 부실해서 등록된 상품이 없습니다.. 상품을 등록해주세요..</div>');
	        	}
	        	else{
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
	        			
	        			$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv))).appendTo($('.selection3'));
	        		});//each
	        	}
	       },
	       error: function(err){
	    	   console.log(err);
	       }
		});//each
	}//else
}



//아이템 클릭했을 때
$('.selection3').on('click', '.itemLink', function(){
	var item_seq = $(this).children('#item_seqSpan').text();
	var itemSubject = $(this).find('.itemName').text();
	var itemPrice = $(this).find(".itemPrice").text();
	var img = $(this).children("img").attr('src');
	
	checkCookie(img, itemSubject, itemPrice, item_seq);
	
	
	//아이템 뷰로 이동!
	location.href="/pmang/board/itemView?item_seq="+item_seq;
	
});

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










/*$(document).ready(function(){
      	
     $.ajax({
      type : 'post',
      url : '/pmang/board/getIndexBoardList',
      data : {'pg' : '1'},
      dataType : 'json',
      success : function(data){
    	 $('#total').val(data.totalItem);
    	 //console.log(JSON.stringify(data));
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
      				
      				
      				$(itemFrameDiv).append($(itemLinkA).append($(itemContentDiv))).appendTo($('.selection3'));
      			});
      		},
      		error : function(err){
      			console.log(err);
      		}
      		
      	});
});*/