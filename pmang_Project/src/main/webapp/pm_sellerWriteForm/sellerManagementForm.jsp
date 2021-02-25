<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- 세션으로 로그인이 유지된다는 가정 하에 작성 -->
	
<link rel="stylesheet" href="/pmang/css/sellerManagement.css">

<input type="hidden" id="pg" value = "${param.pg }">
<%-- <input type="hidden" id="item_seq" value="${item_seq }"> --%>
<div class="manage_wrap">
<div class="management_head">
	<nav class="management_nav">
		<div class="nav_management">
			<a class="nav_move1" href="/pmang/member/sellerWriteForm">
			상품등록
			</a>
		</div>

		<div class="nav_managementForm">
			<a class="nav_move2" href="/pmang/seller/sellerManagementForm">
			상품관리
			</a>
		</div>
	</nav>
</div>	<!-- managementHead -->

<div class="management_body">
	<main class="bodyMain">
		

		<table class="sellManagementTable" style="border-spacing: 2px;">
			<thead class="sellManagementThead">
				<tr>
					<th>사진</th>
					<th>판매상태</th>
					<th>상품명</th>
					<th>가격</th>
					<th>찜/댓글</th>
					<th>최근수정일</th>
					<th>기능</th>
				</tr>
			</thead>

			<tbody class="sellManagementTbody">
				<!-- 등록한 상품 판매글이 여기서 리스트형식으로 띄워짐 -->
				
				
			</tbody>
			</table>
	</main>

	<footer class="sellManagementFooter">
		<div class="footerPagingDiv">
		</div>
	</footer>
</div>
</div>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/sellerManagement.js"></script>	
<script type="text/javascript">
function sellerManagementPaging(pg){
	var keyword = document.getElementById("keyword").value;
	if(keyword == ""){
		location.href = 'sellerManagement?pg='+pg;
	}else{
		$('input[name=pg]').val(pg);

		//2페이지에서 다시 검색 버튼을 누르면 2페이지부터 찾으므로
		//다시 검색 버튼을 눌렀을 때는 1페이지부터 검색을 할 수 있도록 강제 이벤트를 발생시킴
		$('#inputFormBtn').trigger('click', 'research');
	}
}
</script>