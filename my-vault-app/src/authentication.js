class Authentication{
    constructor(){
        this.authenticated = false;
        this.token = 'empty';
       }

    async login(email, password, cb){
        await fetch('https://myvault.technology/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })


      .then(response => (response.json()))
      .then((response) => {
        
        if (response.token) {
            this.token = response.token;
            this.authenticated = true;
            console.log('Credentials match, signed in successfully');
            cb()
        }
      })
      .catch(error => console.warn(error))


    }

    logout(cb){
        this.authenticated = false;
        this.token = null;
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
        let response = await fetch('https://myvault.technology/api/users', requestOptions);
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