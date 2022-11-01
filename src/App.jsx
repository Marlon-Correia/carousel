import { useState, useEffect, useRef } from 'react'
import './App.css'
import Logo from '../public/static/images/super-shoes.png';
import Scrool from '../public/static/images/chevron_icon.png';

function App() {
  const [items, setItems] = useState([])
  const carousel = useRef(null)

  useEffect( () => {
    const reqShoes = async (url) => {
      let req = await fetch(url);
      let json = await req.json();
      setItems(json);
    }
    reqShoes('http://localhost:5173/public/static/shoes.json')
  }, [])

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= 818;
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    if(carousel.current.scrollLeft >= 8471) carousel.current.scrollLeft = 0
    if(carousel.current.scrollLeft >= 0 && carousel.current.scrollLeft <= 8470) carousel.current.scrollLeft += 818;
  }


  if(!items || !items.length) return null;
  return (
    <div className="container">
      <div className="logo">
        <img src={Logo} alt="Super Shoes Logo" />
      </div>

      <div className="carousel" ref={carousel}>
        {items.map( item => (
          <div key={item.id} className="item">
              <div className="image">
                <img src={item.image} alt={item.name}/>
              </div>
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="oldPrice">{item.oldPrice}</span>
                <span className="price">{item.price}</span>
              </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          <img src={Scrool} alt="Scrool Left" />
        </button>
        <button onClick={handleRightClick}>
          <img src={Scrool} alt="Scrool Right" />
        </button>
      </div>
    </div>
  )
}

export default App
