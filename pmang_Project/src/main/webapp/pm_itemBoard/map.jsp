<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
html, body { 
	height: 100%; 
	margin: 0; 
	padding: 0; 
}

#mapWrap {
    width: 1024px;
    height: 100%;
    position: relative;
   /*  margin: 0 auto; */
    overflow: hidden;
}

#map {
	width: 1024px;
	height: 100%;
	/* margin: 0 auto; */
}

#mapHeaderForm {
	position: fixed;
	top: 0;
    right: 0;
    left: 0;
    /* border-bottom: 1px solid #e6e6e6; */
    z-index : 20;
}

#mapHeader {
	align-items: center;
    /* position: absolute; */
    right: 0;
    left: 0;
    background: #fff;
    /* width: 100%; */
    max-width: 1024px;
    height: 50px;
    /* height: 4.4rem; */
    margin: 0 auto;
    border-bottom: none;
}

#x {
	margin: 0 11%;
}

#x button {
	height: 3.4rem;
    font-size: xx-large;
}

#mapHeader h3 {
	margin: 0;
    padding: 13px 225px 0px 450px;
}

#btn {
	right: 10%;
    /* top: 10px; */
    bottom: 15px;
    position: absolute;
}

#btn button{
	position: relative;
	top: 10px;
}

button {
	border: none;
	outline: none;
	cursor: pointer;
	text-transform: none;
	background: none;
}

.bAddr {
	text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 11pt;
    /* color: green; */
    font-weight: 600;
}

#detailAddrDiv:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 1.5rem;
    height: 1.5rem;
    background: url(//yaimg.yanolja.com/joy/sunny/static/images/ico-position-pink.svg) no-repeat;
}

.wrap {
    display: block;
    background: #50627F;
    font-size : 10pt;
    color: #fff;
    text-align: center;
    width : 250px;
    height: 50px;
    line-height:22px;
    border-radius:4px;
    padding:0px 10px;
    position: relative;
}

.info_title {
	border-radius: 4px;  
	font-weight : bold;
	position: relative;
    margin: 0 auto;
    border-bottom: 1px solid lightgrey;
}

#mapFooter {
	position: absolute;
    /* margin: 0px; */
    bottom: 50px;
    z-index: 3;
    width: 100%;

}

#mapFooter button {
	z-index: 1;
    margin: 0 10rem;
    height: 3.5rem;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    width: calc(100% - 20rem);
    background: #276141;
    border-radius: 4px;
}

.hAddr {
	position:absolute;
	left:10px;
	top:10px;
	border-radius: 2px;
	background:#fff;
	background:rgba(255,255,255,0.8);
	z-index:1;
	padding:5px;
}

#centerAddr {	
	display:block;
	margin-top:2px;
	font-weight: normal;
}

#addressDetail{
	display: block;
    background: rgb(255 255 255 / 60%);
    /* border: 1px solid black; */
    text-align: left;
    height: 20px;
    padding: 10px;
}

#autoAddrDiv{
	width: 200px;
    height: 50px;
    background: white;
    margin: 10px;
    border: 0px;
    padding: 5px;
    font-size: 11pt;
    border-radius: 2px;
    background: #fff;
    background: rgba(255,255,255,0.8);
    z-index: 1;
}

#title {
	padding: 3px;
    margin: 0;
    font-weight: 600
}

/* #addressSpan{
	color : green;
} */


</style>
</head>


<body>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=26152d095dcbd98e75d86172615ba45b&libraries=services,clusterer,drawing"></script>
<script type="text/javascript">
window.onload = function() {
	var position = new kakao.maps.LatLng(${param.lat}, ${param.lon});  
	//위도, 경도
	var container = document.getElementById("map"); //지도를 표시할 div영역
	var options = {
			center : position, //지도의 위치
			level : 2 //지도를 얼마나 확대해서 보여줄 건지 레벨
			
	};
	var map = new kakao.maps.Map(container, options)//지도 생성
	$('#map').append('<div id="mapFooter"><button><span>위치지정 완료</span></button></div>');

	var imageSrc = '/pmang/image/map-marker12.png'; // 마커이미지의 주소입니다    
    var imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
    var imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
	// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    //markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
    
	//마커 생성
	var marker = new kakao.maps.Marker({
		position: position, //지도 중심 좌표에 마커 생성.
		image: markerImage
	});
	marker.setMap(map);//마커 표시
	
	//marker.setDraggable(true); //마커를 드래그 할 수 있게끔 하기
	

	// 아래 코드는 최초 한번만 타일로드 이벤트가 발생했을 때 어떤 처리를 하고 
    // 지도에 등록된 타일로드 이벤트를 제거하는 코드입니다 
	 /* kakao.maps.event.addListener(map, 'tilesloaded', displayMarker);

	 function displayMarker() {
	    
	    // 마커의 위치를 지도중심으로 설정합니다 
	    marker.setPosition(map.getCenter()); 
	    marker.setMap(map); 

	}   */
	
	// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
	searchAddrFromCoords(map.getCenter(), displayCenterInfo);
	
	//var content = positionCheck(${param.lat}, ${param.lon});
	
	
	/* var infowindow = new kakao.maps.InfoWindow({zindex:1});// 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
 	var content = '<div class="wrap">' + 
     '    <div class="info">' + 
    '        <div class="info_title">' + 
    '            현재위치' + 
    '        </div>' + 
    '        <div class="body">' + 
    '            <div class="desc">' + 
    '                <div class="addr">' +   positionCheck(${param.lat}, ${param.lon})       + '</div>' + 
    '            </div>' + 
    '        </div>' + 
    '    </div>' +    
    '</div>'; 
    
    infowindow.setContent(content);
   	infowindow.open(map, marker); */

	
	//클릭했을 때 주소 내보내기
	kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
	    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
	        if (status === kakao.maps.services.Status.OK) {
	            var detailAddr = !!result[0].road_address ? '' : '';
	            detailAddr += '<div id="detailAddrDiv">지정 위치 : <span id="addressSpan" style="color : green;">' + result[0].address.address_name + '</span></div>';
	            
	            var content = '<div class="bAddr">' + 
	                            detailAddr + 
	                        '</div>';
	
	            // 마커를 클릭한 위치에 표시합니다 
	            marker.setPosition(mouseEvent.latLng);
	            marker.setMap(map);
	            
	            
	            $('#addressDetail').html(content);
	
	        /*     // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
	            infowindow.setContent(content);
	            infowindow.open(map, marker); */
	        }   
	    });
	});
	
	
   	
   	//위치 지정 완료!
	$('#map').on('click','#mapFooter',function(){
		 var address = $("#addressSpan").text();
		 if($(opener.document).find(".top2").text().trim() == "" && $(opener.document).find(".top3").text().trim() == ""){
				opener.location.href = encodeURI('/pmang/board/itemBoard?category1='+$(opener.document).find(".top1").text().trim()+'&pg='+$(opener.document).find("#pg").val()+'&order='+$(opener.document).find("#order").val()+'&location='+address);
		}else if($(opener.document).find(".top2").text().trim() != "" && $(opener.document).find(".top3").text().trim() == ""){
				opener.location.href = encodeURI('/pmang/board/itemBoard?category1='+$(opener.document).find(".top1").text().trim()+'&category2='+$(opener.document).find(".top2").text().trim()+'&pg='+$(opener.document).find("#pg").val()+'&order='+$(opener.document).find("#order").val()+'&location='+address);
		}else if($(opener.document).find(".top2").text().trim() != "" && $(opener.document).find(".top3").text().trim() != ""){
				opener.location.href = encodeURI('/pmang/board/itemBoard?category1='+$(opener.document).find(".top1").text().trim()+'&category2='+$(opener.document).find(".top2").text().trim()+'&category3='+$(opener.document).find(".top3").text().trim()+'&pg='+$(opener.document).find("#pg").val()+'&order='+$(opener.document).find("#order").val()+'&location='+address);
		}
		 window.close();

	});


	// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
	kakao.maps.event.addListener(map, 'idle', function() {
	    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
	});
	
	
	
	
	
	
function searchDetailAddrFromCoords(coords, callback) {
	//주소 - 좌표 변환 객체
	var geocoder = new kakao.maps.services.Geocoder();
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

function positionCheck(lat, lon){
	var position = new daum.maps.LatLng(lat, lon); 
	

	searchDetailAddrFromCoords(position, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          
           var detailAddr = '<div id="detailAddrDiv"> 현재 위치 : <span id="addressSpan">' + result[0].address.address_name + '</span></div>';
           var content = '<div class="bAddr">' +
                           detailAddr + 
                       	'</div>';
           
           $('#addressDetail').html(content);
          
        }   
    });
	
}



function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
}


// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        //var infoDiv = document.getElementById('centerAddr');

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                $('#dutoAddr').html(result[i].address_name);
                break;
            }
        }
    }    
}

positionCheck(${param.lat}, ${param.lon});






}





</script>

	<div id="mapWrap">
	  <div id="mapHeaderForm">
		<div id="mapHeader">
			<h3>지도로 위치 지정</h3>
		</div>
	  <div id="addressDetail">
	  </div>
	  <div id="autoAddrDiv">
	  <p id="title">중심위치 정보</p>
	  <div id="dutoAddr"></div>
	  </div>
	  </div>
	
		<div id="map">
		
		</div>
		
		
	</div>
</body>
</html>