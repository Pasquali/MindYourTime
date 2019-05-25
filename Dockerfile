FROM nginx:1.15.12

RUN rm -rf ./usr/share/nginx/hmtl/*

COPY ./config/nginx.conf ./etc/nginx/conf.d/

COPY ./dist ./usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
