const initialState = {
  player: 'yellow',
  winner: false,
  draw: false,
  board: [[0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0]]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHIP_DROPPED':
      return Object.assign({}, state, {
        board: action.updateBoard
      })
    case 'PLAYER_SWITCHED':
      return Object.assign({}, state, {
        player: action.player
      })
    case 'PLAYER_WON':
      return Object.assign({}, state, {
        winner: true
      })
    case 'DRAW':
      return Object.assign({}, state, {
        draw: true
      })
    default:
      return state
  }
}

let store = Redux.createStore(reducer, initialState)

const winner = (row, col, color) => {
  const {board} = store.getState()
  let count = 0
  let num = color == 'Yellow' ? 1 : -1
  for (let i = 0; i < board[row].length; i++) {
    board[row][i] == num ? count += 1 : count = 0
    if (count == 4) {
      console.log(`${color} got four in a row!`)
      break
    }
  }
  count = 0
  for (let i = 0; i < board.length; i++) {
    board[i][col] == num ? count += 1 : count = 0
    if (count == 4) {
      console.log(`${color} got four in a row!`)
      break
    }
  }
  count = 0
  for (let i = 3; i >= -3; i--) {
    if (row - i > 5 || row - i < 0 || col - i > 6 || col - i < 0) {
      continue
    }
    board[row - i][col - i] == num ? count +=1 : count = 0
    if (count == 4) {
      console.log(`${color} got diag four in a row!`)
      break
    }
  }
  count = 0
  for (let i = 3; i >= -3; i--) {
    if (row + i > 5 || row + i < 0 || col - i > 6 || col - i < 0) {
      continue
    }
    board[row + i][col - i] == num ? count +=1 : count = 0
    if (count == 4) {
      console.log(`${color} got diag four in a row!`)
      break
    }
  }
  count = 0
  for (let i = 0; i < board.length; i++) {
    if (board[i].includes(0)) {
      count += 1
    }
    if (count == 0) {
      console.log('The game is a draw!')
    }
  }
}

const dropChip = (col) => {
  const {board, player} = store.getState()
  const updateBoard = [...board]

  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][col] == 0) {
      if (player == 'yellow') {
        updateBoard[i][col] = 1
        winner(i, col, 'Yellow')
        store.dispatch({type: 'PLAYER_SWITCHED', player: 'red'})
        break
      } else if (player == 'red') {
        updateBoard[i][col] = -1
        winner(i, col, 'Red')
        store.dispatch({type: 'PLAYER_SWITCHED', player: 'yellow'})
        break
      }
      store.dispatch({type: 'CHIP_DROPPED', updateBoard})
    }
  }
}

const renderGame = () => {
  const $board = document.querySelector('#board')
  $board.innerHTML = ''
  const {board} = store.getState()

  for (let i = 0; i < board.length; i++) {
    const $row = document.createElement('div')
    $row.classList.add('row')
    $board.appendChild($row)

    for (let j = 0; j < board[i].length; j++) {
      const $cell = document.createElement('div')
      $cell.classList.add('cell')
      $cell.dataset.row = i
      $cell.dataset.column = j

      if (board[i][j] == 1) {
        $cell.classList.add('yellow')
      } else if (board[i][j] == -1) {
        $cell.classList.add('red')
      }
      $row.appendChild($cell)
    }
  }
}

store.subscribe(renderGame)

renderGame()

document.addEventListener('click', (event) => {
  if(event.target.className.includes('cell')) {
    const $row = event.target.dataset.row
    const $column = event.target.dataset.column
    dropChip($column)
  }
})
