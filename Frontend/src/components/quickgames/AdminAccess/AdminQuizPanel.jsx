import React, { useEffect, useState } from 'react';
import './AdminQuizPanel.css';
import axios from 'axios';

const AdminQuizPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://localhost:5000/api/quiz')
        .then(res => setQuestions(res.data))
        .catch(err => console.error(err));
    }
  }, [isAuthenticated]);

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const resetForm = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswer('');
    setEditingId(null);
  };

  const handleAddOrUpdateQuestion = () => {
    const endpoint = editingId
      ? `http://localhost:5000/api/quiz/${editingId}`
      : 'http://localhost:5000/api/quiz/add';
    const method = editingId ? 'PUT' : 'POST';

    const data = { question, options, answer, password: adminPassword };

    fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || data.error);

        if (data.updatedQuestion || data.newQuestion) {
          const updated = data.updatedQuestion || data.newQuestion;

          if (editingId) {
            setQuestions(prev =>
              prev.map(q => (q._id === updated._id ? updated : q))
            );
          } else {
            setQuestions(prev => [...prev, updated]);
          }

          resetForm();
        } else {
          // fallback: refresh all questions
          axios.get('http://localhost:5000/api/quiz')
            .then(res => setQuestions(res.data))
            .catch(err => console.error('Failed to refresh questions', err));
        }
      })
      .catch(err => {
        console.error(err);
        setMessage('Something went wrong.');
      });
  };

  const handleEdit = (q) => {
    setQuestion(q.question);
    setOptions(q.options);
    setAnswer(q.answer);
    setEditingId(q._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    fetch(`http://localhost:5000/api/quiz/${id}?password=${encodeURIComponent(adminPassword)}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || data.error);
        if (data.message) {
          setQuestions(prev => prev.filter(q => q._id !== id));
        }
      })
      .catch(err => {
        console.error(err);
        setMessage('Something went wrong while deleting.');
      });
  };

  const handleLogin = () => {
    if (!tempPassword) {
      setMessage('Please enter admin password');
      return;
    }

    fetch(`http://localhost:5000/api/quiz`)
      .then(res => res.json())
      .then(() => {
        setAdminPassword(tempPassword);
        setIsAuthenticated(true);
        setMessage('');
      })
      .catch(() => setMessage('Login failed'));
  };

  const handleLogout = () => {
    setAdminPassword('');
    setTempPassword('');
    setIsAuthenticated(false);
    setQuestions([]);
    resetForm();
  };

  // RENDER
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h2>Enter Admin Password</h2>
        <input
          type="password"
          placeholder="Admin password"
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p className="message">{message}</p>}
      </div>
    );
  }

  return (
    <div className="quiz-manager">
      <div className="panel-header">
        <h2>Quiz Admin Panel</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="input-form">
        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(e.target.value, i)}
          />
        ))}
        <input
          type="text"
          placeholder="Correct answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleAddOrUpdateQuestion}>
          {editingId ? 'Update Question' : 'Add Question'}
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <h3>All Questions</h3>
      <table className="quiz-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Options</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={q._id}>
              <td>{index + 1}</td>
              <td>{q.question}</td>
              <td>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </td>
              <td>{q.answer}</td>
              <td>
                <button onClick={() => handleEdit(q)}>Edit</button>
                <button onClick={() => handleDelete(q._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuizPanel;
