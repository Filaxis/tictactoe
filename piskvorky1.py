import fileinput
import sys

player_input = [0, 0]
player = 1
turn_counter = 0
input_validation = False
win = False

# Defining the playground

field = [["_", 0, 0, False], ["_", 0, 1, False], ["_", 0, 2, False],
         ["_", 1, 0, False], ["_", 1, 1, False], ["_", 1, 2, False],
         ["_", 2, 0, False], ["_", 2, 1, False], ["_", 2, 2, False]]

def refresh_playground():
    print("  0 1 2\n")
    print("0 " + field[0][0] + " " + field[1][0] + " " + field[2][0] + "\n")
    print("1 " + field[3][0] + " " + field[4][0] + " " + field[5][0] + "\n")
    print("2 " + field[6][0] + " " + field[7][0] + " " + field[8][0] + "\n")
   
refresh_playground()

def check_input(input):
    global input_validation
    if input == 0:
        input_validation = True
        print(input_validation)
    elif input == 1:
        input_validation = True
        print(input_validation)
    elif input == 2:
        input_validation = True
        print(input_validation)
    else:
        # print("Wrong input!")
        input_validation = False

def check_for_win():
    global win
    # checking all rows
    for i in range(3):
        if field[i*3][0] == "X" and field[(i*3)+1][0] == "X" and field[(i*3)+2][0] == "X":
            win = True
        elif field[i*3][0] == "O" and field[(i*3)+1][0] == "O" and field[(i*3)+2][0] == "O":
            win = True
    # checking all columns
    for j in range(3):
        if field[j][0] == "X" and field[j+3][0] == "X" and field[j+6][0] == "X":
            win = True
        elif field[j][0] == "O" and field[j+3][0] == "O" and field[j+6][0] == "O":
            win = True
    # checking for diagonals
    if field[0][0] == "X" and field[4][0] == "X" and field[8][0] == "X":
        win = True
    elif field[0][0] == "O" and field[4][0] == "O" and field[8][0] == "O":
        win = True
    elif field[2][0] == "X" and field[4][0] == "X" and field[6][0] == "X":
        win = True
    elif field[2][0] == "O" and field[4][0] == "O" and field[6][0] == "O":
        win = True
    if win == True:
        if (turn_counter % 2) == 0:
            print("Player 1 has won. The game is over.")
            sys.exit()
        else:
            print("Player 2 has won. The game is over.")
            sys.exit()
    else:
        print("The game continues.")

def check_for_draw():
    if turn_counter == 10:
        print("It's a draw. This game is over.")
        sys.exit()

def get_player_input_1():
    global player
    global player_input
    global turn_counter
    global input_validation
    input_validation = False
    turn_counter += 1
    print("This is turn number " + str(turn_counter) + ".")
    check_for_win()
    check_for_draw()
    print("Player 1, type in 0, 1 or 2 to determine the row coordinate.")
    input_string = sys.stdin.readline()
    row_input = int(input_string)
    print("Player 1, type in 0, 1 or 2 to determine the column coordinate.")
    input_string = sys.stdin.readline()
    column_input = int(input_string)
    player_input = [row_input, column_input]
    player = 1
    execute_turn()
    return player_input

def get_player_input_2():
    global player
    global player_input
    global turn_counter
    global input_validation
    input_validation = False
    turn_counter += 1
    print("This is turn number " + str(turn_counter) + ".")
    check_for_win()
    check_for_draw()
    print("Player 2, type in 0, 1 or 2 to determine the row coordinate.")
    input_string = sys.stdin.readline()
    row_input = int(input_string)
    print("Player 2, type in 0, 1 or 2 to determine the column coordinate.")
    input_string = sys.stdin.readline()
    column_input = int(input_string)
    player_input = [row_input, column_input]
    player = 2
    execute_turn()
    return player_input

def execute_turn():
    global player
    global player_input
    global turn_counter
    global input_validation
    row_number = player_input[0]
    column_number = player_input[1]
    check_input(row_number)
    row_verifier = input_validation
    check_input(column_number)
    column_verifier = input_validation
    for i in range(9):
        if field[i][1] == row_number and field[i][2] == column_number:
            field_coordinate = i
            print(field_coordinate)
            break
    if row_verifier == False or column_verifier == False:
        print("You have provided an invalid input. Please type in 0, 1 or 2!")
        turn_counter -= 1
        if player == 1:
            get_player_input_1()
        elif player == 2:
            get_player_input_2()
    elif field[field_coordinate][3] == True:
        print("This field was already taken. Choose another field!")
        turn_counter -= 1
        if player == 1:
            get_player_input_1()
        elif player == 2:
            get_player_input_2()
    elif field[field_coordinate][3] == False:
        if player == 1:
            field[field_coordinate][0] = "X"
            field[field_coordinate][3] = True
            player = 2
            refresh_playground()
            get_player_input_2()
        elif player == 2:
            field[field_coordinate][0] = "O"
            field[field_coordinate][3] = True
            player = 1
            refresh_playground()
            get_player_input_1()

get_player_input_1()