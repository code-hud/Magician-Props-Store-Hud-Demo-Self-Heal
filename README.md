# 🎩 Magician Props Store

A full-featured e-commerce store for magician props and illusion supplies built with React, NestJS, and PostgreSQL. Everything runs in Docker for seamless setup.

## Architecture

- **Frontend**: React + Express server serving static files
- **Backend**: NestJS REST API with TypeORM
- **Database**: PostgreSQL with pre-filled sample data
- **Infrastructure**: Docker Compose for one-command setup

## Features

### Frontend
- 📦 **Product Listing** - Browse all available magic props
- 🔍 **Search & Filter** - Find products by name or category
- 🛒 **Shopping Cart** - Add/remove items with quantity control
- 💳 **Easy Checkout** - Prefilled customer details (no data entry required)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

### Backend
- 🎯 **Product Management** - List, search, and filter products
- 🛍️ **Cart Operations** - Add, remove, and manage cart items
- 📝 **Order Management** - Create and track orders
- 🗄️ **Database** - PostgreSQL with 12 sample magic props
- 🔌 **API** - RESTful API with CORS enabled

## Prerequisites

- Docker and Docker Compose installed on your system
- No other dependencies needed - everything is containerized!

## Quick Start

### 1. Clone or navigate to the project
```bash
cd /path/to/magician-props-store
```

### 2. Start all services
```bash
docker-compose up --build
```

This command will:
- Build the NestJS backend
- Build the React frontend with Express server
- Start PostgreSQL with sample data
- Start the backend API on port 3001
- Start the frontend on port 3000

### 3. Access the application

Open your browser and navigate to:
```
http://localhost:3000
```

The application is now ready to use!

## Available Services

| Service | Port | URL |
|---------|------|-----|
| Frontend (Express) | 3000 | http://localhost:3000 |
| Backend API | 3001 | http://localhost:3001 |
| PostgreSQL | 5432 | postgres://postgres:postgres@localhost:5432/magician_props_store |

## API Endpoints

### Products
- `GET /products` - List all products with optional search and category filter
  - Query params: `search`, `category`
- `GET /products/:id` - Get a specific product
- `GET /products/categories` - Get all available categories

### Cart
- `GET /cart?sessionId=xxx` - Get cart items for a session
- `POST /cart/add?sessionId=xxx` - Add item to cart
  - Body: `{ productId: number, quantity?: number }`
- `PUT /cart/update?sessionId=xxx` - Update item quantity
  - Body: `{ productId: number, quantity: number }`
- `DELETE /cart/:productId?sessionId=xxx` - Remove item from cart
- `DELETE /cart?sessionId=xxx` - Clear entire cart
- `GET /cart/total?sessionId=xxx` - Get cart total

### Orders
- `POST /orders?sessionId=xxx` - Create a new order
  - Body: `{ customerName, customerEmail, customerPhone, totalAmount, items: [] }`
- `GET /orders/history?sessionId=xxx` - Get order history for a session
- `GET /orders/:id` - Get a specific order

## Sample Products

The database comes pre-populated with 12 magic products:

1. Classic Silk Scarves - $29.99
2. Deluxe Wand Collection - $49.99
3. Card Magic Deck - $12.99
4. Rope and Knot Magic Set - $19.99
5. Flash Paper - $24.99
6. Sponge Ball Set - $15.99
7. Appearing Cane - $39.99
8. Dove Pan Set - $89.99
9. Coin Magic Kit - $34.99
10. Color Changing Silks - $44.99
11. Levitation Board - $59.99
12. Linking Rings Set - $54.99

## Project Structure

```
magician-props-store/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── products/        # Product module
│   │   ├── cart/            # Cart module
│   │   ├── orders/          # Orders module
│   │   ├── database/        # Database config
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Context API state management
│   │   ├── api/             # API client
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.html
│   ├── public/
│   │   └── styles.css
│   ├── server.js            # Express server
│   ├── webpack.config.js
│   ├── package.json
│   ├── .babelrc
│   └── Dockerfile
├── docker/
│   └── postgres/
│       └── init.sql         # Database initialization
├── docker-compose.yml
└── README.md
```

## Development

### Building Manually (without Docker)

#### Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend** (docker-compose handles these):
- `NODE_ENV` - development/production
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - API port (default: 3001)

**Frontend** (docker-compose handles these):
- `PORT` - Frontend port (default: 3000)
- `REACT_APP_API_URL` - Backend API URL

## Code Style

The project follows industry-standard best practices:

- **Backend**: NestJS conventions, TypeORM patterns, RESTful API design
- **Frontend**: React hooks, functional components, Context API for state management
- **Styling**: CSS with responsive design and mobile-first approach
- **Database**: Normalized schema with proper indexing

## Features Walkthrough

### 1. Browse Products
- Visit http://localhost:3000
- See all 12 magic props displayed as cards
- Each product shows name, description, price, and stock status

### 2. Search & Filter
- Use the search bar to find products by name or description
- Filter by category (Silks, Wands, Cards, etc.)
- Results update in real-time

### 3. Add to Cart
- Use the quantity selector on each product card
- Click "Add to Cart" button
- Quantity controls ensure you don't exceed available stock

### 4. View Cart
- Click the cart icon in the header or "Cart" in navigation
- See all items with images, prices, and quantities
- Remove items individually or proceed to checkout

### 5. Checkout
- Click "Proceed to Checkout"
- Form is pre-filled with sample details:
  - Name: John Doe
  - Email: john@example.com
  - Phone: 555-0123
- Edit details if needed
- Review order summary
- Click "Place Order"
- See order confirmation

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  category VARCHAR(100),
  stock INT DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  session_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Troubleshooting

### Port already in use
If ports 3000, 3001, or 5432 are already in use:
```bash
# Find and kill processes using the ports
# On macOS/Linux:
lsof -i :3000  # Find process on port 3000
kill -9 <PID>  # Kill the process
```

Or modify docker-compose.yml to use different ports:
```yaml
ports:
  - "3002:3000"  # Frontend
  - "3003:3001"  # Backend
  - "5433:5432"  # Database
```

### Database connection failed
- Ensure PostgreSQL container is running: `docker-compose ps`
- Wait for database to be ready (usually 10-15 seconds)
- Check logs: `docker-compose logs postgres`

### Frontend not loading
- Check if backend is running: `curl http://localhost:3001/products`
- Verify CORS is enabled (it is by default)
- Clear browser cache and hard refresh (Cmd+Shift+R on macOS)

### Changes not reflecting
- For backend: Stop containers and rebuild with `docker-compose up --build`
- For frontend: Same as above (hot-reload is enabled in dev mode)

## Performance Notes

- Products are indexed by category for fast filtering
- Cart items use session_id for quick lookups
- Image URLs are stored (placeholder emoji used if not provided)
- Database queries are optimized with eager loading

## Future Enhancements

- User authentication and accounts
- Payment gateway integration
- Order tracking and history
- Product reviews and ratings
- Admin panel for inventory management
- Email confirmations
- Multiple currency support

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review docker-compose logs: `docker-compose logs -f`
3. Ensure all prerequisites are installed
4. Try rebuilding: `docker-compose down && docker-compose up --build`
