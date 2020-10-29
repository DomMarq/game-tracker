class TeamModel {
    constructor(Parse, RoomModel) {
        this.Parse = Parse;
        this.RoomModel = RoomModel;
        this.name = 'Team';
        this.fields = [
            'name',
            'users',
            'wins',
            'losses',
            'room'
        ];
        this.data = {}; // hold singular result of queries
        this.collection = []; // hold array results of queries
    }

    New(obj) {
        // create a new Team Parse Object
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            this.Parse.defineAttributes(parseObject, this.fields);
            parseObject.room = new this.Parse.Object(this.RoomModel.name);
            this.Parse.defineAttributes(parseObject.room, this.RoomModel
                .fields);
            return parseObject;
        } else { // Exposing Team Parse Object Attributes (getters and setters)
            this.Parse.defineAttributes(obj, this.fields);
            this.Parse.defineAttributes(obj.room, this.RoomModel.fields);
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
                this.data = result;
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    }

    getByNameAndRoom(name, room) {
        return new this.Parse.Query(this.New())
            .include('name')
            .include('room')
            .equalTo('room', room)
            .equalTo('name', name)
            .then(result => {
                if (result.length > 1) result = result[0];
                this.Parse.defineAttributes(result, this
                    .fields);
                this.Parse.defineAttributes(result.room,
                    this.RoomModel.fields);
                this.data = result;
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    }
    // get team by room
    getByRoom(room) {
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
                });
                this.collection = results;
                return Promise.resolve(results);
            })
            .catch(error => Promise.reject(error));
    }
    // TODO: Add an ability to get teams given users
}

angular
    .module('common')
    .service('TeamModel', TeamModel);