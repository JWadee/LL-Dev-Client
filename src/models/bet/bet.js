let model = {
    type: String, // Straight-Parlay-Teaser-RoundRobin
    wager: Number, // Wager amount
    odds: Number, // Total odds for bet
    result: String //W-L
}

let Leg = {
    fixture: {
        fixtureID: Number, // id of fixture, 
        fixture: String, //Fixture
        time: Number // Time in epoch
    },
    line: Object, // ML-Spread-Total-Prop 
    odds: Number, //Odds for leg
    result: String
}

let ML = {
    type: "Moneyline",
    team: {
        type: String, // Home-Away-Draw
        name: String, // team name
    }
}

let Spread = {
    type: "Spread",
    team: {
        type: String, // Home-Away
        name: String // team name
    },
    line: Number // Point spread,
}

let Total = {
    type: "Total",
    bet: String, // Over-Under
    line: Number // Score Line
}

export{
    model, ML, Spread, Total, Leg
}
