<?php

require_once("./config.php");

if( !($_POST['name']) && !($_POST['phone_number']) && !($_POST['email']) && !($_POST['agree'])){
  $sorry = "Sorry. \\nYou have not entered any required content. \\nPlease try again.";

  echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
        <script charset=\"utf-8\">
        window.alert(\"$sorry\");
        window.location=\"../en_inquiry.html\";
        </script>";
}


$oCompany = $_POST['company'];
$oPhone = $_POST['phone_number'];
$oPlace = $_POST['place'];
$oName = $_POST['name'];
$oEmail = $_POST['email'];
// $oDate = $_POST['date'];
$oContent = $_POST['project_content'];
// $oRecieve = date("Y-m-d H:i:s");
$oAgree = $_POST['agree'];







$smtp_mail_id = $user_id;
$smtp_mail_pw = $user_pw;
$to_email = $user_id;
$to_name = "KCMC";
$title = $oName . "님이 문의를 하셨습니다.";
$from_name = $oName;
$from_email = $user_id;
$content = "회사명 : " . $oCompany . "<br>" .
           "이름 : " . $oName . "<br>" .
           "연락처 : " . $oPhone . "<br>" .
           "이메일 : " . $oEmail . "<br>" .
           "도착지역 : " . $oPlace . "<br>" .
           "문의내용 : " . $oContent. "<br>" .
           "개인정보 수집동의 : " . $oAgree;

$smtp_use = 'smtp.worksmobile.com';

require_once("class.phpmailer.php");

$mail = new PHPMailer(true);
$mail->IsSMTP();
try{
  $mail->CharSet = "utf-8";
  $mail->Encoding = "base64";
  $mail->Host = $smtp_use;
  $mail->SMTPAuth = true;
  $mail->Port = 465;
  $mail->SMTPSecure = "ssl";
  $mail->Username = $smtp_mail_id;
  $mail->Password = $smtp_mail_pw;
  $mail->SetFrom($from_email, $from_name);
  $mail->AddAddress($to_email, $to_name);
  $mail->Subject = $title;
  $mail->MsgHTML($content);
  $mail->Send();

  $thanks = "Thank you. \\nYour inquiry has been successfully received. \\nWe will contact you as soon as possible.";

  echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
        <script charset=\"utf-8\">
        window.alert(\"$thanks\");
        window.open(\"about:blank\", \"_self\").close();
        </script>";

}catch(phpmailerException $e){
  $sorry = "Sorry. \\nWe could not receive your inquiry due to a problem. \\nPlease try again.";

  echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
        <script charset=\"utf-8\">
        window.alert(\"$sorry\");
        window.location=\"../en_inquiry.html\";
        </script>";
}catch(Exception $e){
  $sorry = "Sorry. \\nWe could not receive your inquiry due to a problem. \\nPlease try again.";

  echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
        <script charset=\"utf-8\">
        window.alert(\"$sorry\");
        window.location=\"../en_inquiry.html\";
        </script>";
}


 ?>
