FROM python:3.12-slim

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy the application into the container.
COPY . /app2

# Install the application dependencies.
WORKDIR /app2
RUN uv sync --frozen --no-cache

# Run the application.
CMD ["/app2/.venv/bin/fastapi", "run", "main.py", "--port", "8020", "--host", "0.0.0.0"]
