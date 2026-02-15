"""Data models for the application."""
from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass, field, asdict


@dataclass
class Todo:
    """Todo item model."""
    id: int
    title: str
    description: str = ""
    completed: bool = False
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> Dict:
        """Convert todo to dictionary."""
        return asdict(self)

    def update(self, title: Optional[str] = None, description: Optional[str] = None, 
               completed: Optional[bool] = None) -> None:
        """Update todo fields."""
        if title is not None:
            self.title = title
        if description is not None:
            self.description = description
        if completed is not None:
            self.completed = completed
        self.updated_at = datetime.utcnow().isoformat()


class TodoStore:
    """In-memory storage for todos."""
    
    def __init__(self):
        self.todos: Dict[int, Todo] = {}
        self.next_id: int = 1

    def create(self, title: str, description: str = "") -> Todo:
        """Create a new todo."""
        todo = Todo(id=self.next_id, title=title, description=description)
        self.todos[self.next_id] = todo
        self.next_id += 1
        return todo

    def get_all(self) -> List[Todo]:
        """Get all todos."""
        return list(self.todos.values())

    def get_by_id(self, todo_id: int) -> Optional[Todo]:
        """Get a todo by ID."""
        return self.todos.get(todo_id)

    def update(self, todo_id: int, title: Optional[str] = None, 
               description: Optional[str] = None, completed: Optional[bool] = None) -> Optional[Todo]:
        """Update a todo."""
        todo = self.get_by_id(todo_id)
        if todo:
            todo.update(title=title, description=description, completed=completed)
        return todo

    def delete(self, todo_id: int) -> bool:
        """Delete a todo."""
        if todo_id in self.todos:
            del self.todos[todo_id]
            return True
        return False

    def clear(self) -> None:
        """Clear all todos (useful for testing)."""
        self.todos.clear()
        self.next_id = 1
