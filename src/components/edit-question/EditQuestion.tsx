import React, { useState, useEffect } from 'react';
import './EditQuestion.css';
import EditQuestionProps from '../../types/EditQuestionProps';

const EditQuestion: React.FC<EditQuestionProps> = ({ id, question, answer, setOpen, open }) => {
  const [newQuestion, setNewQuestion] = useState<string>(question);
  const [newAnswer, setNewAnswer] = useState<string>(answer);

  useEffect(() => {
    setNewQuestion(question);
    setNewAnswer(answer);
  }, [question, answer]);

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    const formdata = {
      question: newQuestion,
      answer: newAnswer,
    };
    try {
      const response = await fetch(`https://tuf-task-backend.vercel.app/api/questions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update the question');
      }
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://tuf-task-backend.vercel.app/api/questions/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete the question');
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Edit Question</h2>
            <div className="form-group">
              <label className="form-label">Question</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="form-input"
                placeholder="Enter your question"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Answer</label>
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="form-input"
                placeholder="Enter the answer"
              />
            </div>
            <div className="button-container">
              <button onClick={handleOpen} className="btn cancel-btn">
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn update-btn">
                Update
              </button>
              <button onClick={handleDelete} className="btn delete-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditQuestion;
