


//문의 사진등록
$('.qnaWritePhotoBtn').on('click',function(){
		$('.qnaWritePhoto').click();
	});
//문의 등록	
$('.qnaWritePhoto').change(function(e) {
		var files = e.target.files;
		var arr = Array.prototype.slice.call(files);

		// 업로드 가능 파일인지 체크
		for (var i = 0; i < files.length; i++) {
			if (!checkExtension(files[i].name, files[i].size)) {
				return false;
			}
		}

		if ($('#photoCountHidden').val() == 1) {
			if (files.length < 3) {
				checkNumber(files, arr);
			} else {
				alert('사진 첨부는 최대 3장까지 가능합니다.');
			}
		} else if ($('#photoCountHidden').val() == 2) {
			if (files.length < 2) {
				checkNumber(files, arr);
			} else {
				alert('사진 첨부는 최대 3장까지 가능합니다.');
			}
		} else if ($('#photoCountHidden').val() == 3) {
			alert('사진 첨부는 최대 3장까지 가능합니다.');

		} else {
			checkNumber(files, arr);
		}
	});

	function checkNumber(files, arr) {
		if (files.length > 3) {
			alert('사진 첨부는 최대 3장까지 가능합니다.');

		} else {
			$('#photoCountHidden').val(
					parseInt($('#photoCountHidden').val()) + files.length);
			preview(arr);
		}
	}

	function checkExtension(fileName, fileSize) {
		var ragex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
		var maxSize = 20971520; // 20MB

		if (fileSize >= maxSize) {
			alert('파일 사이즈 초과');
			$("input[type='file']").val(""); // 파일 초기화
			return false;
		}

		if (ragex.test(fileName)) {
			alert('업로드 불가능한 파일이 있습니다.');
			$("input[type='file']").val(""); // 파일 초기화
			return false;
		}
		return true;
	}

	function preview(arr) {
		if (parseInt($('#photoCountHidden').val()) <= 3) {
			arr.forEach(function(f) {

				// 파일명이 길면 파일명 ... 으로 처리
				var fileName = f.name;
				if (fileName.length > 10) {
					fileName = fileName.substring(0, 7) + "...";
				}

				// div에 이미지 추가
				var str = '<li class="photoli" onclick="removeimg(this)">';

				// 이미지 파일 미리보기
				if (f.type.match('image.*')) {
					var reader = new FileReader(); // 파일을 읽기 위한 FileReader객체생성
					reader.onload = function(e) { // 파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
						str += '<img src="' + e.target.result + '" title="'
								+ f.name + '" width=100 height=100 />';
						str += '</li></div>';
						$(str).appendTo('.qnaPhtotPreview');

					}
					reader.readAsDataURL(f);
				} else {
					str += '<img src="/pmang/image/bench.jpg" title="' + f.name
							+ '" width=100 height=100 />';
					$(str).appendTo('.qnaPhtotPreview');

				}
			});// arr.foreach

			// $('.reviewPhotoLi').css('border-color','rgb(195,194,204)');

		} else {
			alert('사진 첨부는 최대 3장까지 가능합니다.');
		}

	}

	// 올린 이미지 삭제
	function removeimg(value) {
		var result = confirm('선택한 이미지를 삭제하시겠습니까?');

		if (result) {
			$(value).remove();
		}
	}

	// 문의하기 작성
	$('.qnaWriteBtn').click(
			function() {
				//alert($('#hiddenUserId').val())
				
				if($('#hiddenUserId').val() == ''){
					nologin();
				}
				
				$('#qnaContentDiv').empty();
				if ($('#qnaContent').val() == '') {
					$('#qnaContentDiv').text('내용을 입력하세요')
					$('#qnaContentDiv').css('color', 'red')
					$('#qnaContentDiv').css('font-size', '8pt')
					$('#qnaContentDiv').css('font-weight', 'bold');
				} else {
					var formData = new FormData($('#qnaWriteForm')[0]);

					var img1url = $('.qnaPhtotPreview').children().eq(0).children(
							'img').attr("src");
					var img2url = $('.qnaPhtotPreview').children().eq(1).children(
							'img').attr("src");
					var img3url = $('.qnaPhtotPreview').children().eq(2).children(
							'img').attr("src");

					var img1 = $('.qnaPhtotPreview').children().eq(0).children(
							'img').attr("title");
					var img2 = $('.qnaPhtotPreview').children().eq(1).children(
							'img').attr("title");
					var img3 = $('.qnaPhtotPreview').children().eq(2).children(
							'img').attr("title");

					formData.append("img1", img1);
					formData.append("img2", img2);
					formData.append("img3", img3);
					formData.append("img1url", img1url);
					formData.append("img2url", img2url);
					formData.append("img3url", img3url);

					var userid = $('#userid').val();
					var select1 = $('#select1 option:selected').val();
					var select2 = $('#select2 option:selected').val();

					formData.append("userid",userid);
					formData.append("select1",select1);
					formData.append("select2",select2);
					
					for (var pair of formData.entries()) { console.log(pair[0]+ ', ' + pair[1]); } 
					
					$.ajax({
						type:'post',
						enctype:'form-data',
						processData:false,
						contentType:false,
						url:'/pmang/board/qnaWrite',
						data:formData,
						success:function(data){
							alert('문의 등록을 완료했습니다.');
							location.href="/pmang/index";
						},
						error:function(err){
							console.log(err);
						}
					});
				}

			});
	