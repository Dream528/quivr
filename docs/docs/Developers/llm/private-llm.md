---
sidebar_position: 1
title: Hugging Face Integration 🤗
---

# Private Language Models with Quivr

Quivr introduces the groundbreaking feature of integrating private Large Language Models (LLMs) powered by HuggingFace. This enhancement ensures your data's confidentiality, as all processing is performed locally on your server.

## Running Mistral with Huggingface Inference Endpoint

### 1. Deploy the Model
- Navigate to the [Mistral AI model page](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) on Huggingface.
- Select the option for 'Inference Endpoints'.
- Please note that we recommend the Mistral 7B Instruct model, especially tailored for chat applications.

### 2. Create the Endpoint
- Feel free to assign a custom name to your endpoint.
- Select a location and adhere to the recommended instance size.
- Click to confirm and create your endpoint.

### 3. Obtain Credentials
- Allow some time for your instance to initialize.
- Securely copy both the API URL and your Bearer Token for future use.

### 4. Install Quivr
- To set up Quivr, kindly follow the concise 3-step installation guide provided in our [readme.md](https://github.com/Quivr/README.md).
- Important: Configure environmental variables in your backend/.env file, including the Huggingface API key for seamless integration.

### 5. Configure Your Supabase Instance
- Within your Supabase instance, locate the user_settings table.
- Here, input the following path: "huggingface/mistralai/Mistral-7B-Instruct-v0.1".

As a result, you'll have Quivr running locally with Mistral, now hosted via Huggingface. For those interested in a hassle-free experience, visit [Quivr.app](https://quivr.app) to leverage Mistral at no cost, all thanks to Huggingface. The source code for this setup is [available here](https://github.com/Quivr/SourceCode).

Experience the enhanced privacy and control with Quivr's Private LLM feature today!
