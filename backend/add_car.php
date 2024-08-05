<?php
session_start();
require_once './db.php';

if ($_SESSION['user_type'] != 'agency') {
    header('Location: ../pages/login.html');
    exit();
}

$model = $_POST['model'];
$number = $_POST['number'];
$capacity = $_POST['capacity'];
$rent = $_POST['rent'];
$agency_id = $_SESSION['user_id'];

$sql = "INSERT INTO cars (model, number, capacity, rent, agency_id) VALUES ('$model', '$number', $capacity, $rent, $agency_id)";
if (mysqli_query($conn, $sql)) {
    echo "Car added successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
