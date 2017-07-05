function popup(){
 var win_width=780;
 var popupX = (window.screen.width / 2) - (win_width / 2);
 var height= window.screen.height;
 var realHeight = height -200;
 var popupY = 50;
 var OpenWindow=window.open('./inquiry.html','_blank', 'width='+win_width+', height='+realHeight+', left='+popupX+', top='+popupY+', bottom='+popupY+', menubars=no, scrollbars=yes, location=no, status=no, toolbar=no');
}

function en_popup(){
 var win_width=780;
 var popupX = (window.screen.width / 2) - (win_width / 2);
 var height= window.screen.height;
 var realHeight = height -200;
 var popupY = 50;
 var OpenWindow=window.open('./en_inquiry.html','_blank', 'width='+win_width+', height='+realHeight+', left='+popupX+', top='+popupY+', bottom='+popupY+', menubars=no, scrollbars=yes, location=no, status=no, toolbar=no');
}
