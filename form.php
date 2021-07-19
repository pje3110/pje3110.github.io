<?php
$name = $_POST['name'];
$mail = $_POST['email'];
$mail_subject = "Satan Kontakt";
$mail_body = "Kontaktanfrage von $name.\n";
$mail_receiver = "Satanistentreff@gmail.com";
$headers = "Von: $mail \r\n";
mail($mail_receiver,$mail_subject,$mail_body,$headers);
?>