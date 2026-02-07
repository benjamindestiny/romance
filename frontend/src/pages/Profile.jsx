import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import LogoLoading from "../components/LogoLoading.jsx";
import { ArrowLeftIcon, HeartIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/profile/${userId}`,
        );
        setProfile(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error loading profile");
        navigate("/profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-text-primary flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-dark-bg text-text-primary flex items-center justify-center">
        <p>Profile not found</p>
      </div>
    );
  }

  const getJoinDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/profiles")}
          className="flex items-center gap-2 text-primary-purple hover:text-pink-accent mb-6 transition"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Search
        </button>

        {/* Profile Card */}
        <div className="bg-card-bg rounded-2xl overflow-hidden max-w-2xl mx-auto">
          {/* Cover Image */}
          <div className="h-64 bg-gradient-to-b from-primary-purple to-pink-accent flex items-center justify-center">
            {profile.profilePic ? (
              <img
                src={profile.profilePic}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white text-8xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-primary-purple mb-2">
              {profile.name}
            </h1>
            <p className="text-text-secondary mb-6">
              Joined {getJoinDate(profile.createdAt)}
            </p>

            {/* Looking For */}
            {profile.lookingFor && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">
                  Looking For
                </h3>
                <div className="inline-block bg-primary-purple/20 text-primary-purple px-4 py-2 rounded-lg font-semibold">
                  {profile.lookingFor}
                </div>
              </div>
            )}

            {/* Bio */}
            {profile.bio && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">
                  About
                </h3>
                <p className="text-text-primary leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="bg-pink-accent/20 text-pink-accent px-4 py-2 rounded-lg font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 flex items-center justify-center gap-2 bg-pink-accent text-white py-3 rounded-lg font-semibold hover:brightness-90 transition">
                <HeartIcon className="size-5" />
                Add as Partner
              </button>
              <button className="flex-1 bg-primary-purple text-white py-3 rounded-lg font-semibold hover:brightness-90 transition">
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
