<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
		<link rel="stylesheet" href="/pmang/css/mystore.css">
	<link rel="stylesheet" href="/pmang/css/index.css">
<div class="mystoreWrap">
<input type="hidden" id="pg" value="1">
	<div class="tab1bar">
		<div class="tab2Name">
			찜<span>0</span>
		</div><!-- tabName -->
		
	</div><!-- tab1bar -->
	<div class="mystoreBar">
		<div id="selectDelete">
			<div class="choice">
				<input type="checkbox" id="choice_chk"/>
				<label for="chk"><span></span></label>
			</div><!--choice -->
				<button class="choiceDeleteBtn">선택삭제</button>
		</div><!-- selectDelete -->
		<div id="sortItem">
			<div class="sortGroup">
				<a href="#" id="latest" class="defaultSort" style="color:green;">최신순 &emsp;|&emsp;</a>
				<a href="#" id="popularity" class="sort">인기순 &emsp;|&emsp;</a>
				<a href="#" id="lowerPrice" class="sort">저가순 &emsp;|&emsp;</a>
				<a href="#" id="highestPrice" class="sort">고가순</a>
			</div><!-- sortGroup -->
		</div><!-- sortItem -->
	</div><!-- mystoreBar -->
	
	<div class="mystoreFav">
		
	</div><!-- mystoreFav -->
	 
</div><!-- mystoreWrap -->

<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/mystoreTab2.js"></script>
<script>

</script>