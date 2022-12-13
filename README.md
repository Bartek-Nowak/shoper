# SHOPER

## How to run the project?

### First step
Install all dependencies

```shell
    npm i
```

### Step two
Start the JSON server

```shell
    npx json-server --watch data/db.json --port 8000
```

### Step three
In a second terminal, run project

```shell
    npm run start
```

## Errors
If you want to check error handling, don't start JSON server.

## My comments
The extension of the project should be the dynamic download of categories and brands. The server should return an object with brands assigned to a given category. Thanks to this, the user will not see brands that do not produce products from the wrong category. Unfortunately, I don't have time before the deadline. However, I hope that I will still get a chance to finish the project.