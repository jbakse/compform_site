# Getting Started

Start by installing the project dependencies.

```
npm install
```

Then build and serve with

```
npm run start
```

| `npm run ...` | Description                                        |
| ------------- | -------------------------------------------------- |
| build:clean   | removes the `_site` directory                      |
| build:mkdir   | recreates the `_site` directory                    |
| build:sass    | compiles sass to css                               |
| build:11ty    | uses eleventy to build site content                |
| build         | does full build                                    |
| start         | full build, then watch and serve on localhost:8080 |
