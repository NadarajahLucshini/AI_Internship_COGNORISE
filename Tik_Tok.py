# Define the Tic Tac Toe board
board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
]

# Print the board
def print_board(board):
    for row in board:
        print("|".join(row))
        print("-" * 5)

print_board(board)

# Check if a move is valid
def is_valid_move(board, row, col):
    return board[row][col] == ' '

# Make a move on the board
def make_move(board, row, col, player):
    if is_valid_move(board, row, col):
        board[row][col] = player
        return True
    return False

# Check for a win
def check_win(board, player):
    # Check rows
    for row in board:
        if all([cell == player for cell in row]):
            return True
    # Check columns
    for col in range(3):
        if all([board[row][col] == player for row in range(3)]):
            return True
    # Check diagonals
    if all([board[i][i] == player for i in range(3)]):
        return True
    if all([board[i][2-i] == player for i in range(3)]):
        return True
    return False

# Check for a draw
def check_draw(board):
    for row in board:
        if ' ' in row:
            return False
    return True

# Minimax algorithm
def minimax(board, depth, is_maximizing):
    if check_win(board, 'O'):
        return 1
    if check_win(board, 'X'):
        return -1
    if check_draw(board):
        return 0

    if is_maximizing:
        best_score = -float('inf')
        for row in range(3):
            for col in range(3):
                if is_valid_move(board, row, col):
                    board[row][col] = 'O'
                    score = minimax(board, depth + 1, False)
                    board[row][col] = ' '
                    best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for row in range(3):
            for col in range(3):
                if is_valid_move(board, row, col):
                    board[row][col] = 'X'
                    score = minimax(board, depth + 1, True)
                    board[row][col] = ' '
                    best_score = min(score, best_score)
        return best_score

# Find the best move for the AI
def best_move(board):
    best_score = -float('inf')
    move = (0, 0)
    for row in range(3):
        for col in range(3):
            if is_valid_move(board, row, col):
                board[row][col] = 'O'
                score = minimax(board, 0, False)
                board[row][col] = ' '
                if score > best_score:
                    best_score = score
                    move = (row, col)
    return move

def play_game():
    current_player = 'X'
    while True:
        print_board(board)
        if check_win(board, 'X'):
            print("X wins!")
            break
        if check_win(board, 'O'):
            print("O wins!")
            break
        if check_draw(board):
            print("It's a draw!")
            break

        if current_player == 'X':
            row = int(input("Enter the row (0, 1, 2): "))
            col = int(input("Enter the col (0, 1, 2): "))
            if make_move(board, row, col, current_player):
                current_player = 'O'
        else:
            row, col = best_move(board)
            make_move(board, row, col, current_player)
            current_player = 'X'

play_game()
