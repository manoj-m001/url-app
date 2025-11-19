function isValidUrl(url) {
  try {
    const u = new URL(url);
    return !!u.protocol && !!u.host;
  } catch (e) {
    return false;
  }
}

function isValidCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

module.exports = { isValidUrl, isValidCode };