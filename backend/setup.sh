#!/bin/bash

echo "🔧 GigFlow Backend Setup Script"
echo "================================"
echo ""
echo "Please follow these steps to get your MongoDB Atlas password:"
echo ""
echo "1. Open https://cloud.mongodb.com in your browser"
echo "2. Go to: Database Access (left sidebar)"
echo "3. Find user: adnanrizvi2004_db_user"
echo "4. Click 'Edit' button"
echo "5. Click 'Edit Password'"
echo "6. Click 'Autogenerate Secure Password'"
echo "7. COPY THE PASSWORD (you won't see it again!)"
echo "8. Click 'Update User'"
echo ""
read -p "Paste your MongoDB password here: " MONGO_PASSWORD
echo ""

# Create .env file
cat > .env << EOF
PORT=5001
MONGO_URI=mongodb+srv://adnanrizvi2004_db_user:${MONGO_PASSWORD}@cluster0.lcoup1b.mongodb.net/gigflow?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=gigflow_super_secret_jwt_key_2024_adnan_rizvi_servicehive
NODE_ENV=development
CLIENT_URL=http://localhost:5173
EOF

echo "✅ .env file created successfully!"
echo ""
echo "Starting backend server..."
npm run dev
