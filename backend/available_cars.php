<?php
require_once './db.php';

$sql = "SELECT * FROM cars";
$result = mysqli_query($conn, $sql);
$cars = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($cars);

mysqli_close($conn);
?>
