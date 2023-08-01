from concurrent.futures import ThreadPoolExecutor
from typing import List

from langchain.embeddings.openai import OpenAIEmbeddings
from logger import get_logger
from models.settings import BrainSettings, CommonsDep, common_dependencies
from pydantic import BaseModel

logger = get_logger(__name__)


class Neurons(BaseModel):
    commons: CommonsDep
    settings = BrainSettings()  # pyright: ignore reportPrivateUsage=none

    def create_vector(self, doc, user_openai_api_key=None):
        logger.info("Creating vector for document")
        logger.info(f"Document: {doc}")
        if user_openai_api_key:
            self.commons["documents_vector_store"]._embedding = OpenAIEmbeddings(
                openai_api_key=user_openai_api_key
            )  # pyright: ignore reportPrivateUsage=none
        try:
            sids = self.commons["documents_vector_store"].add_documents([doc])
            if sids and len(sids) > 0:
                return sids

        except Exception as e:
            logger.error(f"Error creating vector for document {e}")

    def create_embedding(self, content):
        return self.commons["embeddings"].embed_query(content)

    def similarity_search(self, query, table="match_summaries", top_k=5, threshold=0.5):
        query_embedding = self.create_embedding(query)
        summaries = self.commons["db"].similarity_search(query_embedding, table, top_k, threshold)
        return summaries.data


def error_callback(exception):
    print("An exception occurred:", exception)


def process_batch(batch_ids: List[str]):
    commons = common_dependencies()
    db = commons["db"]
    try:
        if len(batch_ids) == 1:
            return (db.get_vectors_by_batch(batch_ids[0])).data
        else:
            return (db.get_vectors_in_batch(batch_ids)).data
    except Exception as e:
        logger.error("Error retrieving batched vectors", e)


def get_unique_files_from_vector_ids(vectors_ids: List[str]):
    # Move into Vectors class
    """
    Retrieve unique user data vectors.
    """

    # constants
    BATCH_SIZE = 5

    with ThreadPoolExecutor() as executor:
        futures = []
        for i in range(0, len(vectors_ids), BATCH_SIZE):
            batch_ids = vectors_ids[i : i + BATCH_SIZE]
            future = executor.submit(process_batch, batch_ids)
            futures.append(future)

        # Retrieve the results
        vectors_responses = [future.result() for future in futures]

    documents = [item for sublist in vectors_responses for item in sublist]
    print("document", documents)
    unique_files = [dict(t) for t in set(tuple(d.items()) for d in documents)]
    return unique_files
