import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../../utils/api";
import { NotificationType } from "../../utils/types/notificationType";

interface Notification {
  id: number;
  order_status: string;
  message: string;
  createdAt: Date;
}
const Notification: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState<
    NotificationType[] | null
  >(null);

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  useEffect(() => {
    if (notifications && !localNotifications) {
      setLocalNotifications(notifications);
    }
  }, [notifications, localNotifications]);

  const renderIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <img src="/completeordericon.png" alt="Complete Order" />;
      case "Payment Pending":
        return <img src="/pendingordericon.png" alt="Pending Order" />;
      case "Return Accepted":
        return <img src="/returnordericon.png" alt="Return Order" />;
      case "Cancelled":
      case "Return Rejected":
        return <img src="/cancelordericon.png" alt="Cancel Order" />;
      default:
        return <img src="/pendingordericon.png" alt="Pending Order" />;
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllAsRead = () => {
    if (localNotifications) {
      const updated = localNotifications.map((n) => ({ ...n, is_read: true }));
      setLocalNotifications(updated);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notifications</div>;

  const unreadCount =
    localNotifications?.filter((notification) => !notification.is_read)
      .length || 0;

  return (
    <div className="relative inline-block">
      <button onClick={toggleDropdown}>
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-1 translate-x-28 mt-2 w-[400px] bg-white shadow-lg rounded-lg border border-gray-200 z-10 max-h-[500px] overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-5 border-b border-gray-100">
            <p className="font-semibold">Notifications</p>
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-900 font-medium"
            >
              Mark all as Read
            </button>
          </div>

          <ul>
            {localNotifications?.map((notification: NotificationType) => (
              <li
                key={notification.id}
                className="flex px-4 py-5 border-b border-gray-100"
              >
                <div className="mr-2 w-12">
                  {renderIcon(notification.order_status)}
                </div>
                <div className="ml-2">
                  <div className="text-sm">{notification.message}</div>
                  <p className="text-sm text-gray-600">
                    {new Date(notification.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
