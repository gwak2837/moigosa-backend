FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /server

# Copy necessary files
COPY package.json yarn.lock ./

# Copy JavaScript files
COPY src src

# Install only dependency packages 
RUN yarn install

EXPOSE $PORT

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]