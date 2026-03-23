import { redirect } from 'next/navigation';

export default function SettingsRedirect() {
  // Direct default settings route to the first tab (User Management)
  redirect('/settings/users');
}
