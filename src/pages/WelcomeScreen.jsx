const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="text-center w-full max-w-xs sm:max-w-md mx-auto">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-white text-2xl">🐝</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Welcome to HoneyBee Chat
        </h1>

        <p className="text-sm sm:text-base text-gray-600">
          Select a chat from the sidebar to start messaging
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
