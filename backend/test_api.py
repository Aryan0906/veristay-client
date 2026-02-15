"""Tests for the TODO API."""
import pytest
import json
from app import app, todo_store


@pytest.fixture
def client():
    """Create a test client."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client
    # Clear todos after each test
    todo_store.clear()


@pytest.fixture
def sample_todo(client):
    """Create a sample todo for testing."""
    response = client.post('/api/todos', 
                          json={'title': 'Test Todo', 'description': 'Test Description'})
    return response.get_json()['todo']


class TestHealthEndpoints:
    """Test health and basic endpoints."""
    
    def test_home(self, client):
        """Test home endpoint."""
        response = client.get('/')
        assert response.status_code == 200
        data = response.get_json()
        assert 'message' in data
    
    def test_health_check(self, client):
        """Test health check endpoint."""
        response = client.get('/api/health')
        assert response.status_code == 200
        data = response.get_json()
        assert data['status'] == 'healthy'


class TestCreateTodo:
    """Test todo creation."""
    
    def test_create_todo_success(self, client):
        """Test successful todo creation."""
        response = client.post('/api/todos', 
                              json={'title': 'New Todo', 'description': 'Description'})
        assert response.status_code == 201
        data = response.get_json()
        assert 'todo' in data
        assert data['todo']['title'] == 'New Todo'
        assert data['todo']['description'] == 'Description'
        assert data['todo']['completed'] is False
        assert 'id' in data['todo']
    
    def test_create_todo_without_description(self, client):
        """Test creating todo without description."""
        response = client.post('/api/todos', json={'title': 'Just Title'})
        assert response.status_code == 201
        data = response.get_json()
        assert data['todo']['title'] == 'Just Title'
        assert data['todo']['description'] == ''
    
    def test_create_todo_missing_title(self, client):
        """Test creating todo without title."""
        response = client.post('/api/todos', json={'description': 'No title'})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_create_todo_empty_title(self, client):
        """Test creating todo with empty title."""
        response = client.post('/api/todos', json={'title': '   '})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_create_todo_title_too_long(self, client):
        """Test creating todo with title exceeding max length."""
        long_title = 'a' * 201
        response = client.post('/api/todos', json={'title': long_title})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_create_todo_description_too_long(self, client):
        """Test creating todo with description exceeding max length."""
        long_description = 'a' * 1001
        response = client.post('/api/todos', 
                              json={'title': 'Title', 'description': long_description})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_create_todo_invalid_json(self, client):
        """Test creating todo with invalid JSON."""
        response = client.post('/api/todos', 
                              data='not json',
                              content_type='application/json')
        assert response.status_code == 400
    
    def test_create_todo_invalid_title_type(self, client):
        """Test creating todo with non-string title."""
        response = client.post('/api/todos', json={'title': 123})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data


class TestGetTodos:
    """Test getting todos."""
    
    def test_get_all_todos_empty(self, client):
        """Test getting all todos when none exist."""
        response = client.get('/api/todos')
        assert response.status_code == 200
        data = response.get_json()
        assert data['todos'] == []
        assert data['count'] == 0
    
    def test_get_all_todos_with_data(self, client):
        """Test getting all todos with existing data."""
        # Create multiple todos
        client.post('/api/todos', json={'title': 'Todo 1'})
        client.post('/api/todos', json={'title': 'Todo 2'})
        client.post('/api/todos', json={'title': 'Todo 3'})
        
        response = client.get('/api/todos')
        assert response.status_code == 200
        data = response.get_json()
        assert data['count'] == 3
        assert len(data['todos']) == 3
    
    def test_get_todo_by_id_success(self, client, sample_todo):
        """Test getting a specific todo by ID."""
        todo_id = sample_todo['id']
        response = client.get(f'/api/todos/{todo_id}')
        assert response.status_code == 200
        data = response.get_json()
        assert data['todo']['id'] == todo_id
        assert data['todo']['title'] == 'Test Todo'
    
    def test_get_todo_by_id_not_found(self, client):
        """Test getting a non-existent todo."""
        response = client.get('/api/todos/999')
        assert response.status_code == 404
        data = response.get_json()
        assert 'error' in data
    
    def test_get_todo_invalid_id(self, client):
        """Test getting todo with invalid ID."""
        response = client.get('/api/todos/invalid')
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_get_todo_negative_id(self, client):
        """Test getting todo with negative ID."""
        response = client.get('/api/todos/-1')
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data


class TestUpdateTodo:
    """Test updating todos."""
    
    def test_update_todo_title(self, client, sample_todo):
        """Test updating todo title."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', 
                             json={'title': 'Updated Title'})
        assert response.status_code == 200
        data = response.get_json()
        assert data['todo']['title'] == 'Updated Title'
        assert data['todo']['description'] == 'Test Description'  # unchanged
    
    def test_update_todo_description(self, client, sample_todo):
        """Test updating todo description."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', 
                             json={'description': 'New Description'})
        assert response.status_code == 200
        data = response.get_json()
        assert data['todo']['description'] == 'New Description'
        assert data['todo']['title'] == 'Test Todo'  # unchanged
    
    def test_update_todo_completed(self, client, sample_todo):
        """Test updating todo completed status."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', 
                             json={'completed': True})
        assert response.status_code == 200
        data = response.get_json()
        assert data['todo']['completed'] is True
    
    def test_update_todo_multiple_fields(self, client, sample_todo):
        """Test updating multiple fields at once."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', 
                             json={
                                 'title': 'New Title',
                                 'description': 'New Description',
                                 'completed': True
                             })
        assert response.status_code == 200
        data = response.get_json()
        assert data['todo']['title'] == 'New Title'
        assert data['todo']['description'] == 'New Description'
        assert data['todo']['completed'] is True
    
    def test_update_todo_not_found(self, client):
        """Test updating non-existent todo."""
        response = client.put('/api/todos/999', json={'title': 'New Title'})
        assert response.status_code == 404
        data = response.get_json()
        assert 'error' in data
    
    def test_update_todo_empty_body(self, client, sample_todo):
        """Test updating with empty request body."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', json={})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_update_todo_invalid_title(self, client, sample_todo):
        """Test updating with invalid title."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', json={'title': '   '})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_update_todo_invalid_completed_type(self, client, sample_todo):
        """Test updating with invalid completed type."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', json={'completed': 'yes'})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_update_todo_unexpected_fields(self, client, sample_todo):
        """Test updating with unexpected fields."""
        todo_id = sample_todo['id']
        response = client.put(f'/api/todos/{todo_id}', 
                             json={'title': 'New', 'unexpected': 'field'})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data
    
    def test_update_todo_updates_timestamp(self, client, sample_todo):
        """Test that updating changes the updated_at timestamp."""
        todo_id = sample_todo['id']
        original_updated_at = sample_todo['updated_at']
        
        import time
        time.sleep(0.01)  # Small delay to ensure timestamp difference
        
        response = client.put(f'/api/todos/{todo_id}', json={'title': 'Updated'})
        assert response.status_code == 200
        data = response.get_json()
        assert data['todo']['updated_at'] != original_updated_at


class TestDeleteTodo:
    """Test deleting todos."""
    
    def test_delete_todo_success(self, client, sample_todo):
        """Test successful todo deletion."""
        todo_id = sample_todo['id']
        response = client.delete(f'/api/todos/{todo_id}')
        assert response.status_code == 200
        data = response.get_json()
        assert 'message' in data
        
        # Verify todo is actually deleted
        get_response = client.get(f'/api/todos/{todo_id}')
        assert get_response.status_code == 404
    
    def test_delete_todo_not_found(self, client):
        """Test deleting non-existent todo."""
        response = client.delete('/api/todos/999')
        assert response.status_code == 404
        data = response.get_json()
        assert 'error' in data
    
    def test_delete_todo_invalid_id(self, client):
        """Test deleting with invalid ID."""
        response = client.delete('/api/todos/invalid')
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data


class TestEdgeCases:
    """Test edge cases and error scenarios."""
    
    def test_method_not_allowed(self, client):
        """Test method not allowed error."""
        response = client.patch('/api/todos/1')
        assert response.status_code == 405
    
    def test_endpoint_not_found(self, client):
        """Test 404 for non-existent endpoint."""
        response = client.get('/api/nonexistent')
        assert response.status_code == 404
    
    def test_todo_ids_increment(self, client):
        """Test that todo IDs increment properly."""
        response1 = client.post('/api/todos', json={'title': 'Todo 1'})
        response2 = client.post('/api/todos', json={'title': 'Todo 2'})
        response3 = client.post('/api/todos', json={'title': 'Todo 3'})
        
        id1 = response1.get_json()['todo']['id']
        id2 = response2.get_json()['todo']['id']
        id3 = response3.get_json()['todo']['id']
        
        assert id2 == id1 + 1
        assert id3 == id2 + 1
    
    def test_created_at_and_updated_at_present(self, client):
        """Test that timestamps are present in todos."""
        response = client.post('/api/todos', json={'title': 'Test'})
        todo = response.get_json()['todo']
        
        assert 'created_at' in todo
        assert 'updated_at' in todo
        assert todo['created_at'] is not None
        assert todo['updated_at'] is not None


class TestIntegration:
    """Integration tests for complete workflows."""
    
    def test_complete_crud_workflow(self, client):
        """Test complete CRUD workflow."""
        # CREATE
        create_response = client.post('/api/todos', 
                                     json={'title': 'Buy groceries', 
                                           'description': 'Milk, eggs, bread'})
        assert create_response.status_code == 201
        todo_id = create_response.get_json()['todo']['id']
        
        # READ
        get_response = client.get(f'/api/todos/{todo_id}')
        assert get_response.status_code == 200
        assert get_response.get_json()['todo']['title'] == 'Buy groceries'
        
        # UPDATE
        update_response = client.put(f'/api/todos/{todo_id}', 
                                    json={'completed': True})
        assert update_response.status_code == 200
        assert update_response.get_json()['todo']['completed'] is True
        
        # DELETE
        delete_response = client.delete(f'/api/todos/{todo_id}')
        assert delete_response.status_code == 200
        
        # VERIFY DELETED
        verify_response = client.get(f'/api/todos/{todo_id}')
        assert verify_response.status_code == 404
    
    def test_multiple_todos_management(self, client):
        """Test managing multiple todos."""
        # Create multiple todos
        todos_to_create = [
            {'title': 'Task 1', 'description': 'First task'},
            {'title': 'Task 2', 'description': 'Second task'},
            {'title': 'Task 3', 'description': 'Third task'},
        ]
        
        created_ids = []
        for todo_data in todos_to_create:
            response = client.post('/api/todos', json=todo_data)
            created_ids.append(response.get_json()['todo']['id'])
        
        # Get all todos
        all_response = client.get('/api/todos')
        assert all_response.status_code == 200
        assert all_response.get_json()['count'] == 3
        
        # Complete some todos
        client.put(f'/api/todos/{created_ids[0]}', json={'completed': True})
        client.put(f'/api/todos/{created_ids[2]}', json={'completed': True})
        
        # Verify updates
        todo1 = client.get(f'/api/todos/{created_ids[0]}').get_json()['todo']
        todo2 = client.get(f'/api/todos/{created_ids[1]}').get_json()['todo']
        todo3 = client.get(f'/api/todos/{created_ids[2]}').get_json()['todo']
        
        assert todo1['completed'] is True
        assert todo2['completed'] is False
        assert todo3['completed'] is True
        
        # Delete one todo
        client.delete(f'/api/todos/{created_ids[1]}')
        
        # Verify count decreased
        final_response = client.get('/api/todos')
        assert final_response.get_json()['count'] == 2
