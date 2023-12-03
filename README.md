# Setup Local Environment

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/download)
2. [Python](https://www.python.org/downloads/)
3. [Conda](https://docs.conda.io/en/latest/miniconda.html)

## Setup

Clone the repo

```
git clone https://github.com/life-efficient/Parapet-Workbench.git
```

Move into the repo

```
cd Parapet-Workbench
```

If using M1/M2 maxbook run this command before creating environment from workbench.yml file:

```
conda config --env --set subdir osx-64
```

Create the environment

```
conda env create -f env.yml
```

Activate the environment

```
conda activate env
```

# Deploying to AWS

Download all dependencies locally because they need to be sent along with our code to the cloud

```
pip3 install -t dependencies -r requirements.txt
```

Create lambda artifact for deploying to AWS

```
(cd dependencies; zip ../aws_lambda_artifact.zip -r .)
```

zip aws_lambda_artifact.zip -u examples/web_voice_chat/api.py
zip aws_lambda_artifact.zip -u workbench -r

- Allow function endpoints in advanced configuration
- Ensure Lambda runs arm64 architecture rather than x86 during configuration
- Set the correct function handler

## Run voice_chat.py example

### Run via Visual Studio Code

1. Open `examples/voice_chat.py`
2. Select appropriate 'conda python kernel'
3. Add ChatGPT API key
4. Use `SHIFT + ENTER` to run the 'cell'

## Authentication

Many APIs used here require API keys.

Add a file called `.env` in the root folder and set the appropriate values for your API keys.

```
OPENAI_API_KEY=sk-scmsdkmskclsdmckdslcmsdkcsdcsdcdsc
ELEVEN_API_KEY=csdcosmcosmcsdokcmsdocmdsoc
```

## How to run the web-based voice chat locally for development

Install the [Preview on Web Server](https://marketplace.visualstudio.com/items?itemName=yuichinukiyama.vscode-preview-server) VSCode extension

1. Open the `index.html` file
2. Press `CTRL + SHIFT + l` to open a preview in the web browser

Return to VSCode.

Run this from the terminal:

```
uvicorn examples.web_voice_chat.api:app --reload
```

The `--reload` flag will cause the API to restart when changes are detected in the repo.
