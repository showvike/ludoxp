const dice = {

    eligibleUnit: 0,
    rolledBy: null,
    sixCarrier: 0,
    score: {},
    round: 1,
    isRoundCompleted: false,

    roll() {
        let count = this.randomCount();

        if(this.isRoundCompleted) this.resetScore();
        if(this.score[this.eligibleUnit] === undefined) 
            this.score[this.eligibleUnit] = [];

        this.score[this.eligibleUnit].push(count)
        this.rolledBy = this.eligibleUnit;

        this.isRoundCompleted = false

        if(count == 6) {
            this.sixCarrier += 1
            
            if(this.sixCarrier == 3) {
                this.score[this.eligibleUnit] = [];
                this.turnNext()
            }
            return;
        }
        
        this.sixCarrier = 0;
        this.turnNext()
    },

    turnNext() {
        if(this.eligibleUnit == 3) {
            this.eligibleUnit = 0
            this.isRoundCompleted = true
            return
        }
    
        this.eligibleUnit++;
    },

    resetScore() {
        this.score = {}
        this.round++ 
    },

    randomCount() {
        return Math.ceil(Math.random() * 6)
    }
}


class Pawn {
    
    isActive = false;
    isInSafeZone = false;
    position = 0;

    constructor(roller, id) {
        this.color = ['red', 'green', 'blue', 'yellow'][roller - 1];
        this.id = id;
    }

    move(count) {
        if (!this.isActive) {
            this.position = count == 6 ? 1 : 0;
            this.isActive = !!(this.position && true);
            this.isInSafeZone = !!(this.position && true);
            return this.query();
        }

        this.position += count;
        this.isActive = true;
        this.isInSafeZone = [1, 8, 13, 21, 26, 34, 39, 48, 52].includes(this.position);
        return this.query();
    }
    
    query() {
        return {
            isActive: this.isActive,
            isSafe: this.isInSafeZone,
            position: this.position,
        }
    }
}

const board = {
    safe: [ 1, 8, 13, 21, 26, 34, 39, 48, 52 ],
    rollers: {
        ...[0,1,2,3].map(index => [0, 1, 2, 3].map(i => new Pawn(index, i)))
    }
}


// const player1 = board.rollers[0][0]

// player1.move(6)
// console.log(player1.move(5))
dice.roll()
dice.roll()
dice.roll()
console.log(dice.score);