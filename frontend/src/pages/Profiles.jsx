import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import LogoLoading from "../components/LogoLoading.jsx";
import { MagnifyingGlassIcon, HeartIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function Profiles() {
  const [showLoader, setShowLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter a name to search");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://romance-0bj5.onrender.com/api/auth/search?q=${encodeURIComponent(
          searchQuery,
        )}`,
      );
      setProfiles(response.data);
      setSearched(true);

      if (response.data.length === 0) {
        toast.error("No users found with that name");
      } else {
        toast.success(`Found ${response.data.length} user(s)`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error searching users");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getJoinDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-primary-purple text-2xl font-bold md:hidden mb-4">
            Find Partner
          </h1>
          <p className="text-xl font-bold">Add Your Partner</p>
          <p className="text-sm text-text-secondary">
            Search for your spouse or partner to start the quiz journey together
          </p>
        </header>

        {/* Search Form */}
        <section className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-3 size-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card-bg text-text-primary border border-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-purple text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-accent disabled:opacity-50 transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </section>

        {/* Results */}
        {searched && (
          <section>
            {profiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profiles.map((profile) => (
                  <Link key={profile._id} to={`/profile/${profile._id}`}>
                    <div className="bg-card-bg rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary-purple/20 transition cursor-pointer h-full">
                      {/* Profile Picture */}
                      <div className="h-48 bg-gradient-to-b from-primary-purple to-pink-accent flex items-center justify-center">
                        {profile.profilePic ? (
                          <img
                            src={profile.profilePic}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-white text-4xl font-bold">
                            {profile.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Profile Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-primary-purple mb-1">
                          {profile.name}
                        </h3>
                        <p className="text-xs text-text-secondary mb-2">
                          Joined {getJoinDate(profile.createdAt)}
                        </p>

                        {profile.bio && (
                          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                            {profile.bio}
                          </p>
                        )}

                        {profile.lookingFor && (
                          <div className="mb-3">
                            <span className="text-xs bg-primary-purple/20 text-primary-purple px-2 py-1 rounded">
                              Looking for: {profile.lookingFor}
                            </span>
                          </div>
                        )}

                        {profile.interests && profile.interests.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {profile.interests
                              .slice(0, 3)
                              .map((interest, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-pink-accent/20 text-pink-accent px-2 py-1 rounded"
                                >
                                  {interest}
                                </span>
                              ))}
                            {profile.interests.length > 3 && (
                              <span className="text-xs text-text-secondary">
                                +{profile.interests.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-pink-accent text-white py-2 rounded-lg hover:brightness-90 transition">
                          <HeartIcon className="size-4" />
                          View Profile
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="size-12 text-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary">
                  No profiles found. Try a different search!
                </p>
              </div>
            )}
          </section>
        )}

        {/* Initial State */}
        {!searched && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="size-16 text-text-secondary mx-auto mb-4 opacity-50" />
            <p className="text-text-secondary text-lg">
              Start searching to find connections
            </p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
