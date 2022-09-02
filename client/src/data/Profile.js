class Profile {
    constructor(publicAddress, wallet, balance, connected) 
    {
        this.publicAddress = publicAddress;
        this.wallet = wallet;
        this.balance = balance;
        this.connected = connected;
    }
}

export default Profile;