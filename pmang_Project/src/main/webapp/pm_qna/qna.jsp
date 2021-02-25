<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/pmang/css/qna.css">
<div id="tabArea">
	<input type="hidden" id="photoCountHidden" value="0"> <input
		type="hidden" id="userid" value="${memUserId }">
	<!-- <input type="hidden" id="userid" value="tmddms"> -->
	<div id="tabDiv">
		<input id="tab1" class="tabs" type="radio" name="tabName" value="1">
		<label class="tabLabel" for="tab1">1:1 문의하기</label> <input id="tab2"
			class="tabs" type="radio" name="tabName" value="2"> <label
			class="tabLabel" for="tab2">문의 내역</label>


		<section id="qnaWriteSection">
			<form id="qnaWriteForm">
				<div class="qnaWriteDiv">

					<div id="qnaSelect1Div">
						<select name="qnaWriteType1" id="select1"
							style="width: 723px; height: 30px; margin-bottom: 5px; margin-top: 10px"
							onChange="changeQnAType(this)">
							<option value="">선택하세요</option>
							<option value="계정문의">계정문의</option>
							<option value="거래신고">거래신고</option>
							<option value="이용방법">이용방법</option>
							<option value="제보제안">제보제안</option>

						</select>
					</div>
					<!-- qnaSelect1Div -->
					<div id="qnaSelect2Div">
						<select name="qnaWriteType2" id="select2"
							style="width: 723px; height: 30px; margin-bottom: 10px;">
							<option value="">선택하세요</option>
						</select>
					</div>
				</div>
				<!-- qnaWriteDiv -->
				<div class="qnaWriteContentDiv">
					<textarea rows="20" cols="100" id="qnaContent" name="qnaContent"
						placeholder="문의 내용 입력" style="resize: none;"></textarea>
					<div id="qnaContentDiv"></div>
				</div>
				<!-- qnaWriteContentDiv -->
				<div class="qnaPhtotPreview"></div>
				<div class="qnaWriteBtnDiv">

					<input type="file" class="qnaWritePhoto" name="img[]"
						accept="image/jpg, image/jpeg, image/png" multiple />

					<!-- <input type="button" id="qnaWritePhotoBtn" value="사진 등록">
					<input type="button" id="qnaWriteBtn" value="문의 등록"> -->
					<button type="button" class="qnaWritePhotoBtn"
						style="background-color: green; color: white;">사진 등록</button>
					<button type="button" class="qnaWriteBtn">문의 등록</button>

				</div>
				<!-- qnaWriteBtnDiv -->

			</form>

		</section>
		<!-- qnaWriteSection -->

		<section id="qnaListSection">
			<div class="qnaListDiv"></div>
		</section>
		<!-- qnaListSection -->
	</div>
	<!-- tabDiv -->
</div>
<!-- tabArea -->

<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/qna.js"></script>
<script>
$(document).ready(function(){
	
	//문의내역
	$.ajax({
		type:'post',
		url:'/pmang/board/getQnaList',
		data:'userid='+$('#userid').val(),
		dataType:'json',
		success:function(data){
			console.log(JSON.stringify(data));
			
			$.each(data.list,function(index,items){
				
				if(!items.qnaReply){		//답글 안달린거
					
					$('<div/>').append($('<div/>',{
						class:'qnaSubjectDiv'
					}).
						append($('<div/>',{
						class:'qnaSelectDiv',
						text:items.select1+'>'+items.select2
					})).append($('<div/>',{
						class:'qnaImgDiv'
					}).append($('<img src="/pmang/image/open.png" width="20" height="20"/>'
							)))).append($('<div/>',{
									class:'qnaDate',
									text:items.logtime
							}).append($('<span/>',{
									class:'qnaState',
									text:'미답변'
									
						
					}))).append($('<div/>',{
						class:'qnaContent',
						text:items.qnaContent
					}).append($('<div/>',{
						class:'qnaImgDiv'
					}).append($('<img id="qnaimg4' + items.qna_seq + '" src="/pmang/storage/'+items.img1+'" width="130px" height="130px"/>'))
					.append($('<img id="qnaimg5' + items.qna_seq + '" src="/pmang/storage/'+items.img2+'" width="130px" height="130px"/>'))
					.append($('<img id="qnaimg6' + items.qna_seq + '" src="/pmang/storage/'+items.img3+'" width="130px" height="130px"/>'))))
					.appendTo($('.qnaListDiv'));
				
					if($('#qnaimg4'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
						$('#qnaimg4'+items.qna_seq).hide();
					}
					if($('#qnaimg5'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
						$('#qnaimg5'+items.qna_seq).hide();
					}
					if($('#qnaimg6'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
						$('#qnaimg6'+items.qna_seq).hide();
					}
				
					
					
				}else if(items.qnaReply){	//답글 달린거
					
						
						$('<div/>').append($('<div/>',{
							class:'qnaSubjectDiv'
						}).
							append($('<div/>',{
							class:'qnaSelectDiv',
							text:items.select1+'>'+items.select2
						})).append($('<div/>',{
							class:'qnaImgDiv'
						}).append($('<img src="/pmang/image/open.png" width="20" height="20"/>'
								)))).append($('<div/>',{
										class:'qnaDate',
										text:items.logtime
								}).append($('<span/>',{
										class:'qnaState',
										text:'답변완료',
										
										
							
						}))).append($('<div/>',{
							class:'qnaContent',
							text:items.qnaContent
						}).append($('<div/>',{
							class:'qnaImgDiv'
						}).append($('<img id="qnaimg1' + items.qna_seq + '" src="/pmang/storage/'+items.img1+'" width="130px" height="130px"/>'))
						.append($('<img id="qnaimg2' + items.qna_seq + '" src="/pmang/storage/'+items.img2+'" width="130px" height="130px"/>'))
						.append($('<img id="qnaimg3' + items.qna_seq + '" src="/pmang/storage/'+items.img3+'" width="130px" height="130px"/>'))))
						
						.append($('<div/>',{
							class:'qnaReply'
							
						}).append($('<span style="color:green;font-weight:bold">피망마켓 관리자 답변 : \n\n</span>'))
						.append($('<div/>',{
							text:items.qnaReply
							
						})))
						.appendTo($('.qnaListDiv'));
						
						if($('#qnaimg1'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
							$('#qnaimg1'+items.qna_seq).hide();
						}
						if($('#qnaimg2'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
							$('#qnaimg2'+items.qna_seq).hide();
						}
						if($('#qnaimg3'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
							$('#qnaimg3'+items.qna_seq).hide();
						}
				
				}
			});
			
			
			
				//문의 내역
				$('.qnaListDiv div').click(function(){
					$('.qnaContent').slideUp();
					$('.qnaReply').slideUp();
					$('.arrowImg').stop().css({'transform':'rotate(0deg)'},1000);
					
					if($(this).children('.qnaContent').is(':visible')){
						$(this).children('.qnaContent').slideUp();
						$(this).children('.qnaReply').slideUp();
						
						$(this).children('.arrowImg').stop().css({'transform':'rotate(0deg)'},200);
					}else{
						$(this).children('.qnaReply').slideDown();
						$(this).children('.qnaContent').slideDown();
						$(this).children(".arrowImg").stop().css({'transform': 'rotate(180deg)'},200);
					}
				})
		},
		error:function(err){
			console.log(err);
			}
		});
});
function changeQnAType(e){
	
	
	var type1=["가입/재가입","계정 정보 변경","탈퇴"];
	var type2=["상품 미발송","상품 상태 불량","상품비 미입금"];
	var type3=["상품 거래 문의","상점 후기 문의"];
	var type4=["서비스 제안","제보 및 기타신고"];
	var target=document.getElementById('select2');
	
	if (e.value=='계정문의'){
		var secondType=type1;
	}else if(e.value=='거래신고'){
		var secondType=type2;
	}else if(e.value=='이용방법'){
		var secondType=type3;
	}else if(e.value=='제보제안'){
		var secondType=type4;
	}
	
	target.options.length=0;
	
	
	
	for(x in secondType){
		var opt=document.createElement("option");
		opt.value=secondType[x];
		opt.innerHTML=secondType[x];
		target.appendChild(opt);
	}
	
}



</script>