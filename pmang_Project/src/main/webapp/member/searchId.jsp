<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<link rel="stylesheet" href="/pmang/css/searchId.css">
<head>
<meta charset="UTF-8">
<title>아이디찾기</title>
</head>

<body>
	<div class="contact-clean">
		<form>
        <fieldset id="searchIdfield">
          <legend><h2>아이디 찾기</h2></legend>
          <div id="searchIdcontent">
          이름과 가입 이메일을입력해 주시면 
          <br>아이디를 찾으실 수 있습니다. (앞 5자리만 표시)<br>
            <br>
            <table>
              <tr>
                <td id="search_name">이름</td>
                <td>
                <input type="text" style="width:305px;  height: 30px; border: 1px solid #e5e5e5;" name="userName" id="userName" placeholder="이름">
                <div id="userNameDiv" align="left"></div>
                </td>
              </tr>
              <tr id="email_tr">
                <td id="search_name">이메일 주소</td>
                <td><input type="text" style="width:140px;  height: 30px; border: 1px solid #e5e5e5;" name="email1" id="email1"> @ <input type="text" style="width:140px;  height: 30px; border: 1px solid #e5e5e5;" name="email2" id="email2">
                <td>
                <select class="form-control input-sm" name="selection" onChange="selectEmail(this)">
						<option value="1">직접 입력</option>
						<option value="gmail.com">gmail.com</option>
						<option value="naver.com">naver.com</option>
						<option value="hanmail.net">hanmail.net</option>
				</select>
				</td>
				<td>
				<div id="emailDiv" align="left"></div>
				</td>
              </tr>
            </table>
            <br>
          <button class="btn-primary" onclick="findId(event)">아이디찾기</button>
          <br><br>아이디는 : <p style="color:red;" id="resultId"></p>
          </div>
      </fieldset>
		</form>
	</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="/pmang/js/searchId.js"></script>
    </body>

</html>