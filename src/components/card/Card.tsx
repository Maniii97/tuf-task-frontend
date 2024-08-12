import React, { useEffect, useState } from 'react';
import "./Card.css"
import CardProps from '../../types/CardProps';

const RegularContent: React.FC<{ question: string }> = ({ question }) => {
  return (
    <div className="front card-side">
      <p>{question}</p>
    </div>
  );
};

const FlippedContent: React.FC<{ answer: string }> = ({ answer }) => {
  return (
    <div className="back card-side">
      <p>{answer}</p>
    </div>
  );
};

const Card: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipCard, setFlipCard] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:3000/api/questions',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await result.json();
      console.log(res.data);
      setFlipCard(res.data);
    };
    fetchData();
  }, []);

  const handlePress = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flipCard.length);
    
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flipCard.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flip-card">
      <div className="card-container">
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          <RegularContent question={flipCard[currentIndex]?.question} />
          <FlippedContent answer={flipCard[currentIndex]?.answer} />
        </div>
      </div>
      <div className="button-container">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handlePress}>
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
        <button onClick={handleNext} disabled={currentIndex === flipCard.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
