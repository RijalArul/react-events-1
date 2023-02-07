import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

function LoginPage () {
  const [user, setUser] = useState({})
  const navigation = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const resp = await axios.post('http://localhost:3030/users/login', user)
      const { data } = resp.data
      if (data) {
        localStorage.setItem('access_token', data)
        navigation('/')
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.message}`
      })
    }
    // const { data } = resp.data
    // console.log(data)
  }

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className='maincontainer'>
      <div class='container-fluid'>
        <div class='row no-gutter'>
          <div class='col-md-6 d-none d-md-flex bg-image'></div>
          <div class='col-md-6 bg-light'>
            <div class='login d-flex align-items-center py-5'>
              <div class='container'>
                <div class='row'>
                  <div class='col-lg-10 col-xl-7 mx-auto'>
                    <h3 class='display-4'>Login Page</h3>
                    <form class='mt-3 mb-3'>
                      <div class='form-group mb-3'>
                        <input
                          id='inputEmail'
                          type='email'
                          placeholder='Email address'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                          name='email'
                          onChange={e => handleChange(e)}
                        />
                      </div>
                      <div class='form-group mb-3'>
                        <input
                          id='inputPassword'
                          type='password'
                          placeholder='Password'
                          required=''
                          class='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                          name='password'
                          onChange={e => handleChange(e)}
                        />
                      </div>
                      <button
                        // type='submit'
                        class='btn btn-block text-uppercase mt-3 rounded-0 shadow-sm w-100 btn-login-submit'
                        onClick={handleSubmit}
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default LoginPage
