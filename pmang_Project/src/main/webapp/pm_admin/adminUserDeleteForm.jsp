<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 강제 탈퇴</title>
</head>
<body>
<form id="adminUserDeleteForm">
강제 탈퇴할 아이디를 입력하세요.
<input type="text" name="userid" id="userid" size="35">
<input type="button" id="adminDeleteSearchBtn" value="검색">
<br><br>
<div class="userSearchResultDiv"></div>

<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/admin.js"></script>
</form>
</body>
</html>