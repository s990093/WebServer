# Use the official Nginx image as a base
FROM nginx:latest

# Install dependencies and build tools
RUN apt-get update && apt-get install -y \
    wget \
    build-essential \
    libpcre3 \
    libpcre3-dev \
    zlib1g \
    zlib1g-dev \
    libssl-dev \
    libgd-dev \         
    libgd-tools \      
    && rm -rf /var/lib/apt/lists/*

# Download and compile Nginx with image_filter module
RUN wget http://nginx.org/download/nginx-1.24.0.tar.gz \
    && tar -zxvf nginx-1.24.0.tar.gz \
    && cd nginx-1.24.0 \
    && ./configure --with-http_image_filter_module \
    && make \
    && make install


# Copy the Nginx configuration file
# COPY ./script/nginx2/nginx2.conf /etc/nginx/nginx.conf
# default
# COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# Expose port 8002
EXPOSE 8002

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
