import i18n from "@/lib/i18n/i18n";

/**
 * Formats a date string to a relative time string (e.g., "2 hours ago", "3 days ago")
 * @param dateString - ISO date string
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const isArabic = i18n.language === "ar";

  if (diffInSeconds < 60) {
    return isArabic ? "الآن" : "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (isArabic) {
      return `منذ ${diffInMinutes} ${diffInMinutes === 1 ? "دقيقة" : "دقيقة"}`;
    }
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (isArabic) {
      return `منذ ${diffInHours} ${diffInHours === 1 ? "ساعة" : "ساعة"}`;
    }
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    if (isArabic) {
      return `منذ ${diffInDays} ${diffInDays === 1 ? "يوم" : "يوم"}`;
    }
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    if (isArabic) {
      return `منذ ${diffInMonths} ${diffInMonths === 1 ? "شهر" : "شهر"}`;
    }
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  if (isArabic) {
    return `منذ ${diffInYears} ${diffInYears === 1 ? "سنة" : "سنة"}`;
  }
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
};

