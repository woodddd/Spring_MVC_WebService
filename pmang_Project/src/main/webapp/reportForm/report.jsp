<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/pmang/css/report.css">
<title>Insert title here</title>

</head>
<body>
    <!-- Trigger/Open The Modal -->
    <button id="myBtn"><img src="/pmang/image/reportAlert.png" style="margin-top: 3px;" width="15" height="15" alt="신고하기 버튼">신고하기</button>
 
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
					                <div class="etc">
					                	<input type="text" placeholder="기타(사유)">
					                	<button id="report-ad-pr-write" type="button">등록</button>
					                </div>
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
					                <div class="etc">
					                	<input type="text" placeholder="기타(사유)">
					                	<button type="button">등록</button>
					                </div>
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
					                <div class="etc">
					                	<input type="text" placeholder="기타(사유)">
					                	<button type="button">등록</button>
					                </div>
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
									 <div class="etc">
					                	<input type="text" placeholder="기타(사유)">
					                	<button type="button">등록</button>
					                </div>
					           	</div>
							</div>
						<div class="report-write">
							<div class="report-write-div report-common">
								기타사유(직접입력)
								<button type="button">
									<img src="/pmang/image/reportV.png"width="13" height="8" alt="화살표 아이콘">
								</button>									
							</div>
								<div class="hide report-hide-common">
									<div class="report-write-ad">
										<textarea></textarea>
										<div class="resiDiv">
					                		<button id="report-pr-write" type="button">등록</button>
					                	</div>
					                </div>
					            </div>
					      </div>
					      <div class="report-qna">
					      	<div class="report-qna-div">
					      		거래사기(1:1문의하기)
					      		<button id="report-operator" type="button">1:1문의하기</button>
					      	</div>
					      </div>
					</div>
				</div>
     		 </div>
 		</div>
 		
 		
 		 <!-- Trigger/Open The Modal -->
    <button id="myBtn111"><img src="/pmang/image/reportAlert.png" style="margin-top: 3px;" width="15" height="15" alt="신고하기 버튼">신고하기</button>
 
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
				                <div class="etc111">
				                	<input type="text" placeholder="기타(사유)">
				                	<button type="button">등록</button>
				                </div>
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
									 <div class="etc111">
					                	<input type="text" placeholder="기타(사유)">
					                	<button class="reBtn111" type="button">등록</button>
					                </div>
					           	</div>
							</div>
						<div style="border-top: 1px solid rgb(190, 190, 190);" class="report-write111">
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
					      </div>
					</div>
				</div>
     		 </div>
 		</div>
<script type="text/javascript"src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/report.js"></script>
  </body>
</html>