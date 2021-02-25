//비밀번호 찾기
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
$('#userId').focusout(function(){
	var userIdCheck = /^[a-zA-Z0-9]{6,16}$/;
	if($('#userId').val()==''){
		$('#userIdDiv').text('먼저 아이디를 입력하세요')
		$('#userIdDiv').css('color','magenta')
		$('#userIdDiv').css('font-size','8pt')
		$('#userIdDiv').css('font-weight','bold');
	}else if(!userIdCheck.test($('#userId').val())) {		//id 형식 유효성 검사
			$('#userIdDiv').text('*영문, 숫자만 가능합니다(6~16자)')
			$('#userIdDiv').css('color', 'red')
			$('#userIdDiv').css('font-size', '8pt')
			$('#userIdDiv').css('font-weight', 'bold');
			
	}else{
		$('#userIdDiv').empty();
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

function findPwd(event) {
	event.preventDefault();
	var userIdCheck = /^[a-zA-Z0-9]{6,16}$/;
	var email1Check = /^[A-Za-z0-9_\.\-]/;
	var email2Check = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	//유효성검사
	if($('#userId').val()==''){
		$('#userIdDiv').text('필수 정보 입니다')
		$('#userIdDiv').css('color','red')
		$('#userIdDiv').css('font-size','8pt')
		$('#userIdDiv').css('font-weight','bold');
		
	}else if(!userIdCheck.test($('#userId').val())) {		//이름 형식 유효성 검사
		$('#userIdDiv').text('*영문, 숫자만 가능합니다(6~16자)')
		$('#userIdDiv').css('color', 'red')
		$('#userIdDiv').css('font-size', '8pt')
		$('#userIdDiv').css('font-weight', 'bold');
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
		url: '/pmang/member/findPwd',
		data: {
			'userId': $("#userId").val(),
			'email1': $("#email1").val(),
			'email2': $("#email2").val(),
		},
		dataType: 'text',
		success: function(data){
			if(data == 'success'){
				alert("임시비밀번호 발송 완료!! 이메일을 확인해주세요.");
				return
			}else if(data == 'findfail'){
				alert("아이디 또는 이메일을 확인해 주세요.");
					return
				}
				
				
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		});   
	}
}