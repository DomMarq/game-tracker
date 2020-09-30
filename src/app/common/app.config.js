function init(ParseProvider) {
    // parse credentials
    ParseProvider.initialize(
        'Q7VOP3iyWEP6Cr41jjqns8dYiCa7n8YevZSXzVUm', // This is your Application ID
        'sqaF5E5FVYuK9Ui3hRdVnaCVESzxwGmdLejSnuJb' // This is your Javascript key
    );
    ParseProvider.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
}

angular
    .module('common')
    .config(init)
