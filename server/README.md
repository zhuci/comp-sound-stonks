# Setting up the server side

## Install requirements

```
$ virtualenv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```

## Start the server

```
$ uvicorn main:app --reload
```
