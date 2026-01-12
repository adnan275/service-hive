# GigFlow - Freelance Marketplace Platform

A modern, full-stack freelance marketplace where clients post jobs (Gigs) and freelancers submit bids. Built with the MERN stack, featuring real-time notifications and atomic transaction handling.

## 🚀 Features

### Core Features
- ✅ **Secure Authentication** - JWT-based auth with HttpOnly cookies
- ✅ **Fluid User Roles** - Any user can be both a client and a freelancer
- ✅ **Gig Management** - Create, browse, and search job postings
- ✅ **Bidding System** - Submit competitive bids with custom pricing
- ✅ **Smart Hiring Logic** - Atomic updates with MongoDB transactions
- ✅ **Real-time Notifications** - Instant Socket.io notifications when hired
- ✅ **Dark Theme UI** - Modern, premium design with blue accents

### Technical Highlights
- 🔒 **Race Condition Prevention** - MongoDB transactions ensure only one freelancer is hired
- ⚡ **Real-time Updates** - Socket.io integration for instant notifications
- 🎨 **Premium UI/UX** - Dark theme with glassmorphism and glow effects
- 📱 **Fully Responsive** - Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Socket.io-client
- Context API (State Management)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Socket.io
- Cookie-parser

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd service\ hive
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB URI and JWT secret
# PORT=5001
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key_here
# NODE_ENV=development
# CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env

# Edit .env if needed
# VITE_API_URL=http://localhost:5001/api
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will run on http://localhost:5001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Client will run on http://localhost:5173

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Gig Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/gigs` | Get all open gigs (with search) | No |
| GET | `/api/gigs/:id` | Get single gig | No |
| POST | `/api/gigs` | Create new gig | Yes |
| GET | `/api/gigs/my-gigs` | Get user's posted gigs | Yes |

### Bid Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/bids` | Submit bid | Yes |
| GET | `/api/bids/:gigId` | Get all bids for gig (owner only) | Yes |
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer | Yes |
| GET | `/api/bids/my-bids` | Get user's submitted bids | Yes |

## 🎯 Key Features Explained

### 1. Hiring Logic with MongoDB Transactions

The hire endpoint uses MongoDB transactions to ensure data consistency:

```javascript
// Atomic operations:
1. Update gig status: open → assigned
2. Update chosen bid: pending → hired
3. Reject all other bids: pending → rejected
4. Emit Socket.io notification
```

This prevents race conditions where two admins might try to hire different freelancers simultaneously.

### 2. Real-time Notifications

When a freelancer is hired:
- Socket.io emits an event to the freelancer's connected socket
- Notification appears instantly without page refresh
- Message: "You have been hired for [Project Name]!"

### 3. Search & Filter

Users can search gigs by title using the search bar on the Browse Gigs page.

## 🎨 UI/UX Features

- **Dark Theme** - Deep black/navy backgrounds
- **Blue Accents** - Vibrant blue for CTAs and highlights
- **Glassmorphism** - Frosted glass effect on cards
- **Glow Effects** - Subtle blue glows on interactive elements
- **Smooth Animations** - Fade-ins and hover transitions
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
service hive/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── gigController.js
│   │   └── bidController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Gig.js
│   │   └── Bid.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── gigRoutes.js
│   │   └── bidRoutes.js
│   ├── socket/
│   │   └── socket.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── GigCard.jsx
    │   │   ├── BidCard.jsx
    │   │   └── NotificationToast.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── NotificationContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── BrowseGigs.jsx
    │   │   ├── PostGig.jsx
    │   │   ├── GigDetails.jsx
    │   │   ├── MyGigs.jsx
    │   │   ├── GigBids.jsx
    │   │   ├── MyBids.jsx
    │   │   └── Dashboard.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## 🧪 Testing the Application

### 1. User Registration & Login
- Register a new user
- Login with credentials
- Verify JWT cookie is set

### 2. Post a Gig (as Client)
- Navigate to "Post Gig"
- Fill in title, description, and budget
- Submit and verify it appears in "My Gigs"

### 3. Submit a Bid (as Freelancer)
- Browse available gigs
- Click on a gig to view details
- Submit a bid with message and price
- Verify bid appears in "My Bids"

### 4. Hire a Freelancer (as Client)
- Go to "My Gigs"
- Click "View Bids" on your gig
- Click "Hire" on a bid
- Verify:
  - Gig status changes to "assigned"
  - Chosen bid becomes "hired"
  - Other bids become "rejected"
  - Freelancer receives real-time notification

### 5. Real-time Notification Test
- Open two browser windows
- Login as client in one, freelancer in another
- Client hires the freelancer
- Verify instant notification appears for freelancer

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT tokens stored in HttpOnly cookies
- CORS configuration
- Input validation
- Protected routes
- Owner-only authorization for sensitive operations

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables
2. Deploy from GitHub
3. Update `CLIENT_URL` to production frontend URL

### Frontend (Vercel/Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Set `VITE_API_URL` to production backend URL

## 📝 Environment Variables

### Backend (.env)
```
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gigflow
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com/api
```

## 🤝 Contributing

This is an internship assignment project. For any questions or issues, please contact the development team.

## 📄 License

This project is created as part of a Full Stack Development Internship Assignment.

## 👨‍💻 Developer

Built with ❤️ for the ServiceHive Internship Assignment

---

**Note:** Make sure MongoDB is running before starting the backend server. For local development, you can use MongoDB Compass or MongoDB Atlas.
