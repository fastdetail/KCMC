function popup2() {
  var windowWidth =$( window ).width();

  if(windowWidth < 480) {
  //창 가로 크기가 500 미만일 경우
    var mobileArr = new Array("iPhone", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson");
    for(var txt in mobileArr){
      if(navigator.userAgent.match(mobileArr[txt]) != null){
         document.getElementById('inquiry_body').style.width = "100%";
         break;
       }else{
         document.getElementById('inquiry_body').style.width = "760px";
       }

    }

  } else {
  //창 가로 크기가 500보다 클 경우
    document.getElementById('inquiry_body').style.width = "760px";
  }
  // $(window).on('resize',function(){
  //   var win = $(this);
  //   if(window.innerWidth <480){
  //     document.getElementById('popupImg').style.width = "460px";
  //   }else{
  //     document.getElementById('popupImg').style.width = "960px";
  //   }
  // })
}
