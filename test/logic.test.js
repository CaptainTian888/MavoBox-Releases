import test from 'node:test';
import assert from 'node:assert/strict';
import {ALPHABET,normalizeCode,formatCode,generateCode,dayKey,pickAsset,sign,verify,signDownload,verifyDownload} from '../src/lib.js';
test('normalize and format',()=>{
  assert.equal(normalizeCode(' abcd-efgh jk mn '),'ABCDEFGHJKMN');assert.equal(formatCode('abcdefghjkmn'),'ABCD-EFGH-JKMN');assert.equal(normalizeCode(null),'');assert.equal(formatCode(''),'');
});
test('random codes have twelve allowed characters',()=>{
  const codes=new Set(Array.from({length:100},generateCode));assert.equal(codes.size,100);
  for(const code of codes){assert.equal(code.length,12);assert.ok([...code].every(c=>ALPHABET.includes(c)));assert.equal(formatCode(code).length,14);}
});
test('day boundaries and offsets',()=>{
  assert.equal(dayKey('2026-12-31T15:59:59Z',480),'2026-12-31');assert.equal(dayKey('2026-12-31T16:00:00Z',480),'2027-01-01');assert.equal(dayKey('2026-01-01T01:00:00Z',-120),'2025-12-31');
});
test('assets prefer setup, ignore signatures, handle missing platforms',()=>{
  const a=[{name:'portable.exe'},{name:'setup.exe.sig'},{name:'MAVO-setup.EXE'},{name:'MAVO.dmg'},{name:'MAVO.dmg.sig'}];
  assert.equal(pickAsset(a,'win'),a[2]);assert.equal(pickAsset(a,'mac'),a[3]);assert.equal(pickAsset([],'win'),null);assert.equal(pickAsset(undefined,'mac'),null);assert.equal(pickAsset(a,'linux'),null);
});
test('HMAC binds secret and message',async()=>{
  const s=await sign('test-secret-at-least-12','message');assert.match(s,/^[a-f0-9]{64}$/);assert.equal(await verify('test-secret-at-least-12','message',s),true);assert.equal(await verify('different-secret','message',s),false);assert.equal(await verify('test-secret-at-least-12','changed',s),false);assert.equal(await verify('test-secret-at-least-12','message','bad'),false);
});
test('download signatures bind platform and expiry',async()=>{
  const secret='test-secret-at-least-12',s=await signDownload(secret,'win',5000);
  assert.equal(await verifyDownload(secret,'win','5000',s,4000),true);assert.equal(await verifyDownload(secret,'mac','5000',s,4000),false);assert.equal(await verifyDownload(secret,'win','5001',s,4000),false);assert.equal(await verifyDownload(secret,'win','5000',s,5000),false);assert.equal(await verifyDownload(secret,'win','5000',s,6000),false);assert.equal(await verifyDownload(secret,'win','5e3',s,4000),false);assert.equal(await verifyDownload(secret,'linux','5000',s,4000),false);
});
