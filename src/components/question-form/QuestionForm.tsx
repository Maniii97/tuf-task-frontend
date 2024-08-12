import React, { useState } from "react";
import './QuestionForm.css';
import QuestionFormProps from "../../types/QuestionFormProps";

const QuestionForm: React.FC<QuestionFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    const formdata = {
      question: question,
      answer: answer,
    };

    try {
      const response = await fetch('https://tuf-task-backend.vercel.app/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        throw new Error('Failed to add the question and answer');
      }

      onAdd(formdata);
      setOpen(false);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="add-button"
      >
        Add Question & Answer
      </button>
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Add Question & Answer</h2>
            <div className="form-group">
              <label className="form-label">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="form-input"
                placeholder="Enter your question"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Answer</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-input"
                placeholder="Enter the answer"
              />
            </div>
            <div className="button-container">
              <button
                onClick={handleOpen}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="save-button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionForm;
