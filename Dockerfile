FROM nginx:mainline-alpine
RUN addgroup -S hugo && adduser -S hugo -G hugo
USER hugo
COPY nginx.conf /home/hugo/hugoqrbook.conf
COPY dist/HugoQRBookWebContent /var/www/HugoQRBookWebContent
CMD ["nginx", "-c", "/home/hugo/hugoqrbook.conf", "-g", "daemon off;"]