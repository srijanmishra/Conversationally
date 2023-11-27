## Setup Local Environment

### Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/download)
2. [Python](https://www.python.org/downloads/)
3. [Conda](https://docs.conda.io/en/latest/miniconda.html)

### Setup

<pre><code id="bash">git clone https://github.com/life-efficient/Parapet-Workbench.git</pre></code>
<pre><code id="bash">cd Parapet-Workbench</pre></code>
<pre><code id="bash">conda env create -f workbench.yml</pre></code>
<pre><code id="bash">conda activate workbench</pre></code>


### Run voice_chat.py example

#### Run via Visual Studio Code
1. Open ```examples/voice_chat.py```
2. Select appropriate 'conda python kernel'
3. Add ChatGPT API key
4. Use ```SHIFT + ENTER``` to run the 'cell'

#### Run via Command Line
1. Add ChatGPT API key
2. <pre><code id="bash">/usr/local/anaconda3/bin/python3 examples/voice_chat.py</pre></code>

