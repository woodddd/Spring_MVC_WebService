<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" href="/pmang/css/memWrite.css">

<!-- 모달 사용할수있도록 끌고오기 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

</head>
<body>
<form id="checkPostForm">
<table class="table table-hover" id="checkPostTable">
<tr>
	<td width="100" align="center" style="vertical-align: middle;">시도</td>
	<td>
		<div class="form-group">
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
	<td style="align: center; vertical-align: middle; width: 100;">시.군.구</td>
	<td><input type="text" class="form-control input-sm" name="sigungu" id="sigungu" style="vertical-align: middle; width: 200px;"></td>
</tr>

<tr>
	<td align="center" style="vertical-align: middle;">도로명</td>
	<td colspan="3">
		<input type="text" class="form-control input-sm" name="roadname" id="roadname"
				style="width: 80%; float: left;">&emsp;
		<input class="btn btn-primary input-sm" type="button" id="checkPostSearchBtn" value="검색">
	</td>
</tr>

<tr>
	<td align="center" style="vertical-align: middle;">우편번호</td>
	<td colspan="3" align="center" style="vertical-align: middle;">주소</td>
</tr>
</table>
</form>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/writeForm.js"></script>
</body>
</html>



















