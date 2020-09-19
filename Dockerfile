FROM nginx:mainline-alpine
COPY nginx.conf /etc/nginx/hugoqrbook.conf
RUN mkdir -p /var/www/HugoQRBookWebContent
COPY dist/HugoQRBookWebContent /var/www/HugoQRBookWebContent
CMD ["nginx", "-c", "/etc/nginx/hugoqrbook.conf", "-g", "daemon off;"]