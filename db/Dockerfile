FROM mysql:8.0.0

ENV MYSQL_DATABASE twitclonedb
ENV MYSQL_ROOT_PASSWORD secret

COPY mysql.cnf /etc/mysql/conf.d/mysql.cnf
COPY setup.sql /docker-entrypoint-initdb.d/setup.sql
