import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header.js';
// import Login from './components/Login/Login.js';
import Footer from './components/Footer/Footer.js';
// import SignIn from './pages/SignIn/SignIn.js';
// import Home from './pages/Home/Home.js';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = 
    {
      user: '',
      pass:'',
      response: '',
      authRes:'',
      token:'',
      isAuth: false
    };

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.callApi = this.callApi.bind(this);
    this.saveToken = this.saveToken.bind(this);
  }

  componentDidMount() {
    this.saveToken();
    if(localStorage.getItem('tkkn')){
      let data =JSON.stringify({
        token: localStorage.getItem('tkkn')
      })
     this.callApi('/token', data).then(res=> this.setState({authRes: res.message, isAuth : res.ans}));
    }
    
    
    this.callApi('/test')
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async (route, data) => {

    switch (route) {
      case '/test':
          var response = await fetch(route);
          var body = await response.json();

          if (response.status !== 200) throw Error(body.message);

          return body;


      case '/auth/login':
          var responseLog = await  fetch(route, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: data
          })
          var bodyLog = await responseLog.json();

          if (responseLog.status !== 200) throw Error(bodyLog.message);
      
          return bodyLog;


      case '/auth/signup':
          var responseSign = await  fetch(route, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: data
          })
          var bodySign = await responseSign.json();

          if (responseSign.status !== 200) throw Error(bodySign.message);
      
          return bodySign;
      case '/token':
        var tokenRes = await fetch(route, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: data
        })
        var tkbody = await tokenRes.json();
        
        if (tokenRes.status !== 200) throw Error(tkbody.message);
        
        return tkbody;
    }
  };

  handleUser(event) {
    this.setState({user: event.target.value});

  }

  handlePass(event) {
    this.setState({pass: event.target.value});
  }

  handleSubmit(event) {
    var data =JSON.stringify({
      user: this.state.user,
      pass: this.state.pass
    }) 

    alert('A name was submitted: ' + this.state.user +' also a password.. opsie: ' + this.state.pass);
    this.callApi('/auth/login', data).then(res => {
      let token = res.token
      localStorage.setItem('tkkn', token);
      this.setState({token: token, authRes: res.message, isAuth:res.ans});
    });
    event.preventDefault();
  }

  saveToken(){
    if (localStorage.hasOwnProperty('tkkn')){
      this.setState({token: localStorage.getItem('tkkn')});
    }

  }

  handleSignup(event) {
    
    var data =JSON.stringify({
      user: this.state.user,
      pass: this.state.pass
    }) 

    

    alert('A name was submitted: ' + this.state.user +' also a password.. opsie: ' + this.state.pass);
    this.callApi('/auth/signup', data).then(res => this.setState({authRes : res.message}));
    event.preventDefault();

  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <p className="App-intro">{this.state.authRes}</p>
        <form>
          <label>
            <input id="user" type='text' value={this.state.value} onChange={this.handleUser} placeholder="username" />
            <br/>
            <input id="pass" type='password' value={this.state.value} onChange={this.handlePass} placeholder="password" />
          </label>
           <br/>
           <input type="submit" value="Submit" onClick={this.handleSubmit} />
           <input type="submit" value="Signup" onClick={this.handleSignup} />
         </form>
      </div>
      
    );
  }
}

export default App;
