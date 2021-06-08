import CONSTANTS from '../constants.js'
import * as nakamajs from '@heroiclabs/nakama-js';

const TEST_ID = "test_id"

// return a login provider on success
const getAuthProvider = async (options) => {

    // initialize sdk    
     let client = new nakamajs.Client(
        options.key,
        options.url,
        options.port
    )

    // do a test authenticate
    let session = await client.apiClient.authenticateCustom({
        id: TEST_ID,
        create: true
    });

    if (session != null) {

        let provider = new NakamaAuthProvider(client);

        console.log('%c%s',
        'color: blue; background: white;',
        "Nakama Auth Provider : --- " 
        + options.url + ":" + options.port + " ---"
        )
        
        return provider;
    }

    console.error("unable to initialize SDK")
    return null;
}

class NakamaAuthProvider {

    client = null;
    session = null;
    loginObject = null;
    
    constructor(client) {
        this.client = client;
    }

    login = async (loginObject) => {

        this.loginObject = loginObject;

        try {
            this.session = await this.client.apiClient.authenticateEmail(
                {
                email: loginObject.username,
                password: loginObject.password,
                create: true   
                }
            )

            return this.session
            
        } catch (e) {
            console.error("Login failed [" + e.status + ":" + e.statusText + "]"); 
         }
    
         return null;
    }    

    logout = () => {
        this.session = null;
        this.loginObject = null;
    }

    refreshSession = async () => {
        if (this.loginObject != null)
        {
            if (this.session == null)
            {   
                await this.login(this.loginObject);
            }

            // if session has expired
            else if ( (this.session.expires_at * 1000) < Date.now())
            {
                // recreate client
                this.client = new nakamajs.Client(
                    this.client.serverkey,
                    this.client.host,
                    this.client.port
                )

                await this.login(this.loginObject);
            }
        }

        else {
            console.error("previous login not detected -- unable to refresh session")
        }
    }

    getSessionToken = () => {
        console.log(this.session);
        return this.session;
    }

    saveSessionToken = (options) => {
        this.session = options;
    }
 
}

export {
    getAuthProvider
};