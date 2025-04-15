import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
// eslint-disable-next-line no-unused-vars
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWJmN2Y5NTc3MTNkOTJlODA4NGEwZGQzMDIyNWMxYSIsIm5iZiI6MTc0NDc0MjIyOC42MTc5OTk4LCJzdWIiOiI2N2ZlYTc1NDMxMTBiZDgyZGZhZDg0ZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t0zyCK_6C-PzUyfsr6Wy1eHO0qdJxiIXj1MWLPZbs4c'
    }
  };
  
 

  const handelWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handelWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular On Streamflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt="Card Images"
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;