import Link from 'next/link';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  return (
    <NavStyles>
      {user && (
        <>
          <Link href="/calendarView">Calendar View</Link>
          <Link href="/dailyView">Daily View</Link>
          <Link href="/search">Search</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
    </NavStyles>
  );
}
