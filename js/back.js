function homepageBack(){
  if ( document.referrer && document.referrer.indexOf("kcmonomer.com") != -1 ) {
  	history.back();
  } else {
  	// 메인 페이지로
  	location.href = "http://www.kcmonomer.com";
  }
}

function enHomepageBack(){
  if ( document.referrer && document.referrer.indexOf("kcmonomer.com") != -1 ) {
  	history.back();
  } else {
  	// 메인 페이지로
  	location.href = "http://www.kcmonomer.com/en_index.html";
  }
}
