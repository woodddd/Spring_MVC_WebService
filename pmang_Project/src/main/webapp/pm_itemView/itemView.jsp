<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<link rel="stylesheet" href="/pmang/css/itemView.css">
<link rel="stylesheet" href="/pmang/css/reportForItemView.css">
<style>
</style>

<input type="hidden" id="item_seq" name="item_seq" value="${param.item_seq}"> <!-- 나중에 세션에서 받는 값으로 변경 -->
<input type="hidden" id="comment_seq" name="comment_seq" value=""> <!-- 강제호출용 click으로 사용 중 -->
<input type="hidden" id="userId" name="userId" value="${sessionScope.memUserId }"> <!-- 나중에 세션에서 받는 값으로 변경 -->
<input type="hidden" id="commentIndex" name="commentIndex" value="1">
<input type="hidden" id="likedOrNot" name="likedOrNot" value="0"> <!-- 강제호출용 click으로 사용 중 -->
<input type="hidden" id="photoNum" name="photoNum" value="1">




<div id="itemViewDiv">
   <div class="selection01">
	<div class="categoryDiv">
		<div class="home">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkRJREFUSA3tlb9LHEEUx2/vzhQXESxsTau1aWxsFDkQA0ljEcv78RfY2EQbwT/hflU2KjGkCASRgI1FQEVstNU2QkD0YnXn5x03x7vZXXfnXGzMwPBm3pv5fubNj10vNUCpVCpDTNuibpfL5e8DSKTSrpME6nneDvOWqLv1en3RVUPGO4ENtN1uf2RukzrUarW+4l8QMZcSG2xBb9Lp9DSgdRbxBrtH5nkXsBdncAB0tlgsnstcYmuYL2z/A/UD/gPxR5VI8FNQI27g9P9lMpnFQqHwy8TC7JPgOFAjrOBNjmGBzA9NLMiGnrELVIR5VmuYdWqOc//Bmc/QDi2BGbtCtbrK/I5tz7PtRzpu2r6MnwMVUZX5ME/tZ6PRkNvvK30ZPxeq1VXmt/jnWdBvHe9lnCRUACrzEbr7ZP5egzsZW9AU7zFfKpX29cBB29Vq9Vv3S/cXjTkWdCpaWRsqTsA3Yk1hTI4nMmn6YZYzvUf4UseB/un2R9E9YCGzJHWWRXCF4DjOE6yI5/REaQsU0WPbb/dFA1/flqoxsqB7GJsk8jnLQ9/AITXFao4JTEk7pDQRv7BjzHmLb8L26z6LX4YlC+uUrGnEsQJlm3wZ1Wq1qTg7ohm9W62dL9H+D36JXe4wnC4Xt3eMi1SyV8fFemf7ovpOYMTGgVSiROPEY4GBydenGiXIc7uKGmPiscB8Bq+ZUDaTkrCv7zkFbjVn+kk+g0lsKS9hkuqTCgQzahW4b3CSjj4wt1J+2r0/SJKg7svoST4CXawe/d9nd+gAAAAASUVORK5CYII=" 
			width="15" height="15" alt="카테고리 네비게이션 아이콘">
			홈
		</div>
		
		<div class="firstCategory">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAaVJREFUKBWFUz1LA0EQde9DIjaxSBNIG2shnR9whYVgIQqnjURikhP/QDqLVPoL9KJJEUHIgYggSFCs7K2tU6ZIrAwa73zvyB6bM8GB3Ox782Z2Z3YjZmCe5832er2WruvVYrH4Rm6aaQz0+/0ruC3f99v1en1xmpi85rpuNQiCfQL41HA4fGo0GhniSaYJIRZigQySnpGUivEhFKgqLmHwhzEBe7Ecx/lQee4QlEqlMsgbNYD1En4PGMicyodNI8nPZrN5+Ds1iPUKBnKLPk3JhwkElmUNk8nkHpIeZZAeR92Au4YPtVECg7Ztf5mmuY2kF2LFdmu12jmxUMho2Ww25weDQRtVlyOSYiHOxnaQwUQi4UMcSKz6PzuwQVS6h55njwycWy6Xj8Z2gIiYDY6JwbUw+mNm6/xIS6fTF1jnJaZHZU7NzuVyP8QGPzRM4RSVeYGqvWLUO5jetyTDI0FcgbgiyZHn09iE+FPlBZp0QPAoqr3jPlYLhUJXJbnmDmsxsgPx+iSxTDgYNcYGu4ZhUNyJFYlgeA98kXhknqZpJ//9RX8BYkCa7Y9z0J0AAAAASUVORK5CYII="
			 width="6" height="10" alt="카테고리 선택그룹 아이콘">
		 	<div class="selectItem1">
		 		<div class="top1">
		 		     <span id="topSpan1"></span>
		 			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" 
		 			width="10" height="6" alt="카테고리 화살표 아이콘">
		 		</div>
		 		
		 		<div class="down1">
		 			<a href="#">패션</a>
		 			<a href="#">디지털/가전</a>
		 			<a href="#">도서/티켓</a>
		 			<a href="#">리빙용품</a>
		 			<a href="#">스포츠/레저</a>
		 			<a href="#">뷰티/미용</a>
		 			<a href="#">유아/출산</a>
		 			<a href="#">기타</a>
		 			<a href="#">커뮤니티</a>
		 		</div>
		 	</div> <!-- selectItem -->
		</div><!-- firstCategory -->
		
		<div class="secondCategory">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAaVJREFUKBWFUz1LA0EQde9DIjaxSBNIG2shnR9whYVgIQqnjURikhP/QDqLVPoL9KJJEUHIgYggSFCs7K2tU6ZIrAwa73zvyB6bM8GB3Ox782Z2Z3YjZmCe5832er2WruvVYrH4Rm6aaQz0+/0ruC3f99v1en1xmpi85rpuNQiCfQL41HA4fGo0GhniSaYJIRZigQySnpGUivEhFKgqLmHwhzEBe7Ecx/lQee4QlEqlMsgbNYD1En4PGMicyodNI8nPZrN5+Ds1iPUKBnKLPk3JhwkElmUNk8nkHpIeZZAeR92Au4YPtVECg7Ztf5mmuY2kF2LFdmu12jmxUMho2Ww25weDQRtVlyOSYiHOxnaQwUQi4UMcSKz6PzuwQVS6h55njwycWy6Xj8Z2gIiYDY6JwbUw+mNm6/xIS6fTF1jnJaZHZU7NzuVyP8QGPzRM4RSVeYGqvWLUO5jetyTDI0FcgbgiyZHn09iE+FPlBZp0QPAoqr3jPlYLhUJXJbnmDmsxsgPx+iSxTDgYNcYGu4ZhUNyJFYlgeA98kXhknqZpJ//9RX8BYkCa7Y9z0J0AAAAASUVORK5CYII="
		 	width="6" height="10" alt="카테고리 선택그룹 아이콘">
		 	<div class="selectItem2">
		 		<div class="top2">
		 			<span id="topSpan2"></span>
		 			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" 
		 			width="10" height="6" alt="카테고리 화살표 아이콘">
		 		</div>
		 		
		 		<div class="down2">
		 			
		 		</div>
		 	</div> <!-- selectItem -->
		</div><!-- secondCategory -->
		
		<div class="thirdCategory">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAaVJREFUKBWFUz1LA0EQde9DIjaxSBNIG2shnR9whYVgIQqnjURikhP/QDqLVPoL9KJJEUHIgYggSFCs7K2tU6ZIrAwa73zvyB6bM8GB3Ox782Z2Z3YjZmCe5832er2WruvVYrH4Rm6aaQz0+/0ruC3f99v1en1xmpi85rpuNQiCfQL41HA4fGo0GhniSaYJIRZigQySnpGUivEhFKgqLmHwhzEBe7Ecx/lQee4QlEqlMsgbNYD1En4PGMicyodNI8nPZrN5+Ds1iPUKBnKLPk3JhwkElmUNk8nkHpIeZZAeR92Au4YPtVECg7Ztf5mmuY2kF2LFdmu12jmxUMho2Ww25weDQRtVlyOSYiHOxnaQwUQi4UMcSKz6PzuwQVS6h55njwycWy6Xj8Z2gIiYDY6JwbUw+mNm6/xIS6fTF1jnJaZHZU7NzuVyP8QGPzRM4RSVeYGqvWLUO5jetyTDI0FcgbgiyZHn09iE+FPlBZp0QPAoqr3jPlYLhUJXJbnmDmsxsgPx+iSxTDgYNcYGu4ZhUNyJFYlgeA98kXhknqZpJ//9RX8BYkCa7Y9z0J0AAAAASUVORK5CYII="
		 	width="6" height="10" alt="카테고리 선택그룹 아이콘">
		 	<div class="selectItem3">
		 		<div class="top3">
		 			<span id="topSpan3"></span>
		 			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" 
		 			width="10" height="6" alt="카테고리 화살표 아이콘">
		 		</div>
		 		
		 		<div class="down3">
		
		 		</div>
		 	</div><!-- selectItem -->
		 </div><!-- thirdCategory -->
		
	</div><!-- categoryDiv -->

	


</div>


	

	<!-- 상품 영역 -->
	<br>
	<hr>
	<br>
	<br>
	<div id="itemDiv">

		<!-- 상품 이미지 영역 -->
		<div id="imageArea">
		
			<div id="itemPic">
				<div id="itemPictureDiv">
			<!-- <img id="itemPic" src="/pmang/image/itemPic.jpg" alt="item pic"> -->
				</div>
			</div>
			
			<!-- 확대 버튼 -->
			<input type="checkbox" id="imgCheckBox">
			<label id="imgDetailBtn" for="imgCheckBox">
				<img src="/pmang/image/imageModalBtn.png" width="35" height="35">
			</label>
			
			<!-- 모달 영역 -->
			<div id="modalView" class="modalComp">
				<div id="slideShowPage">
					<!-- 상풍명 -->
					<span id="modalItemName" class="nameSpan">DB에러</span>
					<!-- 슬라이드 쇼 영역-->	
					
					
						
					<!-- 모달 사진 슬라이드영역 -->
					<div class="slide">
					  <ul class="panel"></ul>

					  <div class="prev"><img width="50px" height="50" src="/pmang/image/imgLeft.png" alt="" /></div>
					  <div class="next"><img width="50px" height="50" src="/pmang/image/imgRight.png" alt="" /></div>
					</div>
					 <!-- 모달 사진 슬라이드영역 --> 
          
          
          
					<!-- 슬라이드 쇼 영역 끝-->
					<!-- 종료버튼 -->
					<label id="closeBtn" for="imgCheckBox">
						<img src="/pmang/image/imgClose.png" width="30" height="30">
					</label>
				</div>
			<!-- 배경 -->
			<label id="blackBackground" class="modalComp" for="imgCheckBox"></label>
			</div>
			<!-- 모달영역 끝 -->
			
			<!-- 왼쪽 사진 버튼 -->
			<a id="imgLeftBtn" >
				<img src="/pmang/image/imgLeft.png" width="50" height="50">
			</a>
			
			<!-- 오른쪽 사진 버튼 -->
			<a id="imgRightBtn"  >
				<img src="/pmang/image/imgRight.png" width="50" height="50">
			</a>
			
		</div>
		<!-- 상품 이미지 영역 -->
		

		<!-- 상품 정보 영역 -->
		<div id=itemArea>
			<!-- 상품 설명 -->
			<div>
				<!-- 상품명, 상품가 -->
				<div id="nameNPrice">
					<div id="itemName">
						<h4><span class="nameSpan"></span></h4>
					</div>

					<div id="itemPrice">
						<h4>
							<span class="priceSpan"> </span>원
						</h4>
					</div>
				</div>

				<!-- 상품 게시글 정보 -->
				<div id="postInfo">
					<div id="likeHitDate">
						<div class="likeDateHit">
							<img src="/pmang/image/like.jpg" alt="찜수" width="20" height="20">
							<span class="likeSpan"></span>
						</div>
						<div class="likeDateHit">
						
							<img src="/pmang/image/hit.jpg" alt="조회수" width="20" height="20">
							<span class="hitSpan"></span>
						</div>
						<div class="likeDateHit" style="width:200px;">
							<img src="/pmang/image/date.jpg" alt="게시일" width="20" height="20">
							<span class="dateSpan"></span>
						</div>
						<div id="myBtn">
							<img src="/pmang/image/reportBtn.JPG" alt="신고하기" width="20" height="20">
							신고하기
						</div>
					</div>
				</div>
				<br>
				<!-- 상세 설명 -->
				<div>
					<div class="dealInfo">
						<div class="infoQ">상품상태</div>
						<div class="infoA"><span class="conditionSpan">DB에러</span></div>
					</div>
					<div class="dealInfo">
						<div class="infoQ">흥정가능</div>
						<div class="infoA"><span class="negoSpan">DB에러</span></div>
					</div>
					<div class="dealInfo">
						<div class="infoQ">상품수량</div>
						<div class="infoA"><span class="qtySpan">DB에러</span></div>
					</div>
					<div class="dealInfo">
						<div class="infoQ">거래지역</div>
						<div class="infoA"><span class="locationSpan">DB에러</span></div>
					</div>

				</div>
			</div>
			<br>
			<br>
			<!-- 상품 설명 -->

			<!-- 버튼 영역 -->
			<div id="buttonArea">
				<div id="like"><img id="zzimIcon" src="/pmang/image/zzimNo.png" width="35" height="35">찜<span class="likeSpan"></span></div>
				<div id="contact"><img src="/pmang/image/contactIcon.png" width="35" height="35">연락하기</div>
				<!-- <div id="pay">바로구매</div> -->
			</div>
			<!-- 버튼 영역 -->
		</div>
		<!-- 상품 정보 영역 -->
	</div>
	<!-- 상품 영역 -->
</div>
<!-- 페이지 영역 -->

<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

<!-- 상품상세 +문의 -->
<div id="content">
	<!-- 탭메뉴 -->
	<div id="contentMenuDiv">
		<ul id="contentMenu">
			<li class="contentMenu current" data-tab="contentSection01">상품정보</li>
			<li class="contentMenu" data-tab="contentSection02">상품문의 (<span
				class="commentNum"></span>)
			</li>
			<!-- 상품문의 옆에 댓글개수 나오도록 구현해야합니다~ -->
		</ul>
	</div>
	<!-- ---------------탭메뉴 -->


	<!-- 상품정보 -->
	<div class="contentSection" id="contentSection01">
		<h3>상품정보</h3>
		<hr width="100%" align="left" size="1px" color="#eee" noshade="noshade" >
		<br>
		<div><span class="commentSpan"></span></div>
		<br><br>
		
		<!-- 거래지역, 카테고리, 상품태그 div -->
		<div id="productInfo">
			<div class="productInfo">
				<div class="productInfoDiv"><img src="/pmang/image/areaIcon.jpg" width="15" height="15">거래지역</div>
	
				<div><a href="#"><span class="locationSpan"></span></a></div>			
	
			</div>
			<div class="productInfo border">
				<div class="productInfoDiv"><img src="/pmang/image/categoryIcon.jpg" width="15" height="15">카테고리</div>
				<div><a href="#">
					<span class="category1Span"></span>
					<span class="category2Span"></span>
					<span class="category3Span"></span>
					</a></div>
			</div>
			<div class="productInfo border">
				<div class="productInfoDiv"><img src="/pmang/image/tagIcon.jpg" width="15" height="15">상품태그</div>
				<div><a href="#">
					<span class="hashtag1Span"></span>
					<span class="hashtag2Span"></span>
					<span class="hashtag3Span"></span>
					</a></div>
			</div>
		</div>
		<!-- --거래지역, 카테고리, 상품태그 div  -->
	</div>
	<!-- 상품정보div -->
	<br>
	<!-- 상품문의 -->
	<div id="contentSection02" class="contentSection">
	
		<h3>상품문의 <span class="commentNum" style="color: green;"></span></h3>
		
		<div id="reply"><!-- 댓글창 -->
			<div class="replyDiv text"><!-- 댓글 test입력 -->
				<textarea id="replyText" maxlength="300"></textarea>
			</div>
			
			<div class="replyDiv"><!-- 댓글 글자제한/등록버튼 -->
				<span><span id="count">0</span> / 300</span>
				<button id="replyBtn">등록</button>
			</div>
		</div>
		<div class="replyList"><!-- 댓글들 list 5개씩 출력, 상품문의 더보기 -->
			<!-- 댓글하나 상단에 패딩넣어줌
			<div class="replyUser">
				<a href="#">
					<img alt="프사" src="" width="50" height="50">
				</a>
				
				<div class="replyTot">
					<div class="CommentArea">
						<div class="replyUserName">유저닉네임</div>
						<div class="replyDate" align="right">방금전</div>
						시간넣어주세요
					</div>
					<div class="replyContent">댓글 내용을 넣어주세요</div>
					<div>
						<div>
							<a href="#">덧글달기</a>
						</div>
						<div>
							<a href="#">신고하기</a>
						</div>
					</div>
				</div>
					<hr width="100%"> 
			</div> 댓글 하나 -->
		</div>
	</div>
	<div id="moreBtn"><img id="morePic" src="" width="20" height="20"><span id="moreText"></span></div>
	<!-- 상문문의div-->
</div>
<!-- 상품상세 + 문의 div -->

<!-- 상품 신고하기 모달 -->
 
    <!-- The Modal -->
    <div id="myModal" class="modal">
 
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>                                                               
        <div class="report">
			<div class="report-header">
				<div class="report-subject">신고하기</div>
					</div>
					<div class="report-content">
						<div class="report-ad">
							<div class="report-ad-div report-common">
								광고(상점홍보, 낚시글, 도배글)
								<button type="button">
									<img src="/pmang/image/reportV.png"width="13" height="8" alt="화살표 아이콘">
								</button>									
							</div>
								<div class="hide report-hide-common">
					           		<div class="report-ad-ad">
					                	<button type="button">상점홍보</button>
					                </div>
					                <div class="report-ad-ad">
					                	<button type="button">낚시글</button>
					                </div>
					                <div class="report-ad-ad">
					                	<button type="button">도배글</button>
					                </div>
					                <div class="report-ad-ad">
					                	<button type="button">타사이트,어플 광고</button>
					                </div>
					                <!-- <div class="etc">
					                	<input type="text" class="etcText" placeholder="기타(사유)">
					                	<button id="report-ad-pr-write" class="etcBtn" type="button">등록</button>
					                </div> -->
					           	</div>
							</div>
						<div class="report-un">
							<div class="report-un-div report-common">
								물품정보 부정확(카테고리,가격,사진)
								<button type="button">
									<img src="/pmang/image/reportV.png"width="13" height="8" alt="화살표 아이콘">
								</button>								
							</div>
								<div class="hide report-hide-common">
					           		<div class="report-un-ad">
					                	<button id="report-pr-category" type="button">카테고리가 잘못됨</button>
					                </div>
					                <div class="report-un-ad">
					                	<button id="report-pr-price" type="button">가격이 잘못됨</button>
					                </div>
					                <div class="report-un-ad">
					                	<button id="report-pr-pic" type="button">사진이 잘못됨</button>
					                </div>
					                <div class="report-un-ad">
					                	<button id="report-pr-name" type="button">상품명이 잘못됨</button>
					                </div>
					                <!-- <div class="etc">
					                	<input type="text" class="etcText" placeholder="기타(사유)">
					                	<button type="button" class="etcBtn">등록</button>
					                </div> -->
					           	</div>
							</div>
						<div class="report-dan">
							<div class="report-dan-div report-common">
								거래 금지 품목(담배,주류,장물)
								<button type="button">
									<img src="/pmang/image/reportV.png"width="13" height="8" alt="화살표 아이콘">
								</button>								
							</div>
								<div class="hide report-hide-common">
					           		<div class="report-dan-ad">
					                	<button type="button">담배/주류</button>
					                </div>
					                <div class="report-dan-ad">
					                	<button type="button">장물(분실폰,분실노트북,..)</button>
					                </div>
					                <div class="report-dan-ad">
					                	<button type="button">의약품류</button>
					                </div>
					                <div class="report-dan-ad">
					                	<button type="button">콘텍트 렌즈</button>
					                </div>
					                <!-- <div class="etc">
					                	<input type="text" class="etcText" placeholder="기타(사유)">
					                	<button type="button" class="etcBtn">등록</button>
					                </div> -->
					           	</div>
							</div>
						<div class="report-viol">
							<div class="report-viol-div report-common">
								언어폭력(비방,욕설,성희롱)
								<button type="button">
									<img src="/pmang/image/reportV.png"width="13" height="8" alt="화살표 아이콘">
								</button>								
							</div>
								<div class="hide report-hide-common">
					           		<div class="report-viol-ad">
					                	<button type="button">비방/욕설</button>
					                </div>
					                <div class="report-viol-ad">
					                	<button type="button">성희롱</button>
					                </div>
									<!--  <div class="etc">
					                	<input type="text" class="etcText" placeholder="기타(사유)">
					                	<button type="button" class="etcBtn">등록</button>
					                </div> -->
					           	</div>
							</div>
					<!-- <div class="report-write">
							<div class="report-write-div report-common">
								기타사유(직접입력)
								<button type="button">
									<img src="/pmang/image/reportV.png"width="13" height="8" alt="화살표 아이콘">
								</button>									
							</div> 
								<div class="hide report-hide-common">
									<div class="report-write-ad">
										<textarea ></textarea>
										<div class="resiDiv">
					                		<button id="report-pr-write" type="button">등록</button>
					                	</div>
					                </div>
					            </div>
					      </div>  -->
					      <div class="report-qna">
					      	<div class="report-qna-div">
					      		거래사기(1:1문의하기)
					      		<button id="report-operator" type="button" onclick="/pmang/board/qna">1:1문의하기</button>
					      	</div>
					      </div>
					      
					</div>
				</div>
     		 </div>
 		</div>
<!-- 댓글 신고 모달 -->
<!-- The Modal -->
    <div id="myModal111" class="modal111">
 
      <!-- Modal content -->
      <div class="modal-content111">
        <span class="close111">&times;</span>                                                               
				<div class="report111">
					<div class="report-header111">
						<div class="report-subject111">신고하기</div>
					</div>
					<div class="report-content111">
						<div class="report-ad111">
							<div class="report-ad-div111 report-common111">
								광고(교신 및 상점홍보)
								<button type="button">
									<img src="/pmang/image/reportV.png" width="13" height="8" alt="화살표 아이콘">
								</button>
							</div>
							<div class="hide111 report-hide-common111">
				           		<div class="report-ad-ad111">
				                	<button type="button">교환신청</button>
				                </div>
				                <div class="report-ad-ad111">
				                	<button type="button">상점홍보</button>
				                </div>
								 <div class="report-ad-ad111">
				                	<button type="button">타사이트,어플광고</button>
				                </div>
				                <!-- <div class="etc111">
				                	<input type="text" class="etcText111" placeholder="기타(사유)">
				                	<button type="button" class="etcBtn111">등록</button>
				                </div> -->
				           	</div>
						</div>


						<div class="report-viol111">
							<div class="report-viol-div111 report-common111">
								언어폭력(비방,욕설,성희롱)
								<button type="button">
									<img src="/pmang/image/reportV.png" width="13" height="8" alt="화살표 아이콘">
								</button>
							</div>
								<div class="hide111 report-hide-common111">
					           		<div class="report-viol-ad111">
					                	<button type="button">비방/욕설</button>
					                </div>
					                <div class="report-viol-ad111">
					                	<button type="button">성희롱</button>
					                </div>
					            	<div class="report-viol-ad111">
					                	<button type="button">리뷰(별점평가)요구 및 테러</button>
					                </div>
									<!--  <div class="etc111">
					                	<input type="text" class="etcText111" placeholder="기타(사유)">
					                	<button class="reBtn111" class="etcBtn111" type="button">등록</button>
					                </div> -->
					           	</div>
							</div>
						<!-- <div style="border-top: 1px solid rgb(190, 190, 190);" class="report-write111">
							<div class="report-write-div111 report-common111">
								기타사유(직접입력)
								<button type="button">
									<img src="/pmang/image/reportV.png" width="13" height="8" alt="화살표 아이콘">
								</button>								
							</div>
								<div class="hide111 report-hide-common111">
									<div class="report-write-ad111">
										<textarea></textarea>
					                	<button style="border: 1px solid rgb(238, 238, 238);" type="button">등록</button>
					                </div>
					            </div>
					      </div> -->
					      
					</div>
				</div>
     		 </div>
 		</div> 		

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/itemView.js"></script>
<script type="text/javascript" src="/pmang/js/reportForItemView.js"></script>