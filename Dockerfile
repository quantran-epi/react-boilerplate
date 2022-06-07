# FROM node:14-alpine AS development
# ENV NODE_ENV development
# # Add a work directory
# WORKDIR /app
# # Cache and Install dependencies
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install
# # Copy app files
# COPY . .
# # Expose port
# EXPOSE 3000
# # Start the app
# CMD [ "yarn", "start" ]

FROM node:14-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Copy app files
COPY . .

# Expose port
EXPOSE 3000
# Start nginx
CMD ["serve", "build"]