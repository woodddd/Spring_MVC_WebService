
//중복 클릭 방지 코드
var doubleSubmitFlag = false;
function doubleSubmitCheck() {
	if (doubleSubmitFlag) {
		return doubleSubmitFlag;
	} else {
		doubleSubmitFlag = true;
		return false;
	}
}

function len_chk(){
	var frm = $('#storeIntro').val();
	
	if(frm.length > 200){
		alert('최대 1000자까지 입력 가능합니다.');
		$('#storeIntro').val(frm.substring(0, 1000));
		//$('#mystoreText').focus();
	}
}



// 내상점정보수정
$('#storeIntroEditBtn').on(
		'click',
		function(e) {
			
			$(".infoName").css('border', '1px solid rgb(217 217 217)');
			
			
			$('#memberInfoModify').hide();
			// e.stopPropagation();
			if (doubleSubmitCheck())
				return; // 중복클릭방지
			// alert('클릭');

			// 상점명
			var infoName = $('.infoName span').text();
			// $('#storeNameModify').hide();
			$('.infoName').empty();

			$('.infoName').append(
					'<input type="text" id="storeNameEdit" value="' + infoName
							+ '">');
			// $('#storeNameModify1').show();

			// 소개글
			$('#introEdit').hide();
			var mystoreIntroduce = $('#mystoreIntroduce textarea').text();
			$('#mystoreIntroduce').empty();

			$('#mystoreIntroduce').append(
					'<textarea id="storeIntro" onKeyup="len_chk()">' + mystoreIntroduce+ '</textarea>');
			
			$('.introEdit1').show();

			// 내상점정보수정버튼 -> db로 가서 고쳐야댐
			$('#storeIntroBtn').on(
					'click',
					function() {

						$.ajax({
							type : 'post',
							url : '/pmang/board/mystoreModify',
							data : 'marketname=' + $('#storeNameEdit').val()
									+ '&marketcontent='
									+ $('#storeIntro').val(),
							success : function() {
								alert('내 상점 정보가 수정되었습니다.');
								location.href = 'mystore?userid='+$('#memid').val();
							},
							error : function(err) {
								console.log(err);
							}

						});
					});
		});

//내상점관리 버튼
$('#manageBtn').click(function(){
	location.href='/pmang/seller/sellerManagementForm';
});
