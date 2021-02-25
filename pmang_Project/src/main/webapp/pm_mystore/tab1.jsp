<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<link rel="stylesheet" href="/pmang/css/mystore.css">
	<link rel="stylesheet" href="/pmang/css/index.css">
	
<div class="mystoreWrap">
<input type="hidden" name="pg" value="1">
	<div class="tab1bar">
		<div class="tabName">
			상품<span>0</span>
		</div><!-- tabName -->
		<!-- <div class="selectWrap">
			<div class="select_box">
				<div class="box">
					<div class="select">전체</div>
					<ul class="selectList">
						<li class="selected">전체</li>
						<li>여기에 내가 올린 상품들의</li>
						<li>카테고리가 올라가야함</li>
						<li>중복되지않게</li>
					</ul>
				</div>
			</div>
		</div>selectWrap -->
	</div><!-- tab1bar -->
		<div class="mystoreBar">
			<div id="selectCategory">
			전체 <span>0</span>
			</div><!-- selectCategory -->
			<div id="sortItem">
				<div class="sortGroup">
					<a id="latest" class="defaultSort" style="color:green;">최신순 &emsp;|&emsp;</a>
					<a id="popularity" class="sort">인기순 &emsp;|&emsp;</a>
					<a id="lowerPrice" class="sort">저가순 &emsp;|&emsp;</a>
					<a id="highestPrice" class="sort">고가순</a>
				</div><!-- sortGroup -->
			</div><!-- sortItem -->
		
		</div><!-- "mystoreBar" -->
		<div id="storeSelection">
            <div class="storeSelection1">
               <div class="storeSelection2">
                  <div class="storeSelection3">
                    
                     
                  </div><!-- selection3 -->
               </div><!-- selection2 -->
            </div><!-- selection1 -->
         </div><!-- selection -->
         
         <div id="mystoreTab1PagingDiv" class="paging" align="center"></div>
</div><!-- mystoreWrap -->

<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/mystoreTab1.js"></script>
<script>

</script>