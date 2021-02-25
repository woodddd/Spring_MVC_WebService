//아이디찾기  
function selectEmail(element){			//이메일 주소 선택 이벤트
	var $element = $(element);
	var $email2 = $('input[name=email2]');
	
	//'1'인 경우 직접 입력
	if($element.val()=="1"){
		$email2.attr('readonly', false);
		$email2.val('');
	} else {
		$("#email2").attr("readonly", true);
		$('#email2').val($element.val());
	}
};
//포커스아웃 정규식 유효성검사
$('#userName').focusout(function(){
	var nameCheck = /^[가-힣]{2,6}$/;
	 if($('#userName').val()==''){
		$('#userNameDiv').text('필수 정보 입니다')
		$('#userNameDiv').css('color','red')
		$('#userNameDiv').css('font-size','8pt')
		$('#userNameDiv').css('font-weight','bold');
	}else if(!nameCheck.test($('#userName').val())){		//이름 형식 유효성 검사
			$('#userNameDiv').text('*한글만 가능합니다(2~6자)')
			$('#userNameDiv').css('color','red')
			$('#userNameDiv').css('font-size','8pt')
			$('#userNameDiv').css('font-weight','bold');
			
	}else{
		$('#userNameDiv').empty();
	}
});
$('#email1').focusout(function(){
	var email1Check = /^[A-Za-z0-9_\.\-]/;
	if($('#email1').val()==''){
		$('#emailDiv').text('필수 정보 입니다')
		$('#emailDiv').css('color','red')
		$('#emailDiv').css('font-size','8pt')
		$('#emailDiv').css('font-weight','bold');
	}else if(!email1Check.test($('#email1').val())){		//이메일 형식 유효성 검사		
		$('#emailDiv').text('유효하지 않은 이메일 형식입니다')
		$('#emailDiv').css('color','red')
		$('#emailDiv').css('font-size','8pt')
		$('#emailDiv').css('font-weight','bold');
	}else{
		$('#emailDiv').empty();
	}
});

$('#email2').focusout(function(){
	var email2Check = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if($('#email2').val()==''){
		$('#emailDiv').text('필수 정보 입니다')
		$('#emailDiv').css('color','red')
		$('#emailDiv').css('font-size','8pt')
		$('#emailDiv').css('font-weight','bold');
	}else if(!email2Check.test($('#email2').val())){		//이메일 형식 유효성 검사		
		$('#emailDiv').text('유효하지 않은 이메일 형식입니다')
		$('#emailDiv').css('color','red')
		$('#emailDiv').css('font-size','8pt')
		$('#emailDiv').css('font-weight','bold');
	}else{
		$('#emailDiv').empty();
	}
});
function findId(event) {
	event.preventDefault();
	var nameCheck = /^[가-힣]{2,6}$/;
	var email1Check = /^[A-Za-z0-9_\.\-]/;
	var email2Check = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	
	//유효성검사
	if($('#userName').val()==''){
		$('#userNameDiv').text('필수 정보 입니다')
		$('#userNameDiv').css('color','red')
		$('#userNameDiv').css('font-size','8pt')
		$('#userNameDiv').css('font-weight','bold');
		
	}else if(!nameCheck.test($('#userName').val())){		//이름 형식 유효성 검사
		$('#userNameDiv').text('*한글만 가능합니다(2~6자)')
		$('#userNameDiv').css('color','red')
		$('#userNameDiv').css('font-size','8pt')
		$('#userNameDiv').css('font-weight','bold');
	}else if($('#email1').val()==''||$('#email2').val()==''){
		$('#emailDiv').text('필수 정보 입니다')
		$('#emailDiv').css('color','red')
		$('#emailDiv').css('font-size','8pt')
		$('#emailDiv').css('font-weight','bold');
		
	}else if(!email1Check.test($('#email1').val())||!email2Check.test($('#email2').val())){		//이메일 형식 유효성 검사		
		$('#emailDiv').text('유효하지 않은 이메일 형식입니다')
		$('#emailDiv').css('color','red')
		$('#emailDiv').css('font-size','8pt')
		$('#emailDiv').css('font-weight','bold');
	}else{
		$.ajax({
			type: 'post',
			url: '/pmang/member/findId',
			data: {
				'userName': $("#userName").val(),
				'email1': $("#email1").val(),
				'email2': $("#email2").val(),
			},
			dataType: 'text',
			success: function(data){
				if(data == 'fail') {
					alert("이름 또는 이메일을 확인해 주세요.");
					return
				}
				var part1 = data.substring(0,5);
				var part2 = data.substring(5, data.length);
				var replacePart2 = part2.replace(/([a-zA-Z0-9])/g,'*')
				
				$('#resultId').text(part1 + replacePart2)
			},
			error: function(err){
				console.log(err);
			}
		});   
	}
}
 