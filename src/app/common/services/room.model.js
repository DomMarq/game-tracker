class RoomModel {
    constructor(Parse) {
        this.Parse = Parse;
        this.name = "Room";
        this.fields = [
            'name',
            'gameType',
            'teams',
            'users',
            'manager',
            'rounds'
        ];
        this.data = {};  // hold singular result of queries
        this.collection = [];  // hold array results of queries
    }

    New(obj) {
        // create a new Room Parse Object
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {  // Exposing Room Parse Object Attributes (getters and setters)
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

    getByManager(manager) {
        // get rooms by manager
        return new this.Parse.Query(this.New())
            .include('manager')
            .equalTo('manager', manager)
            .descending('createdAt')
            .find()
            .then(results => {
                results.forEach(result => {
                    this.Parse.defineAttributes(result, this.fields);
                    this.Parse.defineAttributes(result.manager, this.UserModel.fields);
                })
                return Promise.resolve(results);
            })
            .catch(error => Promise.reject(error))
    }

    getByUser(user) {
        return user;
    }
}
