# Twitter Clone 

Learning web development with [Spark School Twitter Clone Course](http://trysparkschool.com/courses/twitter-clone/).

## Running

```bash
docker-compose up
docker-compose down # preserve the database
docker-compose down -v # remove the database
```

## Developing

An independent development database will be started.

```bash
docker-compose -f dev.yml up
docker-compose -f dev.yml down -v
```
While the dev containers are up edit in [app/src](app/src) with your favorite editor and `nodemon` will restart the web server on write.
