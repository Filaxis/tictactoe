var player_input = [0, 0];
var player = 1;
var turn_counter = 0;
var input_validation = false;
var win = false;

var rowInput = document.querySelector('#row');
const columnInput = document.querySelector('#column');
const msg = document.querySelector('.msg');
const msg2 = document.querySelector('.msg2');
const msg3 = document.querySelector('.msg3');

// Defining the playground

field = [["firstField", 0, 0, false, "_"], ["secondField", 0, 1, false, "_"], ["thirdField", 0, 2, false, "_"],
         ["fourthField", 1, 0, false, "_"], ["fifthField", 1, 1, false, "_"], ["sixthField", 1, 2, false, "_"],
         ["seventhField", 2, 0, false, "_"], ["eigthField", 2, 1, false, "_"], ["ninthField", 2, 2, false, "_"]];

function refresh_playground() {
    console.log("  0 1 2")
    console.log("0 " + field[0][4] + " " + field[1][4] + " " + field[2][4] + " ");
    console.log("1 " + field[3][4] + " " + field[4][4] + " " + field[5][4] + " ");
    console.log("2 " + field[6][4] + " " + field[7][4] + " " + field[8][4] + " ");
}

function check_input(input) {
    input_validation = false;
    if(input == 0) {
        input_validation = true;
    } else if(input == 1) {
        input_validation = true;
    } else if(input == 2) {
        input_validation = true;
    } else {
        input_validation = false;
    }
}

function check_for_win() {
    // Checking all rows and columns
    refresh_playground();
    for (let i=0; i < 3; i++) {
        if(field[i*3][4] == "X" && field[(i*3)+1][4] == "X" && field[(i*3)+2][4] == "X") {
            win = true;
        } else if(field[i*3][4] == "O" && field[(i*3)+1][4] == "O" && field[(i*3)+2][4] == "O") {
            win = true;
        } else if(field[i][4] == "X" && field[i+3][4] == "X" && field[i+6][4] == "X") {
            win = true;
        } else if(field[i][4] == "O" && field[i+3][4] == "O" && field[i+6][4] == "O") {
            win = true;
        }        
    }
    if(field[0][4] == "X" && field[4][4] == "X" && field[8][4] == "X") {
    win = true;
    } else if(field[0][4] == "O" && field[4][4] == "O" && field[8][4] == "O") {
    win = true;
    } else if(field[2][4] == "X" && field[4][4] == "X" && field[6][4] == "X") {
    win = true;
    } else if(field[2][4] == "O" && field[4][4] == "O" && field[6][4] == "O") {
    win = true;
    }
    if(win == true) {
        if(turn_counter % 2 == 0) {
            msg3.innerHTML = 'Player 2 has won. The game is over.';
            // sys.exit()
        } else {
            msg3.innerHTML = 'Player 1 has won. The game is over.';
            // sys.exit()
        }
    } else {
        console.log('The game continues.');
    }
}

function check_for_draw() {
    if(turn_counter == 9) {
        msg3.innerHTML = 'It is a draw. This game is over.';
    }
}

function placeCross(fieldPosition) {
    var cross = document.getElementById(fieldPosition);
    cross.src = "img/cross.png"
}

function placeCircle(fieldPosition) {
    var circle = document.getElementById(fieldPosition);
    circle.src = "img/circle.png"
}

function get_player_input_1(row_input,column_input) {
    turn_counter += 1;
    msg2.innerHTML = "This is turn number " + turn_counter + ".";
    player_input = [row_input, column_input];
    console.log(player_input);
    player = 1;
    execute_turn();
    return player_input
}

function get_player_input_2(row_input,column_input) {
    turn_counter += 1;
    msg2.innerHTML = "This is turn number " + turn_counter + ".";
    player_input = [row_input, column_input];
    console.log(player_input);
    player = 2;
    execute_turn();
    return player_input
}

function execute_turn() {
    row_number = player_input[0];
    column_number = player_input[1];
    check_input(row_number);
    row_verifier = input_validation;
    check_input(column_number);
    column_verifier = input_validation;
    for (let i=0; i < 9; i++) {
        if (field[i][1] == row_number && field[i][2] == column_number) {
            field_coordinate = i;
            console.log(field_coordinate);
            break;
        }
    }
    if (row_verifier == false || column_verifier == false) {
        msg3.innerHTML = "You have provided an invalid input. Please type in 0, 1 or 2!";
        turn_counter -= 1;
        rowInput.value = '';
        columnInput.value = '';
    } else if (field[field_coordinate][3] == true) {
            msg3.innerHTML = "This field was already taken. Choose another field!";
            turn_counter -= 1;
            rowInput.value = '';
            columnInput.value = '';           
    } else if (field[field_coordinate][3] == false) {
            if (player == 1) {
                placeCross(field[field_coordinate][0]);
                field[field_coordinate][3] = true;
                field[field_coordinate][4] = "X";
                player = 2;
            } else if (player == 2) {
                placeCircle(field[field_coordinate][0]);
                field[field_coordinate][3] = true;
                field[field_coordinate][4] = "O";
                player = 1;
            }
       
    }
    check_for_win();
    check_for_draw();
}

const btn = document.querySelector('.btn');
btn.style.background = 'blue';
btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (rowInput.value === '' || columnInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        if (player == 1) {
            get_player_input_1(rowInput.value,columnInput.value);
        } else if (player == 2) {
            get_player_input_2(rowInput.value,columnInput.value);
        }
        // Clear the fields
        rowInput.value = '';
        columnInput.value = '';
        // console.log('success');
    }
});
