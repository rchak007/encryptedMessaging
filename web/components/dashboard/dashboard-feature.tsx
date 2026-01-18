import KeyPairGenerator from '@/components/ui/KeyPairGenerator';
import HomeTiles from '@/components/ui/HomeTiles';

export default function DashboardFeature() {
  return (
    <>
      <HomeTiles />

      {/* Middle section for chat (if wallet connected) */}
      {/* Example placeholder: */}
      <div className="text-center text-lg my-10">
        <p>🔓 Connect your wallet to start chatting securely.</p>
      </div>

      {/* Bottom: optional local encryption setup */}
      <KeyPairGenerator />
    </>
  );
}

