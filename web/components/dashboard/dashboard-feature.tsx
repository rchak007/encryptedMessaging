import { UiLayout } from '@/components/ui/ui-layout';
import KeyPairGenerator from '@/components/ui/KeyPairGenerator';
import HomeTiles from '@/components/ui/HomeTiles';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Relay', path: '/relay' },
  { label: 'Docs', path: '/docs' }, // or any placeholder
];

export default function DashboardFeature() {
  return (
    <UiLayout links={navLinks}>
      <HomeTiles />

      {/* Middle section for chat (if wallet connected) */}
      {/* Example placeholder: */}
      <div className="text-center text-lg my-10">
        <p>🔓 Connect your wallet to start chatting securely.</p>
      </div>

      {/* Bottom: optional local encryption setup */}
      <KeyPairGenerator />
    </UiLayout>
  );
}

