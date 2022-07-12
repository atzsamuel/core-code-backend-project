## CONFIGURATION ORACLE DATABASE
#https://hub.docker.com/r/gvenzl/oracle-xe  for more information
#$docker pull gvenzl/oracle-xe (if you have not already downloaded the image via the Docker Hub,version:21.3.0)
# RUN:
#$docker run -d -p 1521:1521 -e ORACLE_PASSWORD=holamundo -e APP_USER=appuser -e APP_USER_PASSWORD=mipassword -v oracle-volume:/opt/oracle/oradata gvenzl/oracle-xe


## NODE JS APPLICATION
#https://hub.docker.com/_/oraclelinux for more info
#$docker pull oraclelinux/nodejs
## Build
#$docker build -t backend:0.1.0 -f back.dockerfile .
## Run ( pass environment variables with -e )
#$docker run -p 8500:8500 -d -e ORACLE_USER=appuser -e ORACLE_PASSSWORD=mipassword -e ORACLE_CONNECT_STRING=172.17.0.2:1521/xepdb1 backend:0.1.0

FROM oraclelinux:8.6

# Install Oracle client
# https://www.oracle.com/au/database/technologies/instant-client/linux-x86-64-downloads.html#ic_x64_inst
# https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/install-instant-client-using-rpm.html
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

# Install Nodejs
RUN dnf module install nodejs:16 -y

# Environment variables for Nodejs and Oracle client *.env* 
ENV SERVER_PORT=8500 \
    ORACLE_USER=user \
    ORACLE_PASSSWORD=pass \
    ORACLE_CONNECT_STRING=localhost:1521/orclpdb

# Copy the files to the container
COPY . /opt/app

WORKDIR /opt/app
# Run the app
RUN npm install
CMD [ "npm","start" ]