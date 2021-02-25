<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/pmang/css/admin.css">
<link rel="stylesheet" href="/pmang/css/mystore.css">
<form id="noticeWriteForm">
	<input type="hidden" id="photoCountHidden" value="0">
	<h3>공지사항 글 작성</h3>
	<hr>
	<table align="center" border="1" cellpadding="3" cellspacing="0">
		<tr>
			<td align="center" width="170">제목</td>
			<td><input type="text" id="noticeSubject" size="100"
				name="noticeSubject" placeholder="공지사항 제목 입력">
				<div id="noticeSubjectDiv" align="left"></div></td>
		</tr>
		<tr>
			<td align="center">내용</td>
			<td><textarea rows="30" cols="100" id="noticeContent"
					name="noticeContent" placeholder="공지사항 내용 입력"></textarea>
				<div id="noticeContentDiv" align="left"></div></td>
		</tr>
		<tr>
			<td colspan="2" align="center"><input type="button"
				value="공지사항 등록" id="reportWriteBtn"> <input type="reset"
				value="다시작성"></td>
		</tr>
	</table>
</form>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
	$('#reportWriteBtn').on('click', function() {
		$('#noticeSubjectDiv').empty();
		$('#noticeContentDiv').empty();

		if ($('#noticeSubject').val() == '') {
			$('#noticeSubjectDiv').text('제목을 입력하세요');
			$('#noticeSubjectDiv').css('color', 'red');
			$('#noticeSubjectDiv').css('font-size', '8pt');
			$('#noticeSubjectDiv').css('font-weight', 'bold');
		} else if ($('#noticeContent').val() == '') {
			$('#noticeContentDiv').text('내용을 입력하세요')
			$('#noticeContentDiv').css('color', 'red')
			$('#noticeContentDiv').css('font-size', '8pt')
			$('#noticeContentDiv').css('font-weight', 'bold');
		} else {
			$.ajax({
				type : 'post',
				url : '/pmang/board/noticeWrite',
				data : {
					'noticeSubject' : $('#noticeSubject').val(),
					'noticeContent' : $('#noticeContent').val()
				},
				success : function(data) {
					alert('공지사항 작성을 완료했습니다.');
					location.href = '/pmang/board/notice';

				},
				error : function(err) {
					console.log(err);
				}
			});
		}

	});
</script>














































<!--     
<div id="tab2ChartDiv"></div>
    
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script>
/* //구글 차트
google.charts.load('current',{'packages':['corechart']});	//차트 버전을 최신으로 로딩

google.charts.setOnLoadCallback(drawChart);		//차트를 로드(draqVisualization은 데이터를 세팅하는 함수임)

function drawChart(){
	
	
	
	var data=google.visualization.arrayToDataTable(
			${str}
	);
	
	var options={
			title:'전체 회원 성비'
	};
	
	var chart=new new google.visualization.PieChart(document.getElementById('tab2ChartDiv'));
	
	chart.draw(data,options);
	
} */
</script> -->