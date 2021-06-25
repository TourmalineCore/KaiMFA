import test from 'ava';

import normalizeSecret from './secretNormalizer';

const LOWERED_SECRET = 'nbcc6nzlm5du4l2hmf3hs4dpnyyhk32r';

test('lowercase -> the same', t => {
  t.is(normalizeSecret(LOWERED_SECRET), LOWERED_SECRET);
});

test('uppercase -> lowercase', t => {
  t.is(normalizeSecret('NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R'), LOWERED_SECRET);
});

test('spaces in the beggining -> trimmed', t => {
  t.is(normalizeSecret('   NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R'), LOWERED_SECRET);
});

test('spaces in the beggining and in the end -> trimmed', t => {
  t.is(normalizeSecret('   NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R    '), LOWERED_SECRET);
});

test('uppercase and spaces everywhere -> no spaces', t => {
  t.is(normalizeSecret('   nbcc6n zlm5du 4l2hmf  3hs4dp nyyhk32r  '), LOWERED_SECRET);
});

test('different registy and spaces -> no spaces and lowered', t => {
  t.is(normalizeSecret('   nbcc6n zlm5du 4l2hmf  3hs4dp nYYHK32R  '), LOWERED_SECRET);
});

test('full QR code link -> only secret', t => {
  t.is(normalizeSecret('otpauth://totp/gitlab%20totp?secret=NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R&digits=6'), LOWERED_SECRET);
});

test('QR code link with the secret at the end -> only secret', t => {
  t.is(normalizeSecret('otpauth://totp/gitlab%20totp?secret=NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R'), LOWERED_SECRET);
});
