import React, { useEffect, useState } from 'react'
import api from "./services/api"
import './App.css'
import './Sidebar.css'
import './Main.css'


function App() {

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [github_usename, setGitHubUserName] = useState('')
  const [techs, setTechs] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
      },
      (erro) => {

      },
      { timeout: 30000 }
    )
  })

  async function handleAddDev(e) {
    e.preventDefault()

    
    

    const response = await api.post('/devs',{
      github_usename,
      techs,
      latitude,
      longitude
    })

    console.log(response);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">github_username</label>
            <input 
            type="text" 
            name="github_username" 
            id="github_username" 
            value={github_usename}
            onChange={e => setGitHubUserName(e.target.value)}
            required />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
            type="text" 
            name="techs" 
            id="techs" 
            value={techs}
            onChange={e => setTechs(e.target.value)}
            required />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
              type="number" 
              name="latitude" 
              id="latitude" 
              value={latitude} 
              onChange={e => setLatitude(e.target.value)}
              required />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
              type="number" 
              name="longitude" 
              id="longitude" 
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              required />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/32573039?s=400&v=4" alt="" />
              <div className="user-info">
                <strong>Doug</strong>
                <span>React, Angular</span>
              </div>
            </header>
            <p>onononon</p>
            <a href="">onono</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
