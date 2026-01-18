import KeyPairGenerator from '@/components/ui/KeyPairGenerator';
import HomeTiles from '@/components/ui/HomeTiles';

export default function DashboardFeature() {
  return (
    <>
      <HomeTiles />

      <div className="text-center text-lg my-10">
        <p>Connect your wallet to start chatting securely.</p>
      </div>

      <KeyPairGenerator />
    </>
  );
}

