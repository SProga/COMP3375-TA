<?php
    $servername = "localhost";
    $database = "comp3375";
    $username = "root";
    $password = "";
    $conn = mysqli_connect($servername, $username, $password, $database);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $sql = "INSERT INTO lab1 (name,address,dob) VALUES (?,?,?);";
    if(! $stmt = mysqli_prepare($conn,$sql)){
        die("Statement failed:");
         exit();
    }
    mysqli_stmt_bind_param($stmt,"sss",$_POST['name'],$_POST['address'],$_POST['dob']);
    $resultdata = mysqli_stmt_execute($stmt); 
    echo json_encode($resultdata);
    mysqli_stmt_close($stmt);
?>