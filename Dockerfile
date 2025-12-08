FROM node:lts

WORKDIR /app

# Install dependencies first for caching
COPY package.json ./
RUN npm install

# Install Playwright dependencies for PDF export
RUN npx playwright install --with-deps chromium

# Copy the rest of the application
COPY . .

# Expose the default Slidev port
EXPOSE 3030

# Start the application
CMD ["npm", "run", "dev"]
