import '../styles/globals.css';
import '@radix-ui/themes/styles.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
