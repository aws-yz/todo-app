import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
    ])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const pendingCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>提醒事项</h1>
          <p className="subtitle">
            {pendingCount > 0 ? `${pendingCount} 个待完成` : '全部完成 🎉'}
          </p>
        </header>

        {/* Input */}
        <form onSubmit={addTodo} className="input-container">
          <div className="input-wrapper">
            <span className="input-icon">+</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="添加新提醒..."
              className="todo-input"
            />
          </div>
        </form>

        {/* Todo List */}
        <div className="todo-list">
          {todos.filter(t => !t.completed).map(todo => (
            <div key={todo.id} className="todo-item">
              <button
                className="checkbox"
                onClick={() => toggleTodo(todo.id)}
              >
                <span className="checkbox-inner"></span>
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Completed Section */}
        {completedCount > 0 && (
          <div className="completed-section">
            <h3 className="completed-header">
              已完成 · {completedCount}
            </h3>
            <div className="todo-list completed">
              {todos.filter(t => t.completed).map(todo => (
                <div key={todo.id} className="todo-item completed">
                  <button
                    className="checkbox checked"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <span className="checkmark">✓</span>
                  </button>
                  <span className="todo-text">{todo.text}</span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>还没有提醒事项</p>
            <p className="empty-hint">在上方输入框添加新任务</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
