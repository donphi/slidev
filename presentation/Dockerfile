FROM node:lts

# Update npm to specific version for reproducible builds
RUN npm install -g npm@11.6.4

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

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3030', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start the application
CMD ["npm", "run", "dev"]

