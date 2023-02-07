import axios from 'axios'
import { useEffect, useState } from 'react'

export default function DashboardPage () {
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [event, setEvent] = useState({})
  const access_token = localStorage.getItem('access_token')

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const resp = await axios.get('http://localhost:3030/events', {
          headers: {
            access_token: access_token
          }
        })

        const { data } = resp.data
        setEvents(data)
      } catch (err) {
        console.log(err)
      }
    }

    const getAllUsers = async () => {
      try {
        const resp = await axios.get('http://localhost:3030/users', {
          headers: {
            access_token: access_token
          }
        })

        const { data } = resp.data
        setUsers(data)
      } catch (err) {
        console.log(err)
      }
    }

    setInterval(() => {
      getAllEvents()
    }, 2000)

    getAllUsers()
  }, [])

  const handleClick = async e => {
    e.preventDefault()
    event.attendees = [event.attendees]

    try {
      const resp = await axios.post('http://localhost:3030/events', event, {
        headers: {
          access_token: access_token
        }
      })

      const { data } = resp.data
      if (data) {
        setEvent(...event, data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = e => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <div class='container modal-dashboard'>
        <button
          type='button'
          class='btn btn-danger w-40 mb-4'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          Create Event
        </button>

        <div
          class='modal fade'
          id='exampleModal'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h5 class='modal-title' id='exampleModalLabel'>
                  Create Event
                </h5>
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body'>
                <form>
                  <input
                    id='inputEvent'
                    type='text'
                    placeholder='Event Name'
                    required=''
                    class='form-control rounded-pill border-0 shadow-sm px-4'
                    name='name'
                    onChange={e => handleChange(e)}
                  />
                  <input
                    id='inputStartDate'
                    type='datetime-local'
                    step='1'
                    placeholder='Event Start Date'
                    required=''
                    class='form-control rounded-pill border-0 shadow-sm px-4'
                    name='start_date'
                    onChange={e => handleChange(e)}
                  />
                  <input
                    id='inputEndDate'
                    type='datetime-local'
                    step='1'
                    placeholder='Event End Date'
                    required=''
                    class='form-control rounded-pill border-0 shadow-sm px-4'
                    name='end_date'
                    onChange={e => handleChange(e)}
                  />

                  <select
                    name='attendees'
                    id='attendees'
                    onChange={e => handleChange(e)}
                  >
                    {users.map(user => {
                      return <option value={user._id}>{user.email}</option>
                    })}
                  </select>
                </form>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='button'
                  class='btn btn-primary'
                  onClick={handleClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <table class='table table-danger'>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Start Date</th>
                <th scope='col'>End Date</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => {
                return (
                  <tr>
                    <td>{event.name}</td>
                    <td>{event.start_date}</td>
                    <td>{event.end_date}</td>
                    <td>{event.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
