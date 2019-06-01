FROM nginx:1.15.12

RUN rm -rf ./usr/share/nginx/hmtl/*
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d

ADD ./config/conf.d /etc/nginx/conf.d

COPY ./dist ./usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
