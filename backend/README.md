# Veristay Backend

This is the Flask backend for the Veristay application.

## Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3.  Activate the virtual environment:
    *   Windows: `.\venv\Scripts\Activate`
    *   macOS/Linux: `source venv/bin/activate`

4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Server

Start the development server:

```bash
python app.py
```

The API will be available at `http://localhost:5000`.

## Endpoints

*   `GET /`: Welcome message.
*   `GET /api/health`: Health check.
