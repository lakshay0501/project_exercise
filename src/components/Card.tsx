
import React from "react";
import '../App.css'

interface Item {
    name: string;
    id: string;
    imagePath: string;
    description: string;
}

function Card({ item }: { item: Item }) {

    return <div className="card">
        <h3>{item.name}</h3>
        <img src={item.imagePath} alt={item.imagePath} />
    </div>
}

export default Card;