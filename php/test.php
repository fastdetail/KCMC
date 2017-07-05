<?php

$smtp_mail_id = "fastdetail@fastdetail.co.kr";
$smtp_mail_pw = "q1w2e3r4";
$to_email = "fastdetail@fastdetail.co.kr";
$to_name = "박상준";
$title = "TEST";
$from_name = "exex";
$from_email = "fastdetail@fastdetail.co.kr";
$content = "제발 됐으면";

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
  echo "메일을 전송하였습니다.";
}catch(phpmailerException $e){
  echo $e->errorMessage();
}catch(Exception $e){
  echo $e->getMessage();
}


 ?>
