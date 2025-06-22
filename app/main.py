import logging

from fastapi import FastAPI, APIRouter, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse

from app.config import get_settings

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s %(name)s %(message)s',
)



router = APIRouter(tags=['Admin'])


@router.get('/', status_code=200)
async def handle_request():
    s = get_settings()
    html_content = (f"<div>"
                    f"<p1>Hello World version={s.PROJECT_NAME}</p>"
                    f"<p1>Description={s.PROJECT_DESCRIPTION}</p>"
                    f"<p1>Key={s.API_KEY}</p>"
                    f"</div>")
    return HTMLResponse(content=html_content, status_code=200)

@router.get('/users', status_code=200)
async def get_users():
    return [{'id': 1, 'name': 'John', 'age': 18}, {'id': 2, 'name': 'Jane', 'age': 20}]


@router.get('/health-check', status_code=204, response_class=Response)
async def check_service_running() -> None:
    return None


def create_app() -> FastAPI:

    _app = FastAPI(title='Test', version='0.1.0', root_path='/api')

    _app.include_router(router)


    _app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    return _app


app = create_app()