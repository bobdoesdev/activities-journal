import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/calendarView">Calendar View</Link>
      <Link href="/dailyView">Daily View</Link>
      <Link href="/search">Search</Link>
      <Link href="/account">Account</Link>
    </NavStyles>
  );
}
