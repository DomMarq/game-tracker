class MemberModel {
    constructor(Parse, RoomModel, TeamModel) {
        this.Parse = Parse;
        this.RoomModel = RoomModel;
        this.TeamModel = TeamModel;
        this.name = 'Member';
        this.fields = [
            'name',
            'room',
            'team',
            'isManager'
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
            parseObject.team = new this.Parse.Object(this.TeamModel.name);
            this.Parse.defineAttributes(parseObject.team, this.TeamModel.fields);
            return parseObject;
        } else { // Exposing Team Parse Object Attributes (getters and setters)
            this.Parse.defineAttributes(obj, this.fields);
            this.Parse.defineAttributes(obj.room, this.RoomModel.fields);
            this.Parse.defineAttributes(obj.team, this.TeamModel.fields);
            return obj;
        }
    }

    getById(id) {
        return new this.Parse.Query(this.New())
            .get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.Parse.defineAttributes(result.room,
                    this.RoomModel.fields);
                this.Parse.defineAttributes(result.team,
                    this.TeamModel.fields);
                this.data = result;
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    }

    // get team members by team
    getByTeam(team) {
        return new this.Parse.Query(this.New())
            .include('team')
            .equalTo('team', team)
            .descending('createdAt')
            .find()
            .then(results => {
                results.forEach(result => {
                    this.Parse.defineAttributes(result, this
                        .fields);
                    this.Parse.defineAttributes(result.room,
                        this.RoomModel.fields);
                    this.Parse.defineAttributes(result.team,
                        this.TeamModel.fields);
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
    .service('MemberModel', MemberModel);
