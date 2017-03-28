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
    default:
      return state
  }
}

let store = Redux.createStore(reducer, initialState)

const dropChip = (row, col) => {
  const {board, player} = store.getState()
  const updateBoard = [...board]
  
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][col] == 0) {
      if (player == 'yellow') {
        updateBoard[i][col] = 1
        store.dispatch({type: 'PLAYER_SWITCHED', player: 'red'})
        break
      } else if (player == 'red') {
        updateBoard[i][col] = 2
        updatePlayer = 'yellow'
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
      } else if (board[i][j] == 2) {
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
    dropChip($row, $column)
  }
})

console.log(store.getState())
