🖌️ CanvasSync – Real-Time Collaborative Whiteboard

CanvasSync is a real-time collaborative whiteboard application that allows multiple users to draw simultaneously on a shared canvas. It uses WebSockets to synchronize drawing events instantly across all connected users.

🚀 Features

Real-time collaborative drawing

Multi-user room support

Canvas state synchronization for new users

Color picker

Clear canvas for all users

Works across devices and networks

Supports cloud deployment

🛠️ Tech Stack
Layer	Technology
Backend	Python, Flask
Real-time	Flask-SocketIO (WebSockets)
Frontend	HTML, CSS, JavaScript
Server	Gunicorn + Eventlet
📁 Project Structure
canvassync/
│
├── app.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── script.js
    └── style.css
