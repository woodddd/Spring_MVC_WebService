/*
//강제 탈퇴
$('#adminDeleteSearchBtn').click(function(){
// alert('클릭');
	alert($('#userid').val());
	$.ajax({
		type:'post',
		url:'/pmang/member/adminUserDeleteSearch',
		data:'userid='+$('#userid').val(),
		dataType:'text',
		success:function(data){
			// alert($('input[type=text]').val()+'님을 강제탈퇴하였습니다.');
		// alert('성공');
		// alert(data);
		//	
			$('.userSearchResultDiv').empty();
		
				if(data==$('#userid').val()){
					
					$('<div/>').append($('<span/>',{
						class:'resultid',
						text:data+''
					})).append($('<button id="adminUserDelete">탈퇴</button>'))
					.appendTo($('.userSearchResultDiv'));
					

					$('#adminUserDelete').on('click',function(){
						var userid=$('.resultid').text();
						
						$.ajax({
							type:'post',
							url:'/pmang/member/adminUserDelete',
							data:"userid="+userid,
							success:function(){
								alert(userid+'님을 강제탈퇴했습니다.');
								window.close();
							}
						});
					});
						
					
				}else if(data==''){
					$('<div/>').append($('<span/>',{
						text:'찾고자하는 아이디가 없습니다.'
					})).appendTo($('.userSearchResultDiv'));
				}
			
			
		},
		error:function(err){
			console.log(err);
		}
	});
	
});*/

