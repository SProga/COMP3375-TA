<?php
    $servername = "localhost";
    $database = "comp3375";
    $username = "root";
    $password = "";
    $conn = mysqli_connect($servername, $username, $password, $database);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $sql = "SELECT * FROM lab1;";
    if(! $stmt = mysqli_prepare($conn,$sql)){
        die("Statement failed:");
         exit();
    }
    mysqli_stmt_execute($stmt);
    $resultdata = mysqli_stmt_get_result($stmt);
    foreach ($resultdata as $entry) {
        $search_arr_out[] = $entry;
    }
    echo json_encode($search_arr_out);
    mysqli_stmt_close($stmt);
?>