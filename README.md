# Quivr - Your Second Brain, Empowered by Generative AI

<div align="center">
    <img src="./logo.png" alt="Quivr-logo" width="30%"  style="border-radius: 50%; padding-bottom: 20px"/>
</div>

<div align="center">
<a href="https://discord.gg/HUpRgp2HG8">
  <img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" alt="Join our Discord" height="40">
</a>
</div>

Quivr, your second brain, utilizes the power of GenerativeAI to store and retrieve unstructured information. Think of it as Obsidian, but turbocharged with AI capabilities.

## Key Features 🎯

- **Universal Data Acceptance**: Quivr can handle almost any type of data you throw at it. Text, images, code snippets, we've got you covered.
- **Generative AI**: Quivr employs advanced AI to assist you in generating and retrieving information.
- **Fast and Efficient**: Designed with speed and efficiency at its core. Quivr ensures rapid access to your data.
- **Secure**: Your data, your control. Always.
- **File Compatibility**: 
  - Text
  - Markdown
  - PDF
  - Powerpoint
  - Excel
  - Word
  - Audio
  - Video
- **Open Source**: Freedom is beautiful, so is Quivr. Open source and free to use.

## Demo Highlights 🎥

> **Please note: The DEMO WITH STREAMLIT IS USING AN OLD VERSION**  
> The new version showcases a fresh UI, however, it is not yet deployed as it lacks some features of the old version. Expected to go live before 25/05/23

### **Demo with GPT3.5**:
https://github.com/StanGirard/quivr/assets/19614572/80721777-2313-468f-b75e-09379f694653

### **Demo with Claude 100k context**: https://github.com/StanGirard/quivr/assets/5101573/9dba918c-9032-4c8d-9eea-94336d2c8bd4

### **Demo of the new version (Work in progress)**: 
https://github.com/StanGirard/quivr/assets/19614572/a6463b73-76c7-4bc0-978d-70562dca71f5

## Getting Started: New Version 🚀

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

**Old version's readme** is located in the streamlit-demo folder [here](streamlit-demo/README.md)

### Prerequisites 📋

Before you proceed, ensure you have the following installed:

- Docker
- Docker Compose

Additionally, you'll need a [Supabase](https://supabase.com/) account for:

- Creating a new Supabase project
- Supabase Project API key
- Supabase Project URL

### Installation Steps 💽

- **Step 0**: If needed, here is the installation explained on Youtube [here](https://youtu.be/rC-s4QdfY80)

- **Step 1**: Clone the repository using **one** of these commands:

  - If you don't have an SSH key set up:
  
  ```bash
  git clone https://github.com/StanGirard/Quivr.git && cd Quivr
  ```
  - If you have an SSH key set up or want to add it ([guide here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account))
  
  ```bash
  git clone git@github.com:StanGirard/Quivr.git && cd Quivr
  ```

- **Step 2**: Copy the `.XXXXX_env` files

```bash
cp .backend_env.example backend/.env
cp .frontend_env.example frontend/.env
```

- **Step 3**: Update the `backend/.env` and `frontend/.env` file 

> _Your `supabase_service_key` can be found in your Supabase dashboard under Project Settings -> API. Use the `anon` `public` key found in the `Project API keys` section._
> _Your  `JWT_SECRET_KEY`can be found in your supabase settings under Project Settings -> JWT Settings -> JWT Secret_

- **Step 4**: Run the following migration scripts on the Supabase database via the web interface (SQL Editor -> `New query`)

[Migration Script 1](scripts/supabase_new_store_documents.sql)

[Migration Script 2](scripts/supabase_usage_table.sql)

[Migration Script 3](scripts/supabase_vector_store_summary.sql)

- **Step 5**: Launch the app

```bash
docker compose build && docker compose up
```

- **Step 6**: Navigate to `localhost:3000` in your browser



## Contributors ✨

Thanks goes to these wonderful people:
<a href="https://github.com/stangirard/quivr/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=stangirard/quivr" />
</a>

## Contribute 🤝

Got a pull request? Open it, and we'll review it as soon as possible. Check out our project board [here](https://github.com/users/StanGirard/projects/5) to see what we're currently focused on, and feel free to bring your fresh ideas to the table!


- [Roadmap](https://github.com/users/StanGirard/projects/5)
- [Open Issues](https://github.com/StanGirard/quivr/issues)
- [Open Pull Requests](https://github.com/StanGirard/quivr/pulls)
- [Good First Issues](https://github.com/StanGirard/quivr/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
- [Frontend Issues](https://github.com/StanGirard/quivr/issues?q=is%3Aopen+is%3Aissue+label%3Afrontend)
- [Backend Issues](https://github.com/StanGirard/quivr/issues?q=is%3Aopen+is%3Aissue+label%3Abackend)

