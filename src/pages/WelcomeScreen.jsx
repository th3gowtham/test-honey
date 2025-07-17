const WelcomeScreen = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb", // Tailwind's bg-gray-50
        padding: "1.5rem", // px-4 py-6
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "100%",
          maxWidth: "20rem", // max-w-xs (small screens)
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: "4rem", // w-16
            height: "4rem", // h-16
            backgroundColor: "#facc15", // Tailwind's bg-yellow-500
            borderRadius: "9999px", // rounded-full
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem auto", // mx-auto mb-5
          }}
        >
          <span
            style={{
              color: "#ffffff", // text-white
              fontSize: "1.5rem", // text-2xl
            }}
          >
            🐝
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.25rem", // text-xl
            fontWeight: 600, // font-semibold
            color: "#111827", // text-gray-900
            marginBottom: "0.5rem", // mb-2
          }}
        >
          Welcome to HoneyBee Chat
        </h1>

        <p
          style={{
            fontSize: "0.875rem", // text-sm
            color: "#4b5563", // text-gray-600
          }}
        >
          Select a chat from the sidebar to start messaging
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
