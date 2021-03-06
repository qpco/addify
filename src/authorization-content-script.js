/**
 * Checks generated state with state received from redirect URI
 * Stores authorization code in browser's local storage
 * @returns null if response state doesn't match
 */
async function getAuthorizationCode() {
    let url = window.location.href
    let state = url.substr(url.indexOf('&state=')+7, 56)
    const browStore = await browser.storage.local.get()

    if(state == browStore.state) {
        let authorizationCode = url.substr(url.indexOf('code=')+5, (url.indexOf('&state') - (url.indexOf('code=')+5)))
        browser.storage.local.set({authorization_code: authorizationCode})
        alert('Authorization successful. Open a Youtube video to search.')
    } else {
        alert('Failed state parity. Ending authentication flow.'); 
        return null
    }
}

getAuthorizationCode()
