import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { analyticsService } from "../services/analyticsService";
import { 
  ArrowLeft, 
  BarChart3, 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet,
  MousePointerClick,
  Calendar,
  ExternalLink,
  ChevronRight,
  Clock,
  Navigation
} from "lucide-react";
import { format, subDays, startOfDay, isSameDay } from "date-fns";

const Analytics = () => {
  const { shortCode } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getAnalytics(shortCode);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold">Analyzing data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
             <BarChart3 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Error</h2>
          <p className="text-gray-500 font-medium">{error}</p>
          <Link to="/dashboard">
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { stats, clicks } = data;

  // Process data for charts/lists
  const deviceStats = [
    { name: "Desktop", value: stats?.desktop_clicks || 0, icon: Monitor, color: "bg-blue-500" },
    { name: "Mobile", value: stats?.mobile_clicks || 0, icon: Smartphone, color: "bg-purple-500" },
    { name: "Tablet", value: stats?.tablet_clicks || 0, icon: Tablet, color: "bg-indigo-500" },
  ];

  const browsers = clicks?.reduce((acc, click) => {
    const b = click.browser || "Unknown";
    acc[b] = (acc[b] || 0) + 1;
    return acc;
  }, {});

  const topBrowsers = Object.entries(browsers || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const referrers = clicks?.reduce((acc, click) => {
    const r = click.referrer || "Direct";
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});

  const topReferrers = Object.entries(referrers || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Generate 7-day timeline (Dummy if no clicks, real if available)
  const timeline = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), i);
    const count = clicks?.filter(c => isSameDay(new Date(c.clicked_at), date)).length || 0;
    return { date, count };
  }).reverse();

  const maxTimelineCount = Math.max(...timeline.map(t => t.count), 1);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-2">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-bold text-sm mb-2">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              Analytics <span className="text-blue-600 text-xl md:text-2xl">/{shortCode}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-4 py-2 bg-blue-50 rounded-xl">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Total Clicks</p>
              <p className="text-2xl font-black text-blue-900">{stats?.total_clicks || 0}</p>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-xl">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Click</p>
              <p className="text-sm font-bold text-gray-700">
                {stats?.last_clicked_at ? format(new Date(stats.last_clicked_at), "MMM dd") : "Never"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Timeline Bar Chart */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-500" />
                  Click History (Last 7 Days)
                </h3>
              </div>
              <div className="flex items-end justify-between gap-2 h-48">
                {timeline.map((day, idx) => (
                  <div key={idx} className="grow flex flex-col items-center gap-3 group">
                    <div className="w-full relative h-full flex items-end justify-center">
                       {/* Bar */}
                       <div 
                        className="w-full max-w-[40px] bg-blue-100 rounded-t-lg transition-all duration-500 group-hover:bg-blue-600"
                        style={{ height: `${(day.count / maxTimelineCount) * 100}%`, minHeight: day.count > 0 ? "4px" : "0px" }}
                       >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                           {day.count} clicks
                         </div>
                       </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {format(day.date, "EEE")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Click Log */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                  <span className="text-xs font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                    Latest {clicks?.length || 0} clicks
                  </span>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                       <th className="px-6 py-4">Time</th>
                       <th className="px-6 py-4">Location</th>
                       <th className="px-6 py-4">Device</th>
                       <th className="px-6 py-4">Browser</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {clicks?.slice(0, 10).map((click, idx) => (
                       <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-6 py-4 text-xs font-bold text-gray-600 flex items-center gap-2">
                           <Clock size={12} className="text-gray-400" />
                           {format(new Date(click.clicked_at), "MMM dd, HH:mm")}
                         </td>
                         <td className="px-6 py-4 text-xs font-bold text-gray-900">
                           {click.city ? `${click.city}, ` : ""}{click.country || "Unknown"}
                         </td>
                         <td className="px-6 py-4">
                           <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded-md text-gray-600 uppercase">
                             {click.device_type}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-xs font-bold text-gray-500">
                           {click.browser}
                         </td>
                       </tr>
                     ))}
                     {(!clicks || clicks.length === 0) && (
                       <tr>
                         <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-medium">
                           No click data available yet.
                         </td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            
            {/* Devices breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Navigation size={20} className="text-blue-500" />
                Devices
              </h3>
              <div className="space-y-4">
                {deviceStats.map((device, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <div className="flex items-center gap-2 text-gray-600">
                        <device.icon size={16} />
                        {device.name}
                      </div>
                      <span className="text-gray-900">{device.value}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${device.color} rounded-full transition-all duration-1000`} 
                        style={{ width: `${stats?.total_clicks > 0 ? (device.value / stats.total_clicks) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browsers List */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
               <h3 className="text-lg font-bold text-gray-900">Top Browsers</h3>
               <div className="space-y-3">
                 {topBrowsers.map(([browser, count], idx) => (
                   <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                     <span className="text-sm font-bold text-gray-700">{browser}</span>
                     <span className="text-xs font-black text-blue-600">{count}</span>
                   </div>
                 ))}
                 {topBrowsers.length === 0 && <p className="text-xs text-gray-400 font-medium italic">No data</p>}
               </div>
            </div>

             {/* Referrers List */}
             <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Globe size={20} className="text-blue-500" />
                Top Referrers
               </h3>
               <div className="space-y-3">
                 {topReferrers.map(([ref, count], idx) => (
                   <div key={idx} className="flex items-center justify-between group">
                     <span className="text-sm font-bold text-gray-500 truncate max-w-[150px]">{ref}</span>
                     <div className="flex items-center gap-2">
                        <div className="h-1 w-20 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                            className="h-full bg-blue-400 rounded-full" 
                            style={{ width: `${(count / (stats?.total_clicks || 1)) * 100}%` }}
                           />
                        </div>
                        <span className="text-xs font-black text-gray-900">{count}</span>
                     </div>
                   </div>
                 ))}
                  {topReferrers.length === 0 && <p className="text-xs text-gray-400 font-medium italic">No data</p>}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;