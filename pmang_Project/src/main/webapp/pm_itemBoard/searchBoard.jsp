<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>

<link rel="stylesheet" href="/pmang/css/searchBoard.css">
<body>
<input type="hidden" id="search" value="${param.search }">
<input type="hidden" id="hashtag" value="${param.hashtag }">
<input type="hidden" id="pg" value="${param.pg }">
<input type="hidden" id="order" value="${param.order }">
<input type="hidden" id="beforeCtg" value="">

<div class="searchBoardWrap">
		<div class="selection1">

			<div class="search_catagoryDiv">
				<div class="bestCatagoryDiv">
					<div id="ca">카테고리</div>
					<div id="bestCategory">
						
					</div>
				</div>
				
				<div class="categoryList">
					<div class="searchCtgListDiv">
						
					</div>
				</div>
			</div>
	
		</div><!-- selection1 -->
	
		<div class="selection2">
			<div id="searchResult">
				<div id="searchResultDiv">
					<div class="searchResultText">
					<c:if test="${param.search != null}">
						<span id="searchKeyword">${param.search }</span>의 검색결과
					</c:if>
					<c:if test="${param.hashtag != null}">
						<span id="searchKeyword">#${param.hashtag }</span>의 검색결과
					</c:if>
						<span id="searchKeywordCount"></span>
					</div>
					<div class="searchResultOrder">
						<a>최신순</a>
						<a>인기순</a>
						<a>저가순</a>
						<a>고가순</a>
					</div>
				</div>
			</div>
			
			<div class="searchItemList1">
               <div class="searchItemList2">
                  <div class="searchItemList3">
					<div class="zeroSearch"></div>
                     
                  </div><!-- searchItemList3 -->
               </div><!-- searchItemList2 -->
            </div><!-- searchItemList1 -->
	
			<!-- pagingDiv 구역 -->
			<div id="itemBoardPagingDiv">
                 <div id="itemBoardPagingDiv2">
                  		
                 </div>
            </div>
            
		</div><!-- selection2 -->
	
</div><!-- searchBoardWrap -->
	
	
	
	
	
		
</body>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/searchBoard.js"></script>
