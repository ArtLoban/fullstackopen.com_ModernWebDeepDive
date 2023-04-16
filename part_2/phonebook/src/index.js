import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

const numbers = [
  { name: 'Arto Hellas', phone: '040-123456', id: 1 },
  { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
];

ReactDOM.createRoot(document.getElementById('root')).render(<App numbers={numbers} />);
