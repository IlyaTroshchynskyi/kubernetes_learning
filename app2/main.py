from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='App2')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health-check', status_code=204, response_class=Response)
async def health_check() -> None:
    return None


@app.get('/current-user')
async def get_current_user():
    return {
        'id': 1,
        'username': 'john_doe',
        'email': 'john.doe@example.com',
        'first_name': 'John',
        'last_name': 'Doe',
        'is_active': True,
        'role': 'admin',
    }
