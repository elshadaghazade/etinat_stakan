FROM ubuntu:latest
RUN apt update
RUN apt install -y python3-pip libpq-dev
WORKDIR /apps
COPY . .
RUN pip3 install -r requirements.txt
CMD [ "/usr/bin/python3", "manage.py", "runserver", "0.0.0.0:8000" ]