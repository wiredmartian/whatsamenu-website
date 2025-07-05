<template>
    <footer class="footer">
        <div class="container">
            <!-- Main Footer Content -->
            <div class="footer-content">
                <div class="row g-4">
                    <!-- Brand Section -->
                    <div class="col-lg-4 col-md-6">
                        <div class="footer-brand">
                            <h4 class="brand-title">What's A Menu</h4>
                            <p class="brand-description">
                                Digital menus made simple. Free for restaurants, easy for everyone.
                            </p>
                            <div class="social-links">
                                <a href="https://www.instagram.com/whatsamenu/" target="_blank" class="social-link">
                                    <i class="bi bi-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="col-lg-2 col-md-6">
                        <div class="footer-section">
                            <h6 class="footer-title">Quick Links</h6>
                            <ul class="footer-links">
                                <li><router-link to="/restaurants">Restaurants</router-link></li>
                                <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
                            </ul>
                        </div>
                    </div>

                    <!-- For Restaurants -->
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-section">
                            <h6 class="footer-title">For Restaurants</h6>
                            <ul class="footer-links">
                                <li><a href="https://dashboard.whatsamenu.co.za" target="_blank">Dashboard</a></li>
                                <li><a href="https://dashboard.whatsamenu.co.za" target="_blank">Get Started</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Developers -->
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-section">
                            <h6 class="footer-title">Developers</h6>
                            <ul class="footer-links">
                                <li><a href="https://github.com/wiredmartian/whatsamenu-api-doc" target="_blank">API Docs</a></li>
                                <li><a href="https://github.com/wiredmartian/whatsamenu-website" target="_blank">Source Code</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <p class="copyright">© {{ year }} WhatsAMenu. All rights reserved.</p>
                    </div>
                    <div class="col-md-6">
                        <div class="footer-meta">
                            <span class="version">v{{ version }}</span>
                            <a href="mailto:solomzi.jikani@gmail.com" class="contact-link">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
export default {
    name: "AppFooter",
    data() {
        return {
            year: new Date(Date.now()).getFullYear(),
            version: process.env.VUE_APP_VERSION
        }
    }
}
</script>

<style scoped>
.footer {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: #ffffff;
    padding: 4rem 0 0;
    margin-top: auto;
    position: relative;
    overflow: hidden;
}

.footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.footer-content {
    padding-bottom: 2rem;
}

/* Brand Section */
.footer-brand {
    margin-bottom: 2rem;
}

.brand-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
}

.brand-description {
    color: #bdc3c7;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

/* Social Links */
.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s ease;
}

.social-link:hover {
    background: #3498db;
    color: #ffffff;
    transform: translateY(-2px);
}

.social-link i {
    font-size: 1.2rem;
}

/* Footer Sections */
.footer-section {
    margin-bottom: 2rem;
}

.footer-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 0.5rem;
}

.footer-links a {
    color: #bdc3c7;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: inline-block;
}

.footer-links a:hover {
    color: #3498db;
    transform: translateX(5px);
}

/* Footer Bottom */
.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 0;
    margin-top: 2rem;
}

.copyright {
    margin: 0;
    color: #95a5a6;
    font-size: 0.9rem;
}

.footer-meta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5rem;
}

.version {
    color: #95a5a6;
    font-size: 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
}

.contact-link {
    color: #3498db;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.contact-link:hover {
    color: #ffffff;
    text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
    .footer {
        padding: 3rem 0 0;
    }
    
    .footer-content {
        text-align: center;
    }
    
    .footer-section {
        margin-bottom: 2.5rem;
    }
    
    .social-links {
        justify-content: center;
    }
    
    .footer-bottom {
        text-align: center;
    }
    
    .footer-meta {
        justify-content: center;
        margin-top: 1rem;
    }
    
    .copyright {
        margin-bottom: 1rem;
    }
}

@media (max-width: 576px) {
    .footer {
        padding: 2rem 0 0;
    }
    
    .brand-title {
        font-size: 1.3rem;
    }
    
    .footer-meta {
        flex-direction: column;
        gap: 1rem;
    }
}

/* Smooth transitions for all links */
.footer a {
    transition: all 0.3s ease;
}

/* Remove default router-link styling */
.footer a.router-link-active,
.footer a.router-link-exact-active {
    color: #3498db;
}
</style>
