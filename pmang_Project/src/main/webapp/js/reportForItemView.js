	//상품 신고용

	$(document).ready(function () {
       $('.report-common').click(function (event) {
         var items = $('.report-hide-common');
         for (var item of items) {
           if (item != $(event.target).next()[0]) {
             $(item).hide();
           }
         }
         $(event.target).next().slideToggle();
       });
	});
   
   // Get the modal
   var modal = document.getElementById('myModal');

   // Get the button that opens the modal
   var btn = document.getElementById('myBtn');

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName('close')[0];

   // When the user clicks on the button, open the modal
   btn.onclick = function () {
     modal.style.display = 'block';
   };

   // When the user clicks on <span> (x), close the modal
   span.onclick = function () {
     modal.style.display = 'none';
   };

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function (event) {
     if (event.target == modal) {
       modal.style.display = 'none';
     }else if (event.target == modal111) {
         modal111.style.display = 'none';
     }
     
   };
   
   
   
   
   
   //댓글신고용

   $(document).ready(function () {
          $('.report-common111').click(function (event) {
            var items = $('.report-hide-common111');
            for (var item of items) {
              if (item != $(event.target).next()[0]) {
                $(item).hide();
              }
            }
            $(event.target).next().slideToggle();
          });
   	});
      
      // Get the modal
      var modal111 = document.getElementById('myModal111');

      // Get the button that opens the modal
      var btn111 = document.getElementById('myBtn111');

      // Get the <span> element that closes the modal
      var span111 = document.getElementsByClassName('close111')[0];

      // When the user clicks on the button, open the modal
      function commentReport(that) {
        modal111.style.display = 'block';
        $('#comment_seq').val($(that).children('.comment_seq').val());
      };

      // When the user clicks on <span> (x), close the modal
      span111.onclick = function () {
        modal111.style.display = 'none';
      };
      
      
      
      //상품 신고 버튼 클릭
      
      $('.report-content>div>div>div>button').on('click',function(){

    	  $.ajax({
  			type: 'post',
  			url: '/pmang/board/reportUser',
  			data: {	'targetType' : 'item', 
  					'reportContent': $(this).text(),
  					'target_seq': $('#item_seq').val()},
  			dataType: 'json',
  			error: function(err){
  				console.log(err)
  			},
  			success: function(result){
  			}//success
  		});//ajax
    	modal.style.display = 'none';
    	alert("신고가 접수되었습니다.");
      });

      
      //댓글 신고 버튼 클릭
      $('.report-content111>div>div>div>button').on('click',function(){
    	  
    	  $.ajax({
  			type: 'post',
  			url: '/pmang/board/reportUser',
  			data: {	'targetType' : 'comment', 
  					'reportContent': $(this).text(),
  					'target_seq': $('#comment_seq').val()},
  			dataType: 'json',
  			error: function(err){
  				console.log(err)
  			},
  			success: function(result){
  				
  			}//success
  			
  		});//ajax
    	modal111.style.display = 'none';
    	alert("신고가 접수되었습니다.");
      }); 
      
      
     
      
