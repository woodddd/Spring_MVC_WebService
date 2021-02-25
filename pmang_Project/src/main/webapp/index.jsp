<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<link rel="stylesheet" href="/pmang/css/index.css">

<title>피망마켓에 오신것을 환영합니다.</title>
</head>
<body> 

<!-- 강제 호출용으로 사용중 -->
<input type="hidden" id="hiddenUserId" value="${sessionScope.memUserId }">


<!-- 로그인 모달 -->
<div class="loginModal">
      	<div class="loginModalContent">
      		<div class="loginModal-header">
				<div class="loginModal-headerDiv">
					<div class="loginModal-title" id="myModalLabel"><img src="/pmang/image/mainlogoP.png" width="100" height="100" alt="피망로그인헤더"></div>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
	  		</div>
	  
	 		<div class="loginModal-center">
	  			<table class="loginModal-Table">
	  				<thead>	
						<tr>
							<th style="border-bottom: rgb(0,0,0);">아이디</th>
						</tr>
					</thead>
					<thead>
						<tr>
							<td style="border-top: rgb(0,0,0); border-bottom: rgb(0,0,0);">
								<div class="form-group">
									<input type="text" class="form-control" placeholder="ID" width="1" name="userId" id="index_userId" maxlength='20'>
									<div id="index_userIdDiv"></div>
								</div>
							</td>
						</tr>
					</thead>
					<thead>
						<tr>
							<th style="border-top: rgb(0,0,0); border-bottom: rgb(0,0,0);">비밀번호</th>
						</tr>
						<tr>
							<td style="border-top: rgb(0,0,0); border-bottom: rgb(0,0,0);">
								<div class="form-group">
									<input type="password" class="form-control" maxlength="15" placeholder="Password" name="pwd" id="index_pwd">
									<div id="index_pwdDiv"></div>
								</div>
							</td>
						</tr>
					</thead>
					<thead>
						<tr>
							<td style="border-top: rgb(0,0,0);">
								<div id="saveId">
								<input type="checkbox" name="saveId" value="saveId" id="checkedId">아이디
								저장
								</div>
								<div>
									<input type="button" id="loginBtn" value="Login">
								</div>					
								<div id="findIdPw">
									<a id ="index_searchIdBtn">아이디 찾기</a> / <a id="index_searchPwBtn" href="#">비밀번호 찾기</a>
								</div> <br>
		
								<button id="kakaoBtn">
									<div>
										<img src="/pmang/image/kakao_icon.png" alt="kakao_icon" />
										<p id="kakaoP">카카오 1초 로그인/회원가입</p>
									</div>
								</button>
								<button id="index_writeBtn">
								<div>
									<img src="/pmang/image/writeP.png" alt="writePmang">
									<p id="writeP">일반 회원가입</p>
								</div>
								</button>
						</td>
					</tr>
				</thead>
			</table>
	  	</div><!-- loginModal-center -->
   </div> 
</div> 


	<!-- header -->
	<div id="header">
      	<div class="header_logo">
            <div class="logo-wrap" onclick="location.href='/pmang/index'">
                 <img src="/pmang/image/main_logo.JPG" alt="main_logo" />
                 <h2 style="color: green; font-weight: bold">피망마켓</h2>
           </div>
           
              <div class="search-wrap">
                 <input type="text" class="searchInput" placeholder="상품명,지역명,#해시태그명입력" maxlength="20" style="font-size: 10pt;"/>
                 <span id="index_searchInsertXspan">x</span>
                 	<!-- 서치버튼 추가(이서영) -->
                 <a class="searchBtn" href="#">
                 	<img src="/pmang/image/searchGreen.png" width="16" height="16" alt="검색 버튼 아이콘">
                 </a>
                  	<!--  -->
               
               <c:if test="${sessionScope.memUserId != null }">
               <!-- 이서영 검색클릭div -->
               <div class="searchClick">
               	<div class="searchListDiv">
               		<div class="searchA">
               			<a class="recentlyA">최근검색어</a>
               		</div>
               		<div class="searchList">
               			<div class="existList"></div>
               			<div class="nonList">
               				<img src="data:image/png;base64,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" width="52" height="45" alt="검색어 없음 이미지">
               				<div>최근 검색어가 없습니다.</div>
               			</div>
               		</div>
               	</div>
               	<div class="searchListClose">
               		<a class="search_exit">닫기</a>
               		<a class="entireDelete">
               		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAOBJREFUSA3tVgEOwyAInEsf0Yf4lX2jj+k39hX/0f5i41xHWiI2rNY0iyYmciJwQILupqwQwoOuRtq9oiLhmYDBe/+UF5DvKXDBLE7wBAHhTXJ1SfQDRiYUocvo8BVl4EWCyj7HiI2UOLgfamH1G2sHR1OOstWqoj+jRqZaKIZU+Fu7ajX6P0fVmgGpG2ijBc9asb3ZOLpj6RDGjhykves0g4xsT9aycB1GWoRWvDGyZoz1W+o4FdZDS501Y6yf+9dFJfmv25PZsjhUq9GaEQZUX3ImkT0eqGtGpSftZrK+AWoUS5rz8CTIAAAAAElFTkSuQmCC" width="13" height="15" alt="쓰레기통 아이콘">
               		검색어 전체 삭제
               		</a>
               	</div>
               
               </div><!-- searchClick -->
               
               </c:if>
               </div>
           	<!-- 세션없을때 -->
           	<c:if test="${sessionScope.memUserId == null }">
               <nav id="sessionOff">
              <ul>
                <li>
                  <img src="/pmang/image/sell.png" alt="sale" width="40px" height="40px" />
                  <span class="indexnavSpan" onclick="nologin()">판매하기</span>
                </li>
                <li>
                  <span class="vertical">|</span>
                </li>
                <li>
                  <img src="/pmang/image/mystore.png" alt="store" width="30px" height="30px"/>
                  <span class="indexnavSpan" onclick="nologin()">내상점</span>
                </li>
                <li>
                  <span class="vertical">|</span>
                </li>
                <li id="loginli">
                  <img src="/pmang/image/login.png" alt="login" style="width: 30px; height: 30px;" />
                  <span class="indexnavSpan">로그인</span>
                </li>
                <li>
                  <span class="vertical">|</span>
                </li>
                <div class="pmangTok">
               		<div class="pmangTokDiv"><img src="/pmang/image/pmangTok.jpg" width="100" height="100" alt="피망톡"><span id="pmangSpan">피망톡</span></div>
               	</div>
              </ul>
            </nav>
         </c:if>
            <!-- 세션있을때  -->
            <c:if test="${memUserId != null }">
            <input type="hidden" id="sessionId" value="${sessionScope.memUserId}">
             <nav id="sessionOn">
              <ul>
                <li>
                  <img src="/pmang/image/sell.png" alt="sale" width="40px" height="40px" />
                  <span class="indexnavSpan" onclick="location.href='/pmang/member/sellerWriteForm'">판매하기</span>
                </li>
                <li>
                  <span class="vertical">|</span>
                </li>
                
                <li>
                <c:if test="${sessionScope.memUserId == 'admin123'}">
                  <img src="/pmang/image/mystore.png" alt="store" width="30px" height="30px"/>
                  <span class="indexnavSpan" onclick="location.href='/pmang/board/mystore?userid=${memUserId }'">관리자상점</span>
                </c:if>
                <c:if test="${sessionScope.memUserId != 'admin123'}">
                  <img src="/pmang/image/mystore.png" alt="store" width="30px" height="30px"/>
                  <span class="indexnavSpan" onclick="location.href='/pmang/board/mystore?userid=${memUserId }'">내상점</span>
                </c:if>
                </li>
                <li>
                  <span class="vertical">|</span>
                </li>
                <li style="CURSOR: hand" onclick="window.location='/pmang/member/logout'">
                  <img src="/pmang/image/login.png" alt="logout" style="width: 30px; height: 30px;" />
                  <span class="indexnavSpan">로그아웃</span>
                </li>
                 <li>
                  <span class="vertical">|</span>
                </li>
                <div class="pmangTok">
               		<div class="pmangTokDiv"><img src="/pmang/image/pmangTok.jpg" width="50" height="50" alt="피망톡"><span id="pmangSpan">피망톡</span></div>
               	</div>
              </ul>
            </nav>
         </c:if>
        </div>
      
          <!-- 카테고리 -->
	<!-- <hr> -->

	<div id="categoryDiv">
		<ul class="category">
			<div class="categoryListDiv">
				<li class="hoverli">
					<a class="hoverliA">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAAAXNSR0IArs4c6QAAAExJREFUWAnt1sEJACAMA0DrJt1/SAVXyKfI9V8Il0+qu88afHtwthdNwOkNyUeAAAECvwuUNRNWbM2EgN4JECBAgEAoYM2EgMuaSQUv1d0EPE4sEMMAAAAASUVORK5CYII=" width="20" height="16" alt="메뉴 버튼 아이콘">
					</a><!-- <li>&nbsp</li> ← 요거 카테고리 공백채우는용 지우지마세요! -->
				<ul class="category1Menu">
					<div>전체 카테고리</div>
					<hr>
					<li id="categoryClickli1"><a class="category1A" href="#">패션</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li class="categoryClickli2"><a class="category2A" href="#">여성의류</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">아우터</a></li>
									<li><a href="#">티셔츠</a></li>
									<li><a href="#">니트</a></li>
									<li><a href="#">셔츠/블라우스</a></li>
									<li><a href="#">맨투맨/후드집업</a></li>
									<li><a href="#">원피스/세트</a></li>
									<li><a href="#">바지</a></li>
									<li><a href="#">스커트</a></li>
								</ul></li>
							<li><a class="category2A" href="#">남성의류</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">아우터</a></li>
									<li><a href="#">티셔츠</a></li>
									<li><a href="#">니트</a></li>
									<li><a href="#">셔츠</a></li>
									<li><a href="#">맨투맨/후드집업</a></li>
									<li><a href="#">바지</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">패션잡화</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">가방</a></li>
									<li><a href="#">신발</a></li>
									<li><a href="#">액세서리</a></li>
									<li><a href="#">시계</a></li>
									<li><a href="#">모자</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
								<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
						</ul></li>
					<li id="categoryClickli1"><a class="category1A" href="#">디지털/가전</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li><a class="category2A" href="#">모바일</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">스마트폰</a></li>
									<li><a href="#">태블릿</a></li>
									<li><a href="#">액세서리/주변기기</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">가전제품</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">소형가전</a></li>
									<li><a href="#">대형가전</a></li>
									<li><a href="#">미용가전</a></li>
									<li><a href="#">사무용품</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">음반/영상기기</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">음향기기</a></li>
									<li><a href="#">비디오/프로젝터</a></li>
									<li><a href="#">CD/DVD/음반</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">컴퓨터/주변기기</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">데스크탑</a></li>
									<li><a href="#">키보드/마우스</a></li>
									<li><a href="#">모니터</a></li>
									<li><a href="#">컴퓨터 부품</a></li>
									<li><a href="#">노트북/넷북</a></li>
									<li><a href="#">기타 액세서리</a></li>
									<li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">카메라</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">DSLR/미러리스</a></li>
									<li><a href="#">필름카메라</a></li>
									<li><a href="#">디지털 카메라</a></li>
									<li><a href="#">기타 액세서리</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">게임</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">PC게임</a></li>
									<li><a href="#">콘솔게임</a></li>
									<li><a href="#">게임 타이틀</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
								<li>&nbsp</li><li>&nbsp</li>
						</ul></li>
					<li id="categoryClickli1"><a class="category1A" href="#">도서/티켓</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li><a class="category2A" href="#">도서</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">학습/사전/참고서</a></li>
									<li><a href="#">만화/아동</a></li>
									<li><a href="#">인문/교양/소설</a></li>
									<li><a href="#">경영/경제/사회</a></li>
									<li><a href="#">과학/컴퓨터/인터넷</a></li>
									<li><a href="#">예술/디자인</a></li>
									<li><a href="#">기타 도서</a></li>
									<li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">티켓</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">기프티콘/상품권/쿠폰</a></li>
									<li><a href="#">예매권/항공권</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
						</ul></li>
					<li id="categoryClickli1"><a class="category1A" href="#">리빙용품</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li><a class="category2A" href="#">생활용품</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">문구/학습</a></li>
									<li><a href="#">침구</a></li>
									<li><a href="#">욕실</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">가구</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">거실가구</a></li>
									<li><a href="#">생활가구</a></li>
									<li><a href="#">사무용가구</a></li>
									<li><a href="#">인테리어 소품</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">주방용품</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">식기세트</a></li>
									<li><a href="#">냄비/프라이팬</a></li>
									<li><a href="#">조리도구</a></li>
									<li><a href="#">수저/커트러리</a></li>
									<li><a href="#">컵/잔/텀블러</a></li>
									<li><a href="#">주방 잡화</a></li>
									<li><a href="#">밀폐용기</a></li>
									<li><a href="#">커피용품</a></li>

								</ul></li>
							<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
						</ul></li>
					<li id="categoryClickli1"><a class="category1A" href="#">스포츠/레저</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li><a class="category2A" href="#">실내</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">헬스</a></li>
									<li><a href="#">요가</a></li>
									<li><a href="#">골프</a></li>
									<li><a href="#">수영</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">실외</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">축구</a></li>
									<li><a href="#">야구</a></li>
									<li><a href="#">농구</a></li>
									<li><a href="#">자전거/킥보드</a></li>
									<li><a href="#">등산</a></li>
									<li><a href="#">낚시/캠핑</a></li>
									<li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
						</ul></li>
					<li id="categoryClickli1"><a class="category1A" href="#">뷰티/미용</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li><a class="category2A" href="#">스킨케어</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">클렌징/스크럽</a></li>
									<li><a href="#">스킨/토너/미스트</a></li>
									<li><a href="#">로션/에멀전</a></li>
									<li><a href="#">에센스/크림</a></li>
									<li><a href="#">팩/마스크</a></li>
									<li><a href="#">썬케어</a></li>
									<li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">메이크업</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">색조메이크업</a></li>
									<li><a href="#">베이스메이크업</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">헤어/바디</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">샴푸/린스/트리트먼트</a></li>
									<li><a href="#">헤어스타일링</a></li>
									<li><a href="#">바디클렌저/로션</a></li>
									<li><a href="#">헤어/핸드/풋케어</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">향수/아로마</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">여성향수</a></li>
									<li><a href="#">남성향수</a></li>
									<li><a href="#">공용향수</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">네일아트/케어</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">네일아트/스티커</a></li>
									<li><a href="#">매니큐어/패디큐어</a></li>
									<li><a href="#">네일케어도구</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">뷰티소품</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">브러시/퍼프</a></li>
									<li><a href="#">파우치/정리함</a></li>
									<li><a href="#">거울</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li>&nbsp</li><li>&nbsp</li>
						</ul></li>
					<li id="categoryClickli1"><a class="category1A" href="#">유아/출산</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li><a class="category2A" href="#">영아의류(-2세)</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">상의</a></li>
									<li><a href="#">하의</a></li>
									<li><a href="#">기타</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">여아의류(3-6세)</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">원피스/세트</a></li>
									<li><a href="#">아우터</a></li>
									<li><a href="#">상하의</a></li>
									<li><a href="#">티셔츠</a></li>
									<li><a href="#">바지</a></li>
									<li><a href="#">치마</a></li>
									<li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">남아의류(3-6세)</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">아우터</a></li>
									<li><a href="#">상하의</a></li>
									<li><a href="#">티셔츠</a></li>
									<li><a href="#">바지</a></li>
									<li><a href="#">남방</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">육아잡화</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">신발</a></li>
									<li><a href="#">모자</a></li>
									<li><a href="#">가방</a></li>
									<li><a href="#">양말</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
							<li><a class="category2A" href="#">동화책/완구/인형/장난감</a>
								<ul class="category3Menu">
								<div class="category3Div"></div>
								<hr>
									<li><a href="#">인형</a></li>
									<li><a href="#">교육/완구</a></li>
									<li><a href="#">장난감</a></li>
									<li><a href="#">물놀이도구</a></li>
									<li><a href="#">놀이터도구</a></li>
									<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
								</ul></li>
								<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
						</ul></li>
					<li id="categoryClickli1"><a class="category1A" href="#">기타</a>
						<ul class="category2Menu">
						<div class="category2Div"></div>
						<hr>
							<li><a href="#">피망나눔</a></li>
							<li><a href="#">차량,오토바이</a></li>
							<li><a href="#">기타</a></li>
							<li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li><li>&nbsp</li>
						</ul></li>
				</ul></li>
				<div id="header_categoryTitle">전체 카테고리</div>
			</div>
		</ul>
		
	</div><!-- header category -->

      
        <div id="aside">
         <div class="asideDiv">
              <!-- 알림창 구현 -->
            <c:if test="${sessionScope.memUserId != null }">
            <div class="likebag" onclick="location.href='/pmang/board/mystore?userid=${sessionScope.memUserId }'">찜한상품
               <div class="bag_click">
                  <img id="userZzim" src="" style="width:15px; height:15px;">
                  <a class="bag_clickA" >
                  </a>
               </div>
            </div>
            </c:if>
            <c:if test="${sessionScope.memUserId == null }">
	            <div class="likebag" onclick="nologin()">찜한상품
	               <div class="bag_click">
	                  <img id="userZzim" src="" style="width:15px; height:15px;">
	                  <a class="bag_clickA" >
	                  </a>
	               </div>
	            </div>
            </c:if>
		             <div class="recentlyLook">
		                           최근본상품
		               <br>
		               <span id=recentCnt></span> <!-- 계속 바꿔줘야 되는것 -->
		               <div class="nonGoods">
			               <img src="data:image/png;base64,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" width="28" height="16" alt="빈 최근본상품 아이콘">
			               <div>최근 본 상품이 <br> 없습니다.</div>
		               </div>
		               <div class="goods">
		                  
		               </div>
		               <div id="recentlypaging">
			               <a class="btn_prev" style="cursor:pointer" >이전</a>
			               <span id="recentlycurrentPage"></span>
			               <span id="totalPageCount"></span>
			               <a class="btn_next" style="cursor:pointer" >다음</a>
		               </div>
	            </div>

         
        
            <div class="topBtn">
               <a id="topA" href="#" style="color:rgb(33, 33, 33); font-size: 12pt">TOP</a>
            </div>
         </div><!-- asideDiv -->

      </div><!-- aside -->
   </div><!-- header -->

      <!-- ----------------헤더 -->
      

  	 <div id="wrap">
      <div id="container">
      
      
         <jsp:include page="${display}" />

      
      </div><!-- container -->


 

   </div><!-- wrap -->
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
     <!-- 상품등록 footer -->
    <footer class="sellerWriteForm_footer">
			<div class="sellerWriteForm_footer_div">
				<button type="button" class="itemWriteBtn">
				</button>
			</div>
	</footer>
	
	
	<!-- index footer -->
   <div class="footer">
      <div class="footerCategoryArea">
         <div class="footerCategory">
            <a class="cIPDuS" id="footerNotice">공지사항</a>
            <a class="cIPDuS" id="footerFQA">자주묻는질문</a>
            <a class="cgGBdw" id="footerPolicy">운영정책</a>

			<a class="cIPDuS" id="footerQnA">1:1문의하기</a>
            <a class="cgGBdw" href="#" onClick="window.open('http://localhost:8080/pmang/pm_notice/companyInfo.jsp','companyInfo')">사업자정보확인</a>
            <a class="cgGBdw" href="#" onClick="window.open('http://localhost:8080/pmang/pm_notice/servicePolicy.jsp','servicePolicy')">이용약관</a>
            <a class="cgGBdw" href="#" onClick="window.open('http://localhost:8080/pmang/pm_notice/youthPolicy.jsp','youthPolicy')">청소년보호정책</a>
            <a class="cgGBdw" href="#" onClick="window.open('http://localhost:8080/pmang/pm_notice/GPSPolicy.jsp','GPSPolicy')">위치기반서비스 이용약관</a>

         </div>
      </div>
      
      <div class="footerContentArea">
         <div class="footerContent">
            <div class="footerContentMark">
      		<img src="/pmang/image/pmangFooter.PNG" alt="피망장터이미지" height="40px"/>
             <div class="footerContentMarkTitle">피나게 망하지 않을 만큼 판매하는 피망장터입니다. 누구나, 언제 어디서나 쉽고 빠르게 안전한 거래를 할 수 있습니다.</div>
            </div>
            
            <div class="indexFooter_icon">
               <a href="#" target="_blank">
                  <img src="/pmang/image/facebook.png" alt="facebook icon" style="margin: 0px 5px 0px 16px;">
               </a>
               
               <a href="#" target="_blank">
                  <img src="/pmang/image/instagram.png" alt="instagram icon">
               </a>
            </div>
         </div>
         
         <div class="footerCompanyInfo">
            <div class="infomain">
               대표이사: 김피망 &nbsp;|&nbsp; 개인정보담당자: 김당근 &nbsp;|&nbsp; 사업자등록정보 : ABC-DEFG-HIJ
               &nbsp;|&nbsp; 신고현황 : 통신판매업 신고
               <br>
               주소: 서울 서초구 강남대로 20
               <br>
               "고객센터 대표번호: 1234-5678" &nbsp;|&nbsp; FAX 02-123-6789
               <br>
               
               <div class="CustomerService">
                  <p>고객센터 운영시간:</p>
                  <p>
                     &nbsp;전화문의 : 9시 ~ 18시 (주말,공휴일 제외) &nbsp;|&nbsp; 1:1문의 : 9시~18시
                     <br>
                     ※점심시간 12~13시
                  </p>
               </div>
               고객센터 문의 help@pmang.co.kr &nbsp;|&nbsp; 제휴문의 partner@pmang.co.kr
               <br>
               호스팅서비스 제공자: bitcamp
               <br>
               <br>
               “피망장터_컨시어지” 상점의 판매상품을 제외한 모든 상품들에 대하여, 피망장터㈜는 통신판매중개자로서 중고거래마켓 번개장터의 거래 당사자가 아니며, 입점판매자가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다.
               <br>
            </div>
            
            <div>
               <div class="">
                  Copyright ⓒ Pmangjangter Inc. All rights reserved.
               </div>
            </div>
         </div>
      </div>
   </div>




<!-- 검색 클릭 이벤트 -->
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script> <!-- 카카오디벨로퍼 -->
<script type="text/javascript" src="/pmang/js/index.js"></script>
<script>
if('${tabNo}'=='1'){
	$('#tab1').attr('checked', true);
}else if('${tabNo}'=='2'){
	$('#tab2').attr('checked', true);
}else if('${tabNo}'=='3'){
	$('#tab3').attr('checked', true);
}else if('${tabNo}'=='4'){
	$('#tab3').attr('checked', true);
	$('#menu2').attr('checked', true);
}
</script>

</body>
</html>