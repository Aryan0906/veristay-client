from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.exceptions import BadRequest
import os
from models import TodoStore
from validation import validate_todo_create, validate_todo_update, validate_todo_id, ValidationError

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize todo store
todo_store = TodoStore()

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Veristay Backend!"})

@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "service": "veristay-backend"})


# TODO API Endpoints

@app.route('/api/todos', methods=['GET'])
def get_todos():
    """Get all todos."""
    todos = todo_store.get_all()
    return jsonify({
        "todos": [todo.to_dict() for todo in todos],
        "count": len(todos)
    }), 200


@app.route('/api/todos', methods=['POST'])
def create_todo():
    """Create a new todo."""
    try:
        try:
            data = request.get_json()
        except BadRequest:
            return jsonify({"error": "Invalid JSON"}), 400
            
        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400
            
        title, description = validate_todo_create(data)
        
        todo = todo_store.create(title=title, description=description)
        return jsonify({
            "message": "Todo created successfully",
            "todo": todo.to_dict()
        }), 201
        
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/todos/<todo_id>', methods=['GET'])
def get_todo(todo_id):
    """Get a specific todo by ID."""
    try:
        id_int = validate_todo_id(todo_id)
        todo = todo_store.get_by_id(id_int)
        
        if not todo:
            return jsonify({"error": "Todo not found"}), 404
        
        return jsonify({"todo": todo.to_dict()}), 200
        
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/todos/<todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """Update a todo."""
    try:
        id_int = validate_todo_id(todo_id)
        
        try:
            data = request.get_json()
        except BadRequest:
            return jsonify({"error": "Invalid JSON"}), 400
            
        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400
            
        title, description, completed = validate_todo_update(data)
        
        todo = todo_store.update(id_int, title=title, description=description, completed=completed)
        
        if not todo:
            return jsonify({"error": "Todo not found"}), 404
        
        return jsonify({
            "message": "Todo updated successfully",
            "todo": todo.to_dict()
        }), 200
        
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """Delete a todo."""
    try:
        id_int = validate_todo_id(todo_id)
        success = todo_store.delete(id_int)
        
        if not success:
            return jsonify({"error": "Todo not found"}), 404
        
        return jsonify({"message": "Todo deleted successfully"}), 200
        
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({"error": "Method not allowed"}), 405


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
