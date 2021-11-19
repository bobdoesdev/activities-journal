import { useUser } from '../components/User';

import DailyViewPage from './dailyView';
import SignInPage from './signin';

export default function ComponentName(props) {
  const user = useUser();
  return (
    <>
      {user && <DailyViewPage />}
      {!user && <SignInPage />}
    </>
  );
}
