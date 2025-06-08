import { useEffect, useRef } from 'react';
import { useNavigation } from 'react-router';
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar';

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null);
  const state = useNavigation();

  useEffect(() => {
    if (state.state === 'loading') {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [state.state]);

  return <LoadingBar color="var(--primary)" ref={ref} height={3} />;
}
