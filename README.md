# WhatsAMenu Website

[![Vue.js](https://img.shields.io/badge/Vue.js-2.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, responsive web application for browsing restaurant menus digitally. Built with Vue.js and powered by the WhatsAMenu API, this platform provides an intuitive interface for customers to explore restaurant offerings and for businesses to showcase their menus.

## Features

### For Customers
- **Browse Restaurants**: Discover local restaurants and their menus
- **Detailed Menu Views**: Comprehensive menu information with images, descriptions, and pricing
- **Interactive Cart**: Add items to cart with customization options
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **QR Code Menus**: Access menus via QR codes for contactless dining
- **Search & Filter**: Find restaurants and menu items quickly

### For Restaurants
- **Free Platform**: No subscription fees or hidden costs
- **Digital Menu Management**: Easy-to-use dashboard for menu updates
- **Real-time Updates**: Instant menu changes reflected on the website
- **Analytics**: Track menu performance and customer engagement
- **QR Code Generation**: Automatic QR codes for table-side menu access

## Technology Stack

- **Frontend Framework**: Vue.js 2.x with TypeScript
- **Styling**: Bootstrap 5 + Custom SCSS
- **State Management**: Vue's reactive data system
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Icons**: Bootstrap Icons
- **Build Tool**: Vue CLI
- **API**: RESTful API with JSON responses

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 14.x or higher)
- **npm** or **yarn** package manager
- **Vue CLI** (for development)
- **WhatsAMenu API Key** (obtain from [dashboard](https://dashboard.whatsamenu.co.za))

## Installation & Setup
### 1. Clone the Repository

```bash
git clone https://github.com/wiredmartian/whatsamenu-website.git
cd whatsamenu-website
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# If you encounter peer dependency issues
npm install --legacy-peer-deps
# or
yarn install --legacy-peer-deps
```

### 3. Environment Configuration

Create an `.env.local` file at the root of the project and add the following variables

```
VUE_APP_BASE_URL=https://whatsamenu.core.wiredmartians.com
VUE_APP_API_KEY=<Your API Key>
```

Create a `.env.local` file in the project root:

```env
# API Configuration
VUE_APP_BASE_URL=https://whatsamenu.core.wiredmartians.com
VUE_APP_API_KEY=your_api_key_here

# Optional: Development Settings
VUE_APP_VERSION=1.0.0
NODE_ENV=development
```

> **Get your API key**: Visit the [WhatsAMenu Dashboard](https://dashboard.whatsamenu.co.za/sign-in) to obtain your free API key.

### 4. Development Server

```bash
# Start development server with hot reload
npm run serve
# or
yarn serve
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── api/                    # API configuration and interceptors
├── assets/                 # Static assets (images, fonts)
├── components/             # Reusable Vue components
│   ├── menu/              # Menu-related components
│   ├── restaurant/        # Restaurant-related components
│   └── ui/                # UI components (navbar, footer, etc.)
├── helpers/               # Utility functions
├── router/                # Vue Router configuration
├── services/              # Business logic and services
├── types/                 # TypeScript type definitions
├── views/                 # Page components
│   ├── legal/            # Legal pages
│   ├── menu/             # Menu views
│   └── restaurants/      # Restaurant listing views
└── App.vue               # Root component
```

## Key Components

### Core Components
- **HomeView.vue**: Landing page with hero section and features
- **RestaurantListView.vue**: Restaurant browsing and search
- **MenuView.vue**: Individual restaurant menu display
- **CartSidebar.vue**: Shopping cart functionality

## Development Commands

```bash
# Development
npm run serve              # Start development server
npm run build              # Build for production
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues automatically

```

## API Integration

The website integrates with the [WhatsAMenu API](https://github.com/wiredmartian/whatsamenu-api-documentation) for:

- **Restaurant Data**: Fetching restaurant information and menus
- **Menu Management**: Real-time menu updates
- **Search Functionality**: Restaurant and menu item search
- **QR Code Generation**: Dynamic QR codes for menus

### API Endpoints Used
- `GET /restaurants` - List all restaurants
- `GET /restaurants/{id}` - Get restaurant details
- `GET /restaurants/{id}/menus` - Get restaurant menus
- `GET /menu/{id}` - Get specific menu details
- `GET /restaurants/{id}/qrcode` - Get QR code


## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/wiredmartian/whatsamenu-website/issues)
- **Email**: solomzi.jikani@gmail.com
- **Website**: [whatsamenu.co.za](https://whatsamenu.co.za)
- **Dashboard**: [dashboard.whatsamenu.co.za](https://dashboard.whatsamenu.co.za)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Made with ❤️ by WiredMartian**