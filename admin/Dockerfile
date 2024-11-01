
#base image
FROM node:20.11.1-alpine


#working directory
WORKDIR /app

# Copy package.json,package-lock.json 
COPY package*.json ./

#install dependencies
RUN npm install

#copy the rest of the application files
COPY . .

#expose the port that running app
EXPOSE 5174

#start the application
CMD ["npm", "start"]
