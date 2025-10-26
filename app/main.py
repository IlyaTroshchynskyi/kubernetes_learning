import logging

from fastapi import APIRouter, FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
from starlette.responses import HTMLResponse

from app.config import get_settings
from app.database import Base, engine
from app.routes import products

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s %(name)s %(message)s',
)

router = APIRouter(tags=['Admin'])


@router.get('/', status_code=200)
async def handle_request():
    logging.info('Main route')
    s = get_settings()
    html_content = (
        f'<div>'
        f'<p1>Hello World version={s.PROJECT_NAME}</p>'
        f'<p1>Description={s.PROJECT_DESCRIPTION}</p>'
        f'<p1>Key={s.API_KEY}</p>'
        f'<p1>Password DB from parameter store={s.SUPER_PASSWORD_DB}</p>'
        f'</div>'
    )
    return HTMLResponse(content=html_content, status_code=200)


@router.get('/users', status_code=200)
async def get_users():
    logging.info('Get users')
    return [{'id': 1, 'name': 'John', 'age': 18}, {'id': 2, 'name': 'Jane', 'age': 20}]


@router.get('/current-user-from-app2', status_code=200)
async def get_current_user_from_app2():
    logging.info('Fetching current user from app2')

    s = get_settings()
    app2_url = f'{s.APP2_URL}/current-user'

    async with httpx.AsyncClient() as client:
        response = await client.get(app2_url)
        response.raise_for_status()
        return response.json()


@router.get('/health-check', status_code=204, response_class=Response)
async def check_service_running() -> None:
    return None


def create_app() -> FastAPI:
    _app = FastAPI(title='Test', version='0.1.0', root_path='/api')

    _app.include_router(router)
    _app.include_router(products.router)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    # Create database tables
    Base.metadata.create_all(bind=engine)

    return _app


app = create_app()
