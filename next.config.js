
/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig =  {
    images: {
        domains: ["lh3.googleusercontent.com",'img.freepik.com',"d1eipm3vz40hy0.cloudfront.net","resend.com/domains","lottie.host"],
      },
}

module.exports = withPWA(nextConfig);
