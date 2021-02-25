<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/pmang/css/talkRoomList.css">
</head>
<body>
<div id="root">
<div id="list_div"><!-- list div -->
<header id="talkList_header">피망톡</header>
<ul id="talkList"><!--list를 li에 담아서 뿌립니다...  -->
   <!-- <li class="talkRoom">
   <div class="talkRoom_div">
      <div class="profile_img_div">
         <a class="profile_img_a" href="#유저프로필">
            <img class="profile_img" alt="상대방프로필이미지" src="../image/profileimg.png" height="50" width="50">
         </a>
      </div>
      <a class="talkRoom_a" href="#톡방">유저닉네임+마지막톡내용
         <div>
            <div class="userName">유저닉네임!</div>
            <div class="talkView">마지막 대화가 보여야 합니다..
            대화가 길어지면 어떻게 되려나 알아맞춰 봅시다.</div>
         </div>
      </a>
      <div class="talkLogTime">22:22</div>마지막톡 한 시간
      <div>더보기 버튼 모달
         <button class="addBtn">
            <img alt="더보기" src="../image/addBtn.png" height="15" width="15">
         </button>번개장터는 이곳을 img삽입해서 이쁘게 만듬
      </div>
   </div>
   </li> -->
   <!-- li를 계속 추가~ -->
   
</ul>
</div>
<div class="madal">
   <div class="all_modal ">
   </div>
   <div class="modal_div">
      <h3 class="userName_modal">상대방 닉네임</h3>
      <button class="talk_alarm alarm_on">대화방알림 끄기</button>
      <button class="talk_cutoff">차단</button>
      <button class="talk_report">신고</button>
      <button class="talk_out">나가기</button>
   </div>
   <div>
   <!-- 신고 -->
   </div>
   <div>
   <!-- 나가기 -->
   </div>
   
</div>
<div class="modal_layer"></div>
</div>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/talkRoomList.js"></script>
</body>
</html>