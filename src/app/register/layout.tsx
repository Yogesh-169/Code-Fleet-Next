import React from "react";

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="relative flex min-h-screen flex-col bg-gray-50 text-gray-800 overflow-x-hidden"
            style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
        >
            {children}
        </div>
    );
}
