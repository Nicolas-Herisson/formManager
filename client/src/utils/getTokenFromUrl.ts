export default function getTokenFromResponsePageUrl() {
  const url = new URL(window.location.href);
  const token = url.pathname.split('/').pop();

  return token;
}
