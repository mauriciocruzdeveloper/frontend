FROM node:18

RUN apt-get update && apt-get install libvips-dev -y

WORKDIR /opt/

COPY ./package.json ./

ENV PATH /opt/node_modules/.bin:$PATH

RUN npm install

WORKDIR /opt/app

COPY ./ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
