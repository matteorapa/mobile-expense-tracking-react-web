class Authentication{
    constructor(){
        this.authenticated = false;
    }

    authenticate(cb){
        //todo  api call here
        this.authenticated = true;
        cb();
    }

    logout(cb){
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Authentication();