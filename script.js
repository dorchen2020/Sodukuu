// Login Page

var userName = document.getElementById('userNameID');
var pass = document.getElementById('passID');

function isValidDetails() {
    if (userName.value == 'abcd' && pass.value == '1234')
        window.location.href = 'index.html';
    else document.getElementById('statusText').innerHTML = '<h3>invalid user name or password</h3>';
}

// Sudoku Page
// startttttttt to fixxxxxx the mobileeeee visualizationnnnnnnnnnn#&^&$^*%*&**$^*%$^&^%&*^*&

//================ create empty table 9*9 ================//

// var table = document.createElement("table");
// var id = 1;


// // cells creation
// for (var j = 1; j <= 9; j++) {
//     // table row creation
//     var row = document.createElement("tr");

//     for (var i = 1; i <= 9; i++) { 
//         //Make text node the contents of <td> element
        
//         var cell = document.createElement('td'); // create <td> in each row
//         var input = document.createElement('input'); // create input in each cell

//         cell.appendChild(input);
//         row.appendChild(cell);
//         // attributes for each cell:
//         input.attributes.disabled;
//         input.setAttribute('type', 'text');
//         input.maxLength = '1';
//         input.setAttribute('id', id);
//         id++; // create id between 1 to 81 (9*9)
//         input.oninput = function() { this.value = this.value.replace(/[^0-9]/g, '') }; // each cell can get just one digit (no other characters)
//     }
//     // add row
//     table.appendChild(row);
// }

// // put <table> in tableDiv
// document.getElementById('tableDiv').appendChild(table);
//===============================================================

var tableString = '<table>';
var id = 1;

for (row = 1; row <= 9; row++) {
    tableString += '<tr>';
    // create 9 <td> inside <tr> 
    for (col = 1; col <= 9; col++) {
        tableString += '<td>'
            + '<input disabled type="text" maxlength="1" id=' + id + ' oninput="justDigit(id,value)">'
            + '</td>';
        id++; // create id between 1 to 81 (9*9)
        document.getElementById('tableDiv').innerHTML = tableString;
        // td created to tableString:
        // <td><input disabled type="text" maxlength="1" id="1" oninput="justDigit(id,value)"></td>
    }
    tableString += '<tr>';
}

function justDigit(id, value) {
    if (!(value >= '1' && value <= '9'))
        document.getElementById(id).value = '';
}
document.getElementById('tableDiv').style.backgroundColor = 'blue'; // defult table backgroundcolor


//====== sudoku database - contains 4 sudoku matrix ======//
const sudokuDB = [
    [[9, 3, 4, 5, 6, 8, 1, 2, 7],
    [8, 2, 6, 7, 1, 4, 5, 9, 3],
    [1, 5, 7, 9, 2, 3, 4, 6, 8],
    [2, 7, 8, 1, 5, 9, 3, 4, 6],
    [6, 4, 1, 3, 8, 7, 2, 5, 9],
    [3, 9, 5, 6, 4, 2, 7, 8, 1],
    [5, 6, 3, 4, 9, 1, 8, 7, 2],
    [7, 8, 9, 2, 3, 5, 6, 1, 4],
    [4, 1, 2, 8, 7, 6, 9, 3, 5]
    ],
    [[5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ],
    [[7, 3, 4, 1, 5, 9, 8, 2, 6],
    [8, 2, 9, 3, 7, 6, 4, 5, 1],
    [1, 6, 5, 8, 2, 4, 9, 7, 3],
    [5, 7, 6, 9, 8, 3, 2, 1, 4],
    [3, 9, 1, 7, 4, 2, 5, 6, 8],
    [2, 4, 8, 5, 6, 1, 7, 3, 9],
    [4, 1, 2, 6, 9, 5, 3, 8, 7],
    [6, 5, 7, 4, 3, 8, 1, 9, 2],
    [9, 8, 3, 2, 1, 7, 6, 4, 5]
    ],
    [[3, 2, 5, 9, 8, 1, 4, 6, 7],
    [6, 8, 4, 7, 3, 2, 9, 5, 1],
    [7, 1, 9, 6, 4, 5, 3, 8, 2],
    [9, 7, 2, 5, 6, 4, 8, 1, 3],
    [4, 5, 8, 3, 1, 7, 6, 2, 9],
    [1, 6, 3, 8, 2, 9, 7, 4, 5],
    [2, 3, 1, 4, 7, 8, 5, 9, 6],
    [8, 9, 6, 1, 5, 3, 2, 7, 4],
    [5, 4, 7, 2, 9, 6, 1, 3, 8]
    ]]

var isReadyToCheck = false;
var hidesListBool = [81];


//====== define event listener mouseover & mouseout (hover) for each cell ======//
for (let i = 1; i < 81; i++) {
    // define hover
    document.getElementById(i).addEventListener('mouseover', () => {
        if (hidesListBool[i] == true) {
            document.getElementById(i).style.backgroundColor = 'rgb(82, 51, 221)';
            document.getElementById(i).style.borderColor = 'rgb(2, 100, 2)';
        }
        else
            document.getElementById(i).style.backgroundColor = 'rgb(102, 76, 221)';
    })
    // define out
    document.getElementById(i).addEventListener('mouseout', () => {
        document.getElementById(i).style.backgroundColor = 'rgb(102, 76, 221)';
        document.getElementById(i).style.borderColor = 'green';
    })
}

//==================== start the game ====================//

// press on Start button (board and level are required field)
function changeBoard() {
    var board = document.getElementById("board").value;
    // let MediaQueryMobile = window.matchMedia('(max-width: 768px)');
    let boardImage = document.getElementById('tableDiv');
    
    // boards for mobile
    // if (MediaQueryMobile.matches) { // If media query (MediaQueryMob) matches
    //     if (board == 'board 1')
    //         boardImage.style.backgroundImage = "url('boards/‏lines1Mob.png')";
    //     else if (board == 'board 2')
    //         boardImage.style.backgroundImage = "url('boards/lines2Mob.png')";
    //     else if (board == 'board 3')
    //         boardImage.style.backgroundImage = "url('boards/lines3Mob.png')";
    //     else if(board == 'board 4')
    //         boardImage.style.backgroundImage = "url('boards/‏lines4Mob.png')";
    // }
    // else {
        // boards for web
        if (board == 'board 1')
            boardImage.style.backgroundImage = "url('boards/lines1.png')";
        else if (board == 'board 2')
            boardImage.style.backgroundImage = "url('boards/lines2.png')";
        else if (board == 'board 3')
            boardImage.style.backgroundImage = "url('boards/lines3.png')";
        else if(board == 'board 4')
            boardImage.style.backgroundImage = "url('boards/lines4.png')";
    }


function start() {

    changeBoard(); // press on start refresh board (when go from web to mobile and opposite)

    // var board = document.getElementById("board").value;
    var level = document.getElementById("level").value;

    if (level == 'Choose Level') // need select both
        alert('Choose Level Please');
    else {
        // the function argument is number of cells to hide
        if (level == 'Easy')
            createGame(25);
        else if (level == 'Medium')
            createGame(45);
        else if (level == 'Hard')
            createGame(60);
    }
}


// rand mat from db and hide cells by level
var mat;
function createGame(cellsToHide) {

    // get mat from db and show it on screen
    let rnd = Math.floor(Math.random() * 4); // get number 0-3
    mat = sudokuDB[rnd]; // get random mat from db

    let id = 1;
    for (let row = 0; row < 9; row++) { // save math values on userMat
        for (let col = 0; col < 9; col++) {
            document.getElementById(id).value = mat[row][col]; // show mat values on screen
            document.getElementById(id).disabled = true;
            document.getElementById(id).style.backgroundColor = 'rgb(90, 149, 151)';
            id++;
        }
    }

    // hide cells
    let i = 0;
    while (i < cellsToHide) {
        let rndNum = Math.floor((Math.random() * 81) + 1); // rand number 1-81 

        if (document.getElementById(rndNum).value != '') {
            document.getElementById(rndNum).value = '';
            document.getElementById(rndNum).disabled = false;
            document.getElementById(rndNum).style.backgroundColor = 'rgb(102, 76, 221)';
            hidesListBool[rndNum] = true;
            i++;
        }
    }
    isReadyToCheck = true;
}

//==================== is valid sudoku? ====================//

var flag;
function isValidMat() {

    // check if user create the game (press on start)
    if (isReadyToCheck == false)
        return alert('Press on start to create the game');

    // check if all board is fill
    for (let i = 1; i < 81; i++) {
        if (document.getElementById(i).value == '')
            return alert('Need to fill all cells on board');
    }

    // get all update values of matrix and save it in matrix
    id = 1
    flag = true;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            mat[row][col] = document.getElementById(id).value;
            id++;
        }
    }
    // check all lines
    let arr = []
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++)
            arr.push(mat[row][col]);
        checkArr(arr); // when has 9 values in arr call function to check it
        arr = [];
        if (!flag) {
            alert('somthing is wrong... try to fix it')
            alert('check line ' + (row + 1));
            return;
        }
    }
    // check all columns
    let col = 0
    for (let i = 0; i < 9; i++) {
        for (let row = 0; row < 9; row++) {
            arr.push(mat[row][col]); // arr get all values of column (col)
        }
        checkArr(arr); // when has 9 values in arr call function to check it
        arr = [];
        col++

        if (!flag) {
            alert('somthing is wrong... try to fix it')
            alert('check column ' + col);
            return;
        }
    }

    // check all squares    
    let fCol = 0;
    let fRow = 0;
    let eCol = 3;
    let eRow = 3;
    let squareClue = 0;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            // check square
            for (row = fRow; row < eRow; row++) {
                for (col = fCol; col < eCol; col++) {
                    arr.push(mat[row][col]);
                }
            }
            fCol += 3;
            eCol += 3;
            squareClue++;
            checkArr(arr); // when has 9 values in arr call function to check it
            arr = [];

            if (!flag) {
                alert('somthing is wrong... try to fix it')
                alert('check squere ' + squareClue);
                return;
            }
        }
        fRow += 3;
        eRow += 3;
        fCol = 0;
        eCol = 3;
    }
    alert('congratulations..!! finish Sudoku')
}

// get arr and check digits 1-9 
function checkArr(arr) {
    let multplyArr = 1; // 362880
    for (let i = 0; i < 9; i++) {
        multplyArr *= parseInt(arr[i]);
    }
    if (multplyArr != 362880) { // 362880 is multiply of digits 1-9
        flag = false;
    }
}




