<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/pmang/css/qna.css">
<style>
.qnaReplyFrame {
	display: block;
	width: 100%;
}

.qnaSeqDiv {
	font-size: 17px;
	font-weight: 600;
	padding: 10px;
	padding-bottom: 0;
	margin: 0 auto;
	display: flex;
	text-align: left;
	width: 100%;
	justify-content: space-between;
	
}
.qnaReplySpan{
	float:right;
	color:gray;
	cursor:pointer;
}
.qnaSelect2Div{
font-size: 17px;
	font-weight: 600;
	
	padding-bottom: 0;
	padding-left:10px;
	margin: 0 auto;
	display: inline-block;
	text-align: left;
	width: 100%;
}

/* #qnaReplyWriteBtn{
	margin:0 auto;
	display:flex;
} */
</style>
<!-- 문의 내역 -->
<div class="qnaReplyFrame"></div>
<!-- qnaReplyFrame -->
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
	$(document).ready(function(){
		//문의 답변달리지 않은 문의내역만 출력
		$.ajax({
			type:'post',
			url:'/pmang/board/getQna',
			dataType:'json',
			success:function(data){
				console.log(JSON.stringify(data));
				$.each(data.list,function(index,items){
					$('<div/>').append($('<div/>',{
						class:'qnaSeqDiv'
					}).append($('<span/>',{
							class:'seq',
							text:items.qna_seq
						})).append($('<div/>',{
						class:'qnaSelect2Div',
						text:items.select1+'>'+items.select2
					})).append($('<div/>',{
						class:'qnaImgDiv'
					}).append($('<img src="/pmang/image/open.png" width="20" height="20"/>'
							)))).append($('<div/>',{
								class:'qnaDate',
								text:items.logtime
							}).append($('<span/>',{
								class:'qnaReplySpan',
								text:'문의 답글 달기 >'
								//onclick:'replyForm(this)'
							}))).append($('<div/>',{
								class:'qnaContent',
								text:items.qnaContent
							}).append($('<div/>',{
								class:'qnaImgDiv'
							})).append($('<img id="qnaimg1' + items.qna_seq + '" src="/pmang/storage/'+items.img1+'" width="130px" height="130px"/>'))
							.append($('<img id="qnaimg2' + items.qna_seq + '" src="/pmang/storage/'+items.img2+'" width="130px" height="130px"/>'))
							.append($('<img id="qnaimg3' + items.qna_seq + '" src="/pmang/storage/'+items.img3+'" width="130px" height="130px"/>')))
							.appendTo($('.qnaReplyFrame'));
					
					if($('#qnaimg1'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
						$('#qnaimg1'+items.qna_seq).hide();
					}
					if($('#qnaimg2'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
						$('#qnaimg2'+items.qna_seq).hide();
					}
					if($('#qnaimg3'+items.qna_seq).attr('src') == '/pmang/storage/undefined'){
						$('#qnaimg3'+items.qna_seq).hide();
					}
					
				});//each
				
				//alert($('.qna_seq').val());
				
				$('.qnaReplySpan').click(function(){
				/* 	$('.replyTextDiv').append($('<textarea id="qnaReplyWrite" rows="10" cols="200" style="resize:none;"></textarea>'));
					$('.replyTextDiv').append($('<button id="qnaReplyWriteBtn">답변 완료</button>'));  */
					//alert();
					window.open('../pm_qna/qnaReplyForm.jsp?qna_seq='+$(this).parent().parent().children('div').eq(0).children().eq(0).text(),'문의 답변 달기','width=500 height=450');
					
					
					
				});
				
				//문의 내역 열어보기
				$('.qnaReplyFrame div').click(function(){
					$('.qnaContent').slideUp();
					$('.arrowImg').stop().css({'transform':'rotate(0deg)'},1000);
					
					if($(this).children('.qnaContent').is(':visible')){
					
						$(this).children('.qnaContent').slideUp();
						$(this).children('.arrowImg').stop().css({'transform':'rotate(0deg)'},200);
					}else{
						$(this).children('.qnaContent').slideDown();
						$(this).children(".arrowImg").stop().css({'transform': 'rotate(180deg)'},200);
					}
				});
				
				
				
			},
			error:function(err){
				console.log(err);
			}
		});
	});
	//문의 답글 달기
	function replyForm(obj){
		
		
	}
	</script>