import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res =>res.json())
    .then(data=> setUsers(data))
  }, [])

  const handleSubmit=event =>{
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email}
    console.log(name,email)

    //post data to server
    fetch("http://localhost:5000/user", {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(user),
})
.then((response) => response.json())
.then((data) => {
  console.log("Success:", data);
})




  }
  return (
    <div className="App">
     <p>user{users.length}</p>

     <ul>{
      users.map(user =><li key={user.id} >
        id:{user.id}
        name:{user.name}
        email:{user.email}

      </li>)
      
}</ul>

<form onSubmit={handleSubmit}>
<input type="text" name='name' placeholder='name'/><br></br>
<input type="email" name='email' placeholder='email'/><br></br>
<input type="submit" value="Add User" />

</form>
    </div>
  );
}

export default App;
