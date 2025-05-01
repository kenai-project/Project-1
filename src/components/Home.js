import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { FaLock, FaUserShield, FaRocket, FaShieldAlt, FaKey, FaUserCheck, FaSmileBeam } from "react-icons/fa";
import { motion } from "framer-motion";
import { Box, Typography, Paper, Grid, Button, useTheme } from "@mui/material";

const testimonials = [
  {
    quote: "Finally a system that treats privacy seriously. Personicle gave me peace of mind.",
    author: "- Sarah K.",
  },
  {
    quote: "The smooth authentication flow is a game-changer for our platform.",
    author: "- Alex R.",
  },
  {
    quote: "Personicle is the future of identity management. Super intuitive.",
    author: "- Ravi M.",
  },
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setIsLoggedIn(!!user);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 4, textAlign: "center", maxWidth: 1000, mx: "auto" }}>
      <Box sx={{ mb: 6, p: 4, borderRadius: 3, background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`, color: theme.palette.common.white, boxShadow: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          🔐 Welcome to <Box component="span" sx={{ color: theme.palette.info.light, fontWeight: "bold", textShadow: `0 0 8px ${theme.palette.info.light}` }}>Personicle</Box>
        </Typography>
        <Typography variant="h6" component="p" sx={{ maxWidth: 750, mx: "auto" }}>
          Your secure gateway to personal data control and seamless authentication.
        </Typography>
        <Box
          component="img"
          src="/homepage.png"
          alt="Personicle App Overview"
          sx={{ width: "100%", maxWidth: 900, mt: 3, borderRadius: 2 }}
        />
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, boxShadow: 3, borderRadius: 2, textAlign: "left" }}>
            <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1, color: theme.palette.info.main, mb: 2 }}>
              <FaLock /> What is Personicle?
            </Typography>
            <Box
              component="img"
              src="/personicle_overview.png"
              alt="Personicle Overview"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />
            <Typography>
              Personicle empowers you to take control of your personal data with private, decentralized authentication and secure user management.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, boxShadow: 3, borderRadius: 2, textAlign: "left" }}>
            <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1, color: theme.palette.info.main, mb: 2 }}>
              <FaUserShield /> How It Works
            </Typography>
            <Box
              component="img"
              src="/personicle_pie_chart.png"
              alt="How It Works Diagram"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />
            <Typography>
              We use end-to-end encryption, role-based access control, and privacy-first protocols to keep your identity safe and accessible only to you.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, boxShadow: 3, borderRadius: 2, textAlign: "left" }}>
            <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1, color: theme.palette.info.main, mb: 2 }}>
              <FaRocket /> Key Components
            </Typography>
            <Box
              component="img"
              src="/authentication_flow.png"
              alt="Authentication Flow Diagram"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />
            <ul style={{ paddingLeft: 20 }}>
              <li>✔️ Decentralized Identity</li>
              <li>✔️ Encrypted Data Vaults</li>
              <li>✔️ Real-time Authentication</li>
              <li>✔️ Role-based Access</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                ✨ Why Choose Us?
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <FaShieldAlt size={30} color={theme.palette.primary.main} />
                    <Typography variant="h6">Privacy First</Typography>
                    <Typography>Your data, your control—always encrypted.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <FaKey size={30} color={theme.palette.primary.main} />
                    <Typography variant="h6">Secure Access</Typography>
                    <Typography>Multi-factor authentication at its finest.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <FaUserCheck size={30} color={theme.palette.primary.main} />
                    <Typography variant="h6">Smart Permissions</Typography>
                    <Typography>Tailored access models that adapt to you.</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <FaSmileBeam /> User Voices
              </Typography>
              <Box>
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "{testimonials[currentTestimonial].quote}"
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {testimonials[currentTestimonial].author}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {!isLoggedIn && (
        <Paper sx={{ p: 4, borderRadius: 2, backgroundColor: theme.palette.background.paper, boxShadow: 3, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Ready to take back control?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join Personicle and experience the future of secure identity management.
          </Typography>
          <Button variant="contained" color="primary" href="/register">
            Get Started
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Home;
