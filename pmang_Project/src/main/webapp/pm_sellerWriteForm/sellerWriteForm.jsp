<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/pmang/css/sellerWriteForm.css">


<input type="hidden" id="seller_userId" value="${sessionScope.memUserId}">
<input type="hidden" id="imageCountHidden" value=0>
<div class="searchlocationModal">
	<section class="searchlocationContent">
		<header id="searchlocationHeader">주소 검색 <button type="button" class="searchlocationCloseBtn"></button></header>
		<div class="searchlocationForm">
			<input type="text" class="searchlocationInput" placeholder="동(읍/면/리) 입력해주세요." value="">
			<button class="searchlocationBtn"></button>
			<ul class="searchlocationList">
			
			</ul>
		</div>
	</section>
</div>

<div class="recentlyModal">
	<section class="searchlocationContent">
		<header>최근지역 <button type="button" class="searchlocationCloseBtn"></button></header>
		<ul class="recentlyUl">
			
		</ul>
	</section>

</div>

	<div class="wirteForm_head">
		<nav class="writeForm_nav">
			<!-- 만약 선택한 페이지로 이동한다면,선택된 a태그의 color 를 red로 바꿔줘야한다. -->
			<!-- 기존에 우리가 페이징 처리할때 했던것 처럼 id 를 주어서 id 가 현재페이지라면, 바꾸면될듯하다 -->
			<div class="nav_writeForm">
				<a class="nav_move1" href="/pmang/member/sellerWriteForm" style="color:green; font-weight: bold;"> 
				상품등록
				</a>
			</div>
			
			<div class="nav_managementForm">
				<a class="nav_move2" href="/pmang/seller/sellerManagementForm"> 
				상품관리
				</a>
			</div>
			
		</nav>
	</div>

	<div class="writeForm_body">
		<form id="sellerWriteForm">
			<main class="writeForm_main">
				<section class="main_sectionFrame">
					<h2>기본정보
						<span>*필수항목</span>
					</h2>
				<!-- 상품이미지 -->
				<!-- 
				등록하기 버튼을 눌렀을 때, 유효성 검사를 하여 이미지가 없다면 이미지등록 아래 div를 append 하고 
				상품 사진을 등록해주세요. -> 라는 메시지를 띄워야 한다.
				-->
				<ul class="itemList">  
					<li class="item_li">
						<div class="imageText_div">
						상품이미지
						<span>*</span>
						<small class="imageCount">
						(0/3)<br>
						</small>
						</div>
						
						<div class="imageChoice_div">
							<ul class="imageChoice_ul">
								<li class="imageChoice_li">
									이미지 등록
									<input type="file" class="imageChoice" name="img[]" accept="image/jpg, image/jpeg, image/png" multiple>
									<!-- 추후에 이미지 3개까지 들어갈 수 있도록 코드작성해야함 -->
									<!-- 또한 name 변수는 DTO에 데이터가 들어가지 않고 multipart로 가게하기 위해 DB 변수명이랑 다르게 하였음 -->
								</li>
								<!-- 그리고 이위치에 파일이 선택되었을 때(이벤트 발생) li태그가 추가된다. 어떠한 태그를 추가야해야하는지
								번개장터에 잘 나와있으므로, f12를 눌러서 추가되는 태그를 확인해봐야한다.  -->
								
							</ul>
							<div id="imageCheck">※상품 사진을 등록해주세요.</div>
							
							<div class="imagecontent">
								<b>* 상품 이미지는 640x640에 최적화 되어 있습니다.</b>
								<br>
								- 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.
								<br>
								- 이미지를 클릭 할 경우 원본이미지를 확인할 수 있습니다.
								<br>
								- 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
								<br>
								- 큰 이미지일경우 이미지가 깨지는 경우가 발생할 수 있습니다.
								<br>
								최대 지원 사이즈인 640 X 640 으로 리사이즈 해서 올려주세요.(개당 이미지 최대 20M)
							</div>
						</div>
					</li>
					
					<!-- 제목 -->
					<li class="item_li">
						<div class="itemSubject_div">제목
							<span>*</span>
						</div>
						
						<div class="itemSubjectTextArea_div">
							<div class="itemSubjectText_div">
								<div class="itemSubjectText">
									<input type="text" name="item_subject" maxlength="40" placeholder="상품 제목을 입력해주세요." class="itemSubject_input">
									<a id="textRemove"><img id="textRemoveClick" src="/pmang/image/textRemove.png" width="15px" height="15px"></a>
								</div>
								<div class="textLength" id="textLength">
								(0/40)
								</div>
							</div>
							
							<!--
							텍스트에 대한 유효성 검사 후, ajax를 통해서  itemSubjectDiv에 아래의 text를 삽입해줘야함.
							- 유효성검사이벤트시점(moutse가 out되었을 때.)
							  
							- 해당 클래스명에 대한 css는 미리 걸어두었습니다
							-->
							<div class="itemSubjectDiv">
								※상품명을 2자 이상 입력해주세요.
							</div>
							
						</div>
						
						
					</li>
					
					<!-- 카테고리 -->
					<li class="item_li">
						<div class="gategoryText_div">카테고리
							<span>*</span>
						</div>
						
						<div class="categoryArea_div">
							<div class="categoryChoice_div">
								<div class="categoryArea">
									<ul class="category1" id="category1">
										<li class="category1_li">
											<button type="button" name="category1" id="category1_1" class="category1_Btn">패션</button>
										</li>
										
										<li class="category1_li">
											<button type="button" name="category1" id="category1_2" class="category1_Btn">디지털/가전</button>
										</li>
										
										<li class="category1_li">
											<button type="button" name="category1" id="category1_3" class="category1_Btn">도서/티켓</button>
										</li>
										
										<li class="category1_li">
											<button type="button" name="category1" id="category1_4" class="category1_Btn">리빙용품</button>
										</li>
										
										<li class="category1_li">
											<button type="button" name="category1" id="category1_5" class="category1_Btn">스포츠/레저</button>
										</li>
										
										<li class="category1_li">
											<button type="button" name="category1" id="category1_6" class="category1_Btn">뷰티/미용</button>
										</li>
										
										<li class="category1_li">
											<button type="button" name="category1" id="category1_7" class="category1_Btn">유아/출산</button>
										</li>
										
										<li class="category1_li">
											<button type="button" name="category1" id="category1_8" class="category1_Btn">기타</button>
										</li>
									</ul>
								</div>
								
								<div class="categoryArea">
								<span id="seller_categorySpanM">중분류 선택</span>
									<ul class="category2" id="category2">
										
									</ul>
								</div>
								
								<div class="categoryArea">
								<span id="seller_categorySpanS">소분류 선택</span>
									<ul class="category3" id="category3">
										
									</ul>
								</div>
								
							</div><!-- categoryChoice_div -->
								<!-- ajax이용 -->
								<!-- 준분류 - 카테고리1번에서 항목을 클릭하면, div의 text를 지우고, 카테고리에 해당하는 데이터를 위에서 사용한 ul과 li 태그를 이용하여 append한다. -->
								<!-- 소분류는 중분류를 클릭했을 때, 변경된다. -->
								<!-- 생성한 ul과 li 태그의 class 값은 카테고리1 과 동일하게 하여 css속성을 따라가도록 한다. -->
								
							<div id="categoryCheck">※카테고리를 선택해주세요.</div>
								<h3 class="selectCategory">선택한 카테고리 : 
									<b id="choice"></b>	
								</h3>
						</div><!-- categoryArea_div -->
					</li>
					
					
					<!-- location(동 까지만 입력하게 되어있습니다.) -->
					<li class="item_li">
						<div class="locationText_div">거래지역
							<span>*</span>
						</div>
						
						<div class="locationArea_div">
							<div class="locationArea">
								<button type="button" class="locationSearchBtn" id="mylocation">내 위치</button>
								<button type="button" class="locationSearchBtn" id="recentlylocation">최근 지역</button>
								<button type="button" class="locationSearchBtn" id="searchlocation">주소 검색</button>
							</div>
							
							<input type="text" name="item_location" readonly placeholder="선호 거래 지역을 검색해주세요." class="location_input" value="">
							<!-- 
							클릭 전에 회원가입할 때 입력한 주소를 디비로 꺼내서 넣어놓자.
							내위치 - 클릭하면 내 위치가  input의 value 로 들어간다. ex)경기도 안양시 만안구 안양동
							최근 지역 - 거래지역으로 사용하였던 리스트들이 불러진다. (이걸하려면 DB에 location 이력을 남겨야하는데 우린 안되어있어서 보류.)
							주소 검색 - 모달창이 하나 뜨고 주소를 입력하고 돋보기를 누르면, 주소 리스트들이 불러와진다. 그 후, 리스트 중 하나를 선택하면 value에 값이 들어간다. 
							-->
						</div>
					</li>
					
					<!-- State -->
					<li class="item_li">
						<div class="stateText_div">상태
							<span>*</span>
						</div>
						
						<div class="stateArea_div">
							<div class="state_div">
								<label for="upper" class="state_upper">
									<input type="radio" name="condition" id="upper" value="상" checked>
									상
								</label>
								
								<label for="middle" class="state_middle">
									<input type="radio" name="condition" id="middle" value="중">
									중
								</label>
								
								<label for="lower" class="state_lower">
									<input type="radio" name="condition" id="lower" value="하">
									하
								</label>
							</div>
						</div>
					</li>
					
					<!-- Nego -->
					<li class="item_li">
						<div class="negoText_div">흥정
							<span>*</span>
						</div>
						
						<div class="negoArea_div">
							<div class="nego_div">
								<label for="impossibility" class="nego_impossibility">
									<input type="radio" name="nego" id="impossibility" value="불가능" checked>
									불가능
								</label>
								
								<label for="possibility" class="nego_possibility">
									<input type="radio" name="nego" id="possibility" value="가능">
									가능
								</label>
							</div>
						</div>
					</li>
					
					<!-- price -->
					<li class="item_li">
						<div class="priceText_div">가격
							<span>*</span>
						</div>
						
						<div class="priceArea_div">
							<div id="priceparent" class="price_div">
								<!-- <input type="number" min='0' max='999999999' name="price" placeholder="숫자만 입력해주세요." class="price_input">원 -->
								<input type="text" name="itemprice" maxlength="9" placeholder="숫자만 입력해주세요." class="price_input">원
							</div>
							<div id="priceDiv"></div><!-- mouseout 100원 이상 입력해주세요 , 한글 키 눌리면 바로 alert- 숫자만 입력해주세요.-->
							<!-- ajax에서 css 는 추가안해도됨 해놨음. -->
							<!-- <div class="priceOption_div">
								<div class="price_option">
									<label for="freeShipping" class="freeShipping_label">
										<input id="freeShipping" type="checkbox" class="freeShipping_input">
										배송비 포함
									</label>
								</div>
							</div> -->
						</div>
					</li>
					
					<!-- content -->
					<li class="item_li">
						<div class="contentText_div">설명</div>
						<div class="contentArea_div">
							<textarea name="item_content" rows="6" maxlength="2000" placeholder="상품 설명을 입력해주세요." class="content_textarea"></textarea>
						
							<div class="Transaction_prohibited_item">
								<a target="_blank" href="#">
								거래금지품목 확인하기
								</a> <!-- 거래품목 앞에 강조 이미지 필요할 것 같으면 넣기 -->
								<div class="contentLength" id="contentLength">
								(0/2000)
								</div>
							</div>
						</div>
					</li>
					
					<!-- Hashtag -->
					<li class="item_li">
						<div class="hashtagText_div">연관태그</div>
						<div class="hashtagArea_div">
							<div class="hashtagdetail1_div" id="hashtag_div_parent">
							
								<div class="hashtag_div" id="hashtag_div_this"><!-- 해시태그 -->
		                        	<ul class="hashtag_ul">
		                        	</ul>
		                        </div>
							
								<div class="hashtagdetail2_div" id="hashtagdetail2_div">
									<div class="hashtagdetail3_div">
										<input type="text" id="hashtag" placeholder="연관태그를 입력해주세요. (최대 3개)" maxlength="9">
									</div>
								</div>
							</div>
							
							<ul class="tagExplanation">
								<li>
									<p>태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있습니다.</p>
								</li>
								
								<li>
									<p>태그는 검색의 부가정보로 사용 되지만, 검색 결과 노출을 보장하지는 않습니다.</p>
								</li>
							</ul>
						</div>
					</li>
					
					<!-- Qty -->
					<li class="item_li">
						<div class="qtyText_div">수량</div>
						<div class="qtyArea_div">
							<div id="qtyparent" class="qty_div">
								<!-- <input type="number" min='0' max='999' name="qty" class="qty_input" value="1">
								개 -->
								<input type="text" name="qty" class="qty_input" maxlength="3" value="1">
								개
							</div>
						</div>
					</li>
					
				</ul>
			</section>
		</main>
		
<!-- 		 <footer class="sellerWriteForm_footer">
			<div class="sellerWriteForm_footer_div">
				<button type="button" class="itemWriteBtn">
				</button>
			</div>
		</footer>  -->
		</form>
	</div>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=26152d095dcbd98e75d86172615ba45b&libraries=services"></script>
<script type="text/javascript" src="../js/seller.js"></script>
