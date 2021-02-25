//회원정보 수정
$('#modifyBtn').click(function(event){
	//각 항목이 적합한 양식인지 검사할 정규식
	var pwdCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
	var nameCheck = /^[가-힣]{2,6}$/;
	var email1Check = /^[A-Za-z0-9_\.\-]/;
	var email2Check = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	var tel2Check = /^[0-9]{3,4}$/ ;
	var tel3Check = /^[0-9]{4}$/ ;
	$('#pwdDiv').empty();
	$('#repwdDiv').empty();
	$('#userNameDiv').empty();
	$('#emailDiv').empty();
	$('#telDiv').empty();
	$('#addrDiv').empty();
	
	if($('#pwd').val()==''){
		$('#pwdDiv').text('필수 정보 입니다')
		$('#pwdDiv').css('color','red')
		$('#pwdDiv').css('font-size','8pt')
		$('#pwdDiv').css('font-weight','bold');
		
	}else if($('#repwd').val() != $('#pwd').val()){
		$('#repwdDiv').text('비밀번호가 맞지 않습니다')
		$('#repwdDiv').css('color','red')
		$('#repwdDiv').css('font-size','8pt')
		$('#repwdDiv').css('font-weight','bold');
		
	}else if(!pwdCheck.test($('#pwd').val())){		//pwd 형식 유효성 검사
		$('#pwdDiv').text('*영문, 숫자만 가능합니다(6~16자)')
		$('#pwdDiv').css('color','red')
		$('#pwdDiv').css('font-size','8pt')
		$('#pwdDiv').css('font-weight','bold');
	
	}else if($('#userName').val()==''){
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
		
	}else if($('#tel2').val()==''||$('#tel3').val()==''){
		$('#telDiv').text('필수 정보 입니다')
		$('#telDiv').css('color','red')
		$('#telDiv').css('font-size','8pt')
		$('#telDiv').css('font-weight','bold');
		
	}else if(!tel2Check.test($('#tel2').val())||!tel3Check.test($('#tel3').val())){
		$('#telDiv').text('유효하지 않은 형식입니다')
		$('#telDiv').css('color','red')
		$('#telDiv').css('font-size','8pt')
		$('#telDiv').css('font-weight','bold');

	}else if($('#postcode').val()==''||$('#address').val()==''){
		$('#addrDiv').text('필수 정보 입니다')
		$('#addrDiv').css('color','red')
		$('#addrDiv').css('font-size','8pt')
		$('#addrDiv').css('font-weight','bold');
		
		
	}else{
		$.ajax({
			type: 'post',
			url: '/pmang/member/modify',
			data: $('#modifyForm').serialize(),
			success: function(){
				alert('회원정보수정 완료');
				location.href='/pmang/index';
			},
			error: function(err){
				console.log(err);
			}
		});
	}
});

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
$('#pwd').focusout(function(){
	var pwdCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
	if($('#pwd').val()==''){
		$('#pwdDiv').text('필수 정보 입니다')
		$('#pwdDiv').css('color','red')
		$('#pwdDiv').css('font-size','8pt')
		$('#pwdDiv').css('font-weight','bold');
	}else if(!pwdCheck.test($('#pwd').val())){		//pwd 형식 유효성 검사
		$('#pwdDiv').text('*영문, 숫자만 가능합니다(6~16자)')
		$('#pwdDiv').css('color','red')
		$('#pwdDiv').css('font-size','8pt')
		$('#pwdDiv').css('font-weight','bold');
	}else{
		$('#pwdDiv').empty();
	}
});

$('#repwd').focusout(function(){
	if($('#repwd').val() != $('#pwd').val()){
		$('#repwdDiv').text('비밀번호가 맞지 않습니다')
		$('#repwdDiv').css('color','red')
		$('#repwdDiv').css('font-size','8pt')
		$('#repwdDiv').css('font-weight','bold');
	}else{
		$('#repwdDiv').empty();
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
$('#tel2').focusout(function(){
	var tel2Check = /^[0-9]{3,4}$/ ;
	if($('#tel2').val()==''){
		$('#telDiv').text('필수 정보 입니다')
		$('#telDiv').css('color','red')
		$('#telDiv').css('font-size','8pt')
		$('#telDiv').css('font-weight','bold');
		
	}else if(!tel2Check.test($('#tel2').val())){
		$('#telDiv').text('유효하지 않은 형식입니다')
		$('#telDiv').css('color','red')
		$('#telDiv').css('font-size','8pt')
		$('#telDiv').css('font-weight','bold');
	}else{
		$('#telDiv').empty();
	}
});
$('#tel3').focusout(function(){
	var tel3Check = /^[0-9]{4}$/ ;
	if($('#tel3').val()==''){
		$('#telDiv').text('필수 정보 입니다')
		$('#telDiv').css('color','red')
		$('#telDiv').css('font-size','8pt')
		$('#telDiv').css('font-weight','bold');
		
	}else if(!tel3Check.test($('#tel3').val())){
		$('#telDiv').text('유효하지 않은 형식입니다')
		$('#telDiv').css('color','red')
		$('#telDiv').css('font-size','8pt')
		$('#telDiv').css('font-weight','bold');
	}else{
		$('#telDiv').empty();
	}
});


//회원탈퇴
$('#deleteId').click(function(event){
	event.preventDefault();
if(confirm('정말로 탈퇴하시겠습니까?')){
	$.ajax({
		type: 'post',
		url: '/pmang/member/deleteId',
		data: {
			'userId': $("#userId").val(),
		},
		dataType: 'text',
		success: function(data){
			alert('회원탈퇴 완료!!');
			location.href='/pmang/index';
		},
		error: function(err){
			console.log(err);
		}
	});
}

else{
	return false;
}

});
