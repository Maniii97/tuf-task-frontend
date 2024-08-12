import { useEffect, useState } from "react";
import QuestionForm from "../components/question-form/QuestionForm";
import EditQuestion from "../components/edit-question/EditQuestion";
import "./Dashboard.css";

interface FlipData {
  id: string;
  question: string;
  answer: string;
}

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<FlipData | null>(null);
  const [flipdata, setFlipdata] = useState<FlipData[]>([]);

  const handleOpen = (card: FlipData) => {
    setSelectedCard(card);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/questions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setFlipdata(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addQuestion = (newQuestion: { question: string; answer: string }) => {
    setFlipdata((prevData) => [
      ...prevData,
      { id: Date.now().toString(), ...newQuestion },
    ]);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="header">
          <QuestionForm onAdd={addQuestion} />
        </div>

        <div className="db-card-container">
          {flipdata.map((card) => (
            <div
              key={card.id}
              onClick={() => handleOpen(card)}
              className="db-card"
            >
              {card.question}
            </div>
          ))}
        </div>

        {selectedCard && (
          <EditQuestion
            id={selectedCard.id}
            question={selectedCard.question}
            answer={selectedCard.answer}
            setOpen={setOpen}
            open={open}
          />
        )}
      </div>
    </>
  );
}
