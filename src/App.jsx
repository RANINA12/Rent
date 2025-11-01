import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// CSS import ko main.jsx me rakha gaya hai, yahan se hata diya gaya hai.

// --- Layout & Common Components ---
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Chatbot from "./components/layout/Chatbot.jsx";
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';

// --- Public Page Components ---
import HomePage from "./pages/HomePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import CategoryPage from "./pages/Categorypage.jsx"; // FIX: Filename casing theek ki gayi
import ItemDetailsPage from "./pages/ItemDetailsPage.jsx";
import PublicProfilePage from "./pages/PublicProfilePage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// --- Protected User Page Components ---
import UploadItemPage from "./pages/UploadItemPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditItemPage from "./pages/EditItemPage.jsx";

// --- Admin Page Components ---
import AdminPage from "./pages/AdminPage.jsx";
import AdminAnalyticsDashboard from "./pages/admin/AdminAnalyticsDashboard.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import DataExplorerPage from "./pages/admin/DataExplorerPage.jsx";
import KycManagementPage from "./pages/admin/KycManagementPage.jsx";
import ManagePostsPage from "./pages/admin/ManagePostsPage.jsx";
import CreatePostPage from "./pages/admin/CreatePostPage.jsx";

// --- Profile Section (Nested) Components ---
import Dashboard from "./components/profile/Dashboard.jsx";
import MyItems from "./components/profile/MyItems.jsx";
import MyRentals from "./components/profile/MyRentals.jsx";
import Settings from "./components/profile/Settings.jsx";
import IncomingRequests from "./components/profile/IncomingRequests.jsx";
import SearchResultsPage from "./pages/SearchResultsPage";
// --- Utilities & Route Guards ---
import ProtectedRoute from "./utils/privateRoute.jsx";

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* --- 1. Public Routes (Anyone can see) --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/map/:city" element={<MapPage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          <Route path="/profile/:userId" element={<PublicProfilePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {/* --- 2. Protected User Routes (Login required) --- */}
          <Route
            path="/upload-item"
            element={
              <ProtectedRoute>
                <UploadItemPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/item/edit/:id"
            element={
              <ProtectedRoute>
                <EditItemPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            {/* Nested routes for the profile section */}
            <Route index element={<Dashboard />} />
            <Route path="items" element={<MyItems />} />
            <Route path="rentals" element={<MyRentals />} />
            <Route path="settings" element={<Settings />} />
            <Route path="incoming-requests" element={<IncomingRequests />} />
          </Route>

          {/* --- 3. Protected Admin Routes (Admin login required) --- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          >
            {/* Nested routes for the admin panel */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminAnalyticsDashboard />} />
            <Route path="users" element={<UserListPage />} />
            <Route path="kyc-requests" element={<KycManagementPage />} />
            <Route path="explorer" element={<DataExplorerPage />} />
            <Route path="posts" element={<ManagePostsPage />} />
            <Route path="posts/new" element={<CreatePostPage />} />
          </Route>

          {/* --- 4. Fallback/Not Found Route --- */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <button
        onClick={() => setIsChatbotOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 bg-teal-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl z-50 transform hover:scale-110 transition-transform"
        aria-label="Toggle Chatbot"
      >
        💬
      </button>
      {isChatbotOpen && (
        <Chatbot closeChatbot={() => setIsChatbotOpen(false)} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
