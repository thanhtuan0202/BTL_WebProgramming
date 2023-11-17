<?php 
function isValidPhoneNumber($phoneNumber) {
    return preg_match('/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/', $phoneNumber);
}

function isValidDate($date) {
    return preg_match("/^((?:19|20)\\d\\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/",$date);
}
function isNumberID($value) {
    if (is_numeric($value) && $value > 0) {
        if (is_int($value) || ctype_digit($value)) {
            return true;
        }
    }
    return false;
}
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
?>