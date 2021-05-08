FROM python:latest

WORKDIR /

RUN pip install flask
RUN pip install pymongo

COPY . .

EXPOSE 2000

CMD ["flask", "run", "--port=2000", "--host=0.0.0.0"]