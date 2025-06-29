import asyncio
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger('task1')

async def run_task() -> int:
    logger.info('Running task 1')
    await asyncio.sleep(5)
    logger.info('Task 1 finished')

    return 3




if __name__ == '__main__':
    asyncio.run(run_task())