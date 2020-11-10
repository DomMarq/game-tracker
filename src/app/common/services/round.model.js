class RoundModel {
    constructor(Parse, RoomModel, TeamModel) {
        this.Parse = Parse;
        this.name = 'Round';
        this.RoomModel = RoomModel;
        this.TeamModel = TeamModel;
        this.fields = [
            'winner',
            'teams',
            'winnerScore',
            'loserScore',
            'loser',
            'room',
            'customData'
        ];
        this.data = {}; // hold singular result of queries
        this.collection = []; // hold array results of queries
    }

    New(obj) {
        // create a new Round Parse Object
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            this.Parse.defineAttributes(parseObject, this.fields);
            parseObject.room = new this.Parse.Object(this.RoomModel.name);
            this.Parse.defineAttributes(parseObject.room, this.RoomModel
                .fields);
            parseObject.winner = new this.Parse.Object(this.TeamModel.name);
            this.Parse.defineAttributes(parseObject.winner, this.TeamModel
                .fields);
            parseObject.loser = new this.Parse.Object(this.TeamModel.name);
            this.Parse.defineAttributes(parseObject.loser, this.TeamModel
                .fields);
            parseObject.customData = {};
            return parseObject;
        } else { // Exposing Round Parse Object Attributes (getters and setters)
            this.Parse.defineAttributes(obj, this.fields);
            this.Parse.defineAttributes(obj.loser, this.TeamModel
                .fields);
            this.Parse.defineAttributes(obj.winner, this.TeamModel
                .fields);
            this.Parse.defineAttributes(obj.room, this.RoomModel
                .fields);
            obj.teams.forEach(team => {
                this.Parse.defineAttributes(team, this.TeamModel
                    .fields);
            });
            return obj;
        }
    }

    getById(id) {
        return new this.Parse.Query(this.New())
            .get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this
                    .fields);
                this.Parse.defineAttributes(result.room,
                    this.RoomModel.fields);
                this.Parse.defineAttributes(result.loser, this
                    .TeamModel
                    .fields);
                this.Parse.defineAttributes(result.winner, this
                    .TeamModel
                    .fields);
                this.data = result;
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
                    this.Parse.defineAttributes(result, this
                        .fields);
                    this.Parse.defineAttributes(result.room,
                        this.RoomModel.fields);
                    this.Parse.defineAttributes(result.loser,
                        this
                        .TeamModel
                        .fields);
                    this.Parse.defineAttributes(result.winner,
                        this
                        .TeamModel
                        .fields);
                });
                this.collection = results;
                return Promise.resolve(results);
            })
            .catch(error => Promise.reject(error));
    }
    // TODO: check that this.collection / this.data is updated

}

angular
    .module('common')
    .service('RoundModel', RoundModel);