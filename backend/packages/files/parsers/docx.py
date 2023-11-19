from langchain.document_loaders import Docx2txtLoader
from models import File

from .common import process_file


def process_docx(file: File, brain_id):
    return process_file(
        file=file,
        loader_class=Docx2txtLoader,
        brain_id=brain_id,
    )
