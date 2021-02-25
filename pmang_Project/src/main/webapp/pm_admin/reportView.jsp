<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
${param.userid}님의 신고내역
<form id="reportViewForm">
<input type="hidden" id="userid" value="${param.userid }">
<table id="reportViewTable" align="center" border="1" cellpadding="3" cellspacing="0" frame="hsides" rules="rows">
	<tr>
		<th width="75">글번호</th>
		<th width="150">신고 유형</th>
		<th width="200">신고 내용</th>
		<th width="90">신고 날짜</th>
	</tr>
</table>

</form>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
$(document).ready(function(){
	$.ajax({
		type:'post',
		url:'/pmang/board/getReport',
		data:{'userid':$('#userid').val()},
		dataType:'json',
		success:function(data){
			
			$.each(data.list,function(index,items){
				$('<tr/>').append($('<td/>',{
					align:'center',
					text:items.report_seq
				})).append($('<td/>',{
					align:'center',
					text:items.targetType
				})).append($('<td/>',{
					align:'center',
					text:items.reportContent
				})).append($('<td/>',{
					align:'center',
					text:items.logtime
				})).appendTo($('#reportViewTable'))
			});
			
		},
		error:function(err){
			console.log(err);
		}
	});
});
</script>