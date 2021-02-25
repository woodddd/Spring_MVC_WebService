<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<!-- 모달 사용할수있도록 끌고오기 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<style>

div#list {
    text-align: left;
    padding: 10px;
    font-size: 15pt;
}

div#mainLocUl {
    text-align: left;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-top: 5px;
}

button#mainLoc {
    border: 0;
    width: 100%;
    padding: 12px;
    text-align: left;
    background: white;
    outline: none;
    }
    
#mainLoc:hover {
	background: rgb(223 240 216 / 30%);
}

#addMainLoc {
	cursor: pointer;
	padding-left: 10px;
	/* color : green; */
}

#addMainLocDiv {
	margin-bottom: 10px;
}

div#wrap {
    margin: 10px;
}

div#mainLocDiv {
    display: flex;
}

button#mainLocRemove {
    border: 0px;
    background: white;
    padding-right: 20px;
    outline: none;
}

</style>



<body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript">
	
$(document).ready(function(){
	$('.table').hide();
	
	$.ajax({
		type : 'post',
		url : '/pmang/board/getMainLoc',
		dataType : 'json',
		success : function(data){
			if(data.list.length == 0){
				$('#mainLocUl').html('<div id="noMainLoc"><b>주요 거래 지역이 없습니다.</b> <br><br> 주요 거래 지역을 설정해주세요.</div>');
				$('.table').show();		
			}else{
				$.each(data.list, function(index, items){
					$('<div id = "mainLocDiv"><button id="mainLoc">'+ items.ADDR + '</button><button id="mainLocRemove">x</button></div>').appendTo($('#mainLocUl'));
				});
				$('#addMainLoc').append('다른 지역을 등록하시겠습니까?');
				
				$('#addMainLoc').click(function(){
					$('.table').toggle();
				});
			}
		},
		error : function(err){
			console.log(err);
		}
	});
		
		$('.table').on('click', '#addressA', function(){
			if(confirm('주요 거래 지역으로 등록하시겠습니까?')){
				$.ajax({
					type : 'post',
					url : '/pmang/board/setMainLoc',
					data : {'address' : $(this).text()},
					success : function(data){
						//$('#mainLocUl').append('<div><button id="mainLoc">'+$(this).text()+'</button></div>');
						alert('등록되었습니다! 편리한 피망되세요!');
						location.reload();
						
						
					},
					error : function(err){
						console.log(err);
					}
				});//ajax
			}//confirm
		});
		
$('#checkPostSearchBtn').click(function(){
	$.ajax({
		type: 'post',
		url: '/pmang/member/mainLoc',
		data: {'sido' : $('#sido').val(), 'address' : $('#address').val()},
		dataType: 'json',
		success: function(data){
			$('#checkPostTable tr:gt(1)').remove();
			
			$.each(data.list, function(index, items){
				var address = items.sido+' '
							+ items.sigungu+' '
							+ items.yubmyundong
				
				address = address.replace(/null/g, '');
				
				$('<tr/>').append($('<td/>',{
					colspan: '2',
					align : 'center'
					}).append($('<a/>',{
						href: '#',
						id: 'addressA',
						text: address
					}))
				).appendTo($('#checkPostTable'));
		});//each
	
		},
		error : function(err){
			console.log(err);
		}
	});//ajax
});//click

$('#mainLocUl').on('click', '#mainLoc', function(){
	var address = $(this).text();
	if($(opener.document).find(".top2").text().trim() == "" && $(opener.document).find(".top3").text().trim() == ""){
		opener.location.href = encodeURI('/pmang/board/itemBoard?category1='+$(opener.document).find(".top1").text().trim()+'&pg='+$(opener.document).find("#pg").val()+'&order='+$(opener.document).find("#order").val()+'&location='+address);
	}else if($(opener.document).find(".top2").text().trim() != "" && $(opener.document).find(".top3").text().trim() == ""){
		opener.location.href = encodeURI('/pmang/board/itemBoard?category1='+$(opener.document).find(".top1").text().trim()+'&category2='+$(opener.document).find(".top2").text().trim()+'&pg='+$(opener.document).find("#pg").val()+'&order='+$(opener.document).find("#order").val()+'&location='+address);
	}else if($(opener.document).find(".top2").text().trim() != "" && $(opener.document).find(".top3").text().trim() != ""){
		opener.location.href = encodeURI('/pmang/board/itemBoard?category1='+$(opener.document).find(".top1").text().trim()+'&category2='+$(opener.document).find(".top2").text().trim()+'&category3='+$(opener.document).find(".top3").text().trim()+'&pg='+$(opener.document).find("#pg").val()+'&order='+$(opener.document).find("#order").val()+'&location='+address);
	}
	window.close();
});

$('#mainLocUl').on('click', '#mainLocRemove', function(){
	$.ajax({
		type : 'post',
		url : '/pmang/board/deleteMainLoc',
		data : {'address' : $(this).prev().text()},
		success : function(data){
			//$('#mainLocUl').append('<div><button id="mainLoc">'+$(this).text()+'</button></div>');
			alert('삭제하였습니다.');
			location.reload();
			
			
		},
		error : function(err){
			console.log(err);
		}
	});//ajax
}); 

});//ready



</script>

<div id="wrap">
	<div id="list">
		<b>주요 거래 목록</b>
	</div>
	<div id="mainLocUl">

	</div>
	<div id="addMainLocDiv"><a id="addMainLoc"></a></div>
</div>


<form id="checkPostForm">
<table class="table table-hover" id="checkPostTable">
<tr>
	<td>
		<div class="form-group" style="margin : 0px; width: 60px;">
			<select class="form-control input-sm" name="sido" id="sido" style="vertical-align: middle; width: 100px;">
				<option>시도선택</option>
				<option value="서울">서울</option>
				<option value="인천">인천</option>
				<option value="대전">대전</option>
				<option value="대구">대구</option>
				<option value="울산">울산</option>
				<option value="세종">세종</option>
				<option value="광주">광주</option>
				<option value="경기">경기</option>
				<option value="강원">강원</option>
				<option value="전남">전남</option>
				<option value="전북">전북</option>
				<option value="경남">경남</option>
				<option value="경북">경북</option>
				<option value="충남">충남</option>
				<option value="충북">충북</option>
				<option value="부산">부산</option>
				<option value="제주">제주</option>
			</select>
		</div>
	</td>
	<td>
		<input type="text" class="form-control input-sm" name="address" id="address" style="width: 80%; float: left;">
		<input class="btn btn-primary input-sm" type="button" id="checkPostSearchBtn" value="검색" style="background : green; margin-left: 20px;">
	</td>
</tr>

<tr>
	<td colspan="4" align="center" style="vertical-align: middle;">주소</td>
</tr>
</table>
</form>
</body>
</html>