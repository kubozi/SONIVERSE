import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")

class Token(FA2.FA2):
    pass

@sp.add_test(name = "Non Fungible Token")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("admin")
    u1 = sp.test_account("user1")
    u2 = sp.test_account("user2")

    token_contract = Token(FA2.FA2_config(non_fungible = True), admin = admin.address, metadata = sp.utils.metadata_of_url("ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb"))
    
    scenario += token_contract