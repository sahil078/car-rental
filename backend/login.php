<?php
session_start();
require_once './db.php';

$email = $_POST['email'];
$password = $_POST['password'];
$user_type = $_POST['user_type'];

$sql = "SELECT * FROM users WHERE email = '$email' AND user_type = '$user_type'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['user_type'] = $row['user_type'];
        if ($user_type == 'customer') {
            header('Location: ../pages/available_cars.html');
        } else {
            header('Location: ../pages/add_car.html');
        }
    } else {
        echo "Invalid password";
    }
} else {
    echo "No user found with this email and user type";
}

mysqli_close($conn);
?>
