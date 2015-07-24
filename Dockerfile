#FROM nfnty:arch-nodejs
FROM ubuntu:trusty
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -y nodejs
RUN curl https://install.meteor.com/ | sh

#WORKDIR /root
RUN ls
RUN meteor build . --directory --architecture os.linux.x86_64

WORKDIR /root/bundle/programs/server
RUN npm install

EXPOSE 80

WORKDIR /root/bundle
CMD ["node", "main.js"]

#docker run -d -e ROOT_URL=http://myapp.com -e MONGO_URL=mongodb://new:asdf1234@dogen.mongohq.com:10077/ksdemosandbox -p 8080:80 keyscores/minimal-meteor-docker
