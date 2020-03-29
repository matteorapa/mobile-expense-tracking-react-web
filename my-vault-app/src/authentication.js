class Authentication{
    constructor(){
        this.authenticated = false;
    }

    login(cb){
        //todo  api call here
        this.authenticated = true;
        console.log('login user');
        cb();
    }

    logout(cb){
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }

    async createUser(name, surname, date, email , password, cb){
        //api call to add user
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Credentials': 'true' },
            body: JSON.stringify({ 
                name: name,
                surname: surname,
                dob: date,
                email: email,
                password: password

         })
        };
        let response = await fetch('http://myvault.technology/api/users', requestOptions);
        const status= await response.status;

        if(status === 201){
            console.log('User created successfully');
            cb();

        }else if(status === 409){
            console.log('Conflict. Email already used');

        }else{
            console.log('An error has occured');
            console.log(response);
        }
        
    }
}

export default new Authentication();