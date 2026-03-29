from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'database.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL DEFAULT 'open',
            created_at TEXT NOT NULL                                                         
        )
    ''')
    conn.commit()
    conn.close()

app = Flask(__name__)
CORS(app)

tickets = []

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'API up and running!'})

@app.route('/tickets', methods=['GET'])
def get_tickets():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tickets')
    tickets = cursor.fetchall()
    conn.close()

    tickets_list = []
    for ticket in tickets:
        tickets_list.append({
            'id': ticket[0],
            'title': ticket[1],
            'description': ticket[2],
            'status': ticket[3],
            'created_at': ticket[4]
        })

    return jsonify(tickets_list)

@app.route('/tickets', methods=['POST'])
def add_ticket():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not title:
        return jsonify({'error': 'Title is required'}), 400

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tickets (title, description, created_at) VALUES (?, ?, ?)',
        (title, description, created_at))
    conn.commit()
    ticket_id = cursor.lastrowid
    conn.close()

    return jsonify({'id': ticket_id, 'title': title, 'description': description, 'status': 'open', 'created_at': created_at}), 201

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
