const r = require('ripple-address-codec')
const ed = require('elliptic').eddsa
const ec = new ed('ed25519')

const dicerolls = [

// enter your dice rolls here (up to 76)
  1, 2, 3

]

let i = 0n
for (let x in dicerolls) {
  i += BigInt(dicerolls[x])
  i *= 10n // note: this will raise 1,2,3 to 1230
}

let s = i.toString(16).toUpperCase().padStart(64, '0')
const kp = ec.keyFromSecret(s)
const encodedPK = r.encodeNodePublic(Buffer.from('ED' + kp.getPublic('hex'), 'hex'))
const encodedSK = r.codec.encode(kp.getSecret(), { versions: [0x20] })

console.log(`
{
   "key_type" : "ed25519",
   "public_key" : "` + encodedPK + `",
   "revoked" : false,
   "secret_key" : "` + encodedSK + `",
   "token_sequence" : 0
}
`)
