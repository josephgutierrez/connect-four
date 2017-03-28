const initialState = {
  player: 'yellow',
  winner: false,
  board: [[0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0]]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

let store = Redux.createStore(reducer, initialState)

const $board = document.querySelector('#board')

const renderGame = () => {

  const {board} = store.getState()

  for (let i = 0; i < board.length; i++) {
    const $row = document.createElement('div')
    $row.classList.add('row')
    $board.appendChild($row)
    for (let j = 0; j < board[i].length; j++) {
      const $cell = document.createElement('div')
      $cell.classList.add('cell')
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

console.log(store.getState())
