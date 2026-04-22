import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Next 15/16 blocks non-localhost dev origins by default, which causes
  // Suspense in the 3D scene to hang forever and the canvas to render blank.
  // List your LAN IP here (what `ipconfig` shows for your Wi-Fi adapter).
  allowedDevOrigins: [
    "192.168.31.93",
    "192.168.31.*",
    "192.168.0.*",
    "192.168.1.*",
    "10.0.0.*",
    "*.local",
  ],
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
