<?php

define("WEBMASTER_EMAIL", $_POST['sendto']);
if (WEBMASTER_EMAIL == '' || WEBMASTER_EMAIL == 'Testemail') {
	die('<div class="alert alert-confirm"> <h6><strong>Votre email semble ne pas être valide...</strong></h6></div>');	
} 

define("EMAIL_SUBJECT", $_POST['subject']);
if (EMAIL_SUBJECT == '' || EMAIL_SUBJECT == 'Subject') {
	define("EMAIL_SUBJECT",'Contact');	
}

$name = stripslashes($_POST['name']);
$email = trim($_POST['email']);
$message = stripslashes('Budjet : ' . $_POST['budjet'] . '<br>' . 'Message : ' . $_POST['message']);

$custom = $_POST['fields'];
$custom = substr($custom, 0, -1);
$custom = explode(',', $custom);

$message_addition = '';
foreach ($custom as $c) {
	if ($c !== 'name' && $c !== 'email' && $c !== 'message' && $c !== 'subject') {
		$message_addition .= '<b>'.$c.'</b>: '.$_POST[$c].'<br />';
	}
}

if ($message_addition !== '') {
	$message = $message.'<br /><br />'.$message_addition;
}


$message = '<html><body>'.nl2br($message)."</body></html>";




$captcha;
if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }


 if(!$captcha){
          echo '<div class="alert alert-error">
						<h6><strong>Erreur</strong>: Merci de cocher la case "Je ne suis pas un robot" !</h6>
				</div>';
          exit;
        }
        $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LfoxA0TAAAAAEMAqvckm1GxeOqJU7uoM67OvWU9&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
        if($response.success==false)
        {
          echo '<div class="alert alert-error">
					<h6><strong>Erreur</strong>: Message pas envoyé !</h6>
				</div>';
        }else
        {
	     $mail = mail(WEBMASTER_EMAIL, EMAIL_SUBJECT, $message,
		     "From: ".$name." <".$email.">\r\n"
		    ."Reply-To: ".$email."\r\n"
		    ."X-Mailer: PHP/" . phpversion()
			."MIME-Version: 1.0\r\n"
			."Content-Type: text/html; charset=utf-8");  
	        
	        
          if($mail)
			{
			echo '<div class="alert alert-confirm">
					<h6><strong>Succès</strong>: Message bien envoyé, merci !</h6>
				</div>';
			}
			else
			{
			echo '<div class="alert alert-error">
					<h6><strong>Erreur</strong>: Message pas envoyé !</h6>
				</div>';
		}

        }





?>