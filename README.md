# iSMAIL

Next generation **i**map**S**ync**MAIL** managment.

## Quickstart

```yml
services:
  ismail:
    build: ./src/docker
    container_name: ismail
    hostname: ismail
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./config.yml:/app/config.yml
      - ./data:/app/data
```




