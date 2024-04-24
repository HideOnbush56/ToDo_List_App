from flask import Flask, request, jsonify,render_template,url_for
import mysql.connector

app = Flask(__name__)
mysql_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="ToDo"
)
def execute_query(query, params=None):
    cursor = mysql_connection.cursor(dictionary=True)
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        mysql_connection.commit()
    except Exception as e:
        mysql_connection.rollback()
        print("Error executing query:", e)
    finally:
        cursor.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/addTask', methods=['POST'])
def add_task():
    task = request.json.get('task')
    if task:
        try:
            execute_query("INSERT INTO list (task, Mread) VALUES (%s, %s)", (task, "false"))
            return redirect(url_for('index'))
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Task not provided"}), 400

@app.route('/api/getTasks', methods=['GET'])
def get_tasks():
    try:
        tasks = execute_query("SELECT task FROM list")
        if tasks:
            return jsonify({"tasks": tasks}), 200
        else:
            return jsonify({"tasks": []}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
