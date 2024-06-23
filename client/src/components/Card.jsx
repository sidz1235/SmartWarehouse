import React from 'react'
import '../index.css'
import {Card as Card1} from 'react-bootstrap';

export default function Card({Data}) {
  return (
    <Card1 style={{ width: '18rem' }} className="hover:scale-110 m-4 p-4 rounded-lg text-center">
      
      <Card1.Body>
      <Card1.Img variant="top" src={Data.image} alt={Data.type} />
      </Card1.Body>
    </Card1>
  );
}