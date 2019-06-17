const { execSync } = require('child_process');
const { createAccount, Client, argString } = require('orbs-client-sdk');

let contractName;

describe('Notary Integration test', () => {

  beforeAll(() => {
    execSync('gamma-cli start-local -wait');  
  });

  beforeEach(() => {
    jest.setTimeout(60 * 1000);
    contractName = `Notary+${Math.random()}`;
    execSync(`gamma-cli deploy ./contracts/notary.go -name ${contractName} -signer user1`);
  });

  afterAll(() => {
    execSync('gamma-cli stop-local');
  });

  it('should be able to record and verify a file', async () => {
    let orbsClient = new Client('http://localhost:8080', 42, 'TEST_NET');
    const { publicKey, privateKey } = createAccount();
    const [tx] = orbsClient.createTransaction(
      publicKey,
      privateKey,
      contractName,
      'register',
      [argString('01234')]
    );

    await orbsClient.sendTransaction(tx);

    const query = orbsClient.createQuery(
      publicKey,
      contractName,
      'verify',
      [argString('01234')]
    );

    const response = await orbsClient.sendQuery(query);
    expect(response.outputArguments[0].value > 0).toBe(true);
    console.log(response);
  });

});