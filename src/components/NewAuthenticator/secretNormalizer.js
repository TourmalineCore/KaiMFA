import 'core-js/features/regexp';

export default function normalizeSecret(secret) {
  let normalizedSecret;
  if (!secret) {
    normalizedSecret = '';
  }

  normalizedSecret = secret.replace(/\s+/g, ''); // remove spaces
  normalizedSecret = normalizedSecret.toLowerCase();

  if (normalizedSecret.startsWith('otpauth://')){
    const queryTypeAndNameMatch = RegExp('(?<=secret=).*?(?=&|$)', 'gm').exec(normalizedSecret);

    return queryTypeAndNameMatch[0];
  }

  return normalizedSecret;
};
