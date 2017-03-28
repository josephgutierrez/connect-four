const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

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

const store = Redux.createStore(reducer, initialState)
