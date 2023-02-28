FROM flashspys/nginx-static
# docker run -v /absolute/path/to/serve:/static -p 8080:80 

COPY public /static


