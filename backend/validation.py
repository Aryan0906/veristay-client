"""Input validation for API requests."""
from typing import Dict, Any, Tuple, Optional


class ValidationError(Exception):
    """Custom validation error."""
    pass


def validate_todo_create(data: Dict[str, Any]) -> Tuple[str, str]:
    """
    Validate todo creation data.
    
    Args:
        data: Dictionary containing todo data
        
    Returns:
        Tuple of (title, description)
        
    Raises:
        ValidationError: If validation fails
    """
    if not isinstance(data, dict):
        raise ValidationError("Request body must be a JSON object")
    
    title = data.get('title')
    if not title:
        raise ValidationError("Title is required")
    
    if not isinstance(title, str):
        raise ValidationError("Title must be a string")
    
    title = title.strip()
    if not title:
        raise ValidationError("Title cannot be empty or whitespace")
    
    if len(title) > 200:
        raise ValidationError("Title must be 200 characters or less")
    
    description = data.get('description', '')
    if description is not None and not isinstance(description, str):
        raise ValidationError("Description must be a string")
    
    if isinstance(description, str) and len(description) > 1000:
        raise ValidationError("Description must be 1000 characters or less")
    
    return title, description


def validate_todo_update(data: Dict[str, Any]) -> Tuple[Optional[str], Optional[str], Optional[bool]]:
    """
    Validate todo update data.
    
    Args:
        data: Dictionary containing todo data
        
    Returns:
        Tuple of (title, description, completed)
        
    Raises:
        ValidationError: If validation fails
    """
    if not isinstance(data, dict):
        raise ValidationError("Request body must be a JSON object")
    
    if not data:
        raise ValidationError("At least one field must be provided for update")
    
    title = None
    description = None
    completed = None
    
    # Validate title if provided
    if 'title' in data:
        title = data['title']
        if not isinstance(title, str):
            raise ValidationError("Title must be a string")
        title = title.strip()
        if not title:
            raise ValidationError("Title cannot be empty or whitespace")
        if len(title) > 200:
            raise ValidationError("Title must be 200 characters or less")
    
    # Validate description if provided
    if 'description' in data:
        description = data['description']
        if description is not None and not isinstance(description, str):
            raise ValidationError("Description must be a string")
        if isinstance(description, str) and len(description) > 1000:
            raise ValidationError("Description must be 1000 characters or less")
    
    # Validate completed if provided
    if 'completed' in data:
        completed = data['completed']
        if not isinstance(completed, bool):
            raise ValidationError("Completed must be a boolean")
    
    # Check for unexpected fields
    allowed_fields = {'title', 'description', 'completed'}
    unexpected_fields = set(data.keys()) - allowed_fields
    if unexpected_fields:
        raise ValidationError(f"Unexpected fields: {', '.join(unexpected_fields)}")
    
    return title, description, completed


def validate_todo_id(todo_id: str) -> int:
    """
    Validate and convert todo ID.
    
    Args:
        todo_id: String representation of todo ID
        
    Returns:
        Integer todo ID
        
    Raises:
        ValidationError: If validation fails
    """
    try:
        id_int = int(todo_id)
        if id_int <= 0:
            raise ValidationError("Todo ID must be a positive integer")
        return id_int
    except ValueError:
        raise ValidationError("Todo ID must be a valid integer")
