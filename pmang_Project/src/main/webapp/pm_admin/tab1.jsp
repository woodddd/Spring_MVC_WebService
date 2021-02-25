<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form id="reportListForm">
<%-- 	<input type="hidden" id="pg" value="${pg }"> --%>
	<table id="reportListTable" align="center" border="1" cellpadding="3"
		cellspacing="0" frame="hsides" rules="rows">
		<tr>
			<th width="180">글번호</th>
			<th width="180">신고당한ID</th>
			<th width="300">신고 누적회수</th>

		</tr>

	</table>

	<div id="reportPagingDiv" class="paging" align="center"></div>
</form>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
	$(document).ready(function() {
		$.ajax({
			type : 'post',
			url : '/pmang/board/getReportList',
			dataType : 'json',
			success : function(data) {
				console.log(JSON.stringify(data));

				$.each(data.list, function(index, items) {
					$('<tr/>').append($('<td/>', {
						align : 'center',
						text : index + 1
					})).append($('<td/>', {

					}).append($('<a/>', {
						
						text : items.userId,
						id : 'reportUserId',

					}))).append($('<td/>', {
						align : 'center',
						text : items.countReport
					})).appendTo($('#reportListTable'))
				});

				//페이징
				//$('#reportPagingDiv').html(data.reportPaging.pagingHTML);

				 $('#reportListTable').on('click','#reportUserId',function() {
					var userid=$(this).text();
					window.open("/pmang/board/reportView?userid="+userid,"신고내역","width=500 height=700");
				}); 
			}
		});
		
		
	});
	/* function boardPaging(pg){
		location.href="getReportList?pg="+pg;
	} */
</script>