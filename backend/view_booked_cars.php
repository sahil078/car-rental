<?php
session_start();
require_once './db.php';

if ($_SESSION['user_type'] != 'agency') {
    header('Location: ../pages/login.html');
    exit();
}

$agency_id = $_SESSION['user_id'];

$sql = "SELECT b.id, c.model, u.name, b.start_date, b.days
        FROM bookings b
        JOIN cars c ON b.car_id = c.id
        JOIN users u ON b.customer_id = u.id
        WHERE c.agency_id = $agency_id";
$result = mysqli_query($conn, $sql);
$booked_cars = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($booked_cars);

mysqli_close($conn);
?>
