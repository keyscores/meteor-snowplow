#FROM nfnty:arch-nodejs
FROM ubuntu:trusty

# RUN apt-get update && apt-get install -y curl wget unzip
# RUN curl -sL https://deb.nodesource.com/setup | bash -
# RUN apt-get install -y nodejs
RUN curl https://install.meteor.com/ | sh

WORKDIR /root
# RUN wget https://github.com/meteor/simple-todos/archive/master.zip && \
#     unzip master.zip
# WORKDIR /root/simple-todos-master
RUN meteor build . --architecture os.linux.x86_64
#RUN ls
#RUN meteor build . --architecture os.linux.x86_64 && \
RUN tar -xzf app.tar.gz -C ../

WORKDIR /root/bundle/programs/server
RUN npm install

EXPOSE 80

WORKDIR /root/bundle
CMD ["node", "main.js"]


#docker run -d -e ROOT_URL=http://myapp.com -e MONGO_URL=mongodb://new:asdf1234@dogen.mongohq.com:10077/ksdemosandbox -p 8080:80 keyscores/minimal-meteor-docker
