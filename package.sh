pip install --platform manylinux2014_x86_64 --only-binary=:all: --implementation cp -t dependencies -r requirements.txt &&
cp .env dependencies &&
cp conversationally/api.py dependencies &&
cp -r workbench dependencies &&
cd dependencies &&
zip -r ../aws_lambda_artifact.zip . &&
cd .. &&
rm -rf dependencies
stat -f%z aws_lambda_artifact.zip