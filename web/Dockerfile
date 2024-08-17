# Base image
FROM node:18-alpine

# Install Yarn globally and force overwrite
RUN npm install -g yarn --force

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy project files
COPY . .


# Build Next.js project
# RUN yarn build

# Expose port and start the server
EXPOSE 3000

# RUN yarn build
CMD ["yarn", "start"]
