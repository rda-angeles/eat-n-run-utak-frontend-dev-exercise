"use client";
import { useState } from "react";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Avatar,
} from "@mui/material";

import { Menu } from "@mui/icons-material";

// Components
import { drawerWidth, Products, SalesSummary, DrawerItem } from "@/components";

export default function page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Nav */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#fff",
          color: "black",
        }}
      >
        <Toolbar className="app-toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>

          <div className="flex items-center justify-center">
            <Avatar sx={{ width: 45, height: 45, bgcolor: "#1E6F5C" }} />

            <div className="ml-5">
              <h2 className="text-lg font-bold">John Doe</h2>
              <p className="text-sm">Admin</p>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Side Nav */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerItem />
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          <DrawerItem />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "2rem",
          display: "grid",
          gap: "2rem",
        }}
      >
        {/* Content/Components here */}

        <div className="main-content-wrapper">
          <SalesSummary />
        </div>

        <div className="main-content-wrapper">
          <Products
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            open={openModal}
          />
        </div>
      </Box>
    </Box>
  );
}
