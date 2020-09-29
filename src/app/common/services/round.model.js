class RoundModel {
    constructor(Parse) {
        this.Parse = Parse;
        this.name = "Round";
        this.fields = [
            'winner',
            'teams',
            'winnerScore',
            'loserScore',
            'loser',
            'room',
        ];
        this.data = {};  // hold singular result of queries
        this.collection = [];  // hold array results of queries
    }

    New(obj) {
        // create a new Round Parse Object
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {  // Exposing Round Parse Object Attributes (getters and setters)
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }

    getById(id) {
        return new this.Parse.Query(this.New())
            .include('teams')
            .get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                // get the pointer
                this.Parse.defineAttributes(result.teams, this.TeamModel.fields);
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    }

    getByRoom(room) {
        // get rounds by room
        return new this.Parse.Query(this.New())
            .include('room')
            .equalTo('room', room)
            .descending('createdAt')
            .find()
            .then(results => {
                results.forEach(result => {
                    this.Parse.defineAttributes(result, this.fields);
                    this.Parse.defineAttributes(result.room, this.RoomModel.fields);
                })
                return Promise.resolve(results);
            })
            .catch(error => Promise.reject(error))
    }
    // TODO: check that this.collection / this.data is updated

    getByUser(user) {
        return user;
    }
}
