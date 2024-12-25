# Chọn image base cho Node.js
FROM node:18

# Set thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà server sẽ chạy (ví dụ cổng 3000)
EXPOSE 5000

# Chạy server
CMD ["npm", "start"]
