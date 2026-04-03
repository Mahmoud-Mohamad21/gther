import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

const THEMES = {
  guest: {
    dark: {
      bg: "#080705",
      bg2: "#100E0A",
      surface: "#141108",
      surfaceAlt: "#1A1610",
      border: "rgba(212,183,112,0.18)",
      accent: "#D4B770",
      accent2: "#F0D898",
      accentRGB: "212,183,112",
      text: "#F5F0E8",
      textMid: "rgba(245,240,232,0.55)",
      textSoft: "rgba(245,240,232,0.28)",
      nav: "rgba(8,7,5,0.78)",
      shadow: "0 8px 40px rgba(212,183,112,0.12)",
      glow: "rgba(212,183,112,0.22)",
      badge: "#D4B770",
      threeColor1: 0xd4b770,
      threeColor2: 0xf0d898,
      threeColor3: 0x3a2e1a,
    },
    light: {
      bg: "#faf7f07b",
      bg2: "#faf7f07b",
      surface: "#faf7f07b",
      surfaceAlt: "#faf7f07b",
      border: "rgba(160,128,60,0.22)",
      accent: "#8A6820",
      accent2: "#B89040",
      accentRGB: "138,104,32",
      text: "#1A1408",
      textMid: "#6A5030",
      textSoft: "#A88A60",
      nav: "rgba(250,247,240,0.88)",
      shadow: "0 8px 40px rgba(138,104,32,0.12)",
      glow: "rgba(138,104,32,0.18)",
      badge: "#8A6820",
      threeColor1: 0x8a6820,
      threeColor2: 0xb89040,
      threeColor3: 0x3a2e1a,
    },
  },

  user: {
    dark: {
      bg: "#0d0b06",
      bg2: "#0d0b06",
      surface: "#0d0b06",
      surfaceAlt: "#0d0b06",

      border: "#7746ff",
      accent: "#7746ff",
      accent2: "#4400ff",
      accentRGB: "188,158,220",
      text: "#F2EEF8",
      textMid: "rgba(242,238,248,0.52)",
      textSoft: "rgba(242,238,248,0.26)",
      nav: "rgba(6,5,10,0.80)",
      shadow: "0 8px 40px rgba(188,158,220,0.12)",
      glow: "rgba(188,158,220,0.22)",
      badge: "#BC9EDC",
      threeColor1: 0xbc9edc,
      threeColor2: 0xd8c0f0,
      threeColor3: 0x2a1e3a,
    },
    light: {
      bg: "#faf7f07b",
      bg2: "#faf7f07b",
      surface: "#faf7f07b",
      surfaceAlt: "#faf7f07b",

      border: "#000000",
      accent: "#000000",
      accent2: "#140A22",
      accentRGB: "120,80,180",
      text: "#140A22",
      textMid: "#000000",
      textSoft: "#9A82C0",
      nav: "rgba(248,245,252,0.90)",
      shadow: "0 8px 40px rgba(120,80,180,0.10)",
      glow: "rgba(120,80,180,0.18)",
      badge: "#140A22",
      threeColor1: 0x7850b4,
      threeColor2: 0x9c78d4,
      threeColor3: 0x2a1e3a,
    },
  },

  admin: {
    dark: {
      bg: "#040608",
      bg2: "#080C10",
      surface: "#0C1018",
      surfaceAlt: "#101620",
      border: "rgba(100,200,210,0.18)",
      accent: "#00f5ff",
      accent2: "#00f5ff",
      accentRGB: "100,200,210",
      text: "#E8F4F6",
      textMid: "rgba(232,244,246,0.52)",
      textSoft: "rgba(232,244,246,0.26)",
      nav: "rgba(4,6,8,0.82)",
      shadow: "0 8px 40px rgba(100,200,210,0.12)",
      glow: "rgba(100,200,210,0.22)",
      badge: "#00f5ff",
      threeColor1: 0x64c8d2,
      threeColor2: 0x90dde6,
      threeColor3: 0x0a3040,
    },
    light: {
      bg: "#faf7f07b",
      bg2: "#faf7f07b",
      surface: "#faf7f07b",
      surfaceAlt: "#faf7f07b",

      border: "#000000",
      accent: "#000000",
      accent2: "#000000",
      accentRGB: "0,130,148",
      text: "#000000",
      textMid: "#000000",
      textSoft: "#000000",
      nav: "rgba(240,248,250,0.90)",
      shadow: "0 8px 40px rgba(0,130,148,0.10)",
      glow: "rgba(0,130,148,0.18)",
      badge: "#000000",
      threeColor1: 0x008294,
      threeColor2: 0x00a8be,
      threeColor3: 0x0a3040,
    },
  },
};

// ─────────────────────────────────────────────
// FONT LOADER
// ─────────────────────────────────────────────
function loadFonts() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&family=Share+Tech+Mono&display=swap";
  document.head.appendChild(link);
}

// ─────────────────────────────────────────────
// GLOBAL STYLES INJECTION
// ─────────────────────────────────────────────
function injectGlobalStyles() {
  if (document.getElementById("gather-global-styles")) return;
  const style = document.createElement("style");
  style.id = "gather-global-styles";
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Jost', sans-serif; }
    ::selection { background: rgba(212,183,112,0.25); }
 
    .g-nav-link {
      font-family: 'Jost', sans-serif;
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.16em; text-transform: uppercase;
      background: none; border: none;
      padding: 8px 18px; cursor: pointer;
      position: relative; overflow: hidden;
      transition: color 0.28s;
      white-space: nowrap;
    }
    .g-nav-link::before {
      content: '';
      position: absolute; bottom: 0; left: 50%; right: 50%;
      height: 1px;
      transition: left 0.35s cubic-bezier(0.4,0,0.2,1), right 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    .g-nav-link::after {
      content: attr(data-label);
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
      opacity: 0;
      transform: translateY(5px);
      transition: opacity 0.26s, transform 0.26s cubic-bezier(0.4,0,0.2,1);
      pointer-events: none;
    }
    .g-nav-link:hover::before, .g-nav-link.active::before { left: 8%; right: 8%; }
    .g-nav-link:hover::after, .g-nav-link.active::after { opacity: 1; transform: translateY(0); }
 
    .g-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 21px; font-weight: 400;
      letter-spacing: 0.24em; text-transform: uppercase;
      cursor: pointer; user-select: none; flex-shrink: 0;
      position: relative;
      transition: color 0.3s;
      text-decoration: none;
    }
    .g-logo::after {
      content: '';
      position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px;
      transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
    }

 
    .g-search-pill {
      display: flex; align-items: center; gap: 8px;
      border-radius: 2px;
      padding: 7px 13px;
      transition: all 0.24s;
      cursor: text;
    }
    .g-search-pill input {
      background: none; border: none; outline: none;
      font-family: 'Jost', sans-serif;
      font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase;
      width: 100px; transition: width 0.24s;
    }
    .g-search-pill:focus-within input { width: 140px; }
 
    .g-icon-btn {
      background: none; border: 1px solid transparent;
      border-radius: 2px; width: 34px; height: 34px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0; transition: all 0.2s;
    }
 
    .g-btn-signin {
      font-family: 'Jost', sans-serif;
      font-size: 10px; font-weight: 600;
      letter-spacing: 0.18em; text-transform: uppercase;
      border: none; border-radius: 2px;
      padding: 9px 22px; cursor: pointer;
      position: relative; overflow: hidden;
      transition: opacity 0.18s, transform 0.18s;
      flex-shrink: 0;
    }
    .g-btn-signin::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%);
      pointer-events: none;
    }
    .g-btn-signin:hover { opacity: 0.88; transform: translateY(-1px); }
 
    .g-btn-profile {
      font-family: 'Jost', sans-serif;
      font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
      background: none; border-radius: 2px;
      padding: 8px 15px; cursor: pointer;
      display: flex; align-items: center; gap: 7px;
      transition: all 0.2s; flex-shrink: 0;
    }
 
  //   .g-hamburger {
  //     display: none; flex-direction: column; gap: 5px;
  //     background: none; border: none; cursor: pointer; padding: 8px;
  //   }
  //   .g-hamburger span {
  //     display: block; height: 1px; border-radius: 0;
  //     transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  //   }
  //   .g-hamburger span:nth-child(1) { width: 22px; }
  //   .g-hamburger span:nth-child(2) { width: 14px; }
  //   .g-hamburger span:nth-child(3) { width: 18px; }
  //   .g-hamburger.open span:nth-child(1) { width: 20px; transform: translateY(6px) rotate(45deg); }
  //   .g-hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
  //   .g-hamburger.open span:nth-child(3) { width: 20px; transform: translateY(-6px) rotate(-45deg); }
 
  // .g-auth-desktop { display: flex; }
  // .g-hamburger-btn { display: none !important; }
  // @media (max-width: 600px) {
  //   .g-auth-desktop { display: none !important; }
  //   .g-hamburger-btn { display: flex !important; }
  //   .g-desktop-nav { display: none !important; }


  //   .g-mobile-link {
  //     font-family: 'Jost', sans-serif;
  //     font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
  //     background: none; border: none;
  //     padding: 15px 0; cursor: pointer; text-align: left;
  //     transition: color 0.2s; width: 100%;
  //   }
 
  //   @media (max-width: 820px) {
  //     .g-nav-links, .g-search-area, .g-btn-signin, .g-btn-profile, .g-vr { display: none !important; }
  //     .g-hamburger { display: flex !important; }
  //   }
  //   @media (max-width: 1060px) {
  //     .g-nav-link { padding: 8px 12px; }
  //   }
  // `;
  document.head.appendChild(style);
}

const ROLE_CONFIG = {
  guest: { links: ["Home", "Marketplace", "About", "Contact"] },
  user: { links: ["Home", "Marketplace", "Favorites", "Orders"] },
  admin: { links: ["Home", "Marketplace", "My Store"] },
};

function Navbar({
  role,
  page,
  setPage,
  darkMode,
  toggleDark,
  cart,
  t,
  onSignIn,
  onSignOut,
  searchQuery,
  setSearchQuery,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRound, setIsRound] = useState(true);
  const timerRef = useRef(null);

  const links = (ROLE_CONFIG[role] ?? ROLE_CONFIG.guest).links;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isOpen) {
      setIsRound(false);
    } else {
      timerRef.current = setTimeout(() => setIsRound(true), 300);
    }
    return () => clearTimeout(timerRef.current);
  }, [isOpen]);

  const pill = {
    position: "fixed",
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "9px 20px",
    background: t.nav,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${t.border}`,
    borderRadius: isRound ? 9999 : 14,
    transition: "background 0.3s, border-radius 0.3s",
    width: "calc(100% - 48px)",
    maxWidth: 760,
    boxSizing: "border-box",
    fontFamily: "'Jost', sans-serif",
  };

  const iconBtn = (onClick, title, children, active) =>
    React.createElement(
      "button",
      {
        onClick,
        title,
        style: {
          background: active ? `rgba(${t.accentRGB},0.10)` : "none",
          border: `1px solid ${active ? `rgba(${t.accentRGB},0.35)` : "transparent"}`,
          borderRadius: 8,
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: active ? t.accent : t.textMid,
          flexShrink: 0,
          transition: "background 0.2s, border-color 0.2s",
        },
      },
      children,
    );

  const vr = React.createElement("div", {
    className: "g-vr",
    style: {
      width: 1,
      height: 18,
      background: `linear-gradient(to bottom, transparent, ${t.border}, transparent)`,
      flexShrink: 0,
    },
  });

  const SearchIcon = () =>
    React.createElement(
      "svg",
      {
        width: 11,
        height: 11,
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: `rgba(${t.accentRGB},0.6)`,
        strokeWidth: 1.7,
      },
      React.createElement("circle", { cx: 7, cy: 7, r: 4.5 }),
      React.createElement("line", { x1: 10.5, y1: 10.5, x2: 14, y2: 14 }),
    );

  const CartIcon = () =>
    React.createElement(
      "svg",
      {
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        width: 14,
        height: 14,
      },
      React.createElement("path", {
        d: "M1.5 1.5h2l2.2 8.5h6.8l1.5-5.5H4.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      React.createElement("circle", {
        cx: 7.5,
        cy: 13.5,
        r: 0.9,
        fill: "currentColor",
        stroke: "none",
      }),
      React.createElement("circle", {
        cx: 11.5,
        cy: 13.5,
        r: 0.9,
        fill: "currentColor",
        stroke: "none",
      }),
    );

  const UserIcon = () =>
    React.createElement(
      "svg",
      {
        viewBox: "0 0 14 14",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.3,
        width: 12,
        height: 12,
      },
      React.createElement("circle", { cx: 7, cy: 5, r: 2.5 }),
      React.createElement("path", {
        d: "M2.5 12.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5",
        strokeLinecap: "round",
      }),
    );

  const ThemeIcon = () =>
    darkMode
      ? React.createElement(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: `rgba(${t.accentRGB},0.75)`,
            strokeWidth: 1.4,
            width: 13,
            height: 13,
          },
          React.createElement("path", {
            d: "M13.5 8.5a6 6 0 01-8-8A6.5 6.5 0 1013.5 8.5z",
            fill: `rgba(${t.accentRGB},0.15)`,
          }),
        )
      : React.createElement(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            stroke: `rgba(${t.accentRGB},0.75)`,
            strokeWidth: 1.4,
            width: 13,
            height: 13,
          },
          React.createElement("circle", {
            cx: 8,
            cy: 8,
            r: 3,
            fill: `rgba(${t.accentRGB},0.2)`,
          }),
          React.createElement(
            "g",
            { strokeLinecap: "round" },
            ...[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const r = (Math.PI * a) / 180;
              return React.createElement("line", {
                key: a,
                x1: 8 + 4.5 * Math.cos(r),
                y1: 8 + 4.5 * Math.sin(r),
                x2: 8 + 6 * Math.cos(r),
                y2: 8 + 6 * Math.sin(r),
              });
            }),
          ),
        );

  return React.createElement(
    React.Fragment,
    null,

    React.createElement(
      "header",
      { style: pill },

      // ── Top row ──
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 8,
          },
        },

        // Logo
        React.createElement(
          "div",
          {
            onClick: () => {
              setPage("Home");
              setIsOpen(false);
            },
            style: {
              display: "flex",
              alignItems: "center",
              borderLeft: `2px solid ${t.accent}`,
              paddingLeft: 8,
              marginRight: 4,
              cursor: "pointer",
              flexShrink: 0,
            },
          },
          React.createElement(
            "span",
            {
              style: {
                fontSize: 15,
                fontWeight: 600,
                color: t.text,
                letterSpacing: "-0.3px",
                fontFamily: "'Jost', sans-serif",
              },
            },
            "Gather",
          ),
        ),

        // ── Desktop nav links (hidden on mobile) ──
        React.createElement(
          "nav",
          {
            className: "g-desktop-nav",
            style: {
              display: "flex",
              alignItems: "center",
              gap: 0,
              flex: 1,
              overflow: "hidden",
            },
          },
          links.map((lk) =>
            React.createElement(
              "button",
              {
                key: lk,
                onClick: () => setPage(lk),
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 8px",
                  fontSize: 13,
                  fontFamily: "'Jost', sans-serif",
                  display: "flex",
                  alignItems: "center",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    height: 18,
                    display: "flex",
                    alignItems: "flex-start",
                  },
                },
                React.createElement(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.32s ease-out",
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.transform = "translateY(-50%)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    },
                  },
                  React.createElement(
                    "span",
                    {
                      style: {
                        color: page === lk ? t.accent : t.textMid,
                        whiteSpace: "nowrap",
                        display: "block",
                        height: 18,
                        lineHeight: "18px",
                      },
                    },
                    lk,
                  ),
                  React.createElement(
                    "span",
                    {
                      style: {
                        color: t.accent,
                        whiteSpace: "nowrap",
                        display: "block",
                        height: 18,
                        lineHeight: "18px",
                      },
                    },
                    lk,
                  ),
                ),
              ),
            ),
          ),
        ),

        // ── Right controls ──
        // Right controls
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
              marginLeft: "auto",
            },
          },

          // Search bar (hidden on mobile — mobile panel has its own)
          React.createElement(
            "div",
            {
              className: "g-desktop-search",
              style: {
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: `rgba(${t.accentRGB},0.05)`,
                border: `1px solid ${t.border}`,
                borderRadius: 9999,
                padding: "4px 10px",
                height: 28,
              },
            },
            React.createElement(SearchIcon),
            React.createElement("input", {
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Search",
              style: {
                background: "none",
                border: "none",
                outline: "none",
                color: t.text,
                fontSize: 12,
                width: 80,
                fontFamily: "'Jost', sans-serif",
              },
            }),
          ),

          vr,

          // Theme toggle
          iconBtn(
            toggleDark,
            darkMode ? "Light mode" : "Dark mode",
            React.createElement(ThemeIcon),
          ),

          // Cart
          React.createElement(
            "div",
            { style: { position: "relative" } },
            iconBtn(
              () => setPage("Cart"),
              "Cart",
              React.createElement(CartIcon),
              page === "Cart",
            ),
            cartCount > 0 &&
              React.createElement(
                "span",
                {
                  style: {
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.accent2}, ${t.accent})`,
                    color: darkMode ? "#050402" : "#fff",
                    fontSize: 8,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 0 1.5px ${t.bg}`,
                    fontFamily: "'Jost', sans-serif",
                  },
                },
                cartCount > 99 ? "99+" : cartCount,
              ),
          ),

          vr,

          // Auth button (desktop only)
          React.createElement(
            "div",
            { className: "g-auth-desktop" },
            role === "guest"
              ? React.createElement(
                  "button",
                  {
                    onClick: onSignIn,
                    style: {
                      padding: "5px 14px",
                      fontSize: 12,
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${t.accent2}, ${t.accent})`,
                      color: darkMode ? "#050402" : "#fff",
                      border: "none",
                      borderRadius: 9999,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "'Jost', sans-serif",
                    },
                  },
                  "Enter",
                )
              : React.createElement(
                  "button",
                  {
                    onClick: onSignOut,
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 12px",
                      fontSize: 12,
                      background: "none",
                      border: `1px solid ${t.border}`,
                      borderRadius: 9999,
                      color: t.textMid,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "'Jost', sans-serif",
                      transition: "color 0.2s",
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.color = t.accent;
                      e.currentTarget.style.borderColor = `rgba(${t.accentRGB},0.4)`;
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.color = t.textMid;
                      e.currentTarget.style.borderColor = t.border;
                    },
                  },
                  React.createElement(UserIcon),
                  React.createElement(
                    "span",
                    null,
                    role === "admin" ? "Admin" : "Profile",
                  ),
                ),
          ),

          // Hamburger (mobile only)
          React.createElement(
            "button",
            {
              onClick: () => setIsOpen((o) => !o),
              style: {
                background: "none",
                border: `1px solid ${t.border}`,
                borderRadius: 8,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: t.textMid,
                flexShrink: 0,
              },
              className: "g-hamburger-btn",
            },
            isOpen
              ? React.createElement(
                  "svg",
                  {
                    width: 14,
                    height: 14,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                  },
                  React.createElement("path", { d: "M6 18L18 6M6 6l12 12" }),
                )
              : React.createElement(
                  "svg",
                  {
                    width: 14,
                    height: 14,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                  },
                  React.createElement("path", { d: "M4 6h16M4 12h16M4 18h16" }),
                ),
          ),
        ),
      ),

      // ── Mobile expanded panel ──
      React.createElement(
        "div",
        {
          style: {
            width: "100%",
            overflow: "hidden",
            maxHeight: isOpen ? 500 : 0,
            opacity: isOpen ? 1 : 0,
            transition: "max-height 0.32s ease, opacity 0.28s ease",
            paddingTop: isOpen ? 12 : 0,
          },
        },
        // Mobile nav links — plain buttons, NO hover flip animation
        React.createElement(
          "nav",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 10,
            },
          },
          links.map((lk) =>
            React.createElement(
              "button",
              {
                key: lk,
                onClick: () => {
                  setPage(lk);
                  setIsOpen(false);
                },
                style: {
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${t.border}`,
                  padding: "10px 4px",
                  textAlign: "left",
                  color: page === lk ? t.accent : t.textMid,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "'Jost', sans-serif",
                },
              },
              lk,
            ),
          ),
        ),
        // Mobile search + auth row
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingBottom: 4,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: `rgba(${t.accentRGB},0.05)`,
                border: `1px solid ${t.border}`,
                borderRadius: 9999,
                padding: "6px 12px",
                flex: 1,
              },
            },
            React.createElement(SearchIcon),
            React.createElement("input", {
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Search",
              style: {
                background: "none",
                border: "none",
                outline: "none",
                color: t.text,
                fontSize: 13,
                width: "100%",
                fontFamily: "'Jost', sans-serif",
              },
            }),
          ),
          role === "guest"
            ? React.createElement(
                "button",
                {
                  onClick: () => {
                    onSignIn();
                    setIsOpen(false);
                  },
                  style: {
                    padding: "7px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${t.accent2}, ${t.accent})`,
                    color: darkMode ? "#050402" : "#fff",
                    border: "none",
                    borderRadius: 9999,
                    cursor: "pointer",
                    fontFamily: "'Jost', sans-serif",
                  },
                },
                "Enter",
              )
            : React.createElement(
                "button",
                {
                  onClick: () => {
                    onSignOut();
                    setIsOpen(false);
                  },
                  style: {
                    padding: "7px 14px",
                    fontSize: 13,
                    background: "none",
                    border: `1px solid ${t.border}`,
                    borderRadius: 9999,
                    color: t.textMid,
                    cursor: "pointer",
                    fontFamily: "'Jost', sans-serif",
                  },
                },
                role === "admin" ? "Admin" : "Profile",
              ),
        ),
      ),

      // ── Responsive styles ──
      React.createElement(
        "style",
        null,
        `
        .g-auth-desktop { display: flex; }
        .g-desktop-nav { display: flex; }
        .g-desktop-search { display: flex; }
        .g-vr { display: flex; }
        .g-hamburger-btn { display: none !important; }
 
        @media (max-width: 600px) {
          .g-desktop-nav    { display: none !important; }
          .g-desktop-search { display: none !important; }
          .g-auth-desktop   { display: none !important; }
          .g-vr             { display: none !important; }
          .g-hamburger-btn  { display: flex !important; }
        }
      `,
      ),
    ),
  );
}

// ─────────────────────────────────────────────
// THREE.JS SCENES — LUXURY UPGRADES
// ─────────────────────────────────────────────

// GUEST: Slow double-helix DNA strand with gold particles and drifting dust
function GuestThreeScene({ t }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;
    const THREE = window.THREE;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 20);

    const GOLD = new THREE.Color(t.threeColor1);
    const GOLD2 = new THREE.Color(t.threeColor2);

    const helixPts = 160;
    const helixGroups = [];
    for (let strand = 0; strand < 2; strand++) {
      const spheres = [];
      for (let i = 0; i < helixPts; i++) {
        const tt = i / (helixPts - 1);
        const angle = tt * Math.PI * 8 + strand * Math.PI;
        const radius = 2.2;
        const y = (tt - 0.5) * 22;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const size = 0.06 + Math.random() * 0.06;
        const geo = new THREE.SphereGeometry(size, 6, 6);
        const frac = tt;
        const col = GOLD.clone().lerp(GOLD2, frac);
        const mat = new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 0.6,
          metalness: 0.8,
          roughness: 0.15,
          transparent: true,
          opacity: 0.7 + Math.random() * 0.3,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        mesh.userData = { baseAngle: angle, baseY: y, tt, strand };
        scene.add(mesh);
        spheres.push(mesh);
      }
      helixGroups.push(spheres);
    }

    for (let i = 0; i < helixPts; i += 6) {
      const a = helixGroups[0][i];
      const b = helixGroups[1][i];
      const pts2 = [a.position.clone(), b.position.clone()];
      const geo2 = new THREE.BufferGeometry().setFromPoints(pts2);
      const mat2 = new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.18,
      });
      scene.add(new THREE.Line(geo2, mat2));
    }
    // ── Floating dust particles ────────────────
    const dustN = 15000;
    const dp = new Float32Array(dustN * 3);
    const dc = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      dp[i * 3] = (Math.random() - 0.5) * 30;
      dp[i * 3 + 1] = (Math.random() - 0.5) * 30;
      dp[i * 3 + 2] = (Math.random() - 0.5) * 14;
      const c = GOLD.clone().lerp(GOLD2, Math.random());
      dc[i * 3] = c.r;
      dc[i * 3 + 1] = c.g;
      dc[i * 3 + 2] = c.b;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dc, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        size: 0.038,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(dust);

    scene.add(new THREE.AmbientLight(0x201808, 1.2));
    const pl1 = new THREE.PointLight(t.threeColor1, 4, 30);
    pl1.position.set(0, 0, 5);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(t.threeColor2, 2, 20);
    pl2.position.set(-8, 6, -3);
    scene.add(pl2);

    let mouseX = 0,
      mouseY = 0;
    const onMM = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMM);

    let animId;
    const clock = new THREE.Clock();
    function animate() {
      animId = requestAnimationFrame(animate);
      const e = clock.getElapsedTime();
      // Slow helix rotation
      helixGroups.forEach((strand, si) => {
        strand.forEach((mesh) => {
          const { tt } = mesh.userData;
          const angle = tt * Math.PI * 8 + si * Math.PI + e * 0.18;
          mesh.position.x = Math.cos(angle) * 2.2;
          mesh.position.z = Math.sin(angle) * 2.2;
          mesh.material.emissiveIntensity =
            0.4 + Math.sin(e * 1.2 + tt * Math.PI * 4) * 0.3;
        });
      });

      dust.rotation.y = e * 0.012;
      dust.rotation.x = Math.sin(e * 0.04) * 0.04;
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);
  return React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: "fixed", // changed from absolute → fixed
      top: 0,
      left: 0,
      width: "100vw", // full viewport width
      height: "100vh", // full viewport height
      pointerEvents: "none",
      zIndex: 0, // sits behind all content
    },
  });
}

function polyfillRoundRect() {
  if (
    typeof CanvasRenderingContext2D !== "undefined" &&
    !CanvasRenderingContext2D.prototype.roundRect
  ) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      r = Math.min(r, w / 2, h / 2);
      this.beginPath();
      this.moveTo(x + r, y);
      this.lineTo(x + w - r, y);
      this.quadraticCurveTo(x + w, y, x + w, y + r);
      this.lineTo(x + w, y + h - r);
      this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      this.lineTo(x + r, y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - r);
      this.lineTo(x, y + r);
      this.quadraticCurveTo(x, y, x + r, y);
      this.closePath();
    };
  }
}

/* ─── UPGRADED fake-website canvas texture ─── */
function makeWebsiteTexture(THREE, config) {
  const W = 720,
    H = 520;
  const cvs = document.createElement("canvas");
  cvs.width = W;
  cvs.height = H;
  const ctx = cvs.getContext("2d");

  // Background
  ctx.fillStyle = config.bg;
  ctx.fillRect(0, 0, W, H);

  // ── Title bar ──
  ctx.fillStyle = config.bar;
  ctx.fillRect(0, 0, W, 42);
  [
    ["#ff5f57", 20],
    ["#ffbd2e", 44],
    ["#28ca41", 68],
  ].forEach(([c, x]) => {
    ctx.beginPath();
    ctx.arc(x, 21, 7, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  ctx.fillStyle = config.urlBg;
  ctx.roundRect(100, 9, W - 200, 24, 5);
  ctx.fill();
  ctx.fillStyle = config.urlText;
  ctx.font = "12px monospace";
  ctx.fillText(config.url, 112, 26);

  // ── Hero image area ──
  const heroH = 130;
  const heroGrad = ctx.createLinearGradient(0, 42, W, 42 + heroH);
  heroGrad.addColorStop(0, config.heroImgA);
  heroGrad.addColorStop(0.5, config.heroImgB);
  heroGrad.addColorStop(1, config.heroImgC);
  ctx.fillStyle = heroGrad;
  ctx.fillRect(0, 42, W, heroH);

  // Hero image shapes (simulated photo content)
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(80 + i * 110, 80 + Math.sin(i) * 20, 28 + i * 4, 0, Math.PI * 2);
    ctx.fillStyle = config.accent;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Hero overlay text
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(0, 42, W, heroH);
  ctx.fillStyle = config.heroText;
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(config.title, 24, 95);
  ctx.fillStyle = config.heroSub;
  ctx.font = "14px sans-serif";
  ctx.fillText(config.subtitle, 24, 118);

  // Hero CTA button
  ctx.fillStyle = config.accent;
  ctx.roundRect(24, 130, 120, 30, 6);
  ctx.fill();
  ctx.fillStyle = config.btnText;
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(config.btnLabel, 40, 150);

  // ── Avatar row ──
  const avatarY = 186;
  ctx.fillStyle = config.bar;
  ctx.fillRect(0, 172, W, 48);
  const avatars = config.avatars || ["AK", "BL", "CM", "DX"];
  avatars.forEach((initials, i) => {
    const ax = 20 + i * 38;
    ctx.beginPath();
    ctx.arc(ax, avatarY, 14, 0, Math.PI * 2);
    ctx.fillStyle = config.avatarColors?.[i] || config.accent;
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText(initials, ax - 8, avatarY + 4);
  });
  // Online badge
  ctx.beginPath();
  ctx.arc(20 + 14, avatarY - 10, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#22c55e";
  ctx.fill();

  // Notification count badge
  ctx.fillStyle = "#ef4444";
  ctx.roundRect(W - 50, 177, 36, 18, 9);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 10px sans-serif";
  ctx.fillText("12 new", W - 47, 190);

  // ── Stat bars ──
  const statY = 232;
  ctx.fillStyle = config.bar;
  ctx.fillRect(0, 220, W, 90);
  ctx.fillStyle = config.heroText;
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("Performance", 20, 238);

  const stats = config.stats || [
    { label: "Traffic", pct: 0.78, color: config.accent },
    { label: "Revenue", pct: 0.61, color: config.heroSub },
    { label: "Users", pct: 0.88, color: config.accent },
  ];
  stats.forEach((s, i) => {
    const by = statY + 14 + i * 22;
    ctx.fillStyle = config.urlBg;
    ctx.roundRect(20, by, W - 100, 10, 5);
    ctx.fill();
    ctx.fillStyle = s.color;
    ctx.roundRect(20, by, (W - 100) * s.pct, 10, 5);
    ctx.fill();
    ctx.fillStyle = config.urlText;
    ctx.font = "10px sans-serif";
    ctx.fillText(s.label, 20, by - 2);
    ctx.fillStyle = config.heroText;
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(Math.round(s.pct * 100) + "%", W - 72, by + 9);
  });

  // ── Cards row ──
  const cardY = 322;
  const cardW = (W - 56) / 3;
  for (let i = 0; i < 3; i++) {
    const cx = 16 + i * (cardW + 12);

    // Card bg
    ctx.fillStyle = config.card;
    ctx.roundRect(cx, cardY, cardW, 108, 8);
    ctx.fill();

    // Card image area with gradient
    const imgGrad = ctx.createLinearGradient(
      cx,
      cardY + 6,
      cx + cardW - 12,
      cardY + 54,
    );
    imgGrad.addColorStop(0, config.heroImgA);
    imgGrad.addColorStop(1, config.heroImgB);
    ctx.fillStyle = imgGrad;
    ctx.roundRect(cx + 6, cardY + 6, cardW - 12, 50, 5);
    ctx.fill();

    // Simulated image shapes inside card
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(cx + cardW * 0.3, cardY + 28, 14, 0, Math.PI * 2);
    ctx.fillStyle = config.accent;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + cardW * 0.7, cardY + 32, 10, 0, Math.PI * 2);
    ctx.fillStyle = config.heroText;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Tag pill on card
    ctx.fillStyle = config.accent + "33";
    ctx.roundRect(cx + 6, cardY + 60, 50, 14, 7);
    ctx.fill();
    ctx.fillStyle = config.accent;
    ctx.font = "8px sans-serif";
    ctx.fillText(["Live", "New", "Hot"][i], cx + 16, cardY + 71);

    // Card text lines
    ctx.fillStyle = config.heroText;
    ctx.fillRect(cx + 6, cardY + 80, cardW * 0.85, 7);
    ctx.fillStyle = config.heroSub;
    ctx.fillRect(cx + 6, cardY + 93, cardW * 0.6, 5);
  }

  // ── Footer nav ──
  ctx.fillStyle = config.bar;
  ctx.fillRect(0, H - 36, W, 36);
  config.navItems.forEach((item, i) => {
    ctx.fillStyle = i === 0 ? config.accent : config.navText;
    ctx.font = i === 0 ? "bold 11px sans-serif" : "11px sans-serif";
    ctx.fillText(item, 20 + i * 110, H - 14);
    if (i === 0) {
      ctx.fillStyle = config.accent;
      ctx.fillRect(20, H - 4, 30, 2);
    }
  });

  return new THREE.CanvasTexture(cvs);
}

/* ─── site configs (unchanged) ─── */
const SITE_CONFIGS = [
  {
    bg: "#0a0f1e",
    bar: "#111827",
    urlBg: "#1f2937",
    urlText: "#6b7280",
    url: "novabrowse.io/dashboard",
    hero: "#0d1b3e",
    heroText: "#00f5ff",
    heroSub: "#4b9bbb",
    heroImgA: "#0d2a4a",
    heroImgB: "#0a4a6a",
    heroImgC: "#062040",
    title: "NovaBrowse",
    subtitle: "Your spatial workspace",
    accent: "#00f5ff",
    btnText: "#020b18",
    btnLabel: "Open App",
    card: "#111827",
    cardImg: "#1a2a4a",
    cardText: "#1e3a5f",
    cardSub: "#1a2a3a",
    navItems: ["Home", "Workspaces", "Settings", "Help"],
    navText: "#4b5563",
    avatars: ["AK", "BL", "CM", "DX"],
    avatarColors: ["#00f5ff", "#0ea5e9", "#06b6d4", "#0284c7"],
    stats: [
      { label: "Traffic", pct: 0.78, color: "#00f5ff" },
      { label: "Revenue", pct: 0.61, color: "#4b9bbb" },
      { label: "Users", pct: 0.88, color: "#00d4e8" },
    ],
  },
  {
    bg: "#0f0a1e",
    bar: "#1a0f2e",
    urlBg: "#2d1b4e",
    urlText: "#9ca3af",
    url: "app.nova-ai.io",
    hero: "#1a0b3d",
    heroText: "#c4b5fd",
    heroSub: "#7c5cbf",
    heroImgA: "#2d1b5e",
    heroImgB: "#4c1d95",
    heroImgC: "#1e0a3d",
    title: "Nova AI",
    subtitle: "Intelligent web assistant",
    accent: "#8b5cf6",
    btnText: "#fff",
    btnLabel: "Try Free",
    card: "#1a0f2e",
    cardImg: "#2d1b4e",
    cardText: "#3b2267",
    cardSub: "#251545",
    navItems: ["AI Tools", "Templates", "API", "Docs"],
    navText: "#6b5892",
    avatars: ["ER", "FN", "GP", "HQ"],
    avatarColors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#a78bfa"],
    stats: [
      { label: "Queries", pct: 0.91, color: "#8b5cf6" },
      { label: "Accuracy", pct: 0.97, color: "#c4b5fd" },
      { label: "Speed", pct: 0.74, color: "#7c5cbf" },
    ],
  },
  {
    bg: "#071525",
    bar: "#0c1f35",
    urlBg: "#163048",
    urlText: "#64748b",
    url: "analytics.novabrowse.io",
    hero: "#091e38",
    heroText: "#3b82f6",
    heroSub: "#2d6a9f",
    heroImgA: "#0c2a50",
    heroImgB: "#163a70",
    heroImgC: "#081830",
    title: "Analytics",
    subtitle: "Real-time insights",
    accent: "#3b82f6",
    btnText: "#fff",
    btnLabel: "View Data",
    card: "#0c1f35",
    cardImg: "#163048",
    cardText: "#1e3d5c",
    cardSub: "#112a42",
    navItems: ["Overview", "Reports", "Alerts", "Export"],
    navText: "#3d6080",
    avatars: ["IA", "JB", "KC", "LD"],
    avatarColors: ["#3b82f6", "#2563eb", "#1d4ed8", "#60a5fa"],
    stats: [
      { label: "Sessions", pct: 0.83, color: "#3b82f6" },
      { label: "Bounce", pct: 0.34, color: "#2d6a9f" },
      { label: "Conv.", pct: 0.67, color: "#60a5fa" },
    ],
  },
  {
    bg: "#020b18",
    bar: "#041222",
    urlBg: "#0a1e33",
    urlText: "#94a3b8",
    url: "store.novabrowse.io",
    hero: "#031528",
    heroText: "#00f5ff",
    heroSub: "#0a7a8a",
    heroImgA: "#041e38",
    heroImgB: "#063050",
    heroImgC: "#021020",
    title: "Extensions",
    subtitle: "Power up your browser",
    accent: "#00d4e8",
    btnText: "#020b18",
    btnLabel: "Browse",
    card: "#041222",
    cardImg: "#071e33",
    cardText: "#0a2a40",
    cardSub: "#051525",
    navItems: ["Featured", "New", "Popular", "Free"],
    navText: "#1e4060",
    avatars: ["MA", "NB", "OC", "PD"],
    avatarColors: ["#00d4e8", "#06b6d4", "#0891b2", "#22d3ee"],
    stats: [
      { label: "Downloads", pct: 0.94, color: "#00d4e8" },
      { label: "Rating", pct: 0.88, color: "#0a7a8a" },
      { label: "Active", pct: 0.72, color: "#06b6d4" },
    ],
  },
  {
    bg: "#100a1a",
    bar: "#1a0f28",
    urlBg: "#261540",
    urlText: "#a78bfa",
    url: "collab.novabrowse.io",
    hero: "#1a0d30",
    heroText: "#e879f9",
    heroSub: "#9333ea",
    heroImgA: "#2d1050",
    heroImgB: "#4a1070",
    heroImgC: "#1a0830",
    title: "Collab Space",
    subtitle: "Browse together live",
    accent: "#e879f9",
    btnText: "#fff",
    btnLabel: "Invite",
    card: "#1a0f28",
    cardImg: "#2d1a45",
    cardText: "#3d206a",
    cardSub: "#26174a",
    navItems: ["Sessions", "Team", "History", "Share"],
    navText: "#7c4d9e",
    avatars: ["QE", "RF", "SG", "TH"],
    avatarColors: ["#e879f9", "#d946ef", "#c026d3", "#f0abfc"],
    stats: [
      { label: "Live", pct: 0.55, color: "#e879f9" },
      { label: "Members", pct: 0.79, color: "#9333ea" },
      { label: "Shared", pct: 0.66, color: "#c026d3" },
    ],
  },
  {
    bg: "#050d1a",
    bar: "#091828",
    urlBg: "#0f2438",
    urlText: "#7dd3fc",
    url: "sync.novabrowse.io",
    hero: "#071525",
    heroText: "#38bdf8",
    heroSub: "#0ea5e9",
    heroImgA: "#0c2a48",
    heroImgB: "#0e3a60",
    heroImgC: "#061520",
    title: "Device Sync",
    subtitle: "All devices, one flow",
    accent: "#38bdf8",
    btnText: "#020b18",
    btnLabel: "Sync Now",
    card: "#091828",
    cardImg: "#0f2438",
    cardText: "#153045",
    cardSub: "#0a1e30",
    navItems: ["Devices", "History", "Settings", "Logout"],
    navText: "#1e5070",
    avatars: ["UI", "VJ", "WK", "XL"],
    avatarColors: ["#38bdf8", "#0ea5e9", "#0284c7", "#7dd3fc"],
    stats: [
      { label: "Synced", pct: 0.98, color: "#38bdf8" },
      { label: "Devices", pct: 0.7, color: "#0ea5e9" },
      { label: "Storage", pct: 0.52, color: "#7dd3fc" },
    ],
  },
];

/* ─── window layout data — LARGER sizes ─── */
const WINDOW_DATA = [
  {
    x: -7,
    y: 2,
    z: -4,
    rx: 0.05,
    ry: 0.4,
    rz: -0.12,
    color: 0x00f5ff,
    w: 8.0,
    h: 5.2,
    site: 0,
  },
  {
    x: 6,
    y: 1,
    z: -6,
    rx: -0.04,
    ry: -0.3,
    rz: 0.08,
    color: 0x8b5cf6,
    w: 7.5,
    h: 4.8,
    site: 1,
  },
  {
    x: -3,
    y: -3,
    z: -9,
    rx: 0.08,
    ry: 0.2,
    rz: 0.05,
    color: 0x3b82f6,
    w: 7.0,
    h: 4.4,
    site: 2,
  },
  {
    x: 9,
    y: -2,
    z: -11,
    rx: -0.06,
    ry: -0.4,
    rz: -0.07,
    color: 0x00f5ff,
    w: 6.5,
    h: 4.1,
    site: 3,
  },
  {
    x: -10,
    y: -1,
    z: -13,
    rx: 0.03,
    ry: 0.5,
    rz: 0.1,
    color: 0xe879f9,
    w: 6.2,
    h: 3.9,
    site: 4,
  },
  {
    x: 2,
    y: 4,
    z: -10,
    rx: -0.05,
    ry: -0.2,
    rz: -0.06,
    color: 0x38bdf8,
    w: 6.8,
    h: 4.3,
    site: 5,
  },
];

function UserThreeScene() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const cleanupRef = useRef([]);

  useEffect(() => {
    polyfillRoundRect();
    let THREE;
    let cancelled = false;

    import("https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js")
      .then((mod) => {
        if (cancelled) return;
        THREE = mod;
        initScene(THREE);
      })
      .catch((err) => console.error("Three.js failed to load:", err));

    function initScene(THREE) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      cleanupRef.current.push(() => renderer.dispose());

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        200,
      );
      camera.position.set(0, 0, 20);

      /* ── build window meshes ── */
      const windowMeshes = [];
      WINDOW_DATA.forEach((d) => {
        const group = new THREE.Group();
        const tex = makeWebsiteTexture(THREE, SITE_CONFIGS[d.site]);
        const bodyGeo = new THREE.PlaneGeometry(d.w, d.h);
        const bodyMat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.93,
          side: THREE.DoubleSide,
        });
        group.add(new THREE.Mesh(bodyGeo, bodyMat));

        const borderGeo = new THREE.EdgesGeometry(
          new THREE.PlaneGeometry(d.w + 0.06, d.h + 0.06),
        );
        const borderMat = new THREE.LineBasicMaterial({
          color: d.color,
          transparent: true,
          opacity: 0.9,
        });
        const border = new THREE.LineSegments(borderGeo, borderMat);
        border.position.z = 0.01;
        group.add(border);

        const cornerSize = 0.5;
        [
          [-d.w / 2, d.h / 2],
          [d.w / 2, d.h / 2],
          [-d.w / 2, -d.h / 2],
          [d.w / 2, -d.h / 2],
        ].forEach(([cx, cy]) => {
          const sx = cx > 0 ? -1 : 1,
            sy = cy > 0 ? -1 : 1;
          const pts = [
            new THREE.Vector3(cx + sx * cornerSize, cy, 0),
            new THREE.Vector3(cx, cy, 0),
            new THREE.Vector3(cx, cy + sy * cornerSize, 0),
          ];
          const cGeo = new THREE.BufferGeometry().setFromPoints(pts);
          group.add(
            new THREE.Line(
              cGeo,
              new THREE.LineBasicMaterial({
                color: d.color,
                transparent: true,
                opacity: 0.5,
              }),
            ),
          );
        });

        group.position.set(d.x, d.y, d.z);
        group.rotation.set(d.rx, d.ry, d.rz);
        group.userData = {
          baseY: d.y,
          baseX: d.x,
          speed: 0.4 + Math.random() * 0.4,
          offset: d.site * 1.1,
          borderMat,
        };
        scene.add(group);
        windowMeshes.push(group);
      });

      /* ── starfield ── */
      const starGeo = new THREE.BufferGeometry();
      const starCount = 15000;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i++)
        starPos[i] = (Math.random() - 0.5) * 160;
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const stars = new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          color: 0x88ccff,
          size: 0.07,
          transparent: true,
          opacity: 0.65,
        }),
      );
      scene.add(stars);

      /* ── REPLACED: Beautiful glowing horizon instead of grid ── */
      const horizonGroup = new THREE.Group();

      // Layer 2: Glowing horizon line rings
      const ringColors = [0x00f5ff, 0x3b82f6, 0x8b5cf6, 0x00d4e8];
      for (let r = 0; r < 6; r++) {
        const ringGeo = new THREE.RingGeometry(
          12 + r * 8,
          12 + r * 8 + 0.08,
          128,
        );
        const ringMat = new THREE.MeshBasicMaterial({
          color: ringColors[r % ringColors.length],
          transparent: true,
          opacity: 0.12 - r * 0.015,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2.2;
        ring.position.y = -8;
        ring.position.z = -20 - r * 4;
        horizonGroup.add(ring);
      }

      // Layer 3: Floating light orbs on the horizon
      const orbData = [
        { x: -18, color: 0x00f5ff, size: 1.8 },
        { x: -8, color: 0x3b82f6, size: 1.2 },
        { x: 0, color: 0x8b5cf6, size: 2.2 },
        { x: 9, color: 0x00d4e8, size: 1.4 },
        { x: 20, color: 0xe879f9, size: 1.6 },
      ];
      const orbs = [];
      orbData.forEach((o) => {
        const orbGeo = new THREE.SphereGeometry(o.size, 16, 16);
        const orbMat = new THREE.MeshBasicMaterial({
          color: o.color,
          transparent: true,
          opacity: 0.06,
          depthWrite: false,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(o.x, -7.5, -18);
        orb.userData = { baseOpacity: 0.06, color: o.color };
        horizonGroup.add(orb);
        orbs.push(orb);

        // Halo ring around each orb
        const haloGeo = new THREE.RingGeometry(o.size * 1.4, o.size * 1.6, 64);
        const haloMat = new THREE.MeshBasicMaterial({
          color: o.color,
          transparent: true,
          opacity: 0.18,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.set(o.x, -7.5, -18);
        halo.rotation.x = -Math.PI / 2.5;
        halo.userData = { baseOpacity: 0.18 };
        horizonGroup.add(halo);
        orbs.push(halo);
      });

      // Layer 4: Volumetric light beam strips rising from horizon
      const beamColors = [0x00f5ff, 0x8b5cf6, 0x3b82f6];
      for (let b = 0; b < 5; b++) {
        const beamGeo = new THREE.PlaneGeometry(0.3 + Math.random() * 0.4, 12);
        const beamMat = new THREE.MeshBasicMaterial({
          color: beamColors[b % beamColors.length],
          transparent: true,
          opacity: 0.025 + Math.random() * 0.03,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.set(-20 + b * 10, -3, -16);
        beam.rotation.z = (Math.random() - 0.5) * 0.15;
        beam.userData = { baseOpacity: beamMat.opacity, phase: b * 0.7 };
        horizonGroup.add(beam);
        orbs.push(beam);
      }

      scene.add(horizonGroup);

      /* ── event listeners ── */
      const container = canvas.parentElement;
      const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      const onResize = () => {
        const w = canvas.clientWidth,
          h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      container.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);
      cleanupRef.current.push(() => {
        container.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
      });

      /* ── render loop ── */
      const clock = new THREE.Clock();
      function animate() {
        rafRef.current = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        stars.rotation.y = t * 0.01;
        stars.rotation.x = t * 0.004;

        // Animate orbs + beams pulsing
        orbs.forEach((o, i) => {
          if (o.material) {
            o.material.opacity =
              (o.userData.baseOpacity || 0.06) *
              (0.7 + Math.sin(t * 1.1 + i * 0.8) * 0.3);
          }
        });

        // Slowly drift horizon rings
        horizonGroup.children.forEach((child, i) => {
          if (child.geometry?.type === "RingGeometry") {
            child.rotation.z = t * 0.008 * (i % 2 === 0 ? 1 : -1);
          }
        });

        windowMeshes.forEach((w) => {
          const d = w.userData;
          w.position.y = d.baseY + Math.sin(t * d.speed + d.offset) * 0.3;
          w.position.x = d.baseX + Math.cos(t * d.speed * 0.6 + d.offset) * 0.1;
          d.borderMat.opacity = 0.55 + Math.sin(t * 1.5 + d.offset) * 0.35;
        });

        const mx = mouseRef.current.x,
          my = mouseRef.current.y;
        camera.position.x += (mx * 1.5 - camera.position.x) * 0.03;
        camera.position.y += (-my * 0.8 + 1 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }
      animate();
    }

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
}

// ADMIN: Floating geometric nodes + rippling wave grid + helix ribbon
// (Design from ThreeCanvas, adapted into AdminThreeScene)
function AdminThreeScene({ t }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;
    const THREE = window.THREE;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      300,
    );
    camera.position.set(0, 0, 20);

    // ─────────────────────────────────────────
    // LAYER 1 — Floating geometric nodes
    // ─────────────────────────────────────────
    const nodes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const geos = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.IcosahedronGeometry(1, 0),
    ];

    const solidMat = (opacity) =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x2e5e99),
        transparent: true,
        opacity,
        shininess: 80,
      });
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x1a2a4a),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    for (let i = 0; i < 25; i++) {
      const geo = geos[i % geos.length];
      const solid = new THREE.Mesh(geo, solidMat(0.18 + Math.random() * 0.22));
      const wire = new THREE.Mesh(geo, wireMat.clone());
      const spread = 38;
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread * 0.6;
      const z = (Math.random() - 0.5) * 20 - 5;
      const scale = 0.4 + Math.random() * 1.4;
      solid.position.set(x, y, z);
      wire.position.set(x, y, z);
      solid.scale.setScalar(scale);
      wire.scale.setScalar(scale);
      const rot = {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
      };
      solid.rotation.set(rot.x, rot.y, 0);
      wire.rotation.set(rot.x, rot.y, 0);
      nodeGroup.add(solid);
      nodeGroup.add(wire);
      nodes.push({
        solid,
        wire,
        speed: 0.001 + Math.random() * 0.006,
        floatAmp: 0.3 + Math.random() * 0.5,
        floatSpeed: 0.3 + Math.random() * 0.7,
        initY: y,
        t: Math.random() * Math.PI * 2,
      });
    }

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1a2a4a,
      transparent: true,
      opacity: 0.09,
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].solid.position.distanceTo(nodes[j].solid.position) < 12) {
          const lg = new THREE.BufferGeometry().setFromPoints([
            nodes[i].solid.position.clone(),
            nodes[j].solid.position.clone(),
          ]);
          nodeGroup.add(new THREE.Line(lg, lineMat));
        }
      }
    }

    // Central glowing sphere
    const coreSphere = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 32, 32),
      new THREE.MeshPhongMaterial({
        color: 0x1a2a4a,
        transparent: true,
        opacity: 0.35,
        shininess: 120,
      }),
    );
    coreSphere.position.set(14, 2, -8);
    scene.add(coreSphere);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3.7, 1),
      new THREE.MeshBasicMaterial({
        color: 0x1a2a4a,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      }),
    );
    coreWire.position.set(14, 2, -8);
    scene.add(coreWire);

    // ─────────────────────────────────────────
    // LAYER 2 — Rippling wave particle grid
    // ─────────────────────────────────────────
    const GRID_W = 48,
      GRID_H = 28;
    const particleCount = GRID_W * GRID_H;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colA = new THREE.Color(0x2e5e99);
    const colB = new THREE.Color(0x7ba4d0);

    for (let row = 0; row < GRID_H; row++) {
      for (let col = 0; col < GRID_W; col++) {
        const idx = row * GRID_W + col;
        positions[idx * 3 + 0] = (col / (GRID_W - 1) - 0.5) * 80;
        positions[idx * 3 + 1] = (row / (GRID_H - 1) - 0.5) * 46;
        positions[idx * 3 + 2] = -22;
        colors[idx * 3 + 0] = colA.r;
        colors[idx * 3 + 1] = colA.g;
        colors[idx * 3 + 2] = colA.b;
      }
    }

    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    gridGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleGrid = new THREE.Points(
      gridGeo,
      new THREE.PointsMaterial({
        size: 0.28,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      }),
    );
    scene.add(particleGrid);

    // ─────────────────────────────────────────
    // LAYER 3 — Helix ribbon of orbiting tori
    // ─────────────────────────────────────────
    const helixGroup = new THREE.Group();
    helixGroup.position.set(-22, 0, -10);
    scene.add(helixGroup);

    const ringMats = [
      new THREE.MeshBasicMaterial({
        color: 0x1a2a4a,
        transparent: true,
        opacity: 0.22,
        wireframe: false,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x1a2a4a,
        transparent: true,
        opacity: 0.14,
        wireframe: true,
      }),
    ];

    const helixRings = [];
    const HELIX_COUNT = 18;
    for (let i = 0; i < HELIX_COUNT; i++) {
      const tt = i / (HELIX_COUNT - 1);
      const y = (tt - 0.5) * 40;
      const radius = 1.6 + Math.sin(tt * Math.PI) * 0.8;
      const torusGeo = new THREE.TorusGeometry(radius, 0.12, 8, 28);
      const solid = new THREE.Mesh(torusGeo, ringMats[0].clone());
      const wire = new THREE.Mesh(torusGeo, ringMats[1].clone());
      const tilt = i % 2 === 0 ? Math.PI * 0.25 : -Math.PI * 0.25;
      solid.rotation.set(Math.PI / 2, 0, tilt);
      wire.rotation.set(Math.PI / 2, 0, tilt);
      solid.position.y = y;
      wire.position.y = y;
      helixGroup.add(solid);
      helixGroup.add(wire);
      helixRings.push({ solid, wire, phase: tt * Math.PI * 2 });
    }

    // Vertical spine
    const spinePoints = [];
    for (let i = 0; i < 60; i++) {
      const tt = i / 59;
      spinePoints.push(new THREE.Vector3(0, (tt - 0.5) * 40, 0));
    }
    helixGroup.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(spinePoints),
        new THREE.LineBasicMaterial({
          color: 0x7ba4d0,
          transparent: true,
          opacity: 0.15,
        }),
      ),
    );

    // Glowing orbs along the helix
    const orbGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xe7f0fa,
      transparent: true,
      opacity: 0.5,
    });
    const orbs = [];
    for (let i = 0; i < HELIX_COUNT; i++) {
      const tt = i / (HELIX_COUNT - 1);
      const angle = tt * Math.PI * 4;
      const r = 1.6 + Math.sin(tt * Math.PI) * 0.8;
      const orb = new THREE.Mesh(orbGeo, orbMat.clone());
      orb.position.set(
        Math.cos(angle) * r,
        (tt - 0.5) * 40,
        Math.sin(angle) * r * 0.3,
      );
      helixGroup.add(orb);
      orbs.push({ orb, angle, r, t: tt });
    }

    // ─────────────────────────────────────────
    // Lights
    // ─────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xe7f0fa, 0.3));
    const dirLight = new THREE.DirectionalLight(0x7ba4d0, 1.5);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);
    const ptLight = new THREE.PointLight(0x2e5e99, 2, 60);
    ptLight.position.set(-10, 5, 10);
    scene.add(ptLight);
    const helixLight = new THREE.PointLight(0x7ba4d0, 1.2, 40);
    helixLight.position.set(-22, 0, 5);
    scene.add(helixLight);

    // ─────────────────────────────────────────
    // Mouse parallax
    // ─────────────────────────────────────────
    let mouseX = 0,
      mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Layer 1 — nodes
      nodes.forEach((n) => {
        n.solid.rotation.x += n.speed;
        n.solid.rotation.y += n.speed * 0.7;
        n.wire.rotation.x += n.speed;
        n.wire.rotation.y += n.speed * 0.7;
        n.solid.position.y =
          n.initY + Math.sin(elapsed * n.floatSpeed + n.t) * n.floatAmp;
        n.wire.position.y = n.solid.position.y;
      });
      coreWire.rotation.x += 0.002;
      coreWire.rotation.y += 0.003;

      // Layer 2 — particle wave grid
      const posArr = gridGeo.attributes.position.array;
      const colArr = gridGeo.attributes.color.array;
      for (let row = 0; row < GRID_H; row++) {
        for (let col = 0; col < GRID_W; col++) {
          const idx = row * GRID_W + col;
          const xPos = posArr[idx * 3 + 0];
          const wave =
            Math.sin(xPos * 0.18 + elapsed * 0.9) *
            Math.cos(row * 0.22 + elapsed * 0.5) *
            2.8;
          posArr[idx * 3 + 2] = -22 + wave;
          const blend =
            (Math.sin(xPos * 0.1 + elapsed * 0.7 + row * 0.15) + 1) * 0.5;
          colArr[idx * 3 + 0] = colA.r + (colB.r - colA.r) * blend;
          colArr[idx * 3 + 1] = colA.g + (colB.g - colA.g) * blend;
          colArr[idx * 3 + 2] = colA.b + (colB.b - colA.b) * blend;
        }
      }
      gridGeo.attributes.position.needsUpdate = true;
      gridGeo.attributes.color.needsUpdate = true;

      // Layer 3 — helix
      helixGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.35;
      helixRings.forEach((r, i) => {
        r.solid.rotation.z = elapsed * (i % 2 === 0 ? 0.3 : -0.3) + r.phase;
        r.wire.rotation.z = r.solid.rotation.z;
        const pulse = 0.15 + Math.sin(elapsed * 1.2 + r.phase) * 0.08;
        r.solid.material.opacity = pulse;
        r.wire.material.opacity = pulse * 0.6;
      });
      orbs.forEach((o) => {
        o.orb.material.opacity =
          0.35 + Math.sin(elapsed * 1.8 + o.t * Math.PI * 2) * 0.2;
      });

      // Parallax
      nodeGroup.rotation.x += (mouseY * 0.06 - nodeGroup.rotation.x) * 0.03;
      nodeGroup.rotation.y += (mouseX * 0.08 - nodeGroup.rotation.y) * 0.03;
      particleGrid.rotation.x +=
        (mouseY * 0.015 - particleGrid.rotation.x) * 0.02;
      particleGrid.rotation.y +=
        (mouseX * 0.02 - particleGrid.rotation.y) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // ─────────────────────────────────────────
    // Resize
    // ─────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [t]);

  return React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
    },
  });
}

// ─────────────────────────────────────────────
// PAGE COMPONENTS
// ─────────────────────────────────────────────

function GuestHome({ t, darkMode, setPage }) {
  return React.createElement(
    "div",
    { style: { fontFamily: "'Jost', sans-serif" } },
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          height: 600,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      React.createElement(GuestThreeScene, { t }),
      React.createElement(
        "div",
        {
          style: {
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
          },
        },

        React.createElement(
          "div",
          {
            style: {
              display: "inline-block",
              background: `rgba(${t.accentRGB},0.08)`,
              border: `1px solid rgba(${t.accentRGB},0.25)`,
              borderRadius: 2,
              padding: "5px 18px",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: t.accent,
              marginBottom: 28,
            },
          },
          "Curated Marketplace",
        ),

        React.createElement(
          "h1",
          {
            style: {
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
              fontWeight: 300,
              color: t.text,
              lineHeight: 1.08,
              marginBottom: 24,
              letterSpacing: "-0.01em",
            },
          },
          "Discover\u00A0",
          React.createElement(
            "em",
            { style: { color: t.accent, fontStyle: "italic" } },
            "remarkable",
          ),
          React.createElement("br"),
          "things.",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontSize: 14,
              color: t.textMid,
              maxWidth: 420,
              margin: "0 auto 40px",
              lineHeight: 1.85,
              letterSpacing: "0.03em",
              fontWeight: 300,
            },
          },
          "Browse curated collections from independent makers. Find something extraordinary.",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            },
          },
          React.createElement(
            "button",
            {
              onClick: () => setPage("Marketplace"),
              style: {
                background: `linear-gradient(135deg, ${t.accent2} 0%, ${t.accent} 60%)`,
                color: darkMode ? "#050402" : "#fff",
                border: "none",
                borderRadius: 2,
                padding: "12px 32px",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: `0 6px 28px ${t.glow}`,
                transition: "opacity 0.2s, transform 0.2s",
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-1px)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "none";
              },
            },
            "Explore Marketplace",
          ),
          React.createElement(
            "button",
            {
              onClick: () => setPage("About"),
              style: {
                background: "none",
                border: `1px solid ${t.border}`,
                borderRadius: 2,
                color: t.textMid,
                padding: "12px 28px",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = t.accent;
                e.currentTarget.style.borderColor = `rgba(${t.accentRGB},0.4)`;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = t.textMid;
                e.currentTarget.style.borderColor = t.border;
              },
            },
            "Our Story",
          ),
        ),
      ),
    ),
  );
}

function UserHome({ t, user, setPage }) {
  return React.createElement(
    "div",
    { style: { fontFamily: "'Jost', sans-serif" } },
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          height: 540,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        },
      },
      React.createElement(UserThreeScene, { t }),
      React.createElement(
        "div",
        {
          style: {
            position: "relative",
            zIndex: 2,
            padding: "0 60px",
            maxWidth: 600,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            },
          },
          React.createElement("div", {
            style: {
              width: 28,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${t.accent})`,
            },
          }),
          React.createElement(
            "span",
            {
              style: {
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: t.accent,
              },
            },
            "Welcome back",
          ),
        ),
        React.createElement(
          "h1",
          {
            style: {
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 300,
              color: t.text,
              lineHeight: 1.12,
              marginBottom: 20,
            },
          },
          "Hello, ",
          React.createElement(
            "em",
            { style: { fontStyle: "italic", color: t.accent } },
            user?.name || "Shopper",
          ),
          ".",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontSize: 14,
              color: t.textMid,
              maxWidth: 400,
              lineHeight: 1.85,
              marginBottom: 36,
              letterSpacing: "0.02em",
              fontWeight: 300,
            },
          },
          "Your personal marketplace awaits. Discover new finds, revisit favorites, and track your orders.",
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 12 } },
          React.createElement(
            "button",
            {
              onClick: () => setPage("Marketplace"),
              style: {
                background: `linear-gradient(135deg, ${t.accent2} 0%, ${t.accent} 60%)`,
                color: "#fff",
                border: "none",
                borderRadius: 2,
                padding: "11px 28px",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: `0 6px 24px ${t.glow}`,
                transition: "opacity 0.2s",
              },
              onMouseEnter: (e) => (e.currentTarget.style.opacity = "0.88"),
              onMouseLeave: (e) => (e.currentTarget.style.opacity = "1"),
            },
            "Shop Now",
          ),
          React.createElement(
            "button",
            {
              onClick: () => setPage("Orders"),
              style: {
                background: "none",
                border: `1px solid ${t.border}`,
                borderRadius: 2,
                color: t.textMid,
                padding: "11px 24px",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = t.accent;
                e.currentTarget.style.borderColor = `rgba(${t.accentRGB},0.4)`;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = t.textMid;
                e.currentTarget.style.borderColor = t.border;
              },
            },
            "My Orders",
          ),
        ),
      ),
    ),
  );
}

function AdminHome({ t }) {
  const [showDemo, setShowDemo] = useState(false);
  return React.createElement(
    "div",
    { style: { fontFamily: "'Jost', sans-serif" } },
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          height: 480,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: 48,
        },
      },
      React.createElement(AdminThreeScene, { t }),
      React.createElement(
        "div",
        { style: { position: "relative", zIndex: 2, padding: "0 60px" } },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 10,
              fontFamily: "'Share Tech Mono', monospace",
              color: t.accent,
              letterSpacing: "0.22em",
              marginBottom: 14,
            },
          },
          "> ADMIN.DASHBOARD",
        ),
        React.createElement(
          "h1",
          {
            style: {
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 300,
              color: t.text,
              lineHeight: 1.12,
              marginBottom: 16,
            },
          },
          "Store Command ",
          React.createElement(
            "em",
            { style: { color: t.accent, fontStyle: "italic" } },
            "Center.",
          ),
        ),
        React.createElement(
          "p",
          {
            style: {
              fontSize: 13,
              color: t.textMid,
              maxWidth: 400,
              lineHeight: 1.8,
              letterSpacing: "0.03em",
              fontWeight: 300,
            },
          },
          "Monitor performance, manage listings, and track orders with precision.",
        ),

        // After the <p> description, add the proof text:
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 16,
            },
          },
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center" } },
            ...[
              { initial: "A", color: "#7C6FCD" }, // purple
              { initial: "M", color: "#4CAF8F" }, // green
              { initial: "R", color: "#E05C4B" }, // red/coral
              { initial: "J", color: "#4A90D9" }, // blue
              { initial: "S", color: "#E8A838" }, // amber
            ].map((av, i) =>
              React.createElement(
                "div",
                {
                  key: i,
                  style: {
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: av.color,
                    border: `2px solid ${t.bg}`, // creates the overlap gap
                    marginLeft: i === 0 ? 0 : -10, // overlap amount
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Jost', sans-serif",
                    zIndex: 5 - i, // first circle on top
                    position: "relative",
                  },
                },
                av.initial,
              ),
            ),
          ),

          // ── Vertical divider ──
          React.createElement("div", {
            style: {
              width: 1,
              height: 32,
              background: `rgba(${t.accentRGB}, 0.25)`,
            },
          }),

          // ── Text ──
          React.createElement("div", {
            style: { fontSize: 13, color: t.textMid, lineHeight: 1.6 },
          }),

          "Trusted by ",
          React.createElement(
            "strong",
            { style: { color: t.text, fontWeight: 600 } },
            "120,000+ creators worldwide",
          ),
        ),

        // After the Watch Demo button, add the Start Building button:
        // React.createElement("button", {
        //   onClick: () => {},   // 👈 replace with your action
        //   style: {
        //     marginTop: 16, marginLeft: 12,
        //     display: "inline-flex", alignItems: "center", gap: 8,
        //     background: "#e8533a",           // coral color
        //     border: "none",
        //     borderRadius: 2,
        //     padding: "11px 26px",
        //     fontFamily: "'Jost', sans-serif",
        //     fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase",
        //     color: "#fff",
        //     cursor: "pointer",
        //     transition: "all 0.22s",
        //   },
        //   onMouseEnter: e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; },
        //   onMouseLeave: e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "none"; },
        // },
        //   "Start Building Free",
        //   React.createElement("span", null, "→")
        // ),

        // ── Watch Demo button ──
        React.createElement(
          "button",
          {
            onClick: () => setShowDemo(true),
            style: {
              marginTop: 28,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: `1px solid ${t.border}`,
              borderRadius: 2,
              padding: "11px 26px",
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: t.accent,
              cursor: "pointer",
              transition: "all 0.22s",
              position: "relative",
              overflow: "hidden",
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = `rgba(${t.accentRGB},0.10)`;
              e.currentTarget.style.borderColor = `rgba(${t.accentRGB},0.55)`;
              e.currentTarget.style.boxShadow = `0 0 22px rgba(${t.accentRGB},0.18)`;
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.borderColor = t.border;
              e.currentTarget.style.boxShadow = "none";
            },
          },
          // Play icon
          React.createElement(
            "svg",
            {
              width: 14,
              height: 14,
              viewBox: "0 0 14 14",
              fill: "none",
            },
            React.createElement("circle", {
              cx: 7,
              cy: 7,
              r: 6.5,
              stroke: `rgba(${t.accentRGB},0.5)`,
              strokeWidth: 1,
            }),
            React.createElement("polygon", {
              points: "5.5,4.2 10,7 5.5,9.8",
              fill: t.accent,
            }),
          ),
          "Watch Demo",
        ),
      ),
    ),
    showDemo &&
      React.createElement(WatchDemoModal, {
        t,
        onClose: () => setShowDemo(false),
      }),
  );
}

// ─────────────────────────────────────────────
// WATCH DEMO MODAL
// ─────────────────────────────────────────────
const DEMO_STEPS = [
  {
    icon: "✦",
    tag: "Step 01 — Sign Up",
    title: "Create your account",
    body: "Register in seconds",
    visual: "signup",
  },
  {
    icon: "◈",
    tag: "Step 02 — Name Your Store",
    title: "Set your brand identity",
    body: "Give your store a name, upload a logo, write a short description. Gather generates your storefront page automatically — beautiful and ready to share.",
    visual: "brand",
  },
  {
    icon: "⬡",
    tag: "Step 03 — Add Products",
    title: "List what you sell",
    body: "Click",
    visual: "product",
  },
  {
    icon: "◎",
    tag: "Step 04 — Manage Orders",
    title: "Track every sale",
    body: "When customers buy, you see every order in your dashboard. Update order status, view buyer details, and manage your inventory — all from one clean screen.",
    visual: "orders",
  },
  {
    icon: "❋",
    tag: "Step 05 — Watch It Grow",
    title: "Analytics & insights",
    body: "Your dashboard shows live stats: revenue, top products, customer activity. No spreadsheets. No plugins. Everything you need to grow, built right in.",
    visual: "analytics",
  },
];

function DemoVisual({ visual, t }) {
  const accent = t.accent;
  const accentRGB = t.accentRGB;
  const border = t.border;
  const text = t.text;
  const textMid = t.textMid;
  const bg2 = t.bg2;
  const surface = t.surface;

  const baseCard = {
    background: surface,
    border: `1px solid ${border}`,
    borderRadius: 3,
    padding: "14px 16px",
    fontFamily: "'Jost', sans-serif",
  };

  if (visual === "signup")
    return React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        },
      },
      React.createElement(
        "div",
        { style: { ...baseCard } },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: textMid,
              marginBottom: 10,
            },
          },
          "Create Account",
        ),
        ...[
          ["Your name", "Alex Rivera"],
          ["Email address", "alex@example.com"],
          ["Password", "••••••••"],
        ].map(([label, val]) =>
          React.createElement(
            "div",
            { key: label, style: { marginBottom: 8 } },
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 9,
                  color: textMid,
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                },
              },
              label,
            ),
            React.createElement(
              "div",
              {
                style: {
                  background: bg2,
                  border: `1px solid ${border}`,
                  borderRadius: 2,
                  padding: "7px 10px",
                  fontSize: 11,
                  color: text,
                },
              },
              val,
            ),
          ),
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 8, marginTop: 4 } },
          ...[
            ["Shop Products", "user"],
            ["Sell Products", "admin"],
          ].map(([label, role]) =>
            React.createElement(
              "div",
              {
                key: role,
                style: {
                  flex: 1,
                  border: `1px solid ${role === "admin" ? `rgba(${accentRGB},0.55)` : border}`,
                  borderRadius: 2,
                  padding: "10px 8px",
                  textAlign: "center",
                  background:
                    role === "admin" ? `rgba(${accentRGB},0.07)` : bg2,
                  cursor: "pointer",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 10,
                    fontWeight: 600,
                    color: role === "admin" ? accent : textMid,
                  },
                },
                label,
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              marginTop: 10,
              background: `linear-gradient(135deg, ${t.accent2} 0%, ${accent} 60%)`,
              borderRadius: 2,
              padding: "9px 0",
              textAlign: "center",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#050402",
            },
          },
          "Create Account →",
        ),
      ),
    );

  if (visual === "brand")
    return React.createElement(
      "div",
      {
        style: {
          ...baseCard,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: textMid,
          },
        },
        "Store Profile",
      ),
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 12 } },
        React.createElement(
          "div",
          {
            style: {
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${t.accent2}, ${accent})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            },
          },
          "A",
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                color: text,
              },
            },
            "Artisan Co.",
          ),
          React.createElement(
            "div",
            { style: { fontSize: 10, color: textMid, marginTop: 2 } },
            "gather.market/artisan-co",
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            background: bg2,
            border: `1px solid ${border}`,
            borderRadius: 2,
            padding: "8px 10px",
            fontSize: 11,
            color: textMid,
            lineHeight: 1.6,
          },
        },
        "Handcrafted goods from independent makers. We believe every object should tell a story.",
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 6 } },
        ...[accent, t.accent2, "rgba(255,255,255,0.3)"].map((c, i) =>
          React.createElement("div", {
            key: i,
            style: {
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: c,
              border: i === 0 ? `2px solid ${text}` : "none",
            },
          }),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 2,
            background: `linear-gradient(135deg, ${t.accent2} 0%, ${accent} 60%)`,
            borderRadius: 2,
            padding: "9px 0",
            textAlign: "center",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#050402",
          },
        },
        "Save & Publish →",
      ),
    );

  if (visual === "product")
    return React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 8 } },
      ...[
        { name: "Ceramic Mug — Sage", price: "$38", badge: "Live" },
        { name: "Linen Tote Bag", price: "$62", badge: "Live" },
        { name: "Beeswax Candle Set", price: "$44", badge: "Draft" },
      ].map(({ name, price, badge }) =>
        React.createElement(
          "div",
          {
            key: name,
            style: {
              ...baseCard,
              display: "flex",
              alignItems: "center",
              gap: 12,
            },
          },
          React.createElement("div", {
            style: {
              width: 36,
              height: 36,
              borderRadius: 2,
              background: `linear-gradient(135deg, rgba(${accentRGB},0.2), rgba(${accentRGB},0.08))`,
              flexShrink: 0,
            },
          }),
          React.createElement(
            "div",
            { style: { flex: 1 } },
            React.createElement(
              "div",
              { style: { fontSize: 11, fontWeight: 500, color: text } },
              name,
            ),
            React.createElement(
              "div",
              { style: { fontSize: 10, color: accent, marginTop: 2 } },
              price,
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: badge === "Live" ? accent : textMid,
                border: `1px solid ${badge === "Live" ? `rgba(${accentRGB},0.4)` : border}`,
                borderRadius: 2,
                padding: "3px 7px",
              },
            },
            badge,
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            border: `1px dashed rgba(${accentRGB},0.3)`,
            borderRadius: 2,
            padding: "12px 0",
            textAlign: "center",
            fontSize: 11,
            color: accent,
            cursor: "pointer",
            letterSpacing: "0.08em",
          },
        },
        "+ Add New Product",
      ),
    );

  if (visual === "orders")
    return React.createElement(
      "div",
      {
        style: {
          ...baseCard,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: textMid,
            marginBottom: 12,
          },
        },
        "Recent Orders",
      ),
      ...[
        {
          id: "#4021",
          item: "Ceramic Mug",
          buyer: "M. Hassan",
          status: "Shipped",
          amount: "$38",
        },
        {
          id: "#4020",
          item: "Linen Tote",
          buyer: "S. Park",
          status: "Processing",
          amount: "$62",
        },
        {
          id: "#4019",
          item: "Candle Set",
          buyer: "J. Moreau",
          status: "Delivered",
          amount: "$44",
        },
      ].map(({ id, item, buyer, status, amount }) =>
        React.createElement(
          "div",
          {
            key: id,
            style: {
              display: "flex",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: `1px solid ${border}`,
              gap: 8,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 9,
                color: textMid,
                width: 36,
                flexShrink: 0,
                fontFamily: "'Share Tech Mono', monospace",
              },
            },
            id,
          ),
          React.createElement(
            "div",
            { style: { flex: 1 } },
            React.createElement(
              "div",
              { style: { fontSize: 10, fontWeight: 500, color: text } },
              item,
            ),
            React.createElement(
              "div",
              { style: { fontSize: 9, color: textMid } },
              buyer,
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 9,
                color:
                  status === "Delivered"
                    ? accent
                    : status === "Shipped"
                      ? t.accent2
                      : textMid,
                letterSpacing: "0.06em",
                flexShrink: 0,
              },
            },
            status,
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 10,
                fontWeight: 600,
                color: accent,
                width: 34,
                textAlign: "right",
                flexShrink: 0,
              },
            },
            amount,
          ),
        ),
      ),
    );

  if (visual === "analytics")
    return React.createElement(
      "div",
      { style: { ...baseCard } },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: textMid,
            marginBottom: 12,
          },
        },
        "This Month",
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 14,
          },
        },
        ...[
          ["Revenue", "$1,284"],
          ["Orders", "31"],
          ["Visitors", "842"],
          ["Conv. Rate", "3.7%"],
        ].map(([label, val]) =>
          React.createElement(
            "div",
            {
              key: label,
              style: {
                background: bg2,
                border: `1px solid ${border}`,
                borderRadius: 2,
                padding: "10px 10px 8px",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 8,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: textMid,
                },
              },
              label,
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 16,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  color: accent,
                  marginTop: 4,
                },
              },
              val,
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            height: 48,
          },
        },
        ...[30, 55, 40, 70, 48, 85, 62, 90, 74, 95, 68, 88].map((h, i) =>
          React.createElement("div", {
            key: i,
            style: {
              flex: 1,
              height: `${h}%`,
              background: `linear-gradient(to top, ${accent}, rgba(${accentRGB},0.3))`,
              borderRadius: "1px 1px 0 0",
              opacity: 0.8,
            },
          }),
        ),
      ),
    );

  return null;
}

function WatchDemoModal({ t, onClose }) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const current = DEMO_STEPS[step];

  const goTo = (next) => {
    if (animating || next < 0 || next >= DEMO_STEPS.length) return;
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 260);
  };

  return React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.80)",
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(18px)",
        padding: "20px",
      },
      onClick: onClose,
    },
    React.createElement(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        style: {
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          width: "100%",
          maxWidth: 780,
          maxHeight: "90vh",
          overflow: "hidden",
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(${t.accentRGB},0.08)`,
          fontFamily: "'Jost', sans-serif",
          display: "flex",
          flexDirection: "column",
        },
      },

      // ── Header ──────────────────────────────
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px 18px",
            borderBottom: `1px solid ${t.border}`,
            flexShrink: 0,
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 12 } },
          React.createElement("div", {
            style: {
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: t.accent,
            },
          }),
          React.createElement(
            "span",
            {
              style: {
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: t.accent,
              },
            },
            "Build Your Store — No Code Required",
          ),
        ),
        React.createElement(
          "button",
          {
            onClick: onClose,
            style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              color: t.textSoft,
              fontSize: 20,
              lineHeight: 1,
              padding: 4,
            },
          },
          "×",
        ),
      ),

      // ── Body ────────────────────────────────
      React.createElement(
        "div",
        {
          style: { display: "flex", flex: 1, overflow: "hidden", minHeight: 0 },
        },

        // Left: step list
        React.createElement(
          "div",
          {
            style: {
              width: 200,
              flexShrink: 0,
              borderRight: `1px solid ${t.border}`,
              padding: "20px 0",
              overflowY: "auto",
            },
          },
          DEMO_STEPS.map((s, i) =>
            React.createElement(
              "div",
              {
                key: i,
                onClick: () => goTo(i),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 22px",
                  cursor: "pointer",
                  background: i === step ? `rgba(${t.accentRGB},0.07)` : "none",
                  borderLeft: `2px solid ${i === step ? t.accent : "transparent"}`,
                  transition: "all 0.18s",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      i === step
                        ? `linear-gradient(135deg, ${t.accent2}, ${t.accent})`
                        : `rgba(${t.accentRGB},0.08)`,
                    border: `1px solid ${i === step ? "transparent" : t.border}`,
                    fontSize: 9,
                    fontWeight: 700,
                    color: i === step ? "#050402" : t.textMid,
                    fontFamily: "'Share Tech Mono', monospace",
                  },
                },
                `0${i + 1}`,
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: 10,
                    fontWeight: i === step ? 600 : 400,
                    color: i === step ? t.text : t.textMid,
                    letterSpacing: "0.04em",
                    lineHeight: 1.3,
                  },
                },
                s.title,
              ),
            ),
          ),
        ),

        // Right: content
        React.createElement(
          "div",
          {
            style: {
              flex: 1,
              overflowY: "auto",
              padding: "28px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "none",
                transition: "opacity 0.25s, transform 0.25s",
              },
            },
            // Tag
            React.createElement(
              "div",
              {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: `rgba(${t.accentRGB},0.08)`,
                  border: `1px solid rgba(${t.accentRGB},0.22)`,
                  borderRadius: 2,
                  padding: "4px 12px",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: t.accent,
                  marginBottom: 14,
                },
              },
              React.createElement(
                "span",
                { style: { fontSize: 13 } },
                current.icon,
              ),
              current.tag,
            ),

            // Title
            React.createElement(
              "h2",
              {
                style: {
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 300,
                  color: t.text,
                  lineHeight: 1.15,
                  marginBottom: 12,
                },
              },
              current.title,
            ),

            // Body
            React.createElement(
              "p",
              {
                style: {
                  fontSize: 13,
                  color: t.textMid,
                  lineHeight: 1.85,
                  maxWidth: 380,
                  marginBottom: 24,
                  fontWeight: 300,
                },
              },
              current.body,
            ),

            // Visual mockup
            React.createElement(
              "div",
              {
                style: {
                  background: t.bg2,
                  border: `1px solid ${t.border}`,
                  borderRadius: 4,
                  padding: "20px",
                  marginBottom: 4,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 8,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: t.textSoft,
                    marginBottom: 14,
                    fontFamily: "'Share Tech Mono', monospace",
                  },
                },
                `> PREVIEW — ${current.tag.toUpperCase()}`,
              ),
              React.createElement(DemoVisual, { visual: current.visual, t }),
            ),
          ),

          // ── Nav buttons ───────────────────────
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "auto",
                paddingTop: 8,
              },
            },
            React.createElement(
              "button",
              {
                onClick: () => goTo(step - 1),
                disabled: step === 0,
                style: {
                  background: "none",
                  border: `1px solid ${step === 0 ? "transparent" : t.border}`,
                  borderRadius: 2,
                  padding: "9px 20px",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: step === 0 ? t.textSoft : t.textMid,
                  cursor: step === 0 ? "default" : "pointer",
                  transition: "all 0.18s",
                },
              },
              "← Previous",
            ),

            // Step dots
            React.createElement(
              "div",
              { style: { display: "flex", gap: 6, alignItems: "center" } },
              DEMO_STEPS.map((_, i) =>
                React.createElement("div", {
                  key: i,
                  onClick: () => goTo(i),
                  style: {
                    width: i === step ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      i === step
                        ? `linear-gradient(90deg, ${t.accent2}, ${t.accent})`
                        : `rgba(${t.accentRGB},0.22)`,
                    transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
                    cursor: "pointer",
                  },
                }),
              ),
            ),

            step < DEMO_STEPS.length - 1
              ? React.createElement(
                  "button",
                  {
                    onClick: () => goTo(step + 1),
                    style: {
                      background: `linear-gradient(135deg, ${t.accent2} 0%, ${t.accent} 60%)`,
                      border: "none",
                      borderRadius: 2,
                      padding: "9px 22px",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#050402",
                      cursor: "pointer",
                      transition: "opacity 0.18s",
                    },
                    onMouseEnter: (e) =>
                      (e.currentTarget.style.opacity = "0.85"),
                    onMouseLeave: (e) => (e.currentTarget.style.opacity = "1"),
                  },
                  "Next Step →",
                )
              : React.createElement(
                  "button",
                  {
                    onClick: onClose,
                    style: {
                      background: `linear-gradient(135deg, ${t.accent2} 0%, ${t.accent} 60%)`,
                      border: "none",
                      borderRadius: 2,
                      padding: "9px 22px",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#050402",
                      cursor: "pointer",
                      transition: "opacity 0.18s",
                      boxShadow: `0 6px 24px rgba(${t.accentRGB},0.3)`,
                    },
                    onMouseEnter: (e) =>
                      (e.currentTarget.style.opacity = "0.85"),
                    onMouseLeave: (e) => (e.currentTarget.style.opacity = "1"),
                  },
                  "Get Started ✦",
                ),
          ),
        ),
      ),
    ),
  );
}

function AuthModal({ t, onClose, onAuth }) {
  const [mode, setMode] = useState("signin");
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@gather.com");
  const [password, setPassword] = useState("password");
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(null);

  const MailIcon = () =>
    React.createElement(
      "svg",
      {
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        style: { color: t.textSoft, flexShrink: 0 },
      },
      React.createElement("path", {
        d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
      }),
      React.createElement("polyline", { points: "22,6 12,13 2,6" }),
    );

  const LockIcon = () =>
    React.createElement(
      "svg",
      {
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        style: { color: t.textSoft, flexShrink: 0 },
      },
      React.createElement("rect", {
        x: 3,
        y: 11,
        width: 18,
        height: 11,
        rx: 2,
        ry: 2,
      }),
      React.createElement("path", { d: "M7 11V7a5 5 0 0110 0v4" }),
    );

  const UserIcon = () =>
    React.createElement(
      "svg",
      {
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        style: { color: t.textSoft, flexShrink: 0 },
      },
      React.createElement("path", {
        d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2",
      }),
      React.createElement("circle", { cx: 12, cy: 7, r: 4 }),
    );

  const EyeIcon = ({ show }) =>
    show
      ? React.createElement(
          "svg",
          {
            width: 14,
            height: 14,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.8,
            style: { color: t.textSoft, cursor: "pointer", flexShrink: 0 },
          },
          React.createElement("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
          }),
          React.createElement("circle", { cx: 12, cy: 12, r: 3 }),
        )
      : React.createElement(
          "svg",
          {
            width: 14,
            height: 14,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.8,
            style: { color: t.textSoft, cursor: "pointer", flexShrink: 0 },
          },
          React.createElement("path", {
            d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24",
          }),
          React.createElement("line", { x1: 1, y1: 1, x2: 23, y2: 23 }),
        );

  const GoogleIcon = () =>
    React.createElement(
      "svg",
      { width: 15, height: 15, viewBox: "0 0 24 24" },
      React.createElement("path", {
        fill: "#4285F4",
        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
      }),
      React.createElement("path", {
        fill: "#34A853",
        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
      }),
      React.createElement("path", {
        fill: "#FBBC05",
        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",
      }),
      React.createElement("path", {
        fill: "#EA4335",
        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
      }),
    );

  const AppleIcon = () =>
    React.createElement(
      "svg",
      {
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        style: { color: t.text },
      },
      React.createElement("path", {
        d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
      }),
    );

  const GithubIcon = () =>
    React.createElement(
      "svg",
      {
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        style: { color: t.text },
      },
      React.createElement("path", {
        d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
      }),
    );

  const inputWrap = (name) => ({
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: t.bg2,
    border: `1px solid ${focused === name ? `rgba(${t.accentRGB},0.5)` : t.border}`,
    borderRadius: 6,
    padding: "0 12px",
    height: 44,
    transition: "border-color 0.2s",
    boxShadow: focused === name ? `0 0 0 3px rgba(${t.accentRGB},0.1)` : "none",
  });

  const inputStyle = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "none",
    color: t.text,
    fontSize: 13,
    fontFamily: "'Jost', sans-serif",
  };

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "4px 0",
  };
  const dividerLine = { flex: 1, height: 1, background: t.border };
  const dividerText = {
    fontSize: 11,
    color: t.textSoft,
    letterSpacing: "0.06em",
  };

  const socialBtn = (icon, label) =>
    React.createElement(
      "button",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          height: 40,
          background: "none",
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.text,
          fontSize: 12,
          fontFamily: "'Jost', sans-serif",
          cursor: "pointer",
          transition: "background 0.2s, border-color 0.2s",
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = `rgba(${t.accentRGB},0.06)`;
          e.currentTarget.style.borderColor = `rgba(${t.accentRGB},0.3)`;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "none";
          e.currentTarget.style.borderColor = t.border;
        },
      },
      icon,
      label,
    );

  return React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(12px)",
      },
      onClick: onClose,
    },
    React.createElement(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        style: {
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: "32px 32px 28px",
          width: "100%",
          maxWidth: 400,
          boxShadow: `0 32px 80px ${t.glow}`,
          fontFamily: "'Jost', sans-serif",
          maxHeight: "90vh",
          overflowY: "auto",
        },
      },

      // ── Header ──
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                borderLeft: `2px solid ${t.accent}`,
                paddingLeft: 8,
                marginBottom: 6,
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  fontSize: 17,
                  fontWeight: 600,
                  color: t.text,
                  letterSpacing: "-0.3px",
                },
              },
              "Gather",
            ),
          ),
          React.createElement(
            "h2",
            {
              style: {
                fontSize: 22,
                fontWeight: 600,
                color: t.text,
                letterSpacing: "-0.4px",
                lineHeight: 1.2,
              },
            },
            mode === "signin" ? "Welcome back" : "Create account",
          ),
          React.createElement(
            "p",
            { style: { fontSize: 12, color: t.textSoft, marginTop: 4 } },
            mode === "signin"
              ? "Sign in to continue to Gather"
              : "Join thousands of shoppers on Gather",
          ),
        ),
        React.createElement(
          "button",
          {
            onClick: onClose,
            style: {
              background: "none",
              border: `1px solid ${t.border}`,
              borderRadius: 6,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: t.textSoft,
              fontSize: 16,
              lineHeight: 1,
              flexShrink: 0,
            },
          },
          "×",
        ),
      ),

      // ── Tabs ──
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            background: t.bg2,
            borderRadius: 8,
            padding: 3,
            marginBottom: 22,
          },
        },
        ["signin", "register"].map((m) =>
          React.createElement(
            "button",
            {
              key: m,
              onClick: () => setMode(m),
              style: {
                flex: 1,
                background: mode === m ? t.surface : "transparent",
                color: mode === m ? t.accent : t.textSoft,
                border: mode === m ? `1px solid ${t.border}` : "none",
                borderRadius: 6,
                padding: "7px 0",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.18s",
              },
            },
            m === "signin" ? "Sign In" : "Register",
          ),
        ),
      ),

      // ── Fields ──
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 10 } },

        mode === "register" &&
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: t.bg2,
                border: `1px solid ${focused === "name" ? `rgba(${t.accentRGB},0.5)` : t.border}`,
                borderRadius: 6,
                padding: "0 12px",
                height: 44,
                transition: "border-color 0.2s",
                boxShadow:
                  focused === "name"
                    ? `0 0 0 3px rgba(${t.accentRGB},0.1)`
                    : "none",
              },
            },
            React.createElement(UserIcon),
            React.createElement("input", {
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Your name",
              style: inputStyle,
              onFocus: () => setFocused("name"),
              onBlur: () => setFocused(null),
            }),
          ),

        React.createElement(
          "div",
          { style: inputWrap("email") },
          React.createElement(MailIcon),
          React.createElement("input", {
            value: email,
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            placeholder: "Email address",
            style: inputStyle,
            onFocus: () => setFocused("email"),
            onBlur: () => setFocused(null),
          }),
        ),

        React.createElement(
          "div",
          { style: inputWrap("password") },
          React.createElement(LockIcon),
          React.createElement("input", {
            value: password,
            onChange: (e) => setPassword(e.target.value),
            type: showPass ? "text" : "password",
            placeholder: "Password",
            style: inputStyle,
            onFocus: () => setFocused("password"),
            onBlur: () => setFocused(null),
          }),
          React.createElement(
            "div",
            { onClick: () => setShowPass((s) => !s) },
            React.createElement(EyeIcon, { show: showPass }),
          ),
        ),

        // Role picker (register only)
        mode === "register" &&
          React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              {
                style: {
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: t.textSoft,
                  marginBottom: 8,
                  marginTop: 2,
                },
              },
              "I want to",
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                },
              },
              [
                ["user", "Shop Products", "Browse & buy"],
                ["admin", "Sell Products", "Manage a store"],
              ].map(([r, title, desc]) =>
                React.createElement(
                  "div",
                  {
                    key: r,
                    onClick: () => setRole(r),
                    style: {
                      border: `1px solid ${role === r ? `rgba(${t.accentRGB},0.5)` : t.border}`,
                      borderRadius: 8,
                      padding: "14px 12px",
                      cursor: "pointer",
                      background:
                        role === r ? `rgba(${t.accentRGB},0.06)` : t.bg2,
                      transition: "all 0.18s",
                    },
                  },
                  React.createElement(
                    "div",
                    {
                      style: {
                        fontWeight: 600,
                        fontSize: 13,
                        color: t.text,
                        marginBottom: 3,
                      },
                    },
                    title,
                  ),
                  React.createElement(
                    "div",
                    { style: { fontSize: 11, color: t.textSoft } },
                    desc,
                  ),
                ),
              ),
            ),
          ),

        // Submit
        React.createElement(
          "button",
          {
            onClick: () => {
              onAuth({ role, name: name || "Shopper" });
              onClose();
            },
            style: {
              background: `linear-gradient(135deg, ${t.accent2} 0%, ${t.accent} 60%)`,
              color: "#050402",
              border: "none",
              borderRadius: 8,
              padding: "13px 0",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
              marginTop: 4,
              transition: "opacity 0.18s",
              width: "100%",
            },
            onMouseEnter: (e) => (e.currentTarget.style.opacity = "0.88"),
            onMouseLeave: (e) => (e.currentTarget.style.opacity = "1"),
          },
          mode === "signin" ? "Enter" : "Create Account",
        ),

        // Divider
        React.createElement(
          "div",
          { style: dividerStyle },
          React.createElement("div", { style: dividerLine }),
          React.createElement(
            "span",
            { style: dividerText },
            "or continue with",
          ),
          React.createElement("div", { style: dividerLine }),
        ),

        // Social buttons
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 8 } },
          socialBtn(React.createElement(GoogleIcon), "Continue with Google"),
          socialBtn(React.createElement(AppleIcon), "Continue with Apple"),
          socialBtn(React.createElement(GithubIcon), "Continue with GitHub"),
        ),

        // Footer
        React.createElement(
          "p",
          {
            style: {
              textAlign: "center",
              fontSize: 12,
              color: t.textSoft,
              marginTop: 4,
            },
          },
          mode === "signin"
            ? "Don't have an account? "
            : "Already have an account? ",
          React.createElement(
            "span",
            {
              onClick: () => setMode(mode === "signin" ? "register" : "signin"),
              style: { color: t.accent, cursor: "pointer", fontWeight: 500 },
            },
            mode === "signin" ? "Sign Up" : "Sign In",
          ),
        ),

        mode === "signin" &&
          React.createElement(
            "p",
            {
              style: {
                textAlign: "center",
                fontSize: 11,
                color: t.textSoft,
                letterSpacing: "0.04em",
                marginTop: 0,
              },
            },
            "Demo: use any email / password",
          ),
      ),
    ),
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
function App() {
  const [role, setRole] = useState("guest");
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadFonts();
    injectGlobalStyles();
  }, []);

  const t =
    THEMES[role === "admin" ? "admin" : role === "user" ? "user" : "guest"][
      darkMode ? "dark" : "light"
    ];

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.transition = "background 0.5s, color 0.5s";
  }, [t]);

  const addToCart = (product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleAuth = ({ role: newRole, name }) => {
    setRole(newRole);
    setUser({ name, role: newRole });
    setPage("Home");
  };

  const handleSignOut = () => {
    setRole("guest");
    setUser(null);
    setPage("Home");
  };

  const renderPage = () => {
    const props = { t, role, searchQuery, setPage };
    if (page === "SignIn") {
      setShowAuth(true);
      setPage("Home");
      return null;
    }
    switch (page) {
      case "Home":
        if (role === "guest")
          return React.createElement(GuestHome, {
            ...props,
            darkMode,
            onAddToCart: addToCart,
          });
        if (role === "user")
          return React.createElement(UserHome, {
            ...props,
            user,
            onAddToCart: addToCart,
          });
        return React.createElement(AdminHome, { ...props });
      default:
        return React.createElement(GuestHome, {
          ...props,
          darkMode,
          onAddToCart: addToCart,
        });
    }
  };

  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        transition: "background 0.5s, color 0.5s",
      },
    },
    React.createElement(Navbar, {
      role,
      page,
      setPage,
      darkMode,
      toggleDark: () => setDarkMode((d) => !d),
      cart,
      t,
      onSignIn: () => setShowAuth(true),
      onSignOut: handleSignOut,
      searchQuery,
      setSearchQuery,
    }),
    React.createElement("div", { style: { paddingTop: 68 } }, renderPage()),
    showAuth &&
      React.createElement(AuthModal, {
        t,
        onClose: () => setShowAuth(false),
        onAuth: handleAuth,
      }),
  );
}

export default App;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
