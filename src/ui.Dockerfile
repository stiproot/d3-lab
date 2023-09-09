FROM nginx:1.25.2-alpine-slim as base
# COPY ui.nginx.conf /etc/nginx/http.d/default.conf

FROM base as app
COPY index.html /usr/share/nginx/html/index.html

# FROM app as final
# EXPOSE 8080
# WORKDIR /
# CMD ["/bin/sh", "entrypoint.sh"]
