<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
.replyTextDiv {
	display: flex;
	margin: 0 auto;
	width: 100%;
}
</style>
<h3 style="font-family: sans-serif;">${param.qna_seq}번 문의 답글 달기</h3>
<input type="hidden" id="seq" value="${param.qna_seq }"/>
<div class="replyTextDiv">
	<textarea id="qnaReplyWrite" rows="10" cols="200" style="resize: none;"></textarea>
	<button id="qnaReplyWriteBtn">답변 완료</button>
</div>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
$('#qnaReplyWriteBtn').on('click',function(){
	$.ajax({
		type:'post',
		url:'/pmang/board/qnaReplyWrite',
		data:'qna_seq='+$('#seq').val()+'&qnaContent='+$('#qnaReplyWrite').val(),
		success:function(){
			alert('문의 답변을 등록했습니다.');
			window.close();
		},
		error:function(err){
			console.log(err);
		}
			
	});
});
</script>