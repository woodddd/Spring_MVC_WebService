<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <link rel="stylesheet" href="/pmang/css/todayItem.css">   
    <input type="hidden" id="total" value="">
  <!-- 인기카테고리 슬라이드영역 -->
<div class="slide">
  <ul class="panel">
    <li>                       
	    <a href="/pmang/board/itemBoard?category1=디지털/가전">
			<img src="/pmang/image/digitalimg.PNG" alt="배경1" />
		</a>
	</li>
    <li>
    	<a href="/pmang/board/itemBoard?category1=패션">
			<img src="/pmang/image/fashionImg2.PNG" alt="배경2" />
		</a>
    </li>
    <li>
        <a href="/pmang/board/itemBoard?category1=스포츠/레저">
           <img src="/pmang/image/sportsImg.PNG" alt="배경3" />
        </a>
    </li>
    <li>
         <a href="/pmang/board/itemBoard?category1=뷰티/미용">
            <img src="/pmang/image/beautyImage2.jpg" alt="배경4" />
         </a>
    </li>
  </ul>
<!--슬라이드 버튼 히든 상태 -->
  <ul class="dot">
    <li class="on">슬라이드 버튼1번</li>
    <li>슬라이드 버튼2번</li>
    <li>슬라이드 버튼3번</li>
    <li>슬라이드 버튼4번</li>
    
  </ul>
  <div class="prev"><img width="30px" src="/pmang/image/imgLeft.png" alt="" /></div>
  <div class="next"><img width="30px" src="/pmang/image/imgRight.png" alt="" /></div>
</div>
         
         
         <!-- 최근게시글 -->
         <div id="selection">
            <h2>♥ 피망 유저분들의 상품들 ♥</h2>
            
            
            <div class="selection1">
               <div class="selection2">
                  <div class="selection3">
                     <!-- 1개상품 -->                  
<!--                      <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame
                     
                     1개상품                  
                     <div class="itemFrame">
                        <a class="itemLink" href="#">
                           <div class="itemImageArea">
                              <img src="/pmang/image/bench.jpg" width="194" height="194" alt="상품 이미지">
                              <div class="imageAreaDiv"></div>
                           </div>
                           <div class="itemContent">
                              <div class="itemName">상품명</div>
                              <div class="itemPriceAndTime">
                                 <div class="itemPrice">5000</div>
                                 <div class="itemTime">
                                    <span>7시간 전</span>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>itemFrame -->
                     
                     
                  </div><!-- selection3 -->
               </div><!-- selection2 -->
            </div><!-- selection1 -->
         </div><!-- selection -->



<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/pmang/js/todayItem.js"></script>