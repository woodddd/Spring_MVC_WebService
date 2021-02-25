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
      btn111.onclick = function () {
        modal111.style.display = 'block';
      };

      // When the user clicks on <span> (x), close the modal
      span111.onclick = function () {
        modal111.style.display = 'none';
      };
      
