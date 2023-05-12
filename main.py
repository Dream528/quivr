# main.py
import os
import tempfile

import streamlit as st
from files import file_uploader
from question import chat_with_doc
from brain import brain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import SupabaseVectorStore
from supabase import Client, create_client

# supabase_url = "https://fqgpcifsfmamprzldyiv.supabase.co"
supabase_url = st.secrets.supabase_url
supabase_key = st.secrets.supabase_service_key
openai_api_key = st.secrets.openai_api_key
supabase: Client = create_client(supabase_url, supabase_key)

embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
vector_store = SupabaseVectorStore(supabase, embeddings, table_name="documents")

# Set the theme
st.set_page_config(
    page_title="Second Brain",
    layout="wide",
    initial_sidebar_state="expanded",

)

st.title("🧠 Second Brain 🧠")
st.markdown("Store your knowledge in a vector store and query it with OpenAI's GPT-3/4.")
st.markdown("---\n\n")

# Initialize session state variables
if 'model' not in st.session_state:
    st.session_state['model'] = "gpt-3.5-turbo"
if 'temperature' not in st.session_state:
    st.session_state['temperature'] = 0.0
if 'chunk_size' not in st.session_state:
    st.session_state['chunk_size'] = 500
if 'chunk_overlap' not in st.session_state:
    st.session_state['chunk_overlap'] = 0

# Create a radio button for user to choose between adding knowledge or asking a question
user_choice = st.radio("Choose an action", ('Add Knowledge', 'Chat with your Brain','Forget' ))

st.markdown("---\n\n")



if user_choice == 'Add Knowledge':
    # Display chunk size and overlap selection only when adding knowledge
    st.sidebar.title("Configuration") 
    st.sidebar.markdown("Choose your chunk size and overlap for adding knowledge.")
    st.session_state['chunk_size'] = st.sidebar.slider("Select Chunk Size", 100, 1000, st.session_state['chunk_size'], 50)
    st.session_state['chunk_overlap'] = st.sidebar.slider("Select Chunk Overlap", 0, 100, st.session_state['chunk_overlap'], 10)
    file_uploader(supabase, openai_api_key, vector_store)
elif user_choice == 'Chat with your Brain':
    # Display model and temperature selection only when asking questions
    st.sidebar.title("Configuration") 
    st.sidebar.markdown("Choose your model and temperature for asking questions.")
    st.session_state['model'] = st.sidebar.selectbox("Select Model", ["gpt-3.5-turbo", "gpt-4"], index=("gpt-3.5-turbo", "gpt-4").index(st.session_state['model']))
    st.session_state['temperature'] = st.sidebar.slider("Select Temperature", 0.0, 1.0, st.session_state['temperature'], 0.1)
    chat_with_doc(openai_api_key, vector_store)
elif user_choice == 'Forget':
    st.sidebar.title("Configuration")
    
    brain(supabase)

st.markdown("---\n\n")