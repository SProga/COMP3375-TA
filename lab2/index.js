let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let input = document.querySelector("input");
const results = document.querySelector("#results");
const func = document.querySelector("#thefunc"); //the select value attribute will be taken from this element
table.appendChild(thead);
table.appendChild(tbody);

//input event Handler
input.addEventListener("change", () => {
	removeAllChildNodes(thead);
	removeAllChildNodes(tbody);
	let files = input.files; //property of the <input type="file" /> element that returns an array of file(s) uploaded
	if (files.length == 0) return; //if the length of the array is zero return.
	const file = files[0]; //get the file at index 0 which will be the file which was uploaded
	makeTableHeader(["Input", "Expected", "RUN"]); //create the table header
	let reader = new FileReader(); //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
	//create a new instance of FileReader

	reader.readAsText(file); // this function calls reader.onload and passes the event file as the parameter (e)
	reader.onload = (e) => {
		// e will hold the file that was passed in
		console.dir(e.target); //target refers to the file, check console in browser
		const file = e.target.result; //the file will always be stored in this property on the e.target (object)

		const lines = file.split(/\r\n|\n/); //split the file by return carriage or by newline which will return an array of split values
		console.log("the array containing each line of the text file below");
		console.dir(lines); //check console in browser

		let IN1 = ""; //for the first input
		let IN2 = ""; //for the second input
		let OUT = ""; //for the output
		let count = 0;

		//run the loop for the number of lines in the file check console.dir(lines) you will see the length property
		console.log("The Window Object is below");
		console.dir(window);
		for (let x = 0; x < lines.length; x++) {
			count++; //increment the counter on each iteration until the count is 3
			//the counter ensures that the correct line in placed in IN1, IN2 and OUT variable
			if (count == 1) {
				IN1 = lines[x].trim(); // get line[0], get line[3]
			}
			if (count == 2) {
				IN2 = lines[x].trim(); // get line[1],get line[4]
			}
			if (count == 3) {
				OUT = lines[x].trim(); // get line[2], get line[5]  and so on.....
				count = 0;
				let my_out = window[func.value](IN1, IN2).toString().trim(); //text files are stored  as a string or result must be the same type
				//check console in browser for Window
				//the window object stores any function declared in javaScript as a property
				//example
				// window = {
				//	....other properties,
				// 	myFunctionOne: your defined function is stored here
				// 	myFunctionTwo: your defined function is stored here
				// }
				// we can access and call the function like so:-  window.myFunctionOne(2,1) or window["myFunctionOne"](3,1)
				//func.value stores the result of the select element in HTML
				// 	<select id="thefunc">
				// 	<option value="myFunctionOne">Function One</option>  <--- either myFunctionOne
				// 	<option value="myFunctionTwo">Function Two</option>  <---- or myFunctionTwo
				// </select>
				//soo in the end window[func.value](IN1,IN2) will be translated to window["myFunctionOne"](3,5) => myFunctionOne(3,5)
				//Remember myFunctionOne and myFunctionTwo expects two arguments to be passed in hence the (3,5).

				makeTableDataRow([
					IN1 + " , " + IN2,
					OUT,
					my_out === OUT ? "pass" : "fail", //if the output returned matched the OUT variable from the file then my_out stores pass else it stores fail
				]);
			}
		}
		results.appendChild(table);
	};
	reader.onerror = (e) => alert(e.target.error.name); // if an error occured
});

/*
           This function accepts an array of the column headings
           and create a row to be added to the table in with the
           column heading
           */
function makeTableHeader(coloumns) {
	let header_row = document.createElement("tr");
	coloumns.forEach((item) => {
		let heading = document.createElement("th");
		heading.innerHTML = item;
		header_row.appendChild(heading);
	});
	thead.appendChild(header_row);
}
/*
            This function accepts an array of the row data
            and create a row to be added to the table in with the
            record data
            */
function makeTableDataRow(row_data) {
	let data_row = document.createElement("tr");
	row_data.forEach((item) => {
		let row = document.createElement("td");
		if (item == "pass") {
			row.className = "green";
		}
		if (item == "fail") {
			row.className = "red";
		}
		row.innerHTML = item;
		data_row.appendChild(row);
	});
	tbody.appendChild(data_row);
}

function removeAllChildNodes(parent) {
	while (parent.firstChild) parent.removeChild(parent.firstChild);
}
