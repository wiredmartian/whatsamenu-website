<template>
    <nav class="modern-navbar">
        <div class="navbar-container">
            <router-link class="navbar-brand" to="/">
                <div class="brand-content">
                    <img
                        src="../../../public/images/wm-logo-white.png"
                        alt="whatsamenu logo"
                        class="brand-logo"
                    />
                    <span class="brand-text">WhatsAMenu</span>
                </div>
            </router-link>
            
            <!-- Navigation Links (for future expansion) -->
            <div class="navbar-nav">
                <router-link to="/restaurants" class="nav-link">
                    <i class="bi bi-shop me-1"></i>
                    &nbsp; Restaurants
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
export default {
    name: "AppNavbar"
}
</script>

<style scoped>
/* Modern Navbar Styling */
.modern-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand Styling */
.navbar-brand {
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  text-decoration: none;
  color: white;
  transform: translateY(-1px);
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 32px;
  height: auto;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.navbar-brand:hover .brand-logo {
  transform: scale(1.05);
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #ffffff 0%, #e8f4f8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Navigation Links */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: white;
  text-decoration: none;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

.nav-link:hover::before {
  transform: translateX(0);
}

.nav-link i {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Active Route Styling */
.nav-link.router-link-active {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0.75rem 1rem;
  }
  
  .brand-text {
    font-size: 1.25rem;
  }
  
  .brand-logo {
    width: 28px;
  }
  
  .navbar-nav {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .navbar-container {
    padding: 0.5rem 1rem;
  }
  
  .brand-content {
    gap: 0.5rem;
  }
  
  .brand-text {
    font-size: 1.1rem;
  }
  
  .brand-logo {
    width: 24px;
  }
  
  .nav-link span {
    display: none;
  }
  
  .nav-link {
    padding: 0.4rem;
    min-width: 40px;
    justify-content: center;
  }
}

/* Smooth Page Scroll Adjustment */
body {
  padding-top: 70px;
}

@media (max-width: 768px) {
  body {
    padding-top: 60px;
  }
}

@media (max-width: 576px) {
  body {
    padding-top: 55px;
  }
}

/* Navbar Scroll Effect */
.modern-navbar.scrolled {
  background: linear-gradient(135deg, rgba(44, 62, 80, 0.95) 0%, rgba(52, 73, 94, 0.95) 100%);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
}

/* Animation for brand hover */
@keyframes brandPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.navbar-brand:hover .brand-content {
  animation: brandPulse 0.6s ease-in-out;
}

/* Modern glassmorphism effect */
.modern-navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  pointer-events: none;
}
</style>
