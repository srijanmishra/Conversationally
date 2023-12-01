# Setup Local Environment

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/download)
2. [Python](https://www.python.org/downloads/)
3. [Conda](https://docs.conda.io/en/latest/miniconda.html)

## Setup

- <pre><code id="bash">git clone https://github.com/life-efficient/Parapet-Workbench.git</pre></code>
- <pre><code id="bash">cd Parapet-Workbench</pre></code>
- If required, modify python version (`python=3.10`) in `workbench.yml`
- <pre><code id="bash">conda env create -f workbench.yml</pre></code>
- <pre><code id="bash">conda activate workbench</pre></code>

## Run voice_chat.py example

### Run via Visual Studio Code

1. Open `examples/voice_chat.py`
2. Select appropriate 'conda python kernel'
3. Add ChatGPT API key
4. Use `SHIFT + ENTER` to run the 'cell'

### Run via Command Line

1. Add ChatGPT API key
2. <pre><code id="bash">/usr/local/anaconda3/bin/python3 examples/voice_chat.py</pre></code>

## Useful commands

- <pre><code id="bash">conda env list</pre></code>
- <pre><code id="bash">conda env remove --name workbench</pre></code>
- <pre><code id="bash">conda install ipykernel # (allows Jupyter to use different Python kernels)</pre></code>

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
