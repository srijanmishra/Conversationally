pip install --platform manylinux2014_x86_64 --only-binary=:all: --implementation cp -t dependencies -r requirements.txt &&
cp .env dependencies &&
cp examples/web_voice_chat/api.py dependencies &&
cp -r workbench dependencies &&
cd dependencies &&
zip -r ../lambda_artifact.zip .