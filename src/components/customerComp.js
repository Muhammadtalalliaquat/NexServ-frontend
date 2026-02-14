
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
// import { Search, Mail, User, Calendar, Filter } from "lucide-react";
import {
  getAllContact,
  updateContactStatus,
} from "../store/features/contactSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  Search,
  Mail,
  User,
  Calendar,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  MoreVertical,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactAdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContact())
      .unwrap()
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch Error:", err);
      });
  }, [dispatch]);

  const filteredContacts = contacts
    .filter(
      (item) =>
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((item) => {
      if (filter === "login") return item.author !== null;
      if (filter === "guest") return item.author === null;
      if (filter === "pending") return item.status === "pending";
      if (filter === "replied") return item.status === "replied";
      return true;
    });

  const getStats = () => {
    const total = contacts.length;
    const users = contacts.filter((c) => c.author !== null).length;
    const guests = contacts.filter((c) => c.author === null).length;
    const pending = contacts.filter((c) => c.status === "pending").length;
    return { total, users, guests, pending };
  };

  const stats = getStats();

  const updateStatus = async (id, newStatus) => {
    try {
      const result = await dispatch(
        updateContactStatus({ id, status: newStatus }),
      ).unwrap();

      console.log("UPDATED DATA ===>", result);

      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id ? { ...contact, status: newStatus } : contact,
        ),
      );

      setMenuOpen(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact._id !== id));
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Contact Messages
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage and respond to customer inquiries
          </p>
        </div> */}

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Messages</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
            <p className="text-sm text-gray-600">Registered Users</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                <UserX className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.guests}</p>
            <p className="text-sm text-gray-600">Guest Messages</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div> */}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  filter === "all"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("login")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  filter === "login"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setFilter("guest")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  filter === "guest"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Guests
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  filter === "pending"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("replied")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  filter === "replied"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Replied
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-indigo-600 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1s",
                }}
              ></div>
            </div>
            <p className="mt-6 text-gray-600 font-medium">
              Loading messages...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredContacts.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl shadow-lg">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Messages Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Messages Grid */}
        {!loading && filteredContacts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContacts.map((item, index) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                        {item.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          item.author
                            ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                            : "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {item.author ? "User" : "Guest"}
                      </span>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setMenuOpen(menuOpen === item._id ? null : item._id)
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>

                        {menuOpen === item._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-20 animate-slideDown">
                            <button
                              onClick={() => updateStatus(item._id, "replied")}
                              className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all flex items-center gap-2"
                            >
                              <CheckCircle
                                size={16}
                                className="text-green-600"
                              />
                              Mark as Replied
                            </button>
                            <button
                              onClick={() => updateStatus(item._id, "pending")}
                              className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all flex items-center gap-2"
                            >
                              <Clock size={16} className="text-yellow-600" />
                              Mark as Pending
                            </button>
                            <button
                              onClick={() => deleteContact(item._id)}
                              className="w-full px-4 py-3 text-left text-sm font-medium text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all flex items-center gap-2 border-t border-gray-100"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full ${
                        item.status === "pending"
                          ? "bg-gradient-to-r from-yellow-100 to-amber-50 text-yellow-800 border border-yellow-300"
                          : "bg-gradient-to-r from-green-100 to-emerald-50 text-green-800 border border-green-300"
                      }`}
                    >
                      {item.status === "pending" ? (
                        <Clock size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {item.status
                        ? item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)
                        : "Pending"}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-4">
                    {item.message}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={14} />
                      <span className="font-medium">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* onClick={() => console.log(item.email)} */}

                    <Link
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}&su=Regarding Your Message&body=Hello ${item.name},`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      <Mail size={14} />
                      Reply
                    </Link>

                    {/* <button
                      onClick={() => setSelectedContact(item._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      <Mail size={14} />
                      Reply
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
