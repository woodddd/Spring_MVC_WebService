<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style type="text/css">
.item_seqSpan{
display:none;
}
</style>
<title>리뷰쓰기</title>
<link rel="stylesheet" href="/pmang/css/review.css">
</head>
<body>
	<input type="hidden" id="photoCountHidden" value="0">
	<form id="reviewWriteForm">
	 <input type="hidden" id="item_seq" value="${param.item_seq }"> 
	<span class="item_seqSpan">${param.item_seq }</span>
		<div class="reviewHeader">
			<span>리뷰쓰기</span>

		</div>

		<div class="reviewContainer">
			<div class="reviewItemDiv">
				<div class="reviewItemImg">
					<!-- <img alt="상품이미지" src="../image/bench.jpg" width="75" height="75"> -->
				</div>
				<!-- reviewItemImg -->
				<div class="reviewItemContent">
					<div class="reviewStoreName"></div><!-- 마 이게 상점명이다!! sellerid -->
					<div class="reviewSubject"></div><!-- 마 이게 상품명이다!! reviewsubject 겸 item_subject -->
					<div class="reviewLogtime"></div> <!-- 마 이게 판매상품 등록시간이다! -->
				</div>
				<!-- reviewItemContent -->
			</div>
			<!-- reviewItemDiv -->

			<div class="reviewDiv">
				<div class="reviewScore">
					<strong>거래는 어떠셨나요?</strong>
					<div class="scoreLevelDiv">
						<div class="scoreLevel">
							<input type="radio" class="scoreRadio" name="level" id="level1" value="별로에요"
								 /> <label for="level1"> <img
								id="scoreLevel1" src="../image/grayPmang.png">
							</label> <input type="radio" class="scoreRadio" name="level" id="level2" value="보통이에요"
								 /> <label for="level2"> <img
								id="scoreLevel2" src="../image/grayPmang.png">
							</label> <input type="radio" class="scoreRadio" name="level" id="level3" value="좋아요"
								 /> <label for="level3"> <img
								id="scoreLevel3" src="../image/grayPmang.png">
							</label>


							<div class="level">별로에요&emsp;&emsp;보통이에요&emsp;&emsp;좋아요</div>
							<div class="scoreLevelMsg">선택하세요</div>
							<!-- scoreLevelMsg -->
						</div>
						<!-- scoreLevel -->
					</div>
					<!-- scoreLevelDiv -->
				</div>
				<!-- reviewScore -->

				<div class="reviewContentDiv">
					<textarea class="reviewContent" id="reviewInput" name="reviewContent"
						placeholder="후기 내용을 남겨주세요.(최소 10자 이상)" cols="30"></textarea>
					<div class="contentCountDiv">
						<span id="counter">(0 / 최대 200자)</span>
					</div>
					<!-- contentCountDiv -->
				</div>
				<!-- reviewContentDiv -->

				<div class="reviewImgUploadDiv" id="reviewImgUploadDiv">

					<!-- <a href="#" class="imgUpload"> -->
			
					<div class="reviewPhotoDiv">
						<ul class="reviewPhotoUl">
							<li class="reviewPhotoLi" />
							<img src="../image/photoIcon.png" alt="카메라아이콘" />사진 등록
							<input type="file" class="reviewPhoto" name="img[]" accept="image/jpg, image/jpeg, image/png" multiple/>
						</ul>
					</div>
					<!-- reviewPhotoDiv -->
					<!-- </a> -->
				</div>

				<!-- reviewImgUploadDiv -->
				<div class="reviewPhotoPreview"></div>

				<div class="reviewCheckDiv">
					<div class="reviewCancel">
						<!-- <input type="button" id="reviewCancelBtn" value="취소"> -->
						<input type="reset" class="reviewCancelBtn" value="취소">
					</div>
					<!-- reviewCabcek -->
					<div class="reviewOk">
						<!--********************************************************** score점수를 매겼을 경우에 disabled:false로 바꾸기 -->

						<!-- <input type="button" id="reviewOkBtn" value="등록" disabled="disabled"> -->
						<button type="button" class="reviewOkBtn">등록</button>
					</div>
					<!-- reviewOk -->
				</div>
				<!-- reviewCheckDiv -->
			</div>
			<!-- reviewDiv -->
		</div>
		<!-- reviewContainer -->
	</form>

	<!-- 리뷰 사진 업로드 form ,보이진않음-->
	<!-- <form name="reviewform" method="post" enctype="multipart/form-data">
	<input type="file" id="review" name="review" style="display: none;"
		onchange="uploadImg(this)"> <input type="hidden"
		name="reviewImgUpload_url">
</form> -->
	<!-- 라뷰 사진 업로드 -->

	<script type="text/javascript"
		src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="../js/review.js"></script>
	<script>
		$(document).ready(function() {
			$('.reviewOkBtn').attr('disabled', true);
			
			$.ajax({
				type:'post',
				url:'/pmang/board/getItem',
				dataType:'json',
				data:{'item_seq': $('#item_seq').val()},
				success:function(data){
					console.log(JSON.stringify(data));
					
					
					var imgstr='<img src="/pmang/storage/'+data.itemDTO.img1+'" width="75" height="75">';
					$(imgstr).appendTo($('.reviewItemImg'));
					
					$('.reviewStoreName').text(data.itemDTO.userId);
					$('.reviewSubject').text(data.itemDTO.item_subject);
					
					var dataFormat=data.itemDTO.logtime;
					var year=dataFormat.substr(0,4);
					var month=dataFormat.substr(5,2);
					var day=dataFormat.substr(8,2);
					
					$('.reviewLogtime').text(year+'.'+month+'.'+day);
					
					
					
					
				},
				error:function(err){
					console.log(err);
				}
					
			});
		});
		
		
	</script>

</body>
</html>