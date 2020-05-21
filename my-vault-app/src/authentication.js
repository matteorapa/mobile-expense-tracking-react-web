class Authentication{
    constructor(){
        this.authenticated = false;
        this.token = 'empty';

        this.tokenCookie = this.getCookie("token");
        if(this.tokenCookie !== "notfound"){
            this.authenticated = true;
            this.token = this.tokenCookie;
            console.log("Authentication cookie found.")
        }else{
            console.log("Not authentication tokens found. Please login!");
        }
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
            this.setCookie("token", response.token);
            console.log('Credentials match, signed in successfully');
            cb()
        }
      })
      .catch(error => console.warn(error))


    }

    logout(cb){
        this.authenticated = false;
        this.token = null;
        //remove tokenCookie
        this.deleteCookie("token");
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }

    setCookie(name, value) {
        var d = new Date();
        d.setTime(d.getTime() + (60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
      }

    getCookie(name) {
        var cookie = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(cookie) === 0) {
            return c.substring(cookie.length, c.length);
          }
        }
        return "notfound";
      }

    deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return
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