//회원가입

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

//유효성 검사
$('#writeBtn').click(function(event){
	//각 항목이 적합한 양식인지 검사할 정규식
	var userIdCheck = /^[a-zA-Z0-9]{6,16}$/;
	var pwdCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
	var nameCheck = /^[가-힣]{2,6}$/;
	var email1Check = /^[A-Za-z0-9_\.\-]/;
	var email2Check = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	var tel2Check = /^[0-9]{3,4}$/ ;
	var tel3Check = /^[0-9]{4}$/ ;
	
	$('#userIdDiv').empty();
	$('#pwdDiv').empty();
	$('#repwdDiv').empty();
	$('#userNameDiv').empty();
	$('#emailDiv').empty();
	$('#telDiv').empty();
	$('#addrDiv').empty();
	if($('#userId').val()==''){
		$('#userIdDiv').text('필수 정보 입니다')
		$('#userIdDiv').css('color','red')
		$('#userIdDiv').css('font-size','8pt')
		$('#userIdDiv').css('font-weight','bold');	
				
	}else if(!userIdCheck.test($('#userId').val())) {		//id 형식 유효성 검사
		$('#userIdDiv').text('*영문, 숫자만 가능합니다(6~16자)')
		$('#userIdDiv').css('color', 'red')
		$('#userIdDiv').css('font-size', '8pt')
		$('#userIdDiv').css('font-weight', 'bold');
		
	}else if($('#pwd').val()==''){
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
		
	}else if($('#userId').val() != $('#check').val()){		//아이디 중복 체크
		$('#userIdDiv').text('중복체크 하세요')
		$('#userIdDiv').css('color','red')
		$('#userIdDiv').css('font-size','8pt')
		$('#userIdDiv').css('font-weight','bold');
		
	}else{
		$('form[name=writeForm]').submit();
	}
	
});

//중복 아이디 체크
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
		
		$.ajax({
			type: 'post',
			url: '/pmang/member/checkId',
			data: 'userId='+$('#userId').val(),
			dataType: 'text',
			success: function(data){
				if(data == 'exist'){
					$('#userIdDiv').text('사용 불가능')
					$('#userIdDiv').css('color','magenta')
					$('#userIdDiv').css('font-size','8pt')
					$('#userIdDiv').css('font-weight','bold');
			
				}else if(data == 'non_exist'){
					$('#check').val($('#userId').val());
					$('#userIdDiv').text('사용 가능')
					$('#userIdDiv').css('color','blue')
					$('#userIdDiv').css('font-size','8pt')
					$('#userIdDiv').css('font-weight','bold');
				}
			
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
//------------------------

//우편번호
$('#checkPostBtn').click(function(){
	window.open("/pmang/member/checkPost", "zipcode", "width=700 height=500 scrollbars=yes");
});

$('#checkPostSearchBtn').click(function(){
	$.ajax({
		type: 'post',
		url: '/pmang/member/checkPostSearch',
		data: $('#checkPostForm').serialize(),
		dataType: 'json',
		success: function(data){
			$('#checkPostTable tr:gt(2)').remove();
			
			$.each(data.list, function(index, items){
				var address = items.sido+' '
							+ items.sigungu+' '
							+ items.yubmyundong+' '
							+ items.ri+' '
							+ items.roadname+' '
							+ items.buildingname;
				
				address = address.replace(/null/g, '');
				
				$('<tr/>').append($('<td/>',{
					align: 'center',
					text: items.zipcode
					
				})).append($('<td/>',{
					colspan: '3',
					}).append($('<a/>',{
						href: '#',
						id: 'addressA',
						text: address
					}))
				).appendTo($('#checkPostTable'));
			});//each
			
			$('a').click(function(){				
				$('#postcode', opener.document).val($(this).parent().prev().text());
				$('#address', opener.document).val($(this).text());
				$('#detailAddress', opener.document).focus();
				window.close();
			});
		},
		error: function(err){
			console.log(err);
		}
	});	
});