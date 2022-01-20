const initialState = {
  tournaments: [
    {
      id: 1,
      name: "Premier Poker de 2022",
      date: "22/01/2022",
      location: "Chez Juan",
      nbPlayer: 5,
      speed: 20,
      startingStack: 10000,
      buyIn: 10,
      status: "prévu",
      small_blind: 100,
      chips_user: true,
      comment: "Ca va être fun !"
    },
    {
      id: 2,
      name: "Deuxième Poker de 2022",
      date: "22/02/2022",
      location: "Chez Wills",
      nbPlayer: 5,
      speed: 20,
      startingStack: 10000,
      buyIn: 10,
      status: "prévu",
      small_blind: 100,
      chips_user: true,
      comment: "Ca va être super fun !"
    },
    {
      id: 3,
      name: "Tournoi d'anniversaire",
      date: "07/03/2022",
      location: "Chez Vince",
      nbPlayer: 5,
      speed: 20,
      startingStack: 10000,
      buyIn: 10,
      status: "prévu",
      small_blind: 100,
      chips_user: true,
      comment: "Ca va être méga fun !"
    },
    {
      id: 1,
      name: "Tournoi d'Haloween",
      date: "30/10/2022",
      location: "Chez Juan",
      nbPlayer: 5,
      speed: 20,
      startingStack: 10000,
      buyIn: 10,
      status: "prévu",
      small_blind: 100,
      chips_user: true,
      comment: "Ca va être fun !"
    },
  ],
  structure: {

  },
}


const reducer = (state = initialState, action = {}) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default reducer;
