from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*")

rooms = {}

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("join_room")
def join(data):
    room = data["room"]
    join_room(room)
    rooms.setdefault(room, [])
    emit("load_canvas", rooms[room])

@socketio.on("drawing_event")
def draw(data):
    room = data["room"]
    rooms[room].append(data)
    emit("drawing_event", data, room=room, include_self=False)

@socketio.on("clear_canvas")
def clear(data):
    rooms[data["room"]] = []
    emit("clear_canvas", room=data["room"])

if __name__ == "__main__":
    socketio.run(app, debug=True)
