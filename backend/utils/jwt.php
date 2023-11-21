<?php
// Enter your code here, enjoy!
function gen_jwt($user_name,$user_id,$role):String{
	$issuedAt = time();
    $signing_key = "changeme";
    $header = [ 
        "alg" => "HS512", 
        "typ" => "JWT" 
    ];
    $header = base64_url_encode(json_encode($header));
    $payload =  [
        "exp" => $issuedAt+30,
        "user_name" => $user_name,
        "user_id" => $user_id,
        "role" => $role
    ];
    $payload = base64_url_encode(json_encode($payload));
    $signature = base64_url_encode(hash_hmac('sha512', "$header.$payload", $signing_key, true));
    $jwt = "$header.$payload.$signature";
    return $jwt;
}

/**
 * per https://stackoverflow.com/questions/2040240/php-function-to-generate-v4-uuid/15875555#15875555
 */
function base64_url_encode($text):String{
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
}


function decode_jwt($jwt): array {
    list($header, $payload, $signature) = explode('.', $jwt);

    $decodedHeader = json_decode(base64_url_decode($header), true);
    $decodedPayload = json_decode(base64_url_decode($payload), true);

    return [
        'header' => $decodedHeader,
        'payload' => $decodedPayload,
        'signature' => base64_url_decode($signature),
    ];
}

function base64_url_decode($text): string {
    $padding = strlen($text) % 4;
    if ($padding > 0) {
        $text .= str_repeat('=', 4 - $padding);
    }
    return base64_decode(str_replace(['-', '_'], ['+', '/'], $text));
}

// $jwt = gen_jwt();
// echo $jwt;
// decode_jwt($jwt);
?>
