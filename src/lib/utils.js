import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertToWIB(utcDate) {
  const date = new Date(utcDate);

  const options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("id-ID", options);
}

export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace("IDR", "Rp")
    .replace(",00", ",-");
}

export function formatToWIB(dateString) {
  const date = new Date(dateString);

  // Format hari dan tanggal
  const dayAndDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
  });

  // Format waktu (jam dan menit)
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Menggabungkan hasil dengan WIB
  return `${dayAndDate}, ${time} WIB`;
}

/**
 * Retry function for API calls that might fail due to temporary issues
 * @param {Function} fn - The async function to retry
 * @param {number} maxRetries - Maximum number of retries (default: 3)
 * @param {number} delay - Delay between retries in ms (default: 1000)
 * @returns {Promise} - The result of the function
 */
export async function retryApiCall(fn, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx) except 429 (rate limit)
      if (
        error.response?.status >= 400 &&
        error.response?.status < 500 &&
        error.response?.status !== 429
      ) {
        throw error;
      }

      // Don't retry on server errors (5xx) except 504 (gateway timeout)
      if (error.response?.status >= 500 && error.response?.status !== 504) {
        throw error;
      }

      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
}

/**
 * Check if the error is a timeout or server error that should be retried
 * @param {Error} error - The error to check
 * @returns {boolean} - Whether the error should be retried
 */
export function shouldRetryError(error) {
  return (
    error.code === "ECONNABORTED" ||
    error.response?.status === 504 ||
    error.response?.status === 502 ||
    error.response?.status === 503 ||
    error.response?.status === 429
  );
}

export function getCurrentDate() {
  const date = new Date();
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getCurrentTime() {
  const date = new Date();
  return date.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
}
