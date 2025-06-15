# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cross-border e-commerce operation assistant platform (跨境运营助手) - a modern web application for managing cross-border e-commerce operations, including AI assistant, product management, influencer outreach, and data analytics.

**Technology Stack:**
- Pure HTML5/CSS3/JavaScript (ES6+) - no frameworks
- TailwindCSS for utility classes
- Chart.js for data visualization
- Font Awesome & Remix Icons
- CDN-based external dependencies

## Development Commands

Since this is a static web application, no build tools are configured. Start development with:

```bash
# Using Python (recommended)
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

## Architecture

### File Structure
```
├── index.html                 # Main page (2269 lines)
├── script.js                  # Core business logic (5412 lines)
├── style.css                  # Base styles (11526 lines)
├── style-enhanced.css         # Enhanced styles (1086 lines)
├── performance-enhanced.css   # Performance optimizations (261 lines)
├── performance-optimizer.js   # Performance utilities (493 lines)
├── notification-update.js     # Notification system (161 lines)
└── themes/                    # Theme system
    ├── theme-config.js        # Theme configurations (867 lines)
    ├── theme-manager.js       # Theme management logic (687 lines)
    ├── theme-switcher.css     # Theme switcher styles (286 lines)
    └── alien-effects.css      # Alien theme effects (774 lines)
```

### Core System: Intelligent Theme System 2.0

The application features a sophisticated theme system with:

**Three Main Themes:**
- `modern` - Modern minimalist (light theme)
- `professional` - Dark professional theme
- `alien` - Futuristic gaming-style theme

**Four Intelligent Modes:**
- `auto` - Smart auto: follows system theme + time-based switching
- `light` - Force light mode (always modern theme)
- `dark` - Force dark mode (always professional theme)  
- `alien` - Always alien theme

**Time-based Auto-switching:**
- 6:00-18:00: Light theme (modern)
- 18:00-6:00: Dark theme (professional)

## Critical Development Rules

### 1. CSS Variables System (MANDATORY)

**NEVER use hardcoded colors - always use CSS variables:**

```css
/* ✅ CORRECT */
.element {
    color: var(--primary-color);
    background: var(--surface-color);
    border: 1px solid var(--border-color);
}

/* ❌ WRONG */
.element {
    color: #1976d2;
    background: #ffffff;
    border: 1px solid #e0e0e0;
}
```

**Key Variable Categories:**
- `--primary-color`, `--primary-dark`, `--primary-light`
- `--text-primary`, `--text-secondary`, `--text-tertiary`
- `--background-color`, `--surface-color`
- `--border-color`, `--border-hover`, `--border-focus`
- `--success-color`, `--warning-color`, `--error-color`, `--info-color`
- `--shadow-color`, `--shadow-hover`

### 2. Theme Development Checklist

When creating new components, verify:
- [ ] All colors use CSS variables
- [ ] Component works in all 3 themes (modern/professional/alien)
- [ ] Auto-switching functions correctly
- [ ] Hover/focus/active states work in all themes
- [ ] Responsive design maintained across themes

### 3. Theme API Usage

```javascript
// Theme switching
themeManager.setAutoMode('auto');    // Smart auto mode
themeManager.setAutoMode('light');   // Force light
themeManager.setAutoMode('dark');    // Force dark
themeManager.setAutoMode('alien');   // Force alien

// Manual theme setting
themeManager.setTheme('modern');
themeManager.setTheme('professional');
themeManager.setTheme('alien');
```

## Performance Considerations

- Uses resource preloading and DNS prefetch for CDN optimization
- Implements lazy loading for images and components
- GPU-accelerated animations via CSS transforms
- Memory management with automatic cleanup

## Key Business Logic

**Main Application Areas:**
- Dashboard (数据概览)
- Product Library (产品库) 
- Influencer Outreach (网红建联)
- AI Assistant (AI助手)
- Data Analytics (数据分析)
- Email System (邮件系统)

**Authentication:**
- Google OAuth integration
- SMS verification support  
- Mock login interface

## Testing

Manual testing required for:
- Theme switching across all three themes
- Auto-mode functionality (system theme + time-based)
- Responsive design on different screen sizes
- Browser compatibility (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)

## Important Notes

- This is a prototype with extensive Chinese text and UI
- All external dependencies loaded via CDN
- No build process or package manager
- Performance-optimized with manual optimizations
- Accessibility considerations included (WCAG 2.1 compliance)