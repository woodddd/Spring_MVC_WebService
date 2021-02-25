<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="/pmang/css/memLogin.css">

<!-- 모달 사용할수있도록 끌고오기 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

</head>

<body>

	<!-- modal 구동 버튼 (trigger) --> <!-- 모달 적용 시 data-toggle과 data-target을 적용하려는 링크/혹은 버튼에 넣어주시면 됩니다 -->
	<button type="button" class="btn btn-primary" data-toggle="modal"
		data-target="#my80sizeCenterModal">모달로그인</button>

	<!-- Modal at Center -->
	<div class="modal modal-center fade" id="my80sizeCenterModal"
		tabindex="-1" role="dialog" aria-labelledby="my80sizeCenterModalLabel">
		<div class="modal-dialog modal-80size modal-center" role="document">
			<div class="modal-content modal-80size">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">피망 로그인</h4>
				</div>
				<div class="modal-body">
					<!-- 로그인폼 -->
					<div class="container-fluid">
						<br>
						<div class="row">
							<div class="col-sm-1"></div>
							<div class="col-sm-10" style="text-align: center">
								<form action="#" method="post">
									<table class="table table-hover">
										<thead>	
											<tr>
												<th style="border-bottom: rgb(0,0,0);">아이디</th>
											</tr>
										</thead>
										<thead>
											<tr>
												<td style="border-top: rgb(0,0,0); border-bottom: rgb(0,0,0);">
													<div class="form-group">
														<input type="text" class="form-control" placeholder="ID"
															width="1" name="userId" id="userId">
													</div>
												</td>
											</tr>
										</thead>
										<thead>
											<tr>
												<th style="border-top: rgb(0,0,0); border-bottom: rgb(0,0,0);">비밀번호</th>
											</tr>
											<tr>
												<td style="border-top: rgb(0,0,0); border-bottom: rgb(0,0,0);">
													<div class="form-group">
														<input type="password" class="form-control" maxlength="10"
															placeholder="Password" name="pwd" id="pwd">
													</div>
												</td>
											</tr>
										</thead>
										<thead>
											<tr>
												<td style="border-top: rgb(0,0,0);">
													<div id="saveId">
														<input type="checkbox" name="saveId" value="saveId">아이디
														저장
													</div>
													<div>
														<input type="button" id="loginBtn" value="Login">
													</div>					
													<div>
														<a id="search" href="#">아이디 찾기</a> / <a id="search" href="#">비밀번호 찾기</a>
													</div> <br>

													<button id="kakaoBtn">
														<div>
															<img src="/pmang/image/kakao_icon.png" alt="kakao_icon" />
															<p id="kakaoP">카카오 1초 로그인/회원가입</p>
														</div>
													</button>
													<button id="writeBtn">
														<div>
															<p id="writeP">일반 회원가입</p>
														</div>
													</button>
												</td>
											</thead>
									</table>
								</form>
							</div>
						</div>
					</div>
					<!-- 로그인폼 end -->
				</div>
			</div>
		</div>
	</div>
</body>

</html>
