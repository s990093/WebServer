"use client";
import React, { useState, useEffect } from "react";

interface ErrorCardProps {
  message: string;
  onClose: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 300); // 等待动画完成后再关闭
    }, 3000);

    return () => clearTimeout(timer); // 清除定时器
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 right-0 mt-4 mr-4 p-4 rounded-lg shadow-lg text-white bg-red-600 transform transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {message}
    </div>
  );
};

export default ErrorCard;
