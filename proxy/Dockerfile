# Pull in the from the official nginx image.
FROM nginx:1.21-alpine

EXPOSE 80

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

# Copy config template and custom shell script.
COPY config/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY config/docker-entrypoint.sh /
RUN chmod 755 docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]