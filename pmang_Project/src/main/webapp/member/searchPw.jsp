<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<link rel="stylesheet" href="/pmang/css/searchPw.css">
<head>
<meta charset="UTF-8">

</head>

<body>
	<div class="contact-clean">
		<form>
        <fieldset id="searchPwfield">
          <legend><h2>비밀번호 찾기</h2></legend>
          <div id="searchPwcontent">
				아이디와 이메일주소를 입력하시면,<br> 입력하신 이메일로 임시비밀번호를 보내드립니다<br>
				<br>임시비밀번호로 로그인 후 비밀번호를 변경해 주세요<br>
				<br>
            <table>
              <tr>
                <td id="search_id">아이디</td>
                <td>
                <input type="text" style="width:305px;  height: 30px; border: 1px solid #e5e5e5;" name="userId" id="userId" placeholder="아이디">
                <div id="userIdDiv" align="left"></div>
                </td>
              </tr>
              <tr id="email_tr">
                <td id="search_id">이메일 주소</td>
                <td><input type="text"  style="width:140px;  height: 30px; border: 1px solid #e5e5e5;" name="email1" id="email1"> @ <input type="text" style="width:140px;  height: 30px; border: 1px solid #e5e5e5;" name="email2" id="email2">
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
				<button class="btn btn-primary" onclick="findPwd(event)">임시비밀번호 발송</button>
			<p id="resultId"></p>
			</div>
      </fieldset>
		</form>
	</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script type="text/javascript" src="/pmang/js/searchPw.js"></script>
    </body>

</html>