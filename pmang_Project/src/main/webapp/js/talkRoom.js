$(document).ready(function() {
	$.ajax({
		type: 'POST',
		url: '/pmang/talk/getMessage',
		data: {'partner_userId':$('#receiver_user_id').val()},
		dataType: 'json',
		success: function(data) {
		      if(data != '{}'){//List의 값이 null이 아닐때
		    	  console.log(data.messageList)
		    	  $.each(data.messageList, function(index, items) {
		    		  
		    		  if($('#talkContentDiv .talkDateDiv:last').text() != items.send_time.substring(0,10)){
		    	    	  $('#talkContentDiv').append($('<div />',{
		    	        	  class : 'talkDateDiv'
		    	          }).append($('<div />',{
		    	        	  class : 'talkDate',
		    	        	  align : 'center',
		    	        	  text : items.send_time.substring(0,10)
		    	          }))); 
		    	      }
		    		  
		    		  if(items.userId == $('#sender_user_id').val() && (items.sender_user_id == $('#sender_user_id').val() && items.receiver_user_id == $('#receiver_user_id').val())){
		    			  if($('#talkContentDiv').children().last().prop('className') == 'talkSendDiv'){
		                      
		            		  let currentMinute = items.send_time.substring(11,16).split(":");
		            		  let beforeMinute = $('#talkContentDiv .talkSendTime:last').text().split(":");
		            		  
		            		  if(currentMinute[1] == beforeMinute[1]){
		            			  $('#talkContentDiv .talkSendTime:last').text(' ');
		            		  }
		            	  }
		    			  
		    			  $('#talkContentDiv').append($('<div />', {
			        		  class : 'talkSendDiv'
			        	  }).append($('<div />',{
			        		  class : 'talkTimeDiv'
			        	  }).append($('<div />',{
			        		  class : 'readCheck',
			        		  text : ''//영은이 할부분
			        	  })).append($('<div />',{
			        		  class : 'talkSendTime',
			        		  text : items.send_time.substring(11,16)//마지막 메세지에만 붙여줘야한다.
			        	  }))).append($('<div />',{
			        		  class : 'talkSendTooltip'
			        	  }).append($('<div />',{
			        		  class : 'talkSendContent',
			        		  text : items.talk_content
			        	  }))));
			        	  
			    	  }//if
		    		  
		    		  if(items.userId == $('#sender_user_id').val() && (items.sender_user_id == $('#receiver_user_id').val() && items.receiver_user_id == $('#sender_user_id').val())){
		    			  if($('#talkContentDiv').children().last().prop('className') == 'talkRecieveDiv'){//#talkContentDiv 의 마지막 자식의 클래스네임이 talkSendDiv라면,
		    	        	  
		    	        	  let currentMinute1 = items.send_time.substring(11,16).split(":");
		    	    		  let beforeMinute1 = $('#talkContentDiv .talkReciveTime:last').text().split(":");
		    	    		  
		    	    		  if(currentMinute1[1] == beforeMinute1[1]){
		    	    			  $('#talkContentDiv .talkReciveTime:last').text(' ');
		    	    		  }
		    	          }
		    			  
		    			  $('#talkContentDiv').append($('<div />',{
		    				  class : 'talkRecieveDiv'
		    			  }).append($('<div />',{
		    				  class : 'talkReciveProfile'
		    			  }).append($('<img />',{
		    				  class : 'profileImg',
		    				  src : $('#receiver_user_profileImage').val(),
		    				  alt : '프로필이미지',
		    				  width : '36',
		    				  height : '36'
		    			  }))).append($('<div />',{
		    				  class : 'talkReciveTooltip'
		    			  }).append($('<div />',{
		    				  class : 'talkReciveContent',
		    				  text : items.talk_content
		    			  }))).append($('<div />',{
		    				  class : 'talkReciveTime',
		    				  text : items.send_time.substring(11,16)
		    			  })));
		    		  }//if
			      });//each
		    	  
		      }//if
		      $("#talkContentDiv").scrollTop($('#talkContentDiv')[0].scrollHeight)
		},
		error: function(err) {
			console.log(err)
		}
		
	});
	
   sock = new SockJS('/pmang/talk-ws');//나중에 혹시 안되면 "ws://192.168.8.32:8080/SpringWeb/chat-ws" 나중에 주소적을때 이런 양식으로.
   
   sock.onopen = function() {
      console.log('open');
   };//onopen
   
   var online_contect = '';//상대방 on/offline 여부
   sock.onmessage = function(e) {
      var data = e.data;
      console.log(data)
      console.log("e - " + e)
      var obj = JSON.parse(data)
      console.log(obj.talk_content)
      
      online_contect = obj.read_time;
      console.log(obj.read_time);
      if(online_contect == 'on_line'){
    	  $('.readCheck').text('');
      }
      else if(online_contect == 'off_line'){
    	  unread='안읽음';
      }
      if(obj.receiver_user_id== $('#sender_user_id').val() && obj.read_time =='on_line'&&obj.sender_user_id== $('#receiver_user_id').val()){
    	  $('.readCheck').text('');
    	  unread='';
      }
      
	  if((obj.sender_user_id == $('#sender_user_id').val() && obj.receiver_user_id == $('#receiver_user_id').val()) || obj.receiver_user_id == $('#sender_user_id').val()){
		  appendMaessge(obj);
      }
		  
      
      
   };
   
   sock.onclose = function() {
      appendMessage("연결을 끊었습니다.");
      console.log('close');
   };
   
   function getTimeStamp() {
	   var d = new Date();
	   var s =
	     leadingZeros(d.getFullYear(), 4) + '-' +
	     leadingZeros(d.getMonth() + 1, 2) + '-' +
	     leadingZeros(d.getDate(), 2);

	   return s;
	 }
   
   function getTalkTime() {
	   var d = new Date();
	   var s = 
		   leadingZeros(d.getHours(), 2) + ':' +
		   leadingZeros(d.getMinutes(), 2);
	   
	   return s;
   }

	 function leadingZeros(n, digits) {
	   var zero = '';
	   n = n.toString();

	   if (n.length < digits) {
	     for (i = 0; i < digits - n.length; i++)
	       zero += '0';
	   }
	   return zero + n;
	 }
   
   // 메세지 보내기
   $('#sendBtn').click(function() {
     /*var msg = $.trim($('#talk_message').val());
     alert(msg);
     alert($('#talk_message').val());*/
     var msg = $('#talk_message').val();
     if(msg != ""){
    	 message = {
    			 sender_user_id : $('#sender_user_id').val(),
    			 receiver_user_id : $('#receiver_user_id').val(),
    			 talk_content : $('#talk_message').val(),
    			 receiver_user_profileImage : $('#receiver_user_profileImage').val(),
    			 item_seq : $('#item_seq').val()
    	 }
        sock.send(JSON.stringify(message));
        $('#talk_message').val('');
     }
   });
   
   $('#talk_message').keypress(function(e){
        if ( e.which == 13 ) {
            $('#sendBtn').click();
            return false;
        }
   });
   
   //이미지 보내기
   $('.imageChoice').change(function(e){
	   message = {
  			 sender_user_id : $('#sender_user_id').val(),
  			 receiver_user_id : $('#receiver_user_id').val(),
  			 talk_content : $('#talk_message').val(),
  			 receiver_user_profileImage : $('#receiver_user_profileImage').val(),
  			 item_seq : $('#item_seq').val()
	   }
   });

   function appendMaessge(obj) {
      var talk_content = obj.talk_content;

      var talkDate = getTimeStamp();
      var profileImg = $('#receiver_user_profileImage').val();
      var talkTime = getTalkTime();
      var talkRead = '';

      // 메세지가 하루 중 처음 온것인지 아닌지
      // DB 가서 메세지중 오늘(ex) 8일) 보낸 데이터를 count 하여 0 이면 메시지 append 전에 오늘날짜를 뿌림.
//      alert($('#talkContentDiv .talkDateDiv:last').text())
      
      if($('#talkContentDiv .talkDateDiv:last').text() != talkDate){
    	  $('#talkContentDiv').append($('<div />',{
        	  class : 'talkDateDiv'
          }).append($('<div />',{
        	  class : 'talkDate',
        	  align : 'center',
        	  text : talkDate
          }))); 
      }
      
      // 송신자/수신자 구분
      
      //talkSendTime 을 append 하는 것은 새로운 메시지를 append 하기 전에, 기존 데이터의 분과 같은 분에 보낸 메세지라면,
      //이전 append 를 삭제해줘야함.
      
      //우석생각 - 방법 1
      
      
      //방법 2 append(talkSendTime) 을 따로 빼서, 이전 talkSendTime 에는 '' 을넣어주고, liastchild 에만 
      //text() 에 talkTime 를 찍어준다.
      
      
      
      if((obj.sender_user_id == $('#sender_user_id').val() && obj.receiver_user_id == $('#receiver_user_id').val())){
//    	  alert($('#talkContentDiv .talkSendTime:last').text())
    	  if($('#talkContentDiv').children().last().prop('className') == 'talkSendDiv'){//#talkContentDiv 의 마지막 자식의 클래스네임이 talkSendDiv라면,
              
    		  let currentMinute = talkTime.split(":");
    		  let beforeMinute = $('#talkContentDiv .talkSendTime:last').text().split(":");
    		  
    		  if(currentMinute[1] == beforeMinute[1]){
    			  $('#talkContentDiv .talkSendTime:last').text(' ');
    		  }
    	  } 
    	  
		  $('#talkContentDiv').append($('<div />', {
    		  class : 'talkSendDiv'
    	  }).append($('<div />',{
    		  class : 'talkTimeDiv'
    	  }).append($('<div />',{
    		  class : 'readCheck',
    		  text : talkRead//영은이 할부분
    	  })).append($('<div />',{
    		  class : 'talkSendTime',
    		  text : talkTime//마지막 메세지에만 붙여줘야한다.
    	  }))).append($('<div />',{
    		  class : 'talkSendTooltip'
    	  }).append($('<div />',{
    		  class : 'talkSendContent',
    		  text : talk_content
    	  }))));
    	  
	  }//if
	  
	  if(obj.receiver_user_id == $('#sender_user_id').val() && obj.sender_user_id == $('#receiver_user_id').val()){
		  if($('#talkContentDiv').children().last().prop('className') == 'talkRecieveDiv'){
        	  
        	  let currentMinute = talkTime.split(":");
    		  let beforeMinute = $('#talkContentDiv .talkSendTime:last').text().split(":");
    		  
    		  if(currentMinute[1] == beforeMinute[1]){
    			  $('#talkContentDiv .talkSendTime:last').text(' ');
    		  }
          }
		  
		  $('#talkContentDiv').append($('<div />',{
			  class : 'talkRecieveDiv'
		  }).append($('<div />',{
			  class : 'talkReciveProfile'
		  }).append($('<img />',{
			  class : 'profileImg',
			  src : profileImg,
			  alt : '프로필이미지',
			  width : '36',
			  height : '36'
		  }))).append($('<div />',{
			  class : 'talkReciveTooltip'
		  }).append($('<div />',{
			  class : 'talkReciveContent',
			  text : talk_content
		  }))).append($('<div />',{
			  class : 'talkReciveTime',
			  text : talkTime
		  })));
	  }//if
  
      //스크롤
      $("#talkContentDiv").scrollTop($('#talkContentDiv')[0].scrollHeight)
      

/*
      var chatAreaHeight = $('.talkSendDiv').height();
      var maxScroll = $("#talkContentDiv").height()-chatAreaHeight;
      $("#talkContentDiv").scrollTop(maxScroll);*/



      
      

      //안읽음 처리 해야함

      // 2-1. 메세지를 보낸거라면 메세지를 읽었는지 안읽었는지

      //2-2 메세지를 받은거라면 system시간 기준 1분 사이에 처음 보낸 메세지인지 마지막에 보낸메세지인지
      
   }
   // header 상점명 클릭 모달
   
   $('.talk_itemName_button').on('click', function() {
      if ($('.modal_area').is('.tem') == true) {
         $('.modal_area').removeClass('tem');
         $('.itemName_arrow').css('transform', 'rotate(180deg)');

      } else {
         $('.modal_area').addClass('tem');
         $('.itemName_arrow').css('transform', 'rotate(0deg)');
      }

      $('.modalDiv').toggle();/*toggle("normal")*/
      $('.room_setting_modal').hide(); 
      $('.room_setting_modal').off('scroll touchmove mousewheel');
   });
   
   
   //------------------------------------------------------------
   
   $('.talk_item_detailBtn').on('click',function(){
      $('.room_setting_modal').toggle();
      $('.modalDiv').hide(); 
      $('.modalDiv').off('scroll touchmove mousewheel');
   });
   
   //------------------------------------------------------------
   
   //모달창 닫기
   $(document).click(function(e){
      if($('.modal_area').is(e.target)){
         
         $('.modalDiv').hide(); 
         $('.modalDiv').off('scroll touchmove mousewheel');
         
      }
      
      if($('.room_setting_modal_area').is(e.target)){
         
         $('.room_setting_modal').hide(); 
         $('.room_setting_modal').off('scroll touchmove mousewheel');
         
      }
      
   });
   //------------------------------------------------------------
   
// option버튼 -----------------
   $('.message_option_Btn').on('click', function(){
      if($('.message_option_div').is('.click') == true){
         $('.message_option_div').removeClass('click');
         $('.message_option_div').css('display','none');
      }else {
         $('.message_option_div').addClass('click');
          $('.message_option_div').css('display', 'flex');
      }
   });
   
   //이미지 버튼
   $('#fileBtn').click(function(e) {
      e.preventDefault();
      $('#files').click();
   });


   
   // option버튼 끝-----------------
   //하단모달
   $('#item_choice_Btn').on('click', function() {
      $('.all_modal').addClass('on');
      $('.item_choice_nav').css('display','block');
      $('.on').click(function() {
         $('.all_modal').removeClass('on');
         $('.item_choice_nav').css('display','none');
   });
      $('.item_choice_closeBtn').click(function() {
         $('.all_modal').removeClass('on');
         $('.item_choice_nav').css('display','none');
   });
   });
   
   //하단모달끝--------------------
   
   
   //알림버튼 클릭
var sw=1;
var Notification_status=1;//상태가 변화하면 Notification_status 변수를 들고 ajax로 가서 TalkRoom 테이블의 Notification_status 값 변경.
$('.room_setting_notification_Btn').on('click',function(){
   
   if(sw == 1){
      $('.room_setting_notification_Btn').css('background-image','url(/pmang/image/notification.png)');//회색
      $('.room_setting_notification_Btn>b').text('OFF');
      Notification_status = 0;
   }else {
      $('.room_setting_notification_Btn').css('background-image','url(/pmang/image/notification_green.png)');//녹색
      $('.room_setting_notification_Btn>b').text('ON');
      Notification_status = 1;
   }
   $('.room_setting_modal').hide(); 
   $('.room_setting_modal').off('scroll touchmove mousewheel');
   sw = sw * (-1);
   
   
});

if($('#sender_user_id').val() == $('#sellerItem_userId').val()){//세션에 로그인된 사람이 판매자이면.
	$('.price_change').text('판매완료');
}else{
	$('.price_change').text('리뷰작성');
}

// 판매완료/ 리뷰작성
$('.modal_div').hide();
$('.modal_div2').hide();
$('.price_change').on('click',function(){
	if($('#sender_user_id').val() == $('#sellerItem_userId').val()){//판매완료
		$.ajax({
			type: 'POST',
			url: '/pmang/talk/itemSold',//판매완료
			data: {item_seq : $('#item_seq').val()},
			dataType: 'json',
			success: function(data) {
				if(data.item_state == 'sell'){
					$('#talk_message').val('판매가 완료되었습니다. 리뷰를 남겨주세요.');
					$('#sendBtn').click();
				}else{
					$('.modal_div2').show();
					$('.all_modal2').addClass('on');
					$('.modal_div2').css('position', 'fixed');
					$('.modal_div2').css('left', '42px');
					$('.modal_div2').css('top', '200px');
			         // 모달바탕 클릭했을때(꺼짐)
					$('.on').click(function() {
						$('.all_modal2').removeClass('on');
			            $('.modal_div2').css('position', 'static');
			            $('.modal_div2').hide();
					}); 
				}
				
			},
			error: function(err) {
				console.log(err)
			}
		});
	}else{//리뷰작성
		var sellCheck;
	      $.ajax({
	         type: 'POST',
	         url: '/pmang/talk/sellCheck',
	         data: {
	            'item_seq': $('#item_seq').val()
	         },
	         async: false ,
	         dataType: 'json',
	         success: function(data) {
	            console.log(data);
	            sellCheck = data.check;
	         }
	      });
	      if(sellCheck =='sell'){//판매중
	         //modal
	         
	         // alert($(this).prop('className'));
	/*         $('.userName_modal').text( items.marketname);*/
	         $('.modal_div').show();
	         $('.all_modal').addClass('on');
	         $('.modal_div').css('position', 'fixed');
	         $('.modal_div').css('left', '42px');
	         $('.modal_div').css('top', '200px');
	         // 모달바탕 클릭했을때(꺼짐)
	         $('.on').click(function() {
	            $('.all_modal').removeClass('on');
	            $('.modal_div').css('position', 'static');
	            $('.modal_div').hide();
	         });      
	      
	      }else {//판매완료
	         //주소연결
	         window.open("/pmang/board/reviewWriteForm?item_seq="+$('#item_seq').val(),"Review","width=375 height=667");      
	      }

	}
});

//------------------------모달 헤더 
$('.itemboard_move').on('click',function(){
//	opener.parent.top.location='/pmang/board/itemView?item_seq='+$('#item_seq').val();
	window.open('/pmang/board/itemView?item_seq='+$('#item_seq').val(),'itemViewMove');
});

$('.seller_market_a').on('click',function(){
//	opener.top.location='/pmang/board/mystore?userid=' + $('#sellerItem_userId').val();
	window.open('/pmang/board/mystore?userid=' + $('#sellerItem_userId').val(),'mystoreMove');
});

$('.room_setting_out').on('click',function(){
	
		$.ajax({
			type: 'POST',
			url: '/pmang/talk/roomOut',
			data: {'partner_userId':$('#receiver_user_id').val()},
			success: function() {
				window.close()
			},
			error: function(err){
				console.log(err)
			}
		});
});
//-------------------------------
   
});