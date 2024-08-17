# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile

# Copy project files
COPY . /app/

# Build Next.js project
RUN yarn build

# Expose port and start the server
EXPOSE 3000
CMD ["yarn", "start"]
