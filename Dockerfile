FROM node:12 as builder
USER node
ENV WORKSPACE=/home/node
RUN mkdir -p $WORKSPACE
WORKDIR $WORKSPACE
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:mainline-alpine
RUN addgroup -S hugo && adduser -S hugo -G hugo
USER hugo
COPY --from=builder /home/node/nginx.conf .
COPY --from=builder /home/node/dist/HugoQRBookWebContent /var/www/HugoQRBookWebContent
CMD ["nginx", "-c", "/nginx.conf", "-g", "daemon off;"]