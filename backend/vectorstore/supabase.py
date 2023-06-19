from typing import Any, List

from langchain.chains import ConversationalRetrievalChain, LLMChain
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI, ChatVertexAI
from langchain.client import arun_on_dataset
from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI, VertexAI
from langchain.prompts.prompt import PromptTemplate
from langchain.vectorstores import SupabaseVectorStore
from supabase import Client, create_client


class CustomSupabaseVectorStore(SupabaseVectorStore):
    '''A custom vector store that uses the match_vectors table instead of the vectors table.'''
    user_id: str
    def __init__(self, client: Client, embedding: OpenAIEmbeddings, table_name: str, user_id: str = "none"):
        super().__init__(client, embedding, table_name)
        self.user_id = user_id
    
    def similarity_search(
        self, 
        query: str, 
        user_id: str = "none",
        table: str = "match_vectors", 
        k: int = 6, 
        threshold: float = 0.5, 
        **kwargs: Any
    ) -> List[Document]:
        vectors = self._embedding.embed_documents([query])
        query_embedding = vectors[0]
        res = self._client.rpc(
            table,
            {
                "query_embedding": query_embedding,
                "match_count": k,
                "p_user_id": self.user_id,
            },
        ).execute()

        match_result = [
            (
                Document(
                    metadata=search.get("metadata", {}),  # type: ignore
                    page_content=search.get("content", ""),
                ),
                search.get("similarity", 0.0),
            )
            for search in res.data
            if search.get("content")
        ]

        documents = [doc for doc, _ in match_result]

        return documents