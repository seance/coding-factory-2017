export const key = {
  a: 'p', b: 'v', c: 'f', d: 'i', e: 's', f: 'w', g: 'c', h: 'm',
  i: 'q', j: 'b', k: 'a', l: 'n', m: 'l', n: 't', o: 'r', p: 'o',
  q: 'x', r: 'z', s: 'y', t: 'u', u: 'e', v: 'd', w: 'j', y: 'k',
  x: 'h', z: 'g'
}

export const decode = (msg, key) => {
  for (var i = 0, decoded = ''; i < msg.length; i++) {
    if (key.hasOwnProperty(msg[i])) {
      decoded += key[msg[i]]
    } else {
      decoded += msg[i]
    }
  }
  return decoded
}


export const initialCode = `\
// Reverse engineered from BombOS binary

// Built-ins: print(...msg)

var encode_key = ${JSON.stringify(key)};

${decode}
`
