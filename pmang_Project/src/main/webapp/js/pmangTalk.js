$(document).ready(function() {
	// 더보기버튼 모달
	$('.addBtn').on('click', function() {
		$('.all_modal').addClass('on');
		$('.modal_div').css('position', 'fixed');
		$('.modal_div').css('right', '50%');
		$('.modal_div').css('bottom', '50%');
		
		//모달바탕 클릭했을때(꺼짐)
		$('.on').click(function() {
			$('.all_modal').removeClass('on');
			$('.modal_div').css('position', 'static');
		});
		//알림끄기

		//차단
		
		//신고
		
		//나가기
	});
	//list append
	$.ajax({
		type: 'post',
		url: '/pmang/talk/roomList',
		data: {
			'memId': $('세션에서 들고옴')
		},
		dataType: 'json',
		success: function(data) {
			//data함 찍어보기용, 찍고 지우기
			alert(JSON.stringify(data));
			
			$.each(data.list, function(index, items) {
				$('#talkList').append($('<li/>', {
					class: 'talkRoom'
					}).append($('<div/>',{
						class: 'talkRoom_div'
						}).append($('<div/>', {
							class: 'profile_img_div'
							}).append($('<a/>',{
								class: 'profile_img_a',
								href: '#'
								}).append($('<img/>', {
									class: 'profile_img',
									alt: '프로필이미지',
									src: '../image/profileimg.png',//items에서 들고와야하는데 주소값을 뭐라고 써야할지 모르겠음...
									height: '50', 
									width: '50'
									})//profile_img
								)//profile_img_a
							)//profile_img_div
						).append($('<a/>',{
							class: 'talkRoom_a',//클래스 아이디에 아이디를 구분 할 수 있게 추가해야할듯
							href: '#'
							}).append($('<div/>', {
								class: 'userName',
								text: '유저닉네임'//items에서 유저마켓이름 넣어야함
								})//userName
							).append($('<div/>', {
								class: 'talkView',
								text: '대화내용이 들어갑니다'//items에서 message_content 넣어야함
								})//talkView
							)//talkRoom_a
						).append($('<div/>',{
							class: 'talkLogTime',
							text: '23:23'//items에서 마지막 send_time넣어야함
							})//talkLogTime
						).append($('<div/>').append($('<button/>', {
							class: 'addBtn'//클래스 아이디에 아이디를 구분 할 수 있게 추가해야할듯
							}).append($('<img/>', {
								src: '../image/addBtn.png',
								alr: '더보기',
								height: '15',
								width: '15'
								})
							)//addBtn
						))//talkRoom_div
					)//talkRoom
				)//talkList
			})
		},
		error: function(err) {
			console.log(err);
		}
		
	});
	
	
	//확인용
/*	$('#talkList').append($('<li/>', {
		class: 'talkRoom'
		}).append($('<div/>',{
			class: 'talkRoom_div'
			}).append($('<div/>', {
				class: 'profile_img_div'
				}).append($('<a/>',{
					class: 'profile_img_a',
					href: '#'
					}).append($('<img/>', {
						class: 'profile_img',
						alt: '프로필이미지',
						src: '../image/profileimg.png',//items에서 들고와야하는데 주소값을 뭐라고 써야할지 모르겠음...
						height: '50', 
						width: '50'
						})//profile_img
					)//profile_img_a
				)//profile_img_div
			).append($('<a/>',{
				class: 'talkRoom_a',//클래스 아이디에 아이디를 구분 할 수 있게 추가해야할듯
				href: '#'
				}).append($('<div/>', {
					class: 'userName',
					text: '유저닉네임'//items에서 유저마켓이름 넣어야함
					})//userName
				).append($('<div/>', {
					class: 'talkView',
					text: '대화내용이 들어갑니다'//items에서 message_content 넣어야함
					})//talkView
				)//talkRoom_a
			).append($('<div/>',{
				class: 'talkLogTime',
				text: '23:23'//items에서 마지막 send_time넣어야함
				})//talkLogTime
			).append($('<div/>').append($('<button/>', {
				class: 'addBtn'//클래스 아이디에 아이디를 구분 할 수 있게 추가해야할듯
				}).append($('<img/>', {
					src: '../image/addBtn.png',
					alr: '더보기',
					height: '15',
					width: '15'
					})
				)//addBtn
			))//talkRoom_div
		)//talkRoom
	)//talkList
	*/
	
});