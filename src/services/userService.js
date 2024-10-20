import axios from 'axios';
import { allReactive } from '../components'


let getAll = async () => {
  let res = await axios.get('https://crud-lffq.onrender.com/users')
  allReactive.getAll = res.data
}


let obj = {
  username: 'Toxirrrrrrrrrrrrr',
  password: '123456789',
  gender: 'male'
}

let postUser = async () => {

  try {
    
    let res = await axios.post('https://crud-lffq.onrender.com/users', obj, {
      headers: { 'Content-Type': 'application/json' },
    })

    let data = res.data
    
    if (data.status == 201) {
      alert(data.message)
    } else {
      throw new Error()
    }

    console.log(res);


  } catch (error) {
    if(error.response?.data.message == "db error: duplicate key value violates unique constraint \"users_username_key\"") {
      alert('username existed')
    }
  }

}


export {
  getAll,
  postUser
}