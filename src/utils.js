import sjcl from 'sjcl';

const binaryToHash = binary => {
  const hash = sjcl.hash.sha256.hash(binary);
  return sjcl.codec.hex.fromBits(hash);
};

export const fileToHash = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ev => {
      const hex = binaryToHash(ev.target.result);
      resolve(hex);
    };
    reader.readAsBinaryString(file);
  });
};