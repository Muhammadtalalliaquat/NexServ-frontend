import { useState, useEffect, startTransition } from "react";
import {
  getAllProjects,
  updateProjectStatus,
} from "../store/features/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Code,
  Palette,
  Layout,
  Clock,
  DollarSign,
  User,
  Mail,
  Calendar,
  CheckCircle,
  Search ,
  XCircle,
  AlertCircle,
  Edit2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ProjectComp() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userProjectData, setUserProjectData] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [statusToggle, setStatusToggle] = useState(null);

  const { loading } = useSelector((state) => state.project);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    startTransition(() => {
      setUser(storedUser);
    });
    dispatch(getAllProjects())
      .then((result) => {
        setUserProjectData(result.payload?.data);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  }, [dispatch]);

  const toggleExpanded = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const toggleStatusDropdown = (id) => {
    setStatusToggle(statusToggle === id ? null : id);
  };

  const handleUpdateProjectStatus = async (id, status) => {
    try {
      const result = await dispatch(
        updateProjectStatus({ id, status }),
      ).unwrap();

      console.log("UPDATED DATA ===>", result);

      setUserProjectData((prev) =>
        prev.map((project) =>
          project._id === id ? { ...project, status } : project,
        ),
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const getProjectTypeIcon = (type) => {
    const icons = {
      "Web Development": Code,
      "UI/UX Design": Palette,
      "E-commerce": Layout,
      SEO: Search,
      Other: Clock,
    };

    return icons[type] || Code;
  };

  const getProjectTypeColor = (type) => {
    const colors = {
      "Web Development": {
        gradient: "from-blue-500 to-indigo-500",
        bg: "from-blue-50 to-indigo-50",
        text: "text-blue-700",
        border: "border-blue-200",
      },
      "UI/UX Design": {
        gradient: "from-purple-500 to-pink-500",
        bg: "from-purple-50 to-pink-50",
        text: "text-purple-700",
        border: "border-purple-200",
      },
      "E-commerce": {
        gradient: "from-orange-500 to-red-500",
        bg: "from-orange-50 to-red-50",
        text: "text-orange-700",
        border: "border-orange-200",
      },
      SEO: {
        gradient: "from-emerald-500 to-teal-500",
        bg: "from-emerald-50 to-teal-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
      },
      Other: {
        gradient: "from-gray-500 to-slate-500",
        bg: "from-gray-50 to-slate-50",
        text: "text-gray-700",
        border: "border-gray-200",
      },
    };

    return colors[type] || colors["Other"];
  };

  const getStatusConfig = (status) => {
    const configs = {
      Pending: {
        icon: Clock,
        gradient: "from-yellow-100 to-amber-50",
        text: "text-yellow-800",
        border: "border-yellow-300",
        dot: "bg-yellow-500",
      },
      "In Review": {
        icon: AlertCircle,
        gradient: "from-blue-100 to-indigo-50",
        text: "text-blue-800",
        border: "border-blue-300",
        dot: "bg-blue-500",
      },
      Contacted: {
        icon: CheckCircle,
        gradient: "from-green-100 to-green-50",
        text: "text-green-800",
        border: "border-green-300",
        dot: "bg-green-500",
      },
      Completed: {
        icon: CheckCircle,
        gradient: "from-green-100 to-emerald-50",
        text: "text-green-800",
        border: "border-green-300",
        dot: "bg-green-500",
      },
    };
    return configs[status] || configs["Pending"];
  };

  const getBudgetConfig = (budget) => {
    const configs = {
      Low: {
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
      },
      Medium: {
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
      },
      High: {
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
      },
      Custom: {
        color: "text-gray-600",
        bg: "bg-gray-50",
        border: "border-gray-200",
      },
    };
    return configs[budget] || configs["Custom"];
  };

  return (
    <>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          {/* <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {user?.isAdmin ? "All Projects" : "My Projects"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {user?.isAdmin
                ? "Manage and monitor all project submissions"
                : "Track your project requests"}
            </p>
          </div> */}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-44">
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
                Loading projects...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && userProjectData?.length === 0 && (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Layout className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-500 text-base mb-1">
                Your project submissions will appear here.
              </p>
              <p className="text-gray-400 text-sm">
                Submit a new project to get started!
              </p>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userProjectData?.map((project) => {
              const typeColor = getProjectTypeColor(project.projectType);
              const TypeIcon = getProjectTypeIcon(project.projectType);
              const statusConfig = getStatusConfig(project.status);
              const StatusIcon = statusConfig.icon;
              const budgetConfig = getBudgetConfig(project.budget);
              const isExpanded = expandedProject === project._id;

              return (
                <div
                  key={project._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  {/* Header with Project Type */}
                  <div className={`bg-gradient-to-r ${typeColor.gradient} p-5`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            {project.projectType}
                          </h3>
                          <p className="text-white/80 text-xs">
                            Project ID: {project._id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Author Info */}
                    {user?.isAdmin && (
                      <div className="mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                            {project.author?.userName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-gray-400" />
                              <p className="font-semibold text-gray-800 truncate">
                                {project.author?.userName}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              <p className="text-xs text-gray-500 truncate">
                                {project.author?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <div className="mb-4">
                      <p
                        className={`text-gray-700 leading-relaxed ${!isExpanded && "line-clamp-2"}`}
                      >
                        {project.description}
                      </p>
                      {project.description.length > 100 && (
                        <button
                          onClick={() => toggleExpanded(project._id)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              Show Less <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              Read More <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div
                        className={`${budgetConfig.bg} border ${budgetConfig.border} rounded-xl p-3`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign
                            size={14}
                            className={budgetConfig.color}
                          />
                          <span className="text-xs text-gray-600 font-medium">
                            Budget
                          </span>
                        </div>
                        <p
                          className={`${budgetConfig.color} font-bold text-sm`}
                        >
                          {project.budget}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={14} className="text-indigo-600" />
                          <span className="text-xs text-gray-600 font-medium">
                            Timeline
                          </span>
                        </div>
                        <p className="text-indigo-700 font-bold text-sm">
                          {project.timeline}
                        </p>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 ${statusConfig.dot} rounded-full animate-pulse`}
                        ></div>
                        <span
                          className={`px-3 py-1.5 bg-gradient-to-r ${statusConfig.gradient} ${statusConfig.text} border ${statusConfig.border} rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5`}
                        >
                          <StatusIcon size={14} />
                          {project.status}
                        </span>
                      </div>

                      {user?.isAdmin && (
                        <div className="relative">
                          <button
                            onClick={() => toggleStatusDropdown(project._id)}
                            className="flex items-center gap-2 px-3 py-1.5 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                          >
                            <Edit2 size={12} />
                            Edit
                          </button>

                          {statusToggle === project._id && (
                            <div className="overflow-hidden z-20 absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 animate-slideDown">
                              {[
                                "Pending",
                                "In Review",
                                "Contacted",
                                "Completed",
                              ].map((status) => (
                                <button
                                  key={status}
                                  onClick={() =>
                                    handleUpdateProjectStatus(
                                      project._id,
                                      status,
                                    )
                                  }
                                  className="block w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all text-left border-b border-gray-100 last:border-b-0"
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Created Date */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={14} />
                        <span className="font-medium">
                          Created:{" "}
                          {new Date(project.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
}
