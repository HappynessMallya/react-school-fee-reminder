module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*", // Ensure the paths aren't blocked or redirected elsewhere
      },
    ];
  },
};
