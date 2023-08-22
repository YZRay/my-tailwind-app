import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = (props) => {
  const { selectedPage } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${selectedPage}`)
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedPage]);

  const card = data.map((card) => (
    <div
      className="container mx-sm bg-slate-500 overflow-hidden rounded-2xl "
      key={card.id}
    >
      <div className="flex max-w-80 justify-center bg-slate-600">
        <img className="p-8 rounded-2xl" src={card.image} alt={card.name} />
      </div>
      <div className="p-6 ">
        <p className="font-bold text-3xl text-slate-50 pb-4 whitespace-normal">
          {card.name}
        </p>
        <p className="text-xl text-slate-200 ">Gender: {card.gender}</p>
        <p className="text-xl text-slate-200 ">Status: {card.status}</p>
        <p className="text-xl text-slate-200 ">Species: {card.species}</p>
      </div>
    </div>
  ));

  return <div className="grid grid-cols-5 gap-8 ">{card}</div>;
};

export default Card;
