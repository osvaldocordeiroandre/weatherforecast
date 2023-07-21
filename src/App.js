import React from 'react'
import './index.css'
import './App.css'

import { MdDarkMode } from 'react-icons/md'

import { useState } from 'react'

import Logo from '../src/Images/weather-nb.png'

export default function App() {

  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [theme, setTheme] = useState('dark-mode')
  const [newColor, setNewColor] = useState('white')

  function handleKeyDown(e) {
    if (e.key === 'Enter'){
      handlesearch();
    }
  }

  const handlesearch = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=d861a046677f4922b2844621230703&q=${city}&lang=pt`)
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }
    }) 
    .then((data) => {
      setWeatherForecast(data)
      console.log(data)
    });
  };

  const Addthema = () =>{
    const newTheme = theme === 'dark-mode'? 'container-light' : 'dark-mode';
    setTheme(newTheme)
  }

  const ColorMoon = () => {
    const addNewColor = newColor === 'white' ? 'black' : 'white'
    setNewColor(addNewColor)
  }

  return (
    <div className='app' id={theme}>

      <div className="mode" onClick={ColorMoon}> <MdDarkMode onClick={Addthema} cursor={'pointer'} color={newColor} size={30}/> </div>

      <main className='container' id={theme}>

        <div className='conteudo' id={theme}>

          <img className='logo' src={Logo} alt="" />
          <p className='lead-text'> Espero que o clima esteja perfeito para você ♥ </p>

          <div className='input-container'>

            <div className='input-area'>

                <input type="text" className='form-control' placeholder='Digite o nome da sua cidade' value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={handleKeyDown} />

            </div>

          </div>

          <button onClick={handlesearch}> Pesquisar </button>

          { weatherForecast ? (
            <div>

            <div className='weather-icon'>

              <div>

                  <img src={weatherForecast.current.condition.icon} alt="Logo de uma nuvem com um sol" />

              </div>

              <div className='resposta'>

                  <h2>Cidade: { weatherForecast.location.name }</h2>
                  <h3>País: { weatherForecast.location.country }</h3>
                  <h3> Hoje o dia está: { weatherForecast.current.condition.text } </h3>
                  <p className='lead'> Temperatura: { weatherForecast.current.temp_c } </p>
                  <p> sensação térmica: {weatherForecast.current.feelslike_c} </p>
                  <p> Ventos a: {weatherForecast.current.wind_kph} quilômetros por hora </p>

              </div>

            </div>
          
          </div>
          ) : null }

        </div>

      </main>

    </div>
  )
}
