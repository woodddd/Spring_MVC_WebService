<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>

<script>
window.onload=function(){
	if("${su}" == "1"){
		alert("회원가입을 축하합니다");
		location.href='/pmang/index'

	}else{
		alert("회원가입 실패");
		location.href="/pmang/member/writeForm";
	}
}	
</script>










